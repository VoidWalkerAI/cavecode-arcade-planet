// Run: node tests/gameplay-regressions.cjs
// Executes the actual inline game scripts with a small DOM/event/clock harness.
// No browser rendering is simulated; visual/device QA remains a separate check.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = process.env.ARCADE_TEST_ROOT || path.resolve(__dirname, '..');

function game(file) {
  const elements = new Map(), frames = new Map(), timers = new Map();
  let id = 0, now = 0;
  class Element {
    constructor() {
      this.style = {}; this.dataset = {}; this.children = []; this.handlers = {};
      this.classes = new Set(); this.clientHeight = 300; this.clientWidth = 600;
      this.classList = {
        add: (...names) => names.forEach(n => this.classes.add(n)),
        remove: (...names) => names.forEach(n => this.classes.delete(n)),
        contains: name => this.classes.has(name)
      };
    }
    set className(s) { this.classes = new Set(s.split(/\s+/)); }
    get className() { return [...this.classes].join(' '); }
    set innerHTML(s) { this.children = []; this.html = s; }
    get innerHTML() { return this.html || ''; }
    appendChild(e) { this.children.push(e); e.parent = this; }
    addEventListener(name, fn) { (this.handlers[name] ||= []).push(fn); }
    setAttribute(name, value) { this[name] = value; }
    querySelector() { return new Element(); }
    closest(selector) {
      if (this.classes.has(selector.slice(1))) return this;
      return this.parent?.closest(selector) || null;
    }
    click() {
      if (this.disabled) return;
      const e = { target: this, preventDefault() {} };
      for (let node = this; node; node = node.parent) {
        for (const handler of node.handlers.click || []) handler(e);
        if (node.onclick) node.onclick(e);
      }
    }
    remove() { if (this.parent) this.parent.children = this.parent.children.filter(x => x !== this); }
    getBoundingClientRect() {
      const left = parseFloat(this.style.left) || 60;
      const bottom = 300 - (parseFloat(this.style.bottom) || 78);
      return { left, right: left + 26, top: bottom - 32, bottom, width: 26, height: 32 };
    }
  }
  const document = {
    getElementById(name) { if (!elements.has(name)) elements.set(name, new Element()); return elements.get(name); },
    createElement() { return new Element(); }, addEventListener() {}
  };
  const context = vm.createContext({ document, window: { addEventListener() {} }, console,
    setTimeout(fn, delay = 0) { const key = ++id; timers.set(key, { fn, due: now + delay }); return key; },
    clearTimeout(key) { timers.delete(key); },
    requestAnimationFrame(fn) { const key = ++id; frames.set(key, fn); return key; },
    cancelAnimationFrame(key) { frames.delete(key); }
  });
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
  vm.runInContext(script, context, { filename: file, timeout: 2000 });
  const run = s => vm.runInContext(s, context, { timeout: 2000 });
  return { run, elements, frames,
    advance(ms) {
      const end = now + ms;
      for (;;) {
        const next = [...timers].filter(([, t]) => t.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
        if (!next) break;
        now = next[1].due; timers.delete(next[0]); next[1].fn();
      }
      now = end;
    },
    frame(timestamp) { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(timestamp)); }
  };
}

const tests = [];
function test(name, fn) { tests.push([name, fn]); }
const focusPath = 'mind-chambers/focus-relay/index.html';
const basicPath = 'haze-maze/basic-swap/index.html';
const bastionPath = 'cavern-run/bastion-runner/index.html';

test('Focus: one bubbling click advances exactly one answer; wrong answer ends run', () => {
  const g = game(focusPath);
  g.run('startRun()'); g.advance(1600);
  g.run('nodes[pattern[0]].el.click()');
  assert.equal(g.run('expectedIndex'), 2);
  assert.equal(g.run('currentState'), 'Input');
  g.run('nodes[(pattern[1]+1)%9].el.click()');
  assert.equal(g.run('currentState'), 'Game Over');
});
test('Focus: 12 consecutive correct rounds, nine-node cap and tier five', () => {
  const g = game(focusPath); g.run('startRun()');
  for (let round = 0; round < 12; round++) {
    g.advance(g.run('revealTimeMs'));
    assert.equal(g.run('currentState'), 'Input');
    g.run('for (const index of [...pattern]) nodes[index].el.click()');
    assert.equal(g.run('roundsCompleted'), round + 1);
    assert.equal(g.run('currentState'), 'Next Round');
    g.run('nodes[0].el.click()'); // transition input must be ignored
    assert.equal(g.run('currentState'), 'Next Round');
    g.advance(650);
  }
  assert.equal(g.run('patternLength'), 9);
  assert.equal(g.run('pattern.length'), 9);
  assert.equal(g.run('patternLengthToTier(patternLength)'), 5);
  assert.equal(g.run('revealTimeMs'), 700);
});
test('Focus: restart cancels old transition and reveal timers', () => {
  const g = game(focusPath); g.run('startRun()'); g.advance(1600);
  g.run('nextRound()'); // isolate timer lifecycle from click-handler behavior
  g.advance(300); g.run('startRun()'); g.advance(1600);
  assert.equal(g.run('currentState'), 'Input');
  assert.equal(g.run('roundsCompleted'), 0);
  g.run('startRun()'); g.advance(700); g.run('startRun()'); g.advance(900);
  assert.equal(g.run('currentState'), 'Reveal');
  g.advance(700); assert.equal(g.run('currentState'), 'Input');
});
test('Basic Swap: restored identity; 100 starts have no matches and a legal move', () => {
  const g = game(basicPath);
  assert.match(fs.readFileSync(path.join(root, basicPath), 'utf8'), /<title>Haze Maze/);
  assert.equal(g.run('LEVELS.length'), 5);
  for (let i = 0; i < 100; i++) {
    g.run('startLevel(0)');
    assert.equal(g.run('findMatches().length'), 0);
    assert.equal(g.run('hasLegalMove()'), true);
    assert.equal(g.run('score'), 0);
  }
});
const fixture = `board=Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>({color:(r+c)%5,special:null})));board[0][2].color=0;board[1][1].color=0;renderBoard();`;
function clickTile(g, r, c) { g.run(`boardEl.children[${r * 8 + c}].click()`); }
test('Basic Swap: invalid swap reverts; valid swap scores, consumes one move, settles', () => {
  const g = game(basicPath); g.run(fixture);
  const before = g.run('JSON.stringify(board)');
  clickTile(g, 7, 6); clickTile(g, 7, 7);
  assert.equal(g.run('JSON.stringify(board)'), before);
  assert.equal(g.run('score'), 0); assert.equal(g.run('movesLeft'), 17);
  clickTile(g, 0, 1); clickTile(g, 1, 1);
  assert.ok(g.run('score') >= 30); assert.equal(g.run('movesLeft'), 16);
  assert.equal(g.run('findMatches().length'), 0);
  assert.equal(g.run('hasLegalMove()'), true);
});
test('Basic Swap: win/loss block play; restart clears selection and result', () => {
  const g = game(basicPath); g.run(fixture);
  clickTile(g, 0, 0); g.run('startLevel(0)'); assert.equal(g.run('selected'), null);
  g.run('score=LEVELS[0].target;checkLevelEnd()');
  assert.equal(g.run('levelEnded'), true);
  clickTile(g, 0, 0); assert.equal(g.run('selected'), null);
  g.elements.get('modal-primary').click(); assert.equal(g.run('currentLevelIndex'), 1);
  g.run('movesLeft=0;checkLevelEnd()'); assert.equal(g.run('levelEnded'), true);
  g.elements.get('modal-secondary').click(); assert.equal(g.run('levelEnded'), false);
  assert.equal(g.run('movesLeft'), 22);
});
test('Bastion: comparable jump height at 30, 60, 120 Hz; lands; no double jump', () => {
  const peaks=[];
  for (const hz of [30,60,120]) {
    const g=game(bastionPath); g.run("startRun()"); g.frame(0); g.run('triggerJump();triggerJump()');
    assert.equal(g.run('jumps'),1);
    let peak=0;
    for(let i=1;i<=hz;i++){g.frame(i*1000/hz);peak=Math.max(peak,g.run('posY'));}
    assert.ok(peak>90 && peak<100, `peak ${peak} at ${hz}Hz`);
    assert.equal(g.run('isOnGround'),true);assert.equal(g.run('posY'),0);peaks.push(peak);
  }
  assert.ok(Math.max(...peaks)-Math.min(...peaks)<1);
});
test('Bastion: repeated restart keeps one frame; long gaps capped; level cannot skip', () => {
  const g=game(bastionPath);
  for(let i=0;i<20;i++)g.elements.get('restartBtn').click();
  assert.equal(g.frames.size,0);g.elements.get("startBtn").click();g.frame(0);g.frame(60000);
  assert.ok(g.run('distance')<10);assert.equal(g.frames.size,1);
  g.elements.get('nextLevelBtn').click();assert.equal(g.run('currentLevelIndex'),0);
  g.run('distance=LEVELS[0].target;elapsedSeconds=20');g.frame(60016);
  assert.equal(g.run('levelCleared'),true);assert.equal(g.frames.size,0);
  g.elements.get('modalPrimary').click();assert.equal(g.run('currentLevelIndex'),1);
  assert.equal(g.frames.size,0);assert.equal(g.run('running'),false);
});
test('Bastion: grounded hit costs one life; elevated jump clears same hazard', () => {
  const g=game(bastionPath);g.run("startRun()");g.frame(0);
  const hazard=`spawnHazard(); const h=[...hazards.values()].at(-1);h.isCoin=false;h.x=60;h.el.style.left='60px';h.el.style.bottom='78px';`;
  g.run('{'+hazard+'}');g.frame(0);assert.equal(g.run('lives'),2);
  g.run('hazards.forEach(h=>h.el.remove());hazards.clear();posY=95;isOnGround=false;applyRunnerPosition()');
  g.run('{'+hazard+'}');g.frame(0);assert.equal(g.run('lives'),2);
});
test('Bastion: waits for Start; first hit does not complete a two-second level', () => {
  const g=game(bastionPath);
  assert.equal(g.run('running'),false);assert.equal(g.frames.size,0);
  g.frame(5000);assert.equal(g.run('distance'),0);
  g.elements.get('startBtn').click();g.frame(0);
  for(let i=1;i<=120;i++)g.frame(i*1000/60);
  g.run('handleHit(null)');
  assert.equal(g.run('lives'),2);assert.equal(g.run('levelCleared'),false);
  assert.ok(g.run('distance')<45);
  g.run('distance=LEVELS[0].target');g.frame(2016);
  assert.equal(g.run('levelCleared'),false);
});
test('Bastion: visible warning time stays consistent on phone and desktop', () => {
  for (const width of [280,360,640]) {
    const g=game(bastionPath);g.elements.get('playfield').clientWidth=width;
    g.run('startRun()');g.frame(0);
    g.run('spawnHazard();spawnTimer=-10000');
    const start=g.run('[...hazards.values()][0].x');
    for(let i=1;i<=60;i++)g.frame(i*1000/60);
    const moved=start-g.run('[...hazards.values()][0].x');
    assert.ok(Math.abs(moved-(width*.86-32)/2.2)<.01);
  }
});
let failed=0;
for(const [name,fn] of tests){try{fn();console.log('PASS',name)}catch(e){failed++;console.error('FAIL',name,'\n',e.stack)}}
console.log(`${tests.length-failed}/${tests.length} passed`);process.exitCode=failed?1:0;

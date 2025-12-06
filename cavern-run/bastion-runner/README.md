# Cavern Run — Bastion Runner (ARC-CR-001)

**Category:** Cavern-Run  
**Engine:** Endless runner (side-view)  
**Lineage:** First ancestor of the Cavern-Run family in the CaveCode Arcade Planet.

Bastion Runner is a simple endless runner.  
You control a small runner sprinting through a cavern corridor, jumping over hazards.  
The longer you survive, the higher your score.

---

## 🎮 Gameplay

- Side-view 2D runner on a flat cavern floor.
- The runner auto-moves to the right.
- Hazards (spikes / rocks) spawn ahead and slide toward the player.
- You **jump** to clear obstacles.
- If you collide with a hazard → run ends.
- Score = time survived (in seconds or ticks).

This ancestor: **no double-jump, no powerups, no enemies**.  
Just timing, jumps, and increasing speed.

---

## 🕹️ Controls

**Desktop:**
- Space / W / ↑ Arrow = jump

**Mobile:**
- Tap anywhere on the playfield = jump

(Press / tap while in the air does nothing; no double jump in this version.)

---

## 🎚️ Tuning Knobs

Editable in `bastion-runner.cavecode` and reflected in the script:

- `gravity`
- `jumpVelocity`
- `groundY` (vertical floor position)
- `baseSpeed` (world scroll speed)
- `speedIncreaseRate` (how quickly speed ramps over time)
- `obstacleSpawnIntervalMin`
- `obstacleSpawnIntervalMax`
- `obstacleWidth`, `obstacleHeight`

---

## 📂 File Structure

```text
bastion-runner/
  README.md
  bastion-runner.cavecode
  index.html
  assets/        (optional, currently empty)

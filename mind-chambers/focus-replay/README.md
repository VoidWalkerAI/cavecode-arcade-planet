# Mind Chambers — Focus Relay (ARC-MC-002)

**Category:** Mind-Chambers  
**Engine:** Visual Sequence Memory (Click in Order)  
**Lineage:** Second ancestor of the Mind-Chambers family in the CaveCode Arcade Planet.

Focus Relay is a visual working-memory game.

A set of nodes light up with numbers (1, 2, 3, …) for a brief moment.  
The numbers disappear, and you must click the nodes in the correct order from memory.

Each round:
- The pattern gets a little longer (or the reveal time tightens).
- One mistake ends the run.

---

## 🎮 Gameplay

- A grid of circles (nodes) is shown.
- At the start of each round:
  - A pattern of N nodes is chosen.
  - Each node displays a number (1..N) briefly.
- After the brief reveal:
  - The numbers fade out.
  - Nodes become clickable.
- You must click the nodes in ascending order:
  - If correct → continue until all N are clicked.
  - When you complete a round:
    - Score increases.
    - Next round: longer pattern and/or shorter reveal time.
  - If you click the wrong node at any point → game over.

Score = number of rounds successfully completed.

---

## 🕹️ Controls

Desktop & Mobile (same):

- Click / tap a node to select it during the input phase.
- Use the **Start Round** button to begin a new attempt.

---

## 🎚️ Tuning Knobs

Editable in `focus-relay.cavecode`:

- `gridSize` — grid dimension (e.g., 3 → 3x3)
- `startPatternLength` — initial number of nodes in round 1
- `patternIncrement` — how much the pattern grows each round
- `revealTimeMs` — how long numbers stay visible at the start
- `minRevealTimeMs` — minimum reveal time clamp
- `revealTimeDecayMs` — reveal time reduction each round

---

## 📂 File Structure

```text
focus-relay/
  README.md
  focus-relay.cavecode
  index.html
  assets/        (optional, currently empty)

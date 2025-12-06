# Retro Quarter — Starfield Dodger (ARC-RQ-002)

**Category:** Retro-Quarter  
**Engine:** Top-down endless dodger  
**Lineage:** Second ancestor of the Retro-Quarter family in the CaveCode Arcade Planet.

Starfield Dodger is a simple retro arcade game.  
You control a tiny ship at the bottom of the screen, sliding left and right to dodge falling asteroids.  
Last as long as you can while the starfield speeds up.

---

## 🎮 Gameplay

- Top-down view, player ship near the bottom.
- Asteroids fall from the top at random x positions.
- You can move the ship left/right freely inside the playfield.
- If any asteroid touches your ship → game over.
- Score = time survived (ticks/seconds).
- Difficulty ramps up:
  - Asteroids fall faster over time.
  - Spawn rate gradually increases.

This ancestor: **no shooting, no powerups, no shields** — just pure dodging.

---

## 🕹️ Controls

**Desktop:**

- ← / A = move left  
- → / D = move right  

**Mobile:**

- Tap / hold left half of the canvas = move left  
- Tap / hold right half of the canvas = move right  

(There is no vertical movement in this version.)

---

## 🎚️ Tuning Knobs

Editable in `starfield-dodger.cavecode` and reflected in the script:

- `shipSpeed` — horizontal speed (px/sec)
- `baseFallSpeed` — starting asteroid fall speed
- `fallSpeedIncrease` — per-second increase in fall speed
- `spawnIntervalStart` — initial spawn interval (seconds)
- `spawnIntervalMin` — minimum spawn interval (seconds)
- `spawnIntervalDecay` — how quickly interval shrinks
- `asteroidMinSize`, `asteroidMaxSize`

---

## 📂 File Structure

```text
starfield-dodger/
  README.md
  starfield-dodger.cavecode
  index.html
  assets/        (optional, currently empty)

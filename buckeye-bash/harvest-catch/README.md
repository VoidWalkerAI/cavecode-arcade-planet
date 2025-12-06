# Buckeye Bash — Harvest Catch (ARC-BB-001)

**Category:** Buckeye-Bash  
**Engine:** Lane-based catcher (time/score)  
**Lineage:** First ancestor of the Buckeye-Bash seasonal/special family in the CaveCode Arcade Planet.

Harvest Catch is a simple, lane-based catching game with a fall festival feel.  
You slide a basket between lanes to catch falling buckeyes and autumn goodies while avoiding bad items.

---

## 🎮 Gameplay

- There are **3 lanes**.
- A basket sits at the bottom; you can move it between the left, middle, and right lanes.
- From the top, items fall down:
  - **Good items** (buckeyes, apples, corn) → give you points.
  - **Bad items** (rocks, boots, junk) → cost you health if you catch them.
- The game speeds up over time.
- When your **health hits 0**, the run ends and your final score is shown.

---

## 🕹️ Controls

**Desktop:**
- ← / A = move basket left  
- → / D = move basket right  

**Mobile:**
- Tap left third of the playfield = move left  
- Tap right third = move right  
- Tap middle = stay / no move

---

## 🎚️ Tuning Knobs

Editable in `harvest-catch.cavecode` and reflected in the script:

- `laneCount` — number of lanes (default: 3)
- `fallSpeed` — base falling speed (pixels/second)
- `spawnIntervalMs` — time between spawns (milliseconds)
- `goodItemChance` — chance a spawn is a good item
- `scorePerGood` — points gained when catching a good item
- `healthLossBad` — health lost when catching a bad item
- `startingHealth` — starting health value
- Difficulty scaling rate over time

---

## 📂 File Structure

```text
harvest-catch/
  README.md
  harvest-catch.cavecode
  index.html
  assets/       (optional, currently empty)

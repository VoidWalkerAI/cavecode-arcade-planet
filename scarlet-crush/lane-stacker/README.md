# Scarlet Crush — Lane Stacker (ARC-SC-001)

**Category:** Scarlet-Crush  
**Engine:** Lane-based stacking puzzle  
**Lineage:** First ancestor of the Scarlet-Crush family in the CaveCode Arcade Planet.

Lane Stacker is a turn-based lane puzzle game.  
You choose which lane to drop the next colored block into.  
Stack 3 or more of the same color in a *contiguous run* to clear them and earn points.

If any lane reaches the top of the board, the game ends.

---

## 🎮 Gameplay

- There are **4 vertical lanes**, each with a fixed height.
- Each turn, a new colored block is shown in the “Next Block” slot.
- Click/tap a lane to drop the block into that column.
- Whenever a lane has **3 or more** blocks of the same color in a row (contiguous),
  those blocks clear and all blocks above fall downward.
- Score is based on how many blocks you clear.
- The game ends when a lane fills up to the top row.

---

## 🕹️ Controls

**Desktop / Mobile (same):**

- Tap / click the column header at the top of a lane to drop the current block into that lane.

---

## 🎚️ Tuning Knobs

Editable in `lane-stacker.cavecode` and reflected in the script:

- `laneCount` – how many vertical lanes (default: 4)
- `laneHeight` – how tall each lane is (default: 10)
- `tileTypes` – how many different colors (default: 4)
- `matchLength` – required run length for clearing (default: 3)
- `clearScore` – points per tile cleared
- `comboBonus` – extra points per tile beyond the matchLength

---

## 📂 File Structure

```text
lane-stacker/
  README.md
  lane-stacker.cavecode
  index.html
  assets/        (optional, currently empty)

# Haze Maze — Basic Swap (ARC-HM-001)

**Category:** Haze-Maze  
**Engine:** Match-3 Tile Swap  
**Lineage:** First ancestor of the Haze-Maze family in the CaveCode Arcade Planet.

Basic Swap is a simple match-3 engine where the player swaps two adjacent tiles.  
If the swap creates a line of 3 or more matching tiles, they clear and new tiles fall.

---

## 🎮 Gameplay
- Swap any two adjacent tiles (horizontal or vertical).
- If the swap creates a valid match → tiles are removed.
- Gravity fills empty cells with new tiles.
- No timer; infinite casual play.
- Scoring based on tile clears.

---

## 🕹️ Controls
**Desktop:**  
- Click a tile, then click an adjacent tile to swap.

**Mobile:**  
- Tap a tile, then tap an adjacent tile.  
- Or drag slightly in a direction.

---

## 🎚️ Tuning Knobs
Editable in the `.cavecode` spec:

- Grid size  
- Tile types (colors)  
- Clear score value  
- Gravity behavior  
- Refill mode  
- Match length requirement  

---

## 📂 File Structure

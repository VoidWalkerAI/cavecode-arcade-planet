# Ember Adventures — Ember Trail: Crossroads (ARC-EA-001)

**Category:** Ember-Adventures  
**Engine:** Node-based micro RPG / choice engine  
**Lineage:** First ancestor of the Ember-Adventures family in the CaveCode Arcade Planet.

Ember Trail: Crossroads is a tiny, replayable choice-driven RPG.  
You follow a short path through a series of scenes, making decisions that affect:

- Your **health**
- Your **bravery**
- Your **caution**

At the end, you get a short ending summary based on how you played.

---

## 🎮 Gameplay

- Start at the **Campfire** scene.
- Read the story text.
- Choose one of the available actions (buttons).
- Each choice:
  - Moves you to a new scene.
  - Optionally changes your stats (health / bravery / caution).
- Reach a final scene to see your ending summary.

There is **no combat math** or death screen in this ancestor — just branching story and stats.

---

## 🕹️ Controls

Desktop & Mobile (same):

- Tap / click one of the choice buttons to continue.
- Tap / click **“Restart Story”** to begin again from the Campfire.

---

## 🎚️ Tuning Knobs

Editable in `ember-trail.cavecode` and reflected in the script:

- `startingHealth`
- `startingBravery`
- `startingCaution`
- Scene definitions:
  - Text for each scene
  - Choices and their stat effects
  - Which scenes are final
- Whether to show the stat panel to players

---

## 📂 File Structure

```text
ember-trail/
  README.md
  ember-trail.cavecode
  index.html
  assets/     (optional, currently empty)

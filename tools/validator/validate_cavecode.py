#!/usr/bin/env python3
"""
CaveCode Validator v1.0

Quick structural checks for CaveCode files:
- Verifies presence of BLOCK lines
- Verifies at least one standard glyph is used
- Warns about empty blocks
- Designed to be run on a phone-friendly workflow (GitHub Codespaces, etc.)

Usage:
    python validate_cavecode.py path/to/file.cavecode
"""

import sys
from pathlib import Path
from typing import List, Tuple

GLYPHS = ["🪨", "🖍️", "🔧", "🎮", "🌐"]


def load_lines(path: Path) -> List[str]:
    try:
        return path.read_text(encoding="utf-8").splitlines()
    except Exception as e:
        print(f"[ERROR] Could not read file: {e}")
        sys.exit(1)


def find_blocks(lines: List[str]) -> List[Tuple[int, str]]:
    """
    Return a list of (line_number, line_text) for lines that look like BLOCK headers.
    """
    blocks = []
    for idx, line in enumerate(lines, start=1):
        stripped = line.strip()
        if "BLOCK" in stripped and stripped.upper().startswith(("🪨", "🖍️", "🔧", "🎮", "🌐", "BLOCK")):
            blocks.append((idx, stripped))
    return blocks


def check_glyphs(lines: List[str]) -> List[str]:
    """
    Return a list of glyphs that appear at least once.
    """
    found = set()
    joined = "\n".join(lines)
    for g in GLYPHS:
        if g in joined:
            found.add(g)
    return sorted(found)


def check_empty_blocks(lines: List[str], blocks: List[Tuple[int, str]]) -> List[str]:
    """
    Very simple check: if a BLOCK has no non-empty lines between it and the next BLOCK,
    warn about it.
    """
    warnings = []
    if not blocks:
        return warnings

    # Add sentinel "end" at bottom
    indices = [b[0] for b in blocks] + [len(lines) + 1]
    for i in range(len(blocks)):
        start_line = indices[i]
        end_line = indices[i + 1]
        block_header = blocks[i][1]

        # Look for any non-empty, non-separator line
        body_lines = lines[start_line:end_line - 1]  # exclude next header line
        has_content = any(l.strip() and not set(l.strip()) <= set("= ") for l in body_lines)

        if not has_content:
            warnings.append(f"[WARN] Block at line {start_line} ('{block_header}') appears empty.")
    return warnings


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python validate_cavecode.py path/to/file.cavecode")
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"[ERROR] File not found: {path}")
        sys.exit(1)

    lines = load_lines(path)

    print(f"Validating CaveCode file: {path}")
    print("-" * 60)

    # 1) Check glyphs
    glyphs_found = check_glyphs(lines)
    if glyphs_found:
        print(f"[OK] Found CaveCode glyphs: {' '.join(glyphs_found)}")
    else:
        print("[WARN] No standard CaveCode glyphs (🪨, 🖍️, 🔧, 🎮, 🌐) found. "
              "Is this actually a CaveCode file?")

    # 2) Check blocks
    blocks = find_blocks(lines)
    if blocks:
        print(f"[OK] Detected {len(blocks)} BLOCK header(s):")
        for ln, text in blocks[:20]:
            print(f"   line {ln}: {text}")
        if len(blocks) > 20:
            print(f"   ... and {len(blocks) - 20} more")
    else:
        print("[WARN] No BLOCK headers detected. Consider adding 'BLOCK N' sections.")

    # 3) Empty block check
    empty_warnings = check_empty_blocks(lines, blocks)
    for w in empty_warnings:
        print(w)

    # 4) Simple verdict
    if not glyphs_found or not blocks:
        print("\n[RESULT] CaveCode structure appears INCOMPLETE.")
        print("         You can still use the file, but consider adding:")
        print("         - at least one BLOCK, and")
        print("         - at least one glyph (🪨, 🖍️, 🔧, 🎮, 🌐).")
    else:
        print("\n[RESULT] CaveCode structure looks OK at a basic level.")
        print("         This does not guarantee the game logic is correct, "
              "but the stone tablet is readable.")

    print("-" * 60)
    print("Done.")


if __name__ == "__main__":
    main()

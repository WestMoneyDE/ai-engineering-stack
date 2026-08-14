#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
repo_dir="$(cd "$script_dir/.." && pwd -P)"
target="."
mode="dry-run"

usage() {
  printf 'Usage: %s [--target PATH] [--dry-run|--apply]\n' "$0"
}

while (($#)); do
  case "$1" in
    --target)
      [[ $# -ge 2 ]] || { usage >&2; exit 2; }
      target="$2"
      shift 2
      ;;
    --dry-run)
      mode="dry-run"
      shift
      ;;
    --apply)
      mode="apply"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf 'Unknown argument: %s\n' "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if command -v cygpath >/dev/null 2>&1 && [[ "$target" =~ ^[A-Za-z]:[\\/] ]]; then
  target="$(cygpath -u "$target")"
fi

sources=(
  "templates/AGENTS.md"
  "templates/.claude/settings.example.json"
  "templates/.claude/hooks/protect-sensitive.sh"
  "templates/skills-lock.example.json"
)
destinations=(
  "AGENTS.md"
  ".claude/settings.example.json"
  ".claude/hooks/protect-sensitive.sh"
  "skills-lock.example.json"
)

for destination in "${destinations[@]}"; do
  if [[ -e "$target/$destination" ]]; then
    printf 'Refusing to overwrite existing path: %s\n' "$target/$destination" >&2
    exit 3
  fi
done

if [[ "$mode" == "dry-run" ]]; then
  printf 'DRY RUN — no files will be written.\n'
  for destination in "${destinations[@]}"; do
    printf 'Would install: %s\n' "$target/$destination"
  done
  exit 0
fi

for index in "${!sources[@]}"; do
  source_path="$repo_dir/${sources[$index]}"
  destination_path="$target/${destinations[$index]}"
  mkdir -p "$(dirname "$destination_path")"
  cp "$source_path" "$destination_path"
  printf 'Installed: %s\n' "$destination_path"
done

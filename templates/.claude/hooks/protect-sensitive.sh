#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"

case "$path" in
  *.env|*.env.*|*/.ssh/*|*.pem|*.key)
    printf 'Blocked write to sensitive path: %s\n' "$path" >&2
    exit 2
    ;;
esac

exit 0

[CmdletBinding()]
param(
    [Parameter()]
    [string]$Target = ".",

    [Parameter()]
    [switch]$Apply
)

$ErrorActionPreference = "Stop"
$repositoryRoot = Split-Path -Parent $PSScriptRoot
$resolvedTarget = [System.IO.Path]::GetFullPath($Target)
$files = @(
    @{ Source = "templates/AGENTS.md"; Destination = "AGENTS.md" },
    @{ Source = "templates/.claude/settings.example.json"; Destination = ".claude/settings.example.json" },
    @{ Source = "templates/.claude/hooks/protect-sensitive.sh"; Destination = ".claude/hooks/protect-sensitive.sh" },
    @{ Source = "templates/skills-lock.example.json"; Destination = "skills-lock.example.json" }
)

foreach ($file in $files) {
    $destination = Join-Path $resolvedTarget $file.Destination
    if (Test-Path -LiteralPath $destination) {
        throw "Refusing to overwrite existing path: $destination"
    }
}

if (-not $Apply) {
    Write-Output "DRY RUN - no files will be written."
    foreach ($file in $files) {
        Write-Output "Would install: $(Join-Path $resolvedTarget $file.Destination)"
    }
    exit 0
}

foreach ($file in $files) {
    $source = Join-Path $repositoryRoot $file.Source
    $destination = Join-Path $resolvedTarget $file.Destination
    $parent = Split-Path -Parent $destination
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
    Copy-Item -LiteralPath $source -Destination $destination
    Write-Output "Installed: $destination"
}

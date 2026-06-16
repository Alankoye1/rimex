$ErrorActionPreference = "Stop"

$sourceDir = "g:\My Drive\ISE - Semesters Information\Semester 6\Information System Design\Theory\Lecture - M.Najat (2025-2026)"
$outputDir = Join-Path $PSScriptRoot "extracted"

$files = @(
    "Origins of SW.pdf",
    "SDLC Principles.pdf",
    "Managing  the Information Systems Project And PVF.pdf",
    "Logic Requirements.pdf",
    "the logical modeling of processes     data flow diagrams (DFDs). .pdf",
    "Entity-Relationship (E-R) Modeling -ERD.pdf"
)

if (-not (Test-Path -LiteralPath $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    foreach ($file in $files) {
        $pdfPath = Join-Path $sourceDir $file
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
        $safeName = ($baseName -replace '[^\w\-. ]', '_').Trim()
        $docxPath = Join-Path $outputDir ($safeName + ".docx")
        $txtPath = Join-Path $outputDir ($safeName + ".txt")

        Write-Host "Processing $file"

        $doc = $word.Documents.Open($pdfPath, $false, $true)
        try {
            $doc.SaveAs([ref]$docxPath, [ref]16)
            $text = $doc.Content.Text
            [System.IO.File]::WriteAllText($txtPath, $text, [System.Text.Encoding]::UTF8)
        }
        finally {
            $doc.Close([ref]0)
        }
    }
}
finally {
    $word.Quit()
}

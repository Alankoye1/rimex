const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const sourceDir =
  "g:\\My Drive\\ISE - Semesters Information\\Semester 6\\Information System Design\\Theory\\Lecture - M.Najat (2025-2026)";
const outputDir = path.join(__dirname, "extracted");

const files = [
  "Origins of SW.pdf",
  "SDLC Principles.pdf",
  "Managing  the Information Systems Project And PVF.pdf",
  "Logic Requirements.pdf",
  "the logical modeling of processes     data flow diagrams (DFDs). .pdf",
  "Entity-Relationship (E-R) Modeling -ERD.pdf",
];

fs.mkdirSync(outputDir, { recursive: true });

async function main() {
  for (const file of files) {
    const fullPath = path.join(sourceDir, file);
    const baseName = path.parse(file).name.replace(/[<>:"/\\|?*]+/g, "_");
    const buffer = fs.readFileSync(fullPath);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    const info = await parser.getInfo();
    await parser.destroy();

    const output = {
      file,
      pages: info.total,
      info: info.info || {},
      metadata: info.metadata || null,
      text: data.text || "",
    };

    fs.writeFileSync(
      path.join(outputDir, `${baseName}.json`),
      JSON.stringify(output, null, 2),
      "utf8"
    );
    fs.writeFileSync(
      path.join(outputDir, `${baseName}.txt`),
      output.text,
      "utf8"
    );

    console.log(`Extracted ${file} (${info.total} pages)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

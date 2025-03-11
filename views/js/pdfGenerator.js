import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

export default class GeneratePDF {
  pdfDoc;

  position = {
    x: 10,
    y: 20,
  };

  margin = {
    y: 20,
    x: 10,
  };

  constructor() {
    this.pdfDoc = new jsPDF();
  }

  downloadPdf() {
    this.pdfDoc.save("mydoc.pdf");
  }

  getPdfUrl() {
    return this.pdfDoc.output("bloburl");
  }

  addHeader(text, textX = "default", textY = "default") {
    this.pdfDoc.setFont("Helvetica", "bold");
    this.pdfDoc.setFontSize(24);

    if (textX == "default" && textY == "default") {
      this.pdfDoc.text(text, this.position.x, this.position.y);
      this.position.y += 11 / 1.75;
    } else {
      this.pdfDoc.text(text, textX, textY);
      this.position.x = textX;
      this.position.y = textY + 5.5;
    }
    this.pdfDoc.setFontSize(11);
  }

  addText(text, textX = "default", textY = "default") {
    this.pdfDoc.setFont("Helvetica", "normal");
    if (textX == "default" && textY == "default") {
      this.pdfDoc.text(text, this.position.x, this.position.y);
      this.position.y += 5.5;
    } else {
      this.pdfDoc.text(text, textX, textY);
      this.position.x = textX;
      this.position.y = textY + 5.5;
    }
  }

  addImg(imgURL, imgX, imgY, width, height) {
    this.pdfDoc.addImage(imgURL, String, imgX, imgY, width, height);
  }

  addRect(x, y, w, h) {
    this.pdfDoc.rect(x, y, w, h, "F");
  }

  setFillingColor(RRGGBB) {
    this.pdfDoc.setFillColor(RRGGBB);
  }

  setTextColor(RRGGBB) {
    this.pdfDoc.setTextColor(RRGGBB);
  }

  resetPdf() {
    for (let i = this.pageCounter; i > 0; i--) {
      this.pdfDoc.deletePage(i);
    }
    this.pageCounter = 1;
    this.pdfDoc.addPage();
  }

  newPage() {
    this.position = { ...this.margin };
    this.pdfDoc.addPage();
  }
}

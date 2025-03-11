import GeneratePDF from "./pdfGenerator.js";

let cart = [];
let number = Math.floor(Math.random() * 100);
//you dont see this

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const nameInput = document.getElementById("user-name");
const emailInput = document.getElementById("user-email");
const viewInvoiceBtn = document.getElementById("view-invoice");
const downloadInvoiceBtn = document.getElementById("download-invoice");
const pdfPreview = document.getElementById("pdf-preview");

function updateButtonState() {
  const isDisabled = cart.length === 0 || !nameInput.value || !emailInput.value;
  viewInvoiceBtn.disabled = isDisabled;
  downloadInvoiceBtn.disabled = isDisabled;
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    const name = event.target.dataset.name;
    const price = parseFloat(event.target.dataset.price);
    cart.push({ name, price });
    updateButtonState();
  });
});

nameInput.addEventListener("input", updateButtonState);
emailInput.addEventListener("input", updateButtonState);

function generateInvoice() {
  const pdf = new GeneratePDF();
  pdf.addHeader("Invoice");
  pdf.addText(`Customer Name: ${nameInput.value}`);
  pdf.addText(`Customer Email: ${emailInput.value}`);
  pdf.addText(`Invoice Number: ${number}`)
  pdf.addText("Items Purchased:");
  

  cart.forEach((item, index) => {
    pdf.addText(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  pdf.addText(`Total: $${total.toFixed(2)}`);
  return pdf;
}

viewInvoiceBtn.addEventListener("click", () => {
  const pdf = generateInvoice();
  const pdfUrl = pdf.getPdfUrl();
  pdfPreview.src = pdfUrl;
});

downloadInvoiceBtn.addEventListener("click", () => {
  const pdf = generateInvoice();
  pdf.downloadPdf();
});

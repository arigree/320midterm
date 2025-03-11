import GeneratePDF from "./pdfGenerator.js";

let cart = [];
const invoiceNumber = Math.floor(Math.random() * 90000000) + 10000000;
const taxRate = 0.07; 

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
    cart.push({ name, price, quantity: 1 });
    updateButtonState();
  });
});

nameInput.addEventListener("input", updateButtonState);
emailInput.addEventListener("input", updateButtonState);

function generateInvoice() {
  const pdf = new GeneratePDF();
  pdf.addHeader("Invoice");

  pdf.addText("Random Shop");
  pdf.addText("Contact: support@randomshop.com");

  pdf.addText(`Customer Name: ${nameInput.value}`);
  pdf.addText(`Customer Email: ${emailInput.value}`);
  
  const dateOfPurchase = new Date().toLocaleString();
  pdf.addText(`Invoice Number: ${invoiceNumber}`);
  pdf.addText(`Date: ${dateOfPurchase}`);
  
  pdf.addText("Items Purchased:");
  let totalBeforeTax = 0;

  cart.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    totalBeforeTax += lineTotal;
    pdf.addText(`${index + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${lineTotal.toFixed(2)}`);
  });
//theft section
  const tax = totalBeforeTax * taxRate;
  const grandTotal = totalBeforeTax + tax;

  pdf.addText(`Total Before Tax: $${totalBeforeTax.toFixed(2)}`);
  pdf.addText(`Tax (7%): $${tax.toFixed(2)}`);
  pdf.addText(`Total: $${grandTotal.toFixed(2)}`);

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

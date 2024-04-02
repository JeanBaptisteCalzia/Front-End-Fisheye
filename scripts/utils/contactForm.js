// Global DOM var
const body = document.querySelector("body");
const openModalBtn = document.querySelector(".contact_button");
const mainWrapper = document.getElementById("main");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalWrapper = document.getElementById("contact_modal");
const form = document.querySelector("form");

// Function
function displayModal() {
  modalWrapper.style.display = "block";
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.setAttribute("class", "no-scroll");
  modalCloseBtn.focus();
}

function closeModal() {
  modalWrapper.style.display = "none";
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.setAttribute("class", "");
  openModalBtn.focus();
}

// Close modal when escape key is pressed
modalCloseBtn.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 27) {
    closeModal();
  }
});

// Open modal when enter key is pressed
openModalBtn.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 13) {
    displayModal();
  }
});

// When we submit the form
function validate(event) {
  // We prevent the default behavior
  event.preventDefault();

  // We retrieve Firstname value
  const firstname = document.getElementById("firstname");
  const valueFirstname = firstname.value;

  // We retrieve Lastname value
  const lastname = document.getElementById("lastname");
  const valueLastname = lastname.value;

  // We retrieve Email value
  const email = document.getElementById("email");
  const valueEmail = email.value;

  // We retrieve Message value
  const message = document.getElementById("message");
  const valueMessage = message.value;

  // We display values
  console.log(valueFirstname);
  console.log(valueLastname);
  console.log(valueEmail);
  console.log(valueMessage);
}

form.onsubmit = validate;

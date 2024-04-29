// Global DOM var
const body = document.querySelector("body");
const openModalBtn = document.querySelector(".contact_button");
const mainWrapper = document.getElementById("main");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalWrapper = document.getElementById("contact_modal");
const form = document.querySelector("form");
const modalFirstInput = document.getElementById("firstname");

// Function
function displayModal() {
  modalWrapper.style.display = "block";
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.setAttribute("class", "no-scroll");
  modalFirstInput.focus();
  // Start listening for tabs by adding an event listener when the modal opens.
  document.addEventListener(`keydown`, initTrapFocus);
}

function closeModal() {
  modalWrapper.style.display = "none";
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.setAttribute("class", "");
  openModalBtn.focus();
  // Stop listening for tabs by removing the event listener when the modal closes.
  document.removeEventListener(`keydown`, initTrapFocus);
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

// Trapping Focus Inside the Modal
function trapFocus(e, modalId) {
  const isTabPressed = e.key === `Tab` || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }
  const focusableElements = `button, [href], input, textarea, [tabindex]:not([tabindex="-1"])`;
  const modal = document.getElementById(modalId);

  // get focusable elements in modal
  const firstFocusableElement =
    modalId === "trap-focus-modal"
      ? document.querySelector(".modal-close-btn")
      : modal.querySelectorAll(focusableElements)[0];
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else if (document.activeElement === lastFocusableElement) {
    firstFocusableElement.focus();
    e.preventDefault();
  }
}

function initTrapFocus(e) {
  return trapFocus(e, "trap-focus-modal");
}

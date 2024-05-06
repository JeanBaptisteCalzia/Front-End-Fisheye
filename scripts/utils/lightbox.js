import { photographMedias } from "../pages/photographer.js";

const lightboxCloseBtn = document.querySelector(".lightbox__close");
const lightboxNextBtn = document.querySelector(".lightbox__next");
const lightboxPrevBtn = document.querySelector(".lightbox__previous");

// Display lightbox function
function display(medias, currentIndex, photographName, mediaType) {
  const modal = document.querySelector(".lightbox");
  modal.style.display = "block";
  const figureElement = document.querySelector(".lightbox__figure");
  const lightboxH2Element = document.createElement("h2");
  const figcaption = document.createElement("figcaption");

  figureElement.innerHTML = "";

  const lightbox__close = document.querySelector(".lightbox__close");
  lightbox__close.focus();

  // Retrieve Photograph Media by photographer id
  medias = photographMedias;

  if (mediaType == "image" || mediaType == "video") {
    if (mediaType == "image") {
      const mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `../assets/photographers/${photographName}/${medias[currentIndex].image}`
      );
      mediaElement.setAttribute("alt", medias[currentIndex].title);
      figureElement.appendChild(mediaElement);
      figureElement.appendChild(figcaption);
      figcaption.appendChild(lightboxH2Element);
      lightboxH2Element.innerHTML = `${medias[currentIndex].title}`;
    }

    if (mediaType == "video") {
      const sourceElement = document.createElement("source");
      sourceElement.setAttribute(
        "src",
        `../assets/photographers/${photographName}/${medias[currentIndex].video}`
      );
      sourceElement.setAttribute("type", "video/mp4");
      const mediaElement = document.createElement("video");
      mediaElement.appendChild(sourceElement);
      mediaElement.setAttribute("controls", "controls");
      figureElement.appendChild(mediaElement);
      figureElement.appendChild(figcaption);
      figcaption.appendChild(lightboxH2Element);
      lightboxH2Element.innerHTML = `${medias[currentIndex].title}`;
    }
  }

  function nextMedia() {
    currentIndex++;
    if (currentIndex > medias.length - 1) {
      currentIndex = 0;
    }
    lightboxTemplate();
  }

  function prevMedia() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = medias.length - 1;
    }
    lightboxTemplate();
  }

  function lightboxTemplate() {
    const currentMediaLightbox = medias[currentIndex];
    figureElement.innerHTML = `
        ${
          currentMediaLightbox.image
            ? `<img src="../assets/photographers/${photographName}/${currentMediaLightbox.image}" alt="${currentMediaLightbox.alt}">`
            : `<video controls aria-label="${currentMediaLightbox.title}"><source src="../assets/photographers/${photographName}/${currentMediaLightbox.video}" type="video/mp4"></video>`
        }
        <figcaption><h2>${currentMediaLightbox.title}</h2></figcaption>
    `;
  }

  // Display next media on click event
  lightboxNextBtn.addEventListener("click", () => {
    nextMedia();
  });

  // Display prev media on click event
  lightboxPrevBtn.addEventListener("click", () => {
    prevMedia();
  });

  // Close lightbox on click event
  lightboxCloseBtn.addEventListener("click", () => {
    closeLightbox();
  });

  // Keyboard navigation (left/right arrow keys)
  document.addEventListener("keydown", function (e) {
    if (document.querySelector(".lightbox").style.display === "block") {
      const video = document.getElementsByTagName("video");

      if (e.key === "ArrowLeft") {
        prevMedia();
      } else if (e.key === "ArrowRight") {
        nextMedia();
      } else if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "Space") {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  });

  // Close Button Function
  function closeLightbox() {
    const imageContainer = document.querySelector(".lightbox");
    imageContainer.style.display = "none";
    // Stop listening for tabs by removing the event listener when the modal closes.
    document.removeEventListener("keydown", initTrapFocus);
  }

  function initTrapFocus(e) {
    return trapFocus(e, "trap-focus-light-box");
  }

  // Start listening for tabs by adding an event listener when the modal opens.
  document.addEventListener("keydown", initTrapFocus);
}

// Display lightbox on click event
document.addEventListener("mediaClick", (event) =>
  display(
    event.detail.medias,
    event.detail.currentIndex,
    event.detail.photographName,
    event.detail.mediaType
  )
);

// Trapping Focus Inside the Modal
function trapFocus(e, modalId) {
  const isTabPressed = e.key === "Tab" || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }
  const focusableElements =
    "button, [href], input, textarea, figure > video, [tabindex]:not([tabindex='-1'])";
  const modal = document.getElementById(modalId);

  // get focusable elements in modal
  const firstFocusableElement =
    modalId === "trap-focus-light-box"
      ? document.querySelector(".lightbox__close")
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

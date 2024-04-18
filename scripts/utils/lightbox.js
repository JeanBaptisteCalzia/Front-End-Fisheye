const lightboxCloseBtn = document.querySelector(".lightbox__close");
const lightboxNextBtn = document.querySelector(".lightbox__next");
const lightboxPrevBtn = document.querySelector(".lightbox__previous");

function display(medias, currentIndex, photographName) {
  const modal = document.querySelector(".lightbox");
  modal.style.display = "block";
  const figureElement = document.querySelector(".lightbox__figure");
  const lightboxH2Element = document.createElement("h2");
  const figcaption = document.createElement("figcaption");

  figureElement.innerHTML = "";

  const mediasList = medias;

  if (medias[currentIndex].image || medias[currentIndex].video) {
    if (medias[currentIndex].image) {
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

    if (medias[currentIndex].video) {
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
    if (currentIndex > mediasList.length - 1) {
      currentIndex = 0;
    }
    lightboxTemplate();
  }

  function prevMedia() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = mediasList.length - 1;
    }
    lightboxTemplate();
  }

  function lightboxTemplate() {
    const currentMediaLightbox = mediasList[currentIndex];
    figureElement.innerHTML = `
        ${
          currentMediaLightbox.image
            ? `<img src="../assets/photographers/${photographName}/${currentMediaLightbox.image}" alt="${currentMediaLightbox.alt}">`
            : `<video controls aria-label="${currentMediaLightbox.alt}"><source src="../assets/photographers/${photographName}/${currentMediaLightbox.video}" type="video/mp4"></video>`
        }
        <figcaption><h2>${currentMediaLightbox.title}</h2></figcaption>
    `;
  }

  lightboxNextBtn.addEventListener("click", () => {
    nextMedia();
  });

  lightboxPrevBtn.addEventListener("click", () => {
    prevMedia();
  });

  lightboxCloseBtn.addEventListener("click", (event) => {
    closeLightbox();
  });

  // Keyboard navigation (left/right arrow keys)
  document.addEventListener("keydown", function (e) {
    if (document.querySelector(".lightbox").style.display === "block") {
      if (e.key === "ArrowLeft") {
        prevMedia();
      } else if (e.key === "ArrowRight") {
        nextMedia();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });

  // Click Close Button Function
  function closeLightbox() {
    const imageContainer = document.querySelector(".lightbox");
    imageContainer.style.display = "none";
  }
}

document.addEventListener("mediaClick", (event) =>
  display(
    event.detail.medias,
    event.detail.currentIndex,
    event.detail.photographName
  )
);

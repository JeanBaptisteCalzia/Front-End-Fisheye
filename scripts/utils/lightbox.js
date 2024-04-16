const lightboxCloseBtn = document.querySelector(".lightbox__close");
const lightboxNextBtn = document.querySelector(".lightbox__next");
const lightboxPrevBtn = document.querySelector(".lightbox__previous");

function display(medias, currentIndex, photographName) {
  const modal = document.querySelector(".lightbox");
  modal.style.display = "block";
  const figureElement = document.querySelector(".lightbox__figure");
  const lightboxH2Element = document.createElement("h2");
  const figcaption = document.querySelector(".lightbox figcaption");

  figureElement.innerHTML = "";
  figcaption.innerHTML = "";

  if (medias[currentIndex].image || medias[currentIndex].video) {
    if (medias[currentIndex].image) {
      const mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `../assets/photographers/${photographName}/${medias[currentIndex].image}`
      );
      mediaElement.setAttribute("alt", medias[currentIndex].title);
      figureElement.appendChild(mediaElement);

      const lightboxFigcaptionElement = document.querySelector(
        ".lightbox figcaption"
      );
      lightboxFigcaptionElement.appendChild(lightboxH2Element);
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
      figureElement.appendChild(mediaElement);

      const figcaptionElement = document.querySelector(".lightbox figcaption");
      figcaptionElement.appendChild(lightboxH2Element);
      lightboxH2Element.innerHTML = `${medias[currentIndex].title}`;
    }
  }

  const galleryWrapper = document.querySelector(".gallery");
  const images = [...galleryWrapper.querySelectorAll(".gallery img")];
  let index = 0;
  const mediasList = medias;
  let showImg = document.querySelector(".lightbox figure img");
  let showCaption = document.querySelector(".lightbox figcaption h2");

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
      } else if (e.key === "Enter") {
        closeLightbox();
      }
    }
  });

  // Click Next Button Function
  function nextMedia() {
    index++;

    if (index > mediasList.length - 1) {
      index = 0;
      showImg.src = images[index].src;
      showCaption.innerHTML = medias[index].title;
    }
    showImg.src = images[index].src;
    showCaption.innerHTML = medias[index].title;
    console.log(index);
    console.log(medias[index].title);
  }

  // Click Prev Button Function
  function prevMedia() {
    index--;
    if (index < 0) {
      index = mediasList.length - 1;
      showImg.src = images[index].src;
      showCaption.innerHTML = medias[index].title;
    }
    showImg.src = images[index].src;
    showCaption.innerHTML = medias[index].title;
  }

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

import { getPhotographers, getMedia } from "../api/api.js";
import { photographerTemplate } from "../templates/photographer.js";

// We Retrieve Photographer ID
const photographerId = new URLSearchParams(window.location.search).get("id");
const photographers = await getPhotographers();
const medias = await getMedia();

// Display Photographer info inside header of photographer page
function displayPhotograph(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const userCardUserDOM = photographerModel.getUserPhotographDOM();
  photographersSection.contains(userCardUserDOM);
}

// Retrieve data from one Photographer
function getOnePhotographer(id) {
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id === parseInt(id)) {
      return photographers[i];
    }
  }
}

// Retrieve Name from one Photographer
function getOnePhotographName(photographerId) {
  return photographers.filter(
    (photographer) => photographer.photographerId === photographerId
  );
}

// Display name of one Photographer inside modal
function displayPhotographName(photographeName) {
  const FormPhotographName = document.querySelector(".modal-title");
  FormPhotographName.textContent = getOnePhotographName(photograph);
  FormPhotographName.innerHTML = `Contactez-moi <br> ${photographeName.name}`;
}

// Retrieve Media from one Photographer
function getPhotographMedias(photographerId) {
  return medias.filter((media) => media.photographerId === photographerId);
}

// Display Medias of one Photographer
function displayMediaData(photograph, media) {
  const content = document.querySelector(".gallery");
  const photographName = photograph.name.split(" ")[0].toLowerCase();

  for (let i = 0; i < media.length; i++) {
    const article = document.createElement("article");

    article.className = "gallery__card";

    const figureElement = document.createElement("figure");
    // const buttonElement = document.createElement("div");

    if (media[i].image || media[i].video) {
      if (media[i].image) {
        let mediaElement = document.createElement("img");
        mediaElement.setAttribute(
          "src",
          `../assets/photographers/${photographName}/${media[i].image}`
        );
        mediaElement.setAttribute("alt", media[i].title);
        mediaElement.className = "gallery__thumbnail";
        figureElement.appendChild(mediaElement);
      }

      if (media[i].video) {
        const sourceElement = document.createElement("source");
        sourceElement.setAttribute(
          "src",
          `../assets/photographers/${photographName}/${media[i].video}`
        );
        sourceElement.setAttribute("type", "video/mp4");
        let mediaElement = document.createElement("video");
        mediaElement.className = "gallery__thumbnail";
        mediaElement.appendChild(sourceElement);
        figureElement.appendChild(mediaElement);
      }
    }

    figureElement.addEventListener("click", () =>
      document.dispatchEvent(
        new CustomEvent("mediaClick", {
          detail: {
            medias: media,
            currentIndex: i,
            photographName: photographName,
          },
        })
      )
    );

    figureElement.contains(figureElement);
    article.appendChild(figureElement);
    content.appendChild(article);
  }
}

const photograph = getOnePhotographer(photographerId);
const photographMedias = getPhotographMedias(photograph.id);

displayPhotograph(photograph);
document.querySelector(".gallery").innerHTML = "";
displayMediaData(photograph, photographMedias);
displayPhotographName(photograph);

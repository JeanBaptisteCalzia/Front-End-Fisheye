import { photographerTemplate } from "../templates/photographer.js";
// import { getPhotographers } from "../pages/index.js";

// We Retrieve Photographer ID
const photographerId = new URLSearchParams(window.location.search).get("id");
const photographers = await getPhotographers();
const medias = await getMedia();

async function getMedia() {
  // We retrieve data from JSON file
  const reponse = await fetch("data/photographers.json");
  const media = await reponse.json();
  // We retrieve media data form JSON file
  const mediaContent = media["media"];
  return mediaContent;
}

async function getPhotographers() {
  // We retrieve data from JSON file
  const reponse = await fetch("data/photographers.json");
  const photographers = await reponse.json();
  // We retrieve Photographers data form JSON file
  const photograph = photographers["photographers"];
  return photograph;
}

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
    const figcaptionElement = document.createElement("figcaption");
    const h2Element = document.createElement("h2");
    const h2TextContent = document.createTextNode(media[i].title);
    const divElement = document.createElement("div");
    divElement.setAttribute("role", "group");
    divElement.setAttribute("aria-label", "Number of likes");
    const spanElement = document.createElement("span");
    const spanTextContent = document.createTextNode(media[i].likes);

    const btnElement = document.createElement("button");
    btnElement.setAttribute("type", "button");
    const btnSpanElement = document.createElement("span");
    btnSpanElement.setAttribute("aria-label", "likes");
    btnSpanElement.setAttribute("aria-hidden", "true");
    btnSpanElement.className = "fas fa-heart";

    if (media[i].image || media[i].video) {
      if (media[i].image) {
        const mediaElement = document.createElement("img");
        mediaElement.setAttribute(
          "src",
          `../assets/photographers/${photographName}/${media[i].image}`
        );
        mediaElement.setAttribute("alt", media[i].title);
        mediaElement.className = "gallery__thumbnail";
        figureElement.appendChild(mediaElement);
        figureElement.appendChild(figcaptionElement);
        figcaptionElement.appendChild(h2Element);
        h2Element.appendChild(h2TextContent);
        figcaptionElement.appendChild(divElement);
        spanElement.appendChild(spanTextContent);
        divElement.appendChild(spanElement);
        divElement.appendChild(btnElement);
        btnElement.appendChild(btnSpanElement);
      }

      if (media[i].video) {
        const sourceElement = document.createElement("source");
        sourceElement.setAttribute(
          "src",
          `../assets/photographers/${photographName}/${media[i].video}`
        );
        sourceElement.setAttribute("type", "video/mp4");
        const mediaElement = document.createElement("video");
        mediaElement.className = "gallery__thumbnail";
        mediaElement.appendChild(sourceElement);
        figureElement.appendChild(mediaElement);
        figureElement.appendChild(figcaptionElement);
        figcaptionElement.appendChild(h2Element);
        h2Element.appendChild(h2TextContent);
        figcaptionElement.appendChild(divElement);
        spanElement.appendChild(spanTextContent);
        divElement.appendChild(spanElement);
        divElement.appendChild(btnElement);
        btnElement.appendChild(btnSpanElement);
      }
    }

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

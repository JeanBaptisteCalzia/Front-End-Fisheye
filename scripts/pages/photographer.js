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

    if (media[i].image) {
      article.className = "gallery__card";
      article.innerHTML = `
            <figure>
              <a href="../assets/photographers/${photographName}/${media[i].image}" role="link">
                <img
                  class="gallery__thumbnail"
                  src="../assets/photographers/${photographName}/${media[i].image}"
                  alt="${media[i].title}"
                />
              </a>
              <figcaption>
                <h2>${media[i].title}</h2>
                <div role="group" aria-label="Number of likes">
                  <span>${media[i].likes}</span>
                  <button type="button">
                    <span
                      class="fas fa-heart"
                      aria-label="”likes”"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
              </figcaption>
            </figure>
        `;
    } else if (media[i].video) {
      article.className = "gallery__card";
      article.innerHTML = `
            <figure>
              <a href="../assets/photographers/${photographName}/${media[i].video}" role="link">
                <video controls preload="metadata">class="gallery_thumbnail" aria-label="${media[i].title}">
                  <source src="../assets/photographers/${photographName}/${media[i].video}" type="video/mp4">
                </video>
              </a>
              <figcaption>
                <h2>${media[i].title}</h2>
                <div role="group" aria-label="Number of likes">
                  <span>${media[i].likes}</span>
                  <button type="button">
                    <span
                      class="fas fa-heart"
                      aria-label="”likes”"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
              </figcaption>
            </figure>
        `;
    }

    content.appendChild(article);
  }
}

const photograph = getOnePhotographer(photographerId);
const photographMedias = getPhotographMedias(photograph.id);

displayPhotograph(photograph);
document.querySelector(".gallery").innerHTML = "";
displayMediaData(photograph, photographMedias);
displayPhotographName(photograph);

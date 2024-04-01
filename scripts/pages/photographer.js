import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographers } from "../pages/index.js";
import { MediasFactory } from "../factories/MediasFactory.js";

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

function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const userCardHeaderDOM = photographerModel.getUserPhotographDOM();
  photographersSection.appendChild(userCardHeaderDOM);
}

// const image = MediasFactory.createMedia(displayMediaData(medias));
// const video = MediasFactory.createMedia("video");

// console.log(image);
// console.log(video);

function displayMediaData(data) {
  for (let i = 0; i < data.length; i++) {
    const content = document.querySelector(".gallery");
    const article = document.createElement("article");
    article.className = "gallery__card";
    article.innerHTML = `
          <figure>
            <a href="#" role="link">
              <img
                class="gallery__thumbnail"
                src="../assets/photographers/mimi/${data[i].image}"
                alt="${data[i].title}"
              />
            </a>
            <figcaption>
              <h2>${data[i].title}</h2>
              <div role="group" aria-label="Number of likes">
                <span>${data[i].likes}</span>
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

    content.appendChild(article);
  }
}

const mediafilter = medias.filter(function (media) {
  const id = photographerId;

  switch (id) {
    case "243":
      displayData(photographers[0]);
      return media.photographerId === 243;
      break;
    case "930":
      displayData(photographers[1]);
      return media.photographerId === 930;
      break;
    case "82":
      displayData(photographers[2]);
      return media.photographerId === 82;
      break;
    case "527":
      displayData(photographers[3]);
      return media.photographerId === 527;
      break;
    case "925":
      displayData(photographers[4]);
      return media.photographerId === 925;
      break;
    case "195":
      displayData(photographers[5]);
      return media.photographerId === 195;
      break;
    default:
      console.log(`Sorry, there is no content for ${id}.`);
  }
});

console.log(mediafilter);
document.querySelector(".gallery").innerHTML = "";
displayMediaData(mediafilter);

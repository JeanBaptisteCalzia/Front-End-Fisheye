import { getPhotographers, getMedia } from "../api/api.js";
import { photographerTemplate } from "../templates/photographer.js";

// Retrieve URL data and display index page if photographer page has no id
window.addEventListener(
  "load",
  () => {
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
      let galId = searchParams.get("id");
      console.log(galId);
    } else {
      window.location.pathname = "index.html";
    }
  },
  false
);

// Retrieve Photographer ID
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
export function getOnePhotographer(id) {
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
export function getPhotographMedias(photographerId) {
  return medias.filter((media) => media.photographerId === photographerId);
}

// Display Medias of one Photographer
export function displayMediaData(photograph, media) {
  const content = document.querySelector(".gallery");
  const photographName = photograph.name.split(" ")[0].toLowerCase();

  for (let i = 0; i < media.length; i++) {
    const article = document.createElement("article");

    article.className = "gallery__card";

    const figureElement = document.createElement("figure");
    const innerWrapperFigureElement = document.createElement("div");

    if (media[i].image || media[i].video) {
      if (media[i].image) {
        const mediaElement = document.createElement("img");
        mediaElement.setAttribute(
          "src",
          `../assets/photographers/${photographName}/${media[i].image}`
        );
        mediaElement.setAttribute("alt", media[i].title);
        mediaElement.className = "gallery__thumbnail";
        innerWrapperFigureElement.appendChild(mediaElement);
        figureElement.appendChild(innerWrapperFigureElement);
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
        innerWrapperFigureElement.appendChild(mediaElement);
        figureElement.appendChild(innerWrapperFigureElement);
      }

      const figcaptionElement = document.createElement("figcaption");
      const h2Element = document.createElement("h2");
      h2Element.innerHTML = `${media[i].title}`;
      figureElement.appendChild(figcaptionElement);
      figcaptionElement.appendChild(h2Element);

      const divNumberLikes = document.createElement("div");
      divNumberLikes.setAttribute("aria-label", "Number of likes");
      divNumberLikes.setAttribute("role", "group");

      const spanNumberLikes = document.createElement("span");
      spanNumberLikes.innerHTML = `${media[i].likes}`;

      const btnLikes = document.createElement("button");
      btnLikes.classList.add("fas", "fa-heart");
      btnLikes.setAttribute("aria-label", "likes");
      btnLikes.setAttribute("aria-hidden", "true");

      figcaptionElement.appendChild(divNumberLikes);
      divNumberLikes.appendChild(spanNumberLikes);
      divNumberLikes.appendChild(btnLikes);
    }

    innerWrapperFigureElement.addEventListener("click", () =>
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

// Display numbers of likes
const btnLike = document.querySelectorAll("figcaption button");
const likesCount = document.querySelector(".photographer-likes__count");

function totalLikes() {
  const initialValue = 0;
  const totalLikes = photographMedias.reduce(
    (accumulator, media) => accumulator + media.likes,
    initialValue
  );
  likesCount.textContent = `${totalLikes}`;
}

totalLikes();

// Allow users to add likes or unlikes
btnLike.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnLikes = btn.previousSibling.textContent;

    const mediaLikes = photographMedias.find(
      (media) => media.likes === parseInt(btnLikes)
    );

    if (!btn.classList.contains("liked")) {
      mediaLikes.likes++;
    } else {
      mediaLikes.likes--;
    }
    btn.classList.toggle("liked");
    const spanLikes = btn.previousSibling;
    spanLikes.textContent = `${mediaLikes.likes}`;

    totalLikes();
  });
});

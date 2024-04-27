import { getPhotographers, getMedia } from "../api/api.js";
import { createMedia } from "../factories/MediasFactory.js";
import { photographerTemplate } from "../templates/photographer.js";

// Retrieve URL data and display index page if photographer page has no id
let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has("id")) {
  let galId = searchParams.get("id");
  console.log(galId);
} else {
  window.location.pathname = "index.html";
}

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
export function displayPhotographName(photographeName) {
  const FormPhotographName = document.querySelector(".modal-title");
  FormPhotographName.textContent = getOnePhotographName(photograph);
  FormPhotographName.innerHTML = `Contactez-moi <br> ${photographeName.name}`;
}

// Retrieve Media from one Photographer
export function getPhotographMedias(photographerId) {
  return medias.filter((media) => media.photographerId === photographerId);
}

// Display Medias
export function displayMediaData(medias) {
  const content = document.querySelector(".gallery");
  const photographName = photograph.name.split(" ")[0].toLowerCase();

  for (let i = 0; i < medias.length; i++) {
    const media = createMedia(
      medias[i].id,
      medias[i].date,
      medias[i].likes,
      medias[i].photographerId,
      photographName,
      medias[i].price,
      medias[i].title,
      "image" in medias[i] ? medias[i].image : medias[i].video,
      "image" in medias[i] ? "image" : "video",
      i
    );
    content.appendChild(media.generateArticle());
  }

  // Allow users to add likes or unlikes
  const btnLike = document.querySelectorAll("figcaption button");
  btnLike.forEach((btn) => {
    btn.addEventListener("click", () => {
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
      let spanLikes = btn.previousSibling;
      spanLikes.textContent = `${mediaLikes.likes}`;

      totalLikes();
    });

    totalLikes();
  });
}

const photograph = getOnePhotographer(photographerId);
const photographMedias = getPhotographMedias(photograph.id);

displayPhotograph(photograph);
document.querySelector(".gallery").innerHTML = "";
displayMediaData(photographMedias);
displayPhotographName(photograph);

// Display numbers of likes
function totalLikes() {
  const likesCount = document.querySelector(".photographer-likes__count");
  const initialValue = 0;
  const totalLikes = photographMedias.reduce(
    (accumulator, media) => accumulator + media.likes,
    initialValue
  );
  likesCount.textContent = `${totalLikes}`;
}

totalLikes();

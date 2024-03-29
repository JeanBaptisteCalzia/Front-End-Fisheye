import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographers } from "../pages/index.js";

// We Retrieve Photographer ID
const photographerId = new URLSearchParams(window.location.search).get("id");
const photographers = await getPhotographers();

function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserHeaderDOM();
  photographersSection.appendChild(userCardDOM);
}

const expr = photographerId;
switch (expr) {
  case "243":
    displayData(photographers[0]);
    break;
  case "930":
    displayData(photographers[1]);
    break;
  case "82":
    displayData(photographers[2]);
    break;
  case "527":
    displayData(photographers[3]);
    break;
  case "925":
    displayData(photographers[4]);
    break;
  case "195":
    displayData(photographers[5]);
    break;
  default:
    console.log(`Sorry, there is no content for ${expr}.`);
}

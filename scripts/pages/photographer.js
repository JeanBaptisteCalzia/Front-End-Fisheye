//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographers } from "../pages/index.js";

// Retrieve Photographer ID
const photographerId = new URLSearchParams(window.location.search).get("id");
console.log(photographerId);

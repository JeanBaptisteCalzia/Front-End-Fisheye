import {
  getOnePhotographer,
  getPhotographMedias,
  displayMediaData,
} from "../pages/photographer.js";

const photographerId = new URLSearchParams(window.location.search).get("id");
const photograph = getOnePhotographer(photographerId);
const photographMedias = getPhotographMedias(photograph.id);

const dropdown = document.querySelector(".dropdown");
const btnDropdown = document.querySelector(".dropdown > button");
const spanDropdown = document.querySelector(".dropdown > button > span");
const iconDropdown = document.querySelector(".dropdown .fa-chevron-down");
const btnSortLikesDropdown = document.getElementById("listbox1-1");
const btnSortDateDropdown = document.getElementById("listbox1-2");
const btnSortTitleDropdown = document.getElementById("listbox1-3");
const gallery = document.querySelector(".gallery");

btnDropdown.addEventListener("click", () => {
  toggleDropdown();
});

btnSortLikesDropdown.addEventListener("click", () => {
  spanDropdown.textContent = "Popularité";
  toggleDropdown();
});

btnSortDateDropdown.addEventListener("click", () => {
  spanDropdown.textContent = "Date";
  toggleDropdown();
});

btnSortTitleDropdown.addEventListener("click", () => {
  spanDropdown.textContent = "Titre";
  toggleDropdown();
});

// Click Open Dropdown filter gallery
function toggleDropdown() {
  dropdown.classList.toggle("open");

  if (dropdown.classList.contains("open")) {
    iconDropdown.setAttribute("style", "transform:rotate(180deg);");
  } else {
    iconDropdown.setAttribute("style", "transform:rotate(0deg);");
  }
}

// sort by name (Title)
btnSortTitleDropdown.addEventListener("click", () => {
  const sortMedias = Array.from(photographMedias);

  sortMedias.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  gallery.innerHTML = "";
  displayMediaData(photograph, sortMedias);
});

// sort by value (Dates ascending)
btnSortDateDropdown.addEventListener("click", () => {
  const sortMedias = Array.from(photographMedias);

  sortMedias.sort((a, b) => {
    return new Date(b.date) - new Date(a.date); // ascending
  });

  gallery.innerHTML = "";
  displayMediaData(photograph, sortMedias);
});

// sort by value (Numbers of Likes Popularity)
btnSortLikesDropdown.addEventListener("click", () => {
  const sortMedias = Array.from(photographMedias);
  sortMedias.sort((a, b) => b.likes - a.likes);
  gallery.innerHTML = "";
  displayMediaData(photograph, sortMedias);
});

// Sort by value by default (Numbers of Likes Popularity)
const sortMedias = Array.from(photographMedias);
sortMedias.sort((a, b) => b.likes - a.likes);
gallery.innerHTML = "";
displayMediaData(photograph, sortMedias);

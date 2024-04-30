import { displayMediaData, photographMedias } from "../pages/photographer.js";

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
  sortByTitle();
});

export function sortByTitle() {
  photographMedias.sort((a, b) => {
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
  displayMediaData(photographMedias);
}

// sort by value (Dates ascending)
btnSortDateDropdown.addEventListener("click", () => {
  sortByDates();
});

export function sortByDates() {
  photographMedias.sort((a, b) => {
    return new Date(b.date) - new Date(a.date); // ascending
  });

  gallery.innerHTML = "";
  displayMediaData(photographMedias);
}

// sort by value (Numbers of Likes Popularity)
btnSortLikesDropdown.addEventListener("click", () => {
  sortByPopularity();
});

export function sortByPopularity() {
  photographMedias.sort((a, b) => b.likes - a.likes);
  gallery.innerHTML = "";
  displayMediaData(photographMedias);
}

sortByPopularity();

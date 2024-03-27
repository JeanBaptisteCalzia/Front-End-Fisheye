async function getPhotographers() {
  // We retrieve data from JSON file
  const reponse = await fetch("data/photographers.json");
  const photographers = await reponse.json();
  // We retrieve Photographers data form JSON file
  const photograph = photographers["photographers"];
  return photograph;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  //  We retrieve Photographers data
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();

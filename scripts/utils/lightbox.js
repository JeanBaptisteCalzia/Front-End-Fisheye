function display(medias, currentIndex, photographName) {
  const modal = document.getElementById("lightbox");
  modal.style.display = "block";
  const figureElement = document.getElementById("lightbox__figure");
  const media = medias[currentIndex];

  if (medias[currentIndex].image || medias[currentIndex].video) {
    if (medias[currentIndex].image) {
      let mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `../assets/photographers/${photographName}/${medias[currentIndex].image}`
      );
      mediaElement.setAttribute("alt", medias[currentIndex].title);
      figureElement.appendChild(mediaElement);
    }

    if (medias[currentIndex].video) {
      const sourceElement = document.createElement("source");
      sourceElement.setAttribute(
        "src",
        `../assets/photographers/${photographName}/${medias[currentIndex].video}`
      );
      sourceElement.setAttribute("type", "video/mp4");
      let mediaElement = document.createElement("video");
      mediaElement.appendChild(sourceElement);
      figureElement.appendChild(mediaElement);
    }
  }
}

document.addEventListener("mediaClick", (event) =>
  display(
    event.detail.medias,
    event.detail.currentIndex,
    event.detail.photographName
  )
);

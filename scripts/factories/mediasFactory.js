function generateArticle() {
  const article = document.createElement("article");
  article.className = "gallery__card";

  const figureElement = document.createElement("figure");
  const innerWrapperFigureElement = document.createElement("a");

  if (this.mediaType != "image" || this.mediaType != "video") {
    if (this.mediaType == "image") {
      const mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `../assets/photographers/${this.photographName}/${this.media}`
      );
      mediaElement.setAttribute("alt", this.title);
      mediaElement.className = "gallery__thumbnail";
      innerWrapperFigureElement.title = this.title;
      innerWrapperFigureElement.href = `../assets/photographers/${this.photographName}/${this.media}`;
      innerWrapperFigureElement.appendChild(mediaElement);
      figureElement.appendChild(innerWrapperFigureElement);
    }

    if (this.mediaType == "video") {
      const sourceElement = document.createElement("source");
      sourceElement.setAttribute(
        "src",
        `../assets/photographers/${this.photographName}/${this.media}`
      );
      sourceElement.setAttribute("type", "video/mp4");
      const mediaElement = document.createElement("video");
      mediaElement.className = "gallery__thumbnail";
      mediaElement.appendChild(sourceElement);
      innerWrapperFigureElement.appendChild(mediaElement);
      innerWrapperFigureElement.classList.add("gallery__card--video");
      innerWrapperFigureElement.title = this.title;
      innerWrapperFigureElement.href = `../assets/photographers/${this.photographName}/${this.media}`;
      figureElement.appendChild(innerWrapperFigureElement);
    }

    const figcaptionElement = document.createElement("figcaption");
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = `${this.title}`;
    figureElement.appendChild(figcaptionElement);
    figcaptionElement.appendChild(h2Element);

    const divNumberLikes = document.createElement("div");
    divNumberLikes.setAttribute("aria-label", "Number of likes");
    divNumberLikes.setAttribute("role", "group");

    const spanNumberLikes = document.createElement("span");
    spanNumberLikes.innerHTML = `${this.likes}`;

    const btnLikes = document.createElement("button");
    btnLikes.classList.add("fas", "fa-heart");
    btnLikes.setAttribute("aria-label", "likes");
    btnLikes.setAttribute("aria-hidden", "true");

    figcaptionElement.appendChild(divNumberLikes);
    divNumberLikes.appendChild(spanNumberLikes);
    divNumberLikes.appendChild(btnLikes);
  }

  innerWrapperFigureElement.addEventListener("click", (e) => {
    e.preventDefault();
  });

  innerWrapperFigureElement.addEventListener("click", () =>
    document.dispatchEvent(
      new CustomEvent("mediaClick", {
        detail: {
          medias: this.media,
          currentIndex: this.i,
          photographName: this.photographName,
          mediaType: this.mediaType,
        },
      })
    )
  );

  figureElement.contains(figureElement);
  article.appendChild(figureElement);
  return article;
}

export const createMedia = (
  id,
  date,
  likes,
  photographerId,
  photographName,
  price,
  title,
  media,
  mediaType,
  i
) => ({
  id: id,
  date: date,
  likes: likes,
  photographerId: photographerId,
  photographName: photographName,
  price: price,
  title: title,
  media: media,
  mediaType: mediaType,
  i: i,
  generateArticle: generateArticle,
});

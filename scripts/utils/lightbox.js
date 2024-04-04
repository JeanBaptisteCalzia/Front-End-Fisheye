class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(
        ".gallery a[href$='jpg'], .gallery a[href$='mp4'"
      )
    );

    const images = links.map((link) => link.getAttribute("href"));

    links.forEach((link) =>
      link.addEventListener("click", (event) => {
        event.preventDefault();
        new Lightbox(event.currentTarget.getAttribute("href"), images);
      })
    );
  }

  constructor(url, images) {
    const lightbox = this.buildLightbox(url);
    this.images = images;
    this.lightbox = lightbox;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(lightbox);
    document.addEventListener("keyup", this.onKeyUp);
  }

  onKeyUp(event) {
    if (event.key === "Escape") {
      this.close(event);
    } else if (event.key === "ArrowLeft") {
      this.prev(event);
    } else if (event.key === "ArrowRight") {
      this.next(event);
    }
  }

  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.lightbox.querySelector(".lightbox__container");
    image.onload = () => {
      container.innerHTML = "";
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  close(event) {
    event.preventDefault();
    this.lightbox.classList.add("fadeOut");
    window.setTimeout(() => {
      this.lightbox.parentElement.removeChild(this.lightbox);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(event) {
    event.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  prev(event) {
    event.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  buildLightbox(url) {
    const lightboxContainer = document.createElement("div");
    lightboxContainer.classList.add("lightbox");
    lightboxContainer.setAttribute("role", "dialog");
    lightboxContainer.setAttribute("aria-hidden", "false");
    lightboxContainer.setAttribute("aria-label", "image closeup view");
    lightboxContainer.innerHTML = `
      <button class="lightbox__close" aria-label="Close dialog"><span class="sr-only">Fermer<span></button>
      <button class="lightbox__next" aria-label="Next image"><span class="sr-only">Suivant<span></button>
      <button class="lightbox__previous" aria-label="Previous image">
      <span class="sr-only">Précédent<span>
      </button>
      <figure class="lightbox__container" aria-label="Current image">
        <img src="${url}" alt="" />
      </figure>
      `;

    lightboxContainer
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));

    lightboxContainer
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));

    lightboxContainer
      .querySelector(".lightbox__previous")
      .addEventListener("click", this.prev.bind(this));

    return lightboxContainer;
  }
}

Lightbox.init();

export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;

  // Home page
  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.href = `http://127.0.0.1:5500/photographer.html?id=${id}`;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = name;

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const pCityCountry = document.createElement("p");
    pCityCountry.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;

    const spanPrice = document.createElement("span");
    spanPrice.textContent = `${price}€/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(pCityCountry);
    article.appendChild(pTagline);
    article.appendChild(spanPrice);
    return article;
  }

  // Photographer page
  function getUserHeaderDOM() {
    const div = document.createElement("div");
    const header = document.querySelector(".photograph-header");
    const aside = document.querySelector("aside");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = name;

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const pCityCountry = document.createElement("p");
    pCityCountry.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;

    const btn = document.createElement("button");
    btn.setAttribute("class", "contact_button");
    btn.setAttribute("onclick", "displayModal()");
    btn.textContent = "Contactez-moi";

    const spanPrice = document.createElement("span");
    spanPrice.textContent = `${price}€ / jour`;

    header.appendChild(div);
    header.appendChild(btn);
    header.appendChild(img);
    div.appendChild(h1);
    div.appendChild(pCityCountry);
    div.appendChild(pTagline);
    aside.appendChild(spanPrice);
    return header;
  }

  return {
    name,
    picture,
    portrait,
    city,
    country,
    tagline,
    price,
    id,
    getUserCardDOM,
    getUserHeaderDOM,
  };
}

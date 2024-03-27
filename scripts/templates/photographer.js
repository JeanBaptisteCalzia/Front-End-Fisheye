function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.href = `http://127.0.0.1:5500/photographer.html?${id}`;

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
  };
}

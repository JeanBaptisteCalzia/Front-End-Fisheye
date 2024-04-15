export async function getPhotographers() {
  // We retrieve data from JSON file
  const reponse = await fetch("data/photographers.json");
  const photographers = await reponse.json();
  // We retrieve Photographers data form JSON file
  return photographers["photographers"];
}

export async function getMedia() {
  // We retrieve data from JSON file
  const reponse = await fetch("data/photographers.json");
  const media = await reponse.json();
  // We retrieve media data form JSON file
  const mediaContent = media["media"];
  return mediaContent;
}

const favContainer =
  document.getElementById("favContainer");


async function loadFavorites(){

  const response =
    await fetch("/favorites");

  const favorites =
    await response.json();

  favContainer.innerHTML = "";

  if(favorites.length === 0){

    favContainer.innerHTML =
      "<h2>No favorites yet</h2>";

    return;
  }

  favorites.forEach(anime => {

    const div =
      document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
      <img src="${anime.image}">

      <div class="card-content">
        <h2>${anime.title}</h2>
      </div>
    `;

    favContainer.appendChild(div);

  });

}

loadFavorites();
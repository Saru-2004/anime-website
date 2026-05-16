const favContainer =
  document.getElementById("favContainer");

let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

function showFavorites(){

  favContainer.innerHTML = "";

  if(favorites.length === 0){
    favContainer.innerHTML =
      "<h3>No favorites yet</h3>";
    return;
  }

  favorites.forEach(anime => {

    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
      <img src="${anime.images.jpg.image_url}">
      <div class="card-content">
        <h2>${anime.title}</h2>
      </div>
    `;

    favContainer.appendChild(div);

  });

}

showFavorites();
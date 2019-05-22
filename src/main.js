//Recarga la pagina
const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

//Modal y Botones (que habren y cierran el modal)
const modal = document.getElementById("myModal");
const btn = document.getElementById("btn-modal")
const span = document.getElementsByClassName("close")[0];

//Click del Boton ¿Que es PopCorn Family y que habra el modal?
btn.addEventListener("click", () => {
modal.style.display = "block";
})

//Click del Boton para cerrar el Modal
span.addEventListener("click", () => {
modal.style.display = "none";
})

//Cuando el usuario haga click en cualquier lugar fuera del modal y se cierre
window.addEventListener("click", (event) => {
if (event.target == modal) {
modal.style.display = "none";
}
})

//Click del boton "buscar"
const clickSearch = document.getElementById("clickSearcher");

//Cuando escuche el click va a llamar a la data para buscar lo que el usurio ingreso en el input seach
clickSearch.addEventListener("click", () => {
    //texto ingresado por el usuario (titulo de pelicula)
    const inputSearch = document.getElementById("searcher").value;
    //parametros para armar la url
    const params = { api_key: "879f4d45aca2ee6235c83898a8eb220c", query: inputSearch, language: 'es-ES' };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById('movies');
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/search/movie?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.results.forEach((element) => {
                //console.log(data)
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="row text-center">
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
            const buttons = document.querySelectorAll('.btn-details');
            for (const button of buttons) {
                button.addEventListener('click', movieDetails);
            }
        })
});

/*Filtro por género*/
const filterMovie = document.getElementById("genre-movie");
filterMovie.addEventListener("change", () => {
    const filterMovie = document.getElementById("genre-movie").value;
    //console.log(filterMovie)
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&with_genres=" + filterMovie + "&sort_by=popularity.desc&language=es-ES")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)

            const list = document.getElementById('movies'); // se declara de nuevo, si no undefined.
            list.innerHTML = "";
            data.results.forEach((element) => {
                //console.log(data)
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="row text-center">
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
        });
})

/*Filtro por año*/
const yearMovie = document.getElementById("year-movie");
yearMovie.addEventListener("change", () => {
    const yearMovie = document.getElementById("year-movie").value;
    //console.log(filterMovie)
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&primary_release_year="+yearMovie)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)

            const list = document.getElementById('movies'); // se declara de nuevo, si no undefined.
            list.innerHTML = "";
            data.results.forEach((element) => {
                console.log(data)
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        
                    </div>`;
            });
        });
})

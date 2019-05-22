//aqui se imprimen las cards
const list = document.getElementById('movies');
//Recarga la pagina
const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

//Modal y Botones (que habren y cierran el modal)
const modal = document.getElementById("myModal");
const btn = document.getElementById("btn-modal")
const span = document.getElementsByClassName("close")[0];

//Click del Boton ¿Que es PopCorn Family? y que habra el modal
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
function addListenerButtonDetails() {
    const buttons = document.querySelectorAll('.btn-details');//con este querysSelector se hace el evento click del boton
    for (const button of buttons) { //recorre cada boton 
        button.addEventListener('click', movieDetails);
    }
}

//esta funcion muestra el detalle de la pelicula seleccionada
function movieDetails(event) {
    console.log('entre!');
    //parametros para armar la url
    const movieId = event.target.getAttribute("data-id");//este atributo me da el valor del ID y lo toma como parametro para la url
    const params = { api_key: "879f4d45aca2ee6235c83898a8eb220c", language: 'es-ES', external_source: "imdb_id" };
    const urlParams = new URLSearchParams(Object.entries(params));
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/find/${movieId}?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.results.forEach((element) => {
                console.log(data)
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
}
window.onload = () => {

    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&sort_by=popularity.desc`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.results.forEach((element) => {
                list.innerHTML +=
                    `<div class="col-sm-12 col-md-4 col-lg-2">
                        <div class="card text-center cards">
                            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top"  alt="${element.original_title} Imágen no Disponible">
                            <div class="card-body">
                                <p class="card-title ">${element.title}</p>
                            </div>
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details   ">Ver más</button>
                        </div>
                    </div>`;
            });
            addListenerButtonDetails();
        })

    //Click del boton "buscar"
    const clickSearch = document.getElementById("clickSearcher");
    //Cuando escuche el click va a llamar a la data para buscar lo que el usurio ingreso en el input seach
    clickSearch.addEventListener("click", () => {
        //texto ingresado por el usuario (titulo de pelicula)
        const inputSearch = document.getElementById("searcher").value;
        //parametros para armar la url
        const params = { apikey: "376741b9", s: inputSearch, plot: "full" };
        const urlParams = new URLSearchParams(Object.entries(params));


        //llamada a la data con los parametros que se establecieron en URLSearchParams
        fetch(`https://www.omdbapi.com?${urlParams}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                list.innerHTML = "";
                data.Search.forEach((element) => {
                    //console.log(data)
                    list.innerHTML +=
                        `<div class="col-sm-12 col-md-4 col-lg-2">
                    <div class="card text-center cards">
                        <img src="${element.Poster}" class="card-img-top"  alt="${element.Title} Imágen no Disponible">
                        <div class="card-body">
                            <p class="card-title ">${element.Title}</p>
                        </div>
                        <button id="e-${element.imdbID}" data-id="${element.imdbID}" class="btn btns btn-lg btn-block btn-details   ">Ver más</button>
                    </div>
                </div>`;
                });
                addListenerButtonDetails();

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
                list.innerHTML = "";
                data.results.forEach((element) => { 
                    list.innerHTML +=
                        `<div class="col-sm-12 col-md-4 col-lg-2">
                    <div class="card text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top"  alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <p class="card-title ">${element.title}</p>
                        </div>
                        <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details   ">Ver más</button>
                    </div>
                </div>`;
                });
                addListenerButtonDetails();
            });
    })

    /*Filtro por año*/
    const yearMovie = document.getElementById("year-movie");
    yearMovie.addEventListener("change", () => {
        const yearMovie = document.getElementById("year-movie").value;
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&primary_release_year=" + yearMovie)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                list.innerHTML = "";
                data.results.forEach((element) => {
                    console.log(data)
                    list.innerHTML +=
                        `<div class="col-sm-12 col-md-4 col-lg-2">
                    <div class="card text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top"  alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <p class="card-title ">${element.title}</p>
                        </div>
                        <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details   ">Ver más</button>
                    </div>
                </div>`;
                });
                addListenerButtonDetails();
            });
    })

    /*Filtro por Top Rated*/
    const ratedMovie = document.getElementById("rated-movie");
    ratedMovie.addEventListener("change", () => {
        const ratedMovie = document.getElementById("rated-movie").value;
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&with_genres=16,12,10751,35&sort_by=vote_average." + ratedMovie)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                list.innerHTML = "";
                data.results.forEach((element) => {
                    list.innerHTML +=
                    `<div class="col-sm-12 col-md-4 col-lg-2">
                        <div class="card text-center cards">
                            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top"  alt="${element.original_title} Imágen no Disponible">
                            <div class="card-body">
                                <p class="card-title ">${element.title}</p>
                            </div>
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details">Ver más</button>
                        </div>
                    </div>`;
                });
                addListenerButtonDetails();
            });
    })
}

//Funcion del Modal
//const containerModal = document.getElementById("container-modal");
//const loadModal = (element) => {
  //containerModal.innerHTML += `<div class="modal fade" id="${element.id}">
  //<div class="modal-dialog">
    //<div class="modal-content">
    //<div class="modal-body">
       //<h3 class="modal-title">${element.id.toUpperCase()}</h3>
       //<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
           //<div class="card-body">${element.title} 
           //<div class="text-info"> ${element.tags} </div>
          //</div>
       //</div>
       //<div class="modal-footer">
         //<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
       //</div>
     //</div>
   //</div>
 //</div>`
//};
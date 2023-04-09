import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { Form, Link, routeAction$ } from "@builder.io/qwik-city";
import style from "./style.css?inline";

const moviesApiKey = "d940b4f5";

type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export const useGetMovies = routeAction$(async (values) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${moviesApiKey}&s=${values.search}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const list = data.Search as Movie[];
    return {
        movies: list,
    }
});

export default component$(() => {
  useStylesScoped$(style);
  const defaultMovie = useSignal("batman");
  const movies = useGetMovies();

  // Truco para hacer busqueda inicial
  useVisibleTask$(() => {
    document.querySelector("button")?.click();
  });

  return (
    <div class="grid">
      <header class="header">
        <Link href="/">Inicio</Link>
        <h1>Tu buscador de pelis favorito</h1>
        <Form class="header-form" action={movies}>
            <input type="text" class="header-input" name="search" value={defaultMovie.value} />
            <button class="link">Buscar pelicula</button>
        </Form>
      </header>
      <main class="main">
        <h1>API Pelis</h1>
        {movies.value?.movies ? 
        <ul class="movies">
            {movies.value.movies.map((movie) => (
                <li key={movie.imdbID} class="movie">
                    <img src={movie.Poster} alt={movie.Title} />
                    <p>{movie.Title}</p>
                    <p>{movie.Year}</p>
                </li>
            ))}
        </ul>
        : <p>No hay peliculas</p>}
      </main>
      <footer class="footer">
        <p>Hecho con Qwik</p>
      </footer>
    </div>
  );
});

const API_KEY = "Your API Key";
const API_URL_IMG = "https://image.tmdb.org/t/p/original";

function fetchHandler(url){
    fetch(url)
        .then(response => response.json())
        .then(response => responseHandler(response.results))
        .catch(error => console.log(error))
}

function responseHandler(movies){
    const section = document.querySelector("section");

    for (const movie of movies) {
        // le conteneur article pour chaque film
        const article = document.createElement("article");
        // - title
        const title = document.createElement("h3");
        title.textContent = movie.original_title;
        // - image 
        const img = document.createElement("img");
        img.src = API_URL_IMG + movie.poster_path;
        // - nombre de vote
        const voteCount = document.createElement("p");        
        voteCount.textContent = movie.vote_count;
        // - note moyenne 
        const voteAverage = document.createElement("p");
        voteAverage.textContent = movie.vote_average;
        // - date de sortie au format dd/mm/yyyy
        const releaseDate = document.createElement("p");        
        releaseDate.textContent = movie.release_date;
        // - scenario
        const story = document.createElement("p");
        story.textContent = movie.overview;
        
        // on ajoute tous les éléments créés à l'élément article
        article.append(title, img, voteCount, voteAverage, releaseDate, story );
        // et on ajoute l'article à la section
        section.append(article);
    }


}

document.addEventListener('DOMContentLoaded', () => {
    fetchHandler(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);

});

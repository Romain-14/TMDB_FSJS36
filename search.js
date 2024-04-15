const API_KEY = "Your API Key";
const API_URL_IMG = "https://image.tmdb.org/t/p/original";


function searchHandler(event) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${event.target.value}&api_key=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(res => createList(res.results))
        .catch(error => console.log(error))
}

function createList(movies) {
    const section = document.querySelector('section');
    const ul = document.querySelector('ul');
    if(ul) ul.remove();

    const newUl = document.createElement('ul');

    for (const movie of movies) {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.dataset.id  = movie.id; // <li data-id="142">nom du film</li>
        li.addEventListener("click", onClickMovieHandler);
        newUl.append(li);
    }
    section.append(newUl);
}   

function onClickMovieHandler(event){    
    const url = `https://api.themoviedb.org/3/movie/${event.target.dataset.id}?api_key=${API_KEY}`;
    fetch(url)
        .then(res => res.json())
        .then(res => createDetail(res))
        .catch(error => console.log(error))
}

function createDetail(response){
    const section = document.querySelector('section');
    const article = document.querySelector('article');
    if(article) article.remove();

    const newArticle = document.createElement('article');
    const title   = document.createElement('h3');
    title.textContent = response.original_title;

    const img = document.createElement('img');
    img.src = API_URL_IMG + response.poster_path;

    const voteCount = document.createElement('p');
    voteCount.textContent = response.vote_count;

    const voteAverage = document.createElement('p');
    voteAverage.textContent = response.vote_average;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = new Date(response.release_date).toLocaleDateString();

    const story = document.createElement('p');
    story.textContent = response.overview;

    const companies = createCompaniesList(response.production_companies);

    newArticle.append(title, img, voteCount, voteAverage, releaseDate, story, companies);
    section.append(newArticle);
}

function createCompaniesList(companies){
    const ul = document.createElement('ul');
    for (const company of companies) {
        fetch(`https://api.themoviedb.org/3/company/${company.id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                let li = document.createElement('li');                
                if(res.homepage){
                    const a = document.createElement('a');
                    a.textContent = res.name;
                    a.href = res.homepage;
                    a.target = "_blank";
                    li.append(a);
                } else {
                    li.textContent = res.name ? res.name : company.name;                    
                }
                ul.append(li);
            })
            .catch(error => console.log(error));
    }
    return ul;
}

document.addEventListener('DOMContentLoaded', () => {  
    const input = document.querySelector('input');
    input.addEventListener("keyup", searchHandler)
});
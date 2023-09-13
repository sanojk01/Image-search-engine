const accessKey = "C5HRSk4lpNJdDSB3lB4htsxNySHlB8r2TExWzuClqn8";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;

window.addEventListener("load", () => searchImages("all"));

async function searchImages(keyword){

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page ===1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((results) =>{
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);

    })  
}

searchForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;

    keyword = searchBox.value;
    if(!keyword) return;
    
    searchImages(keyword);
    showMoreBtn.style.display ="block";
})

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages(keyword);
})
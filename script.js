const btnXHR = document.getElementById("xhr") ; 
const btnfetch = document.getElementById("fetch") ; 
const btnasync = document.getElementById("async") ; 


let searchQ = document.getElementById("query") ; 
let searchR = document.getElementById("result") ; 


const API_URL = "https://api.giphy.com/v1/gifs/search";
const API_key = "KhKeK8JA02sLE5e6HXEPAfcqRE50M7qJ" ; 

btnXHR.addEventListener('click' , function(){
searchUsingXHR(searchQ.value) ; 
}) ; 

btnfetch.addEventListener('click' , function(){
    searchUsingFetch(searchQ.value) ; 
    }) ; 

btnasync.addEventListener('click' , function(){
searchUsingAsync(searchQ.value) ; 
}) ; 



function searchUsingXHR(query){
    if (!query || query.trim().length === 0){
        return;
    }
    let xhr = new XMLHttpRequest() ; 
    xhr.addEventListener('readystatechange' , function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            displayResults(JSON.parse(xhr.responseText));
    }
});

let params = "api_key=" + API_key + "&q=" + query  + "&limit=5&rating=g";
xhr.open("GET" , API_URL + "?" + params) ; 
xhr.send() ; 

}


function searchUsingFetch(query){
    if (!query || query.trim().length === 0){
        return;
    }

    let params = "api_key=" + API_key + "&q=" + query  + "&limit=5&rating=g";

    fetch(API_URL + '?' + params)
    .then((response) => {
       return response.text();
    }) .then((text) => {
        displayResults(JSON.parse(text)) ; 
     })
    
    .catch((error) => {
        console.log(error) ; 
    });
}


async function searchUsingAsync(query){
    if (!query || query.trim().length === 0){
        return;
    }

    let params = "api_key=" + API_key + "&q=" + query  + "&limit=5&rating=g";

  let response = await fetch(API_URL + "?" + params) ; 
let data = await response.json() ; 
displayResults(data) ; 
}




function displayResults(respObject){
    for(items of respObject.data){
        let imgElement = document.createElement('img') ; 
        imgElement.src = items.images.downsized_medium.url;
        imgElement.alt = items.title ; 
        searchR.appendChild(imgElement) ;
    }
}



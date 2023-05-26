const apiId = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"
const apiKey = "DjCxebELV2HuP9gQqzWbncgosyuatINcmF4BmtAXR4GPMHAHuphQHP3I"
const searchEl = document.getElementById("search-id");
const formEl = document.querySelector("form");
const searchResultEl = document.querySelector(".search-results")
const showMoreButtonEl = document.getElementById("showmore-button")
const pageNumEl = document.querySelector(".pageNumber");
const imageHeaderEl = document.querySelector(".image-header");
const videoHeaderEl = document.querySelector(".video-header");
const resultsVideos = document.querySelector(".search-results-videos")
const upButtonEl = document.querySelector(".up-button")
console.log(pageNumEl);
let searchedinput = "";
let page = 1;
async function getDetails(){
    let number = 18*page;
    searchedinput = searchEl.value;
    // const url1 = `https://api.unsplash.com/search/photos?page=${page}&query=${searchedinput}&client_id=${apiId}`;
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=9&query=${searchedinput}&client_id=${apiId}`);
    const jsonResp = await response.json();
    console.log(jsonResp);
   
    try{if(jsonResp.total==0){
        throw new Error("incorrect query");
    }}catch(error){
        const error1 = document.createElement("div");
        error1.innerHTML=`<div class ="errorQ">Incorrect Query, Kindly Re-Enter</div>`
        pageNumEl.append(error1);
        if(page===1){
            searchResultEl.innerHTML="";
            resultsVideos.innerHTML="";
            page=0;
        }
        imageHeaderEl.style.opacity="0";
        videoHeaderEl.style.opacity="0";
        return;
    }
    if(page===1){
        searchResultEl.innerHTML="";
        resultsVideos.innerHTML="";
    }
    pageNumEl.innerHTML= `<div class="pageNumber">Results : 1 - ${number}</div>`;
    const results = jsonResp.results;
    results.map((result)=>{
    searchResultEl.innerHTML += `<div class="search-result">
    <img src=${result.urls.small} >
    <a href=${result.links.html} target="_blank" rel="noopener noreferrer">${result.alt_description}</a>
</div>`});
var fetched = await fetch(`https://api.pexels.com/videos/search?query=${searchedinput}&page=${page}&per_page=9`,{
        method:'GET',
        headers:{
            'Authorization': apiKey
        },
        mode:"cors",
    })
    const munch = await fetched.json();
    const munched = munch.videos;
    munched.map((result)=>{
        var resultingvideos = result.video_files[1].link;

        console.log(resultingvideos);
//     resultsVideos.innerHTML += `<div class="search-results-video">
//     <video src=${resultingvideos} id="${result.id}"  type="video/mp4" muted class="vid" 
//     loop style="border: solid; width: 800px;"></video>
//     <a href=${resultingvideos} target="_blank" rel="noopener noreferrer">${result.user.name}</a>
// </div>`
   const el1 = document.createElement("div");
   el1.classList.add("search-video");
   const el2 = document.createElement("video");
   el2.src= resultingvideos;
   el2.id=result.id;
   el2.muted=true;
   const el3 = document.createElement("a");
   el3.href= result.url;
   el3.target="blank";
   el3.rel="noopener noreferrer";
   el3.innerHTML=`${result.user.name}`;
   resultsVideos.append(el1);
   el1.appendChild(el2);
   el1.appendChild(el3);

    var clip = document.getElementById(result.id)
    console.log(result.id);
    // console.log(count);
    clip.addEventListener("mouseover",async (event)=>{
        clip.play();
    })
        
    clip.addEventListener("mouseout",async (event)=>{
        clip.pause();
    })
})
// imageVideoEl.display="inline-block";
imageHeaderEl.style.opacity="1";
videoHeaderEl.style.opacity="1";


    
    // const ScriptDiv = document.createElement("div");
    // ScriptDiv.classList.add("search-result");
    // const image = document.createElement("img");
    

// }
// );

const total = jsonResp.total;
console.log(total);
showMoreButtonEl.style.display="inline-block";
showMoreButtonEl.style.justifyContent="center";



};

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    getDetails();
})
if(page==0){
    showMoreButtonEl.style.backgroundColor='blue';
}
showMoreButtonEl.addEventListener("click",(event)=>{
    page++;
    getDetails();
})

window.addEventListener("scroll",()=>{
    if(window.pageYOffset>100){
        upButtonEl.style.opacity = '0.6';
    }
    else{
        upButtonEl.style.opacity= '0';
    }
    
})
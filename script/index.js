function removeActiveClass(){
    const activeButton=document.getElementsByClassName("active");
    for(let btn of activeButton){
        btn.classList.remove("active");
    }
    
}

function loadCategories(){
        fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories));
}
function displayCategories(categories){
    // get the container
    const categoryContainer =document.getElementById("category-container");
    // loop operation on Array object
    for(const cat of categories){
        console.log(cat);
        // create Element
        const categoryDiv= document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class ="btn btn-sm hover:bg-[#ff1f3D] hover:text-white">${cat.category}</button>
        
        `
        // append the Element 
        categoryContainer.append(categoryDiv);
    }
}

loadCategories();

function videoCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    })

}
const displayVideos= (videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML="";
    videos.forEach((video) => {
        console.log(video);
        const videoCard=document.createElement("div");
        videoCard.innerHTML=`
        <div class="card bg-base-100 ">
                <figure class="relative">
                  <img class="w-full h-[150px] object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                    <span class="absolute bottom-2 right-2 text-sm rounded-sm text-white bg-black px-2 ">3hrs 56 min ago</span>
                </figure>
                <div class=" flex gap-3 px-0 py-2">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">fdsjfhjsdh jddshf</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                        <p class="text-sm text-gray-400">${video.others.views}</p>
                        
                    </div>

                </div>
                     <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
              </div>
        `
        videoContainer.append(videoCard);
    });
}
 
const loadVideoDetails=(videoId)=>{
    const url=` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}

`;
fetch(url)
.then(res=>res.json())
.then(data=>displayVideosDetails(data))

}
const displayVideosDetails=(video)=>{
    console.log(video);
    document.getElementById("video_details").showModal();

}

const loadCategoriesVideos=(id)=>{
  
  const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  console.log(url);
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass();
    const clickedButton=document.getElementById(`btn-${id}`)
    clickedButton.classList.add("active"); 
    console.log(clickedButton);
    displayVideos(data.category)
  })
}


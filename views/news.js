let load = document.getElementById("more");
let reduce = document.getElementById("hide");
let news = [...document.querySelectorAll(".ind")];
let current = 3;

function showMore() {
    for (var i = 0; i < news.length; i++) {
        news[i].style.display = "flex";
    }
    load.style.display = "none";
    reduce.style.display = "flex";
}

function hide() {
    for (var i = current; i < news.length; i++) {
        news[i].style.display = "none";
    }
    load.style.display = "flex";
    reduce.style.display = "none";
}

if (load){load.addEventListener('click',showMore)}
if(reduce){reduce.addEventListener('click',hide)}




let E1news = document.getElementById("news1");
function show1News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news1D").style.display = "block";
}

if (E1news){E1news.onclick = show1News;}



let E2news = document.getElementById("news2");
function show2News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news2D").style.display = "block";
}
if (E2news){E2news.onclick = show2News;}


let E3news = document.getElementById("news3");
function show3News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news3D").style.display = "block";
}

if (E3news){E3news.onclick = show3News;}

let E4news = document.getElementById("news4");
function show4News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news4D").style.display = "block";
}

if (E4news)
{E4news.onclick = show4News;}

let E5news = document.getElementById("news5");
function show5News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news5D").style.display = "block";
}

if (E5news){
E5news.onclick = show5News;}

let E6news = document.getElementById("news6");
function show6News(){
    let ne = [...document.querySelectorAll(".each-news")];
    for (let i=0; i<ne.length; i++){
        ne[i].style.display = "none";
    }
    document.getElementById("news6D").style.display = "block";
}

if (E6news){
E6news.onclick = show6News;}


const humburger = document.querySelector(".humburger");
const navbar = document.querySelector(".header__ul");

humburger.addEventListener('click',()=>{
    humburger.classList.toggle('active');
    navbar.classList.toggle('active');
    
    
})

document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    console.log(toggleSidebar)
  
    toggleSidebar.addEventListener("click", function() {
      if (sidebar.style.right === "-250px") { /* Changed from left to right */
        sidebar.style.right = "0"; /* Changed from left to right */
      } else {
        sidebar.style.right = "-250px"; /* Changed from left to right */
      }
    });
  });
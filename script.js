const primaryNav = document.querySelector(".primary-nav");
const navToggler = document.querySelector(".nav-toggler");
const body = document.querySelector("body");

const nav = document.getElementById('header');

navToggler.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");

    if(visibility === "false") {
        navToggler.setAttribute("aria-expanded", true);
        primaryNav.setAttribute("data-visible", true);
        body.classList.add("overflow-hidden");
    } else {
        navToggler.setAttribute("aria-expanded", false);
        primaryNav.setAttribute("data-visible", false);
        body.classList.remove("overflow-hidden");
    }
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navbar").classList.add("nav-colored"); // Change background color on scroll
    document.getElementById("navbar").classList.remove("nav-transparent"); // Change background color on scroll
  } else {
    document.getElementById("navbar").classList.remove("nav-colored"); // Change background color on scroll
    document.getElementById("navbar").classList.add("nav-transparent"); // Change background color on scroll
  }
}
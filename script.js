const primaryNav = document.querySelector(".primary-nav");
const navToggler = document.querySelector(".nav-toggler");
const body = document.querySelector("body");
const navItems = document.querySelectorAll(".nav-list a");
const content = document.querySelector(".content");

const nav = document.getElementById("header");

navToggler.addEventListener("click", () => {
  toggleNav();
});

// Add click event listeners to each nav list item
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeNav();
  });
});

function toggleNav() {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    navToggler.setAttribute("aria-expanded", true);
    primaryNav.setAttribute("data-visible", true);
    body.classList.add("overflow-hidden");
    content.classList.add("blur");
  } else {
    navToggler.setAttribute("aria-expanded", false);
    primaryNav.setAttribute("data-visible", false);
    body.classList.remove("overflow-hidden");
    content.classList.remove("blur");
  }
}

function closeNav() {
  navToggler.setAttribute("aria-expanded", false);
  primaryNav.setAttribute("data-visible", false);
  body.classList.remove("overflow-hidden");
  content.classList.remove("blur");
}

// Close navigation when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideNav = primaryNav.contains(event.target);
  const isClickOnToggler = navToggler.contains(event.target);

  if (!isClickInsideNav && !isClickOnToggler) {
    const visibility = primaryNav.getAttribute("data-visible");
    if (visibility === "true") {
      closeNav();
    }
  }
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navbar").classList.add("nav-colored");
    document.getElementById("navbar").classList.remove("nav-transparent");
  } else {
    document.getElementById("navbar").classList.remove("nav-colored");
    document.getElementById("navbar").classList.add("nav-transparent");
  }
}

// top on reload
// window.addEventListener("load", function () {
//   if ("scrollRestoration" in history) {
//     history.scrollRestoration = "manual";
//   }
//   window.scrollTo(0, 0);
// });

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        window.location.reload(); // Reload the page
      }, 3000);
    });
});

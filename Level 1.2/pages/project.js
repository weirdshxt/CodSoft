function locomotiveScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveScroll();

let tl = gsap.timeline();

document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    left: dets.x,
    top: dets.y,
  });
});

function loaderPrAnime() {

    gsap.to("#main", {
      display: "none",
    });

  tl.from(".cardsImg", {
    rotate: 0,
    stagger: 0.1,
    duration: 1,
    delay: 0.3,
  });

  tl.to("#loader", {
    y: "-100%",
    duration: 1,
    onComplete: () => {
      document.querySelector("#loader").style.display = "none";
    },
  });

    tl.to("#main", {
      display: "block",
    },"-=1");

  tl.from(
    "#nav h3, #nav a",
    {
      y: -50,
      opacity: 0,
      duration: 0.7,
      delay: 0.4,
    },
    "-=0.5"
  );

  tl.from(
    ".projects-txt h1",
    {
      y: 150,
      duration: 1,
      ease: "power3.inOut",
    },
    "-=1.5"
  );

  tl.from(
    ".swiper",
    {
      opacity: 0,
      y: 150,
      rotate: 7,
      duration: 1,
      ease: "power3.inOut",
      delay: 0.5,
    },
    "-=2"
  );
}

loaderPrAnime();

function swipeCards() {
  var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
  });

  document.querySelectorAll(".swiper-slide").forEach((swiper) => {
    swiper.addEventListener("mouseenter", () => {
      gsap.to("#cursor", {
        backgroundColor: "#f55630",
        width: "7vw",
        height: "7vw",
        innerHTML: "View",
      });
    });
    swiper.addEventListener("mouseleave", () => {
      gsap.to("#cursor", {
        backgroundColor: "transparent",
        width: "4vw",
        height: "4vw",
        innerHTML: "",
      });
    });
  });
}

swipeCards();

function btnMenuClick() {
  document.querySelector("#n-right h3").addEventListener("click", () => {
    gsap.from("#menu", {
      y: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#menu").style.display = "block";
      },
    });

      gsap.to("#main", {
        display: "none",
      });

    gsap.from(".sh-txt h1", {
      y: 250,
      rotate: -12,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#menu .nav h3").addEventListener("click", () => {
    tl.to("#menu", {
      y: "-100%",
      display: "none",
    });

      gsap.to("#main", {
        display: "block",
      });

    tl.to("#menu", {
      y: "0",
    });
  });

  document.querySelector(".gitTxt h1").addEventListener("mouseenter", () => {
    gsap.to(".git-img", {
      display: "block",
      top: "10%",
      left: "25%",
    });
  });

  document.querySelector(".gitTxt h1").addEventListener("mouseleave", () => {
    gsap.to(".git-img", {
      display: "none",
      top: "40%",
      left: "-25%",
    });
  });

  document.querySelector(".linkeTxt h1").addEventListener("mouseenter", () => {
    gsap.to(".linke-img", {
      display: "block",
      top: "25%",
      left: "60%",
    });
  });

  document.querySelector(".linkeTxt h1").addEventListener("mouseleave", () => {
    gsap.to(".linke-img", {
      display: "none",
      top: "50%",
      left: "110%",
    });
  });

  document.querySelector(".instaTxt h1").addEventListener("mouseenter", () => {
    gsap.to(".insta-img", {
      display: "block",
      top: "40%",
      left: "25%",
    });
  });

  document.querySelector(".instaTxt h1").addEventListener("mouseleave", () => {
    gsap.to(".insta-img", {
      display: "none",
      top: "10%",
      left: "-25%",
    });
  });

  document.querySelector(".freeTxt h1").addEventListener("mouseenter", () => {
    gsap.to(".free-img", {
      display: "block",
      top: "53%",
      left: "60%",
    });
  });

  document.querySelector(".freeTxt h1").addEventListener("mouseleave", () => {
    gsap.to(".free-img", {
      display: "none",
      top: "10%",
      left: "100%",
    });
  });
}

btnMenuClick();

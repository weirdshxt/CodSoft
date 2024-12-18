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

document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    left: dets.x,
    top: dets.y,
  });
});

let tl = gsap.timeline();
//loader animation.

function loaderAnimation() {
  gsap.to("#main",{
    display: "none",
  })
  tl.from(".counter h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onStart: () => {
      let h5timer = document.querySelector(".counter h1");
      let grow = 0;

      setInterval(() => {
        if (grow < 100) {
          h5timer.innerHTML = `“ ${grow++}`;
        } else {
          h5timer.innerHTML = `“ ${grow}`;
        }
      }, 23);
    },
  });

  tl.from(".l-img1", {
    top: "-100%",
    rotate: -24,
  });

  tl.from(".l-img2", {
    top: "-100%",
    left: "0%",
    rotate: 34,
    display:"none",
  });

  tl.from(".l-img3", {
    top: "-100%",
    right: "0%",
    rotate: 45,
    display:"none",
  });

  tl.to("#loader", {
    y: "-100%",
    duration: 1,
    delay: 1,
    onComplete: () => {
      document.querySelector("#loader").style.display = "none";
      //  document.querySelector("#main").style.display = "block";
    },
  });

    tl.to("#main", {
      display: "block",
    },"-=1");

  //HERO section animation.

  tl.from("#nav h3 , #n-right h3", {
    y: -50,
    opacity: 0,
    duration: 0.7,
    delay: 0.4,
    stagger: 0.1,
  });

  tl.from(
    ".txt1 h1, .txt2 h1",
    {
      y: 150,
      opacity: 0,
      duration: 0.4,
      stagger: 0.3,
    },
    "-=1.7"
  );

  tl.from(
    "#img1",
    {
      y: "100%",
      rotate: 15,
      opacity: 0,
      duration: 0.3,
      stagger: 0.3,
    },
    "-=1"
  );

  tl.from(
    "#img2",
    {
      y: "100%",
      x: "100%",
      rotate: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
    },
    "-=0.6"
  );

  tl.from(
    "#img3",
    {
      y: "100%",
      x: "-100%",
      rotate: -45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
    },
    "-=0.1"
  );

  tl.from(
    ".side-txt a",
    {
      y: -150,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      stagger: 0.1,
    },
    "-=1"
  );

  tl.from(
    "#theme-toggle",
    {
      scale: 0,
      opacity: 0,
      duration: 0.7,
      stagger: 0.3,
    },
    "-=0.5"
  );
}

loaderAnimation();

// project section animation.

function sheryAnimation() {
  Shery.imageEffect(".box1 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".box2 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".box3 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".box4 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".box5 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".box6 img", {
    style: 5,
    config: {
      a: { value: 0.92, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7142856656288648 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

sheryAnimation();


// if (window.innerWidth > 600) {
  function animation() {
    gsap.to("#page2 h1", {
      transform: "translateX(-75%)",
      scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "top 0",
        end: "top -100%",
        scrub: 2,
        pin: true,
      },
    });
  }
  animation();
// }

// MENU btn click after animation.

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

    gsap.to("#main",{
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

// Page 2 color changing


// if (window.innerWidth > 600) {
  function page2ColorChange(value) {
    let h1 = document.querySelector("#page2 h1").textContent;
  
    let splitText = h1.split("");
  
    let clutter = "";
    splitText.forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
  
    document.querySelector("#page2 h1").innerHTML = clutter;
  
    gsap.to("#page2 h1 span", {
      color: value,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#page2 h1",
        scroller: "#main",
        start: "top 20%",
        end: "top -100%",
        scrub: 1,
      },
    });
  }
  console.log("kabir");
  page2ColorChange("#0b0b0b");
// }

// page 3 showing animation

function dragSwipeAnimation() {
  var swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 35,
    centeredSlides: true,
  });

  // gsap.from(".swiper-wrapper", {
  //   x: -1000,
  //   stagger: 1,
  //   scrollTrigger: {
  //     trigger: "#page3",
  //     scroller: "body",
  //     start: "top 70%",
  //     end: "top 20%",
  //     scrub: 1,
  //   },
  // });

  document.querySelector("#page3 .box1").addEventListener("click", () => {
    gsap.from("#project1", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project1").style.display = "block";
      },
    });

    gsap.to("#main", {
      display: "none",
    });

    gsap.from(".p1-img .box1", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });

    gsap.from(".p1-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p1-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p1-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close").addEventListener("click", () => {
    tl.to("#project1", {
      y: "-100%",
      display: "none",
    });
    gsap.to("#main", {
      display: "block",
    });
    tl.to("#project1", {
      y: "0",
    });
  });

  document.querySelector("#next1").addEventListener("click", () => {
    tl.to("#project1", {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project1").style.display = "block";
      },
    });
    tl.from(
      "#project2",
      {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          document.querySelector("#project2").style.display = "block";

          gsap.from(".p2-img .box2", {
            y: "10%",
            x: "-70%",
            scale: 1,
            opacity: 1,
            rotate: 18,
            duration: 0.8,
            ease: "power2.inOut",
          });
          gsap.from(".p2-txt h1", {
            y: 150,
            rotate: -17,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            stagger: 0.1,
          });
          gsap.from(".p2-para-txt p", {
            x: "100%",
            opacity: 0,
            duration: 1,
            delay: 0.5,
            stagger: 0.1,
          });
          gsap.from(".p2-btn", {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            stagger: 0.1,
          });
        },
      },
      "-=1"
    );
    tl.to("#project1", {
      y: "0",
      x: "0",
      display: "none",
    });
  });

  document.querySelector("#page3 .box2").addEventListener("click", () => {
    gsap.from("#project2", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project2").style.display = "block";
      },
    });

    gsap.to("#main", {
      display: "none",
    });

    gsap.from(".p2-img .box2", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.from(".p2-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p2-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p2-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close2").addEventListener("click", () => {
    tl.to("#project2", {
      y: "-100%",
      display: "none",
    });
    gsap.to("#main", {
      display: "block",
    });
    tl.to("#project2", {
      y: "0",
    });
  });

  document.querySelector("#next2").addEventListener("click", () => {
    tl.to("#project2", {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project2").style.display = "block";

        gsap.from(".p3-img .box3", {
          y: "10%",
          x: "-70%",
          scale: 1,
          opacity: 1,
          rotate: 18,
          duration: 0.8,
          ease: "power2.inOut",
        });
        gsap.from(".p3-txt h1", {
          y: 150,
          rotate: -17,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
        gsap.from(".p3-para-txt p", {
          x: "100%",
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
        gsap.from(".p3-btn", {
          scale: 0,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
      },
    });
    tl.from(
      "#project3",
      {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          document.querySelector("#project3").style.display = "block";
        },
      },
      "-=1"
    );
    tl.to("#project2", {
      y: "0",
      x: "0",
      display: "none",
    });
  });

  document.querySelector("#page3 .box3").addEventListener("click", () => {
    gsap.from("#project3", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project3").style.display = "block";
      },
    });

      gsap.to("#main", {
        display: "none",
      });

    gsap.from(".p3-img .box3", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.from(".p3-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p3-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p3-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close3").addEventListener("click", () => {
    tl.to("#project3", {
      y: "-100%",
      display: "none",
    });

      gsap.to("#main", {
        display: "block",
      });

    tl.to("#project3", {
      y: "0",
    });
  });

  document.querySelector("#next3").addEventListener("click", () => {
    tl.to("#project3", {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project3").style.display = "block";

        gsap.from(".p4-img .box4", {
          y: "10%",
          x: "-70%",
          scale: 1,
          opacity: 1,
          rotate: 18,
          duration: 0.8,
          ease: "power2.inOut",
        });
        gsap.from(".p4-txt h1", {
          y: 150,
          rotate: -17,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
        gsap.from(".p4-para-txt p", {
          x: "100%",
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
      },
    });
    tl.from(
      "#project4",
      {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          document.querySelector("#project4").style.display = "block";
        },
      },
      "-=1"
    );
    tl.to("#project3", {
      y: "0",
      x: "0",
      display: "none",
    });
  });

  document.querySelector("#page3 .box4").addEventListener("click", () => {
    gsap.from("#project4", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project4").style.display = "block";
      },
    });

      gsap.to("#main", {
        display: "none",
      });

    gsap.from(".p4-img .box4", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.from(".p4-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p4-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p4-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close4").addEventListener("click", () => {
    tl.to("#project4", {
      y: "-100%",
      display: "none",
    });

      gsap.to("#main", {
        display: "block",
      });

    tl.to("#project4", {
      y: "0",
    });
  });

  document.querySelector("#next4").addEventListener("click", () => {
    tl.to("#project4", {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project4").style.display = "block";

        gsap.from(".p5-img .box5", {
          y: "10%",
          x: "-70%",
          scale: 1,
          opacity: 1,
          rotate: 18,
          duration: 0.8,
          ease: "power2.inOut",
        });
        gsap.from(".p5-txt h1", {
          y: 150,
          rotate: -17,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
        gsap.from(".p5-para-txt p", {
          x: "100%",
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
      },
    });
    tl.from(
      "#project5",
      {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          document.querySelector("#project5").style.display = "block";
        },
      },
      "-=1"
    );
    tl.to("#project4", {
      y: "0",
      x: "0",
      display: "none",
    });
  });

  document.querySelector("#page3 .box5").addEventListener("click", () => {
    gsap.from("#project5", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project5").style.display = "block";
      },
    });

      gsap.to("#main", {
        display: "none",
      });

    gsap.from(".p5-img .box5", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.from(".p5-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p5-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p5-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close5").addEventListener("click", () => {
    tl.to("#project5", {
      y: "-100%",
      display: "none",
    });

      gsap.to("#main", {
        display: "block",
      });

    tl.to("#project5", {
      y: "0",
    });
  });

  document.querySelector("#next5").addEventListener("click", () => {
    tl.to("#project5", {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project5").style.display = "block";

        gsap.from(".p6-img .box6", {
          y: "10%",
          x: "-70%",
          scale: 1,
          opacity: 1,
          rotate: 18,
          duration: 0.8,
          ease: "power2.inOut",
        });
        gsap.from(".p6-txt h1", {
          y: 150,
          rotate: -17,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
        gsap.from(".p6-para-txt p", {
          x: "100%",
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.1,
        });
      },
    });
    tl.from(
      "#project6",
      {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          document.querySelector("#project6").style.display = "block";
        },
      },
      "-=1"
    );
    tl.to("#project5", {
      y: "0",
      x: "0",
      display: "none",
    });
  });

  document.querySelector("#page3 .box6").addEventListener("click", () => {
    gsap.from("#project6", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onStart: () => {
        document.querySelector("#project6").style.display = "block";
      },
    });

      gsap.to("#main", {
        display: "none",
      });

    gsap.from(".p6-img .box6", {
      y: "10%",
      x: "-70%",
      scale: 1,
      opacity: 1,
      rotate: 18,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.from(".p6-txt h1", {
      y: 150,
      rotate: -17,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p6-para-txt p", {
      x: "100%",
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
    gsap.from(".p6-btn", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });
  });

  document.querySelector("#close6").addEventListener("click", () => {
    tl.to("#project6", {
      y: "-100%",
      display: "none",
    });

      gsap.to("#main", {
        display: "block",
      });

    tl.to("#project6", {
      y: "0",
    });
  });

  gsap.from(".p-txt h1", {
    y: 150,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "top 70%",
      end: "top 70%",
      scrub: 1,
    },
  });

  let draggerElm = document.querySelector(".swiper-wrapper");
  let viewBtn = document.querySelector(".more-btn");

  draggerElm.addEventListener("mousemove", () => {
    gsap.to("#cursor", {
      backgroundColor: "#f55630",
      width: "7vw",
      height: "7vw",
      innerHTML: "View",
    });

    gsap.to(".drag-sign", {
      opacity: 0,
    });
  });

  draggerElm.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      backgroundColor: "transparent",
      width: "4vw",
      height: "4vw",
      innerHTML: "",
    });

    gsap.to(".drag-sign", {
      opacity: 1,
    });
  });

  viewBtn.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      opacity: "0",
    });
  });

  viewBtn.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      opacity: "1",
    });
  });
}

dragSwipeAnimation();

/// page 4 text color changing

function aboutAnimation(color) {
  let h2 = document.querySelectorAll("#about h2");

  h2.forEach(function (elem) {
    let h2Text = elem.textContent;

    let splitedText = h2Text.split("");
    let clutter = "";

    splitedText.forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });

  gsap.to("#page4 h2 span", {
    color: color,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "top 55%",
      end: "top 0%",
      scrub: 2,
    },
  });
}
aboutAnimation("#0b0b0b");

gsap.from("#page4 h1", {
  y: 150,
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 65%",
    end: "top 65%",
    scrub: 2,
  },
});

function setupHoverEffect(containerSelector, linkSelector) {
  let container = document.querySelector(containerSelector);
  let headers = container.querySelectorAll("#socialbox h3");
  let link = container.querySelector(linkSelector);

  headers.forEach((element) => {
    element.style.display = "none";
  });

  container.addEventListener("mouseenter", () => {
    headers.forEach((element) => {
      element.style.display = "block";
    });
  });

  container.addEventListener("mouseleave", () => {
    headers.forEach((element) => {
      element.style.display = "none";
    });
  });

  container.addEventListener("mouseover", () => {
    link.style.display = "none";
  });

  container.addEventListener("mouseout", () => {
    link.style.display = "block";
  });
}

setupHoverEffect(".insta", ".insta #gram");
setupHoverEffect(".link", ".link #ldin");
setupHoverEffect(".git", ".git #hub");

function page5Actions() {
  gsap.from("#socialbox .sb", {
    x: "-100%",
    stagger: 0.2,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      start: "top 40%",
      end: "top 40%",
      scrub: 2,
    },
  });
}

// page5Actions();

function darkAndLight() {
  const toggleButton = document.getElementById("theme-toggle");

  //  const savedTheme = localStorage.getItem("theme");
  //  if (savedTheme) {
  //    document.documentElement.setAttribute("data-theme", savedTheme);
  //    toggleButton.textContent = savedTheme === "dark" ? "Light" : "Dark";
  //    toggleButton.style.backgroundColor =
  //      savedTheme === "dark" ? "#e2e1e1" : "#f55630";
  //  }

  toggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    // Toggle the theme
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      toggleButton.textContent = "Dark";
      toggleButton.style.backgroundColor = "#f55630";

      // localStorage.setItem("theme", "light");

      // Add transition effect
      document.body.style.transition =
        "background-color 0.5s ease, color 0.5s ease";
      if (window.innerWidth > 600) {
        page2ColorChange("#0b0b0b");
      }
      aboutAnimation("#0b0b0b");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleButton.textContent = "Light";
      toggleButton.style.backgroundColor = "#e2e1e1";

      // localStorage.setItem("theme", "dark");

      // Add transition effect
      document.body.style.transition =
        "background-color 0.5s ease, color 0.5s ease";
      if (window.innerWidth > 600) {
        page2ColorChange("#e2e1e1");
      }
      aboutAnimation("#e2e1e1");
    }
  });
}

darkAndLight();

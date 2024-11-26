function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" flagent since Locomotive Scroll is hijacking things
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

function loadingAnimation() {
  tl = gsap.timeline();

  gsap.to("#cursor", {
    opacity: 0,
  });

  gsap.from(".l-text img", {
    y: 250,
    opacity: 0,
    duration: 1.5,
    rotate: "15deg",
  });

  tl.from(".l-logo", {
    x: 250,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
  });

  tl.from("#count", {
    opacity: 0,
    onStart: () => {
      let h5timer = document.querySelector("#count");
      let grow = 0;

      setInterval(() => {
        if (grow < 100) {
          h5timer.innerHTML = `${grow++}%`;
        } else {
          h5timer.innerHTML = `${grow}%`;
        }
      }, 36);
    },
  });

  tl.to("#cursor", {
    opacity: 1,
  });

  tl.to("#loader", {
    y: "-100%",
    duration: 1.3,
    delay: 3.5,
    ease: "power4.inOut",
    onComplete: () => {
      document.querySelector("#loader").style.display = "none";
      document.querySelector(".l-img").style.display = "none";
      document.querySelector(".l-content").style.display = "none";
      
    },
  });

  tl.from(
    ".h-text img",
    {
      y: 150,
      opacity: 0,
      rotate: "12deg",
      duration: 0.9,
    },
    "-=0.15"
  );

  tl.from(
    "nav",
    {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
    },"-=0.3"
  );

}

loadingAnimation();

document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    left: dets.x ,
    top: dets.y ,
  });
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("mousemove", () => {
    console.log("mousemove");
    gsap.to("#cursor", {
      width: "3vw",
      height: "3vw",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    console.log("mouseleave");
    gsap.to("#cursor", {
      width: "2vw",
      height: "2vw",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

function pageAnimation() {
  tl = gsap.timeline();
  gsap.to("#page2 h1", {
    x: "-255%",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 0",
      end: "top -50%",
      scrub: 2,
      pin: true,
    },
  });

  tl.from("#page3 h1 ", {
    y: "250",
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "top 80%",
      end: "top 80%",
      scrub: 2,
      pin: true,
    },
    onStart: () => {
      gsap.from(".img1 img", {
        scale: 1.5,
        x: "-50%",
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.inOut",
      });

      gsap.from(
        ".img2 img",
        {
          scale: 1.5,
          y: "50%",
          opacity: 0,
          duration: 0.5,
          delay:0.5,
          ease: "power3.inOut",
        }
      );

      gsap.from(
        ".img3 img",
        {
          scale: 1.5,
          x: "50%",
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "power3.inOut",
        }
      );
    },
  });


  tl.from("#page4 h1", {
    y: "-250",
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "top 75%",
      end: "top 75%",
      scrub: 2,
      pin: true,
    },
    onComplete:() =>{
      gsap.to(".g-slider video", {
        x: "-180%",
        duration: 1,
        delay: 0.5,
        ease: "power4.inOut",
      });

       gsap.to(".g-slider2 video", {
         x: "180%",
         duration: 1,
         delay: 0.5,
         ease: "power4.inOut",
       });
    }
  });



  tl.from("#page5 h1", {
    y: "250",
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      start: "top 75%",
      end: "top 75%",
      scrub: 2,
      pin: true,
    },
  });

  tl.from(".game-card .gc-img", {
    y: "-100%",
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      start: "top 40%",
      end: "top 40%",
      scrub: 2,
      pin: true,
    },
  });

   tl.from(".text-down .gc-text", {
     y: "100%",
     opacity: 0,
     duration: 1,
     delay: 18,
     ease: "power3.inOut",
     scrollTrigger: {
       trigger: "#page5",
       scroller: "#main",
       start: "top 10%",
       end: "top 10%",
       scrub: 2,
       pin: true,
     },
   });

    tl.from(".platform img", {
      opacity: 0,
      duration: 1,
      delay: 18,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#page5",
        scroller: "#main",
        start: "top -5%",
        end: "top -5%",
        scrub: 2,
        pin: true,
      },
    });

}

pageAnimation();

function videoPlayer() {
  let vCursor = document.querySelector("#page2");
  const video = document.querySelector(".bg-image video");
  const vContainer = document.querySelector("#page2");
  const page2 = document.querySelector("#page2");
  const vBtn = document.querySelector(".v-btn");
  const vText = document.querySelector(".v-text");

  vContainer.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      video.style.opacity = 1;
      vBtn.innerHTML = `PAUSE`;
      vText.style.opacity = 0;
      gsap.to(".v-btn", {
        scale: 0.5,
        onStart: () => {
          vBtn.style.backgroundColor = "transparent";
          vBtn.style.border = "1px solid #000";
        },
      });
    } else {
      video.pause();
      video.style.opacity = 0;
      vBtn.innerHTML = `watch trailer`;
      vText.style.opacity = 1;
      gsap.to(".v-btn", {
        scale: 1,
        onStart: () => {
          vBtn.style.backgroundColor = "#000fff";
          vBtn.style.border = "none";
        },
      });
    }
  });

  page2.addEventListener("mouseleave", () => {
    video.pause();
    video.style.opacity = 0;
    vBtn.innerHTML = `watch trailer`;
    vText.style.opacity = 1;
    gsap.to(".v-btn", {
      scale: 1,
      onStart: () => {
        vBtn.style.backgroundColor = "#000fff";
        vBtn.style.border = "none";
      },
    });
  });

  vCursor.addEventListener("mousemove", (event) => {
    gsap.to(".v-btn", {
      left: event.clientX - 120,
      top: event.clientY - 100,
    });
    gsap.to("#cursor", {
      opacity: 0,
    });
  });

  vCursor.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      opacity: 0,
    });
  });

  vCursor.addEventListener("mouseleave", () => {
    gsap.to(".v-btn", {
      left: "65%",
      top: "11%",
    });
    gsap.to("#cursor", {
      opacity: 1,
    });
  });
}
videoPlayer();


document.querySelectorAll(".social-media a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      width: "3vw",
      height: "3vw",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      width: "2vw",
      height: "2vw",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import 'remixicon/fonts/remixicon.css'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function App() {
   
  const [showBg, setshowBg] = useState(false)
  const scrollToNextSection = () => {
    const nextSection = document.querySelector(".next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%"
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= .9) {
            const svg = document.querySelector(".svg")
            svg.style.display = "none"
            setshowBg(true)
            this.kill()
          }
        }
      })
  })
  useGSAP(() => {
    if (!showBg) return;
    gsap.to(".main", {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut"
    })
gsap.to(".bg", {
  scrollTrigger: {
    trigger: ".next-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
  y: "-10%",
  scale: 1.1,
  ease: "expo.inOut"
});


    const isMobile = window.innerWidth <= 768;
 
gsap.to(".soldier", {
  scale: isMobile ? 1.2 : 1.4,
  bottom: isMobile ? "0%" : "-16%",
  rotate: 0,
  duration: 2,
  delay: -0.8,
  ease: "Expo.easeInOut"
});
    gsap.to(".text", {
       scale: isMobile ? 0.8 : 1,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: "Expo.easeInOut"
    })
    gsap.utils.toArray(".reveal-text,.reveal-text-2").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power4.out",
  });
});
    const main = document.querySelector(".main")


    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40
      gsap.to(".imagesdiv .text", {
        x: `${xMove}%`
      })
      gsap.to(".imagesdiv .bg", {
        x: `${xMove * 0.2}%`
      })
    })
  }, [showBg])
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VII
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./src/assets/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showBg && <div className="main opacity-0 rotate-[-8deg] scale-[1.4] w-full h-full bg-black text-white font-bebas ">
        <div className="landing overflow-hidden relative w-full h-full md:h-screen bg-black">

          <div className="navbar z-[10] w-full px-6 py-6 md:px-10 md:py-10 absolute top-0 left-0">
            <div className="logo flex gap-4 md:gap-5 items-center">
              <div className="lines flex flex-col gap-[3px] md:gap-1">
                <div className="line w-8 h-[2px] md:w-12 md:h-1 bg-white"></div>
                <div className="line w-6 h-[2px] md:w-8 md:h-1 bg-white"></div>
                <div className="line w-4 h-[2px] md:w-5 md:h-1 bg-white"></div>
              </div>
              <h3 className="text-lg md:text-2xl -mt-[2px] md:-mt-[5px] leading-none">
                Activision
              </h3>
            </div>
          </div>


         <div className="imagesdiv overflow-hidden relative w-full h-screen">
  <img
    className="w-full bg scale-[1.7] rotate-[3deg] h-screen object-cover"
    src="./src/assets/bg.png"
    alt=""
  />

  <div
    className="text absolute left-1/2 -translate-x-1/2 flex flex-col 
    top-[33%] scale-[1.2] rotate-[-10deg] 
    md:scale-[1.4] md:top-20"
  >
    <h1 className="text-7xl md:text-8xl p-0 leading-none -ml-10 md:-ml-40">Call</h1>
    <h1 className="text-6xl md:text-8xl p-0 leading-none ml-8 md:ml-10">of</h1>
    <h1 className="text-7xl md:text-8xl p-0 leading-none -ml-10 md:-ml-40">Duty</h1>
  </div>
<img
  className="soldier absolute left-1/2 -translate-x-1/2 h-120 w-75 md:h-120 md:w-90"
  src="./src/assets/soldierimgnew.png"
  alt=""
/>
</div>

          <div className="btmbar w-full absolute bottom-0 bg-gradient-to-t from-black to-transparent left-0 py-10 px-6 md:py-15 md:px-10">
            <div className="relative w-full flex items-center justify-center md:justify-between">
              <div
                className="hidden md:flex items-center gap-4 cursor-pointer text-white"
                onClick={scrollToNextSection}
              >
                <i className="text-3xl ri-arrow-down-line"></i>
                <h3 className="text-base font-[Helvetica_Now_Display]">Scroll Down</h3>
              </div>
              <img
                className="absolute h-[40px] md:h-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./src/assets/ps5.png"
                alt=""
              />
            </div>
          </div>

        </div>
        <div className="w-full flex h-screen px-10 items-center justify-center py-20 next-section bg-black">
          <div className="cntr flex flex-col md:flex-row text-white w-full h-full md:h-[80%] gap-10">
            <div className="leftimg relative h-[300px] md:h-full w-full md:w-1/2 flex justify-center items-center">
              <img
                className="h-full md:h-100 w-64 md:w-80 object-contain md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:scale-[1.2]"
                src="./src/assets/soldier1.png"
                alt=""
              />
            </div>
            <div className="right w-full md:w-[30%] px-4 md:px-0 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl reveal-text ">Call of Duty</h1>
              <h2 className="text-3xl md:text-4xl pt-2 reveal-text">Black Ops VII</h2>
              <p className="mt-6 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                Step into the shadows with <strong>Call of Duty: Black Ops 7</strong>, where global conflict meets covert warfare. Operate behind enemy lines and make choices that shape the fate of the free world.
              </p>
              <p className="mt-3 text-base md:text-xl font-[Helvetica_Now_Display]">
                Featuring a gripping single-player campaign, adrenaline-fueled multiplayer battles, and a darker, evolved Zombies experience — Black Ops 7 redefines tactical combat.
              </p>
          <button className="group relative overflow-hidden bg-yellow-400 text-lg md:text-2xl rounded-xl hover:bg-yellow-500 mt-7 cursor-pointer px-6 py-4 text-black transition-transform duration-300 hover:scale-105">
  <span className="absolute w-full h-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-700 rounded-full -z-10"></span>
  Download Now
</button>

            </div>
          </div>
        </div>
        <div className="w-full flex h-screen px-5 md:px-10 items-center justify-center py-20 bg-black">
          <div className="cntr flex flex-col-reverse md:flex-row text-white w-full h-full md:h-[80%] items-center justify-center gap-10">
            <div className="right w-full md:w-[35%] px-4 md:px-0 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold reveal-text-2 ">Ghost Protocol</h1>
              <h2 className="text-3xl md:text-4xl pt-2 reveal-text-2 ">Covert Operations</h2>
              <p className="mt-6 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                Operate under the radar in high-risk environments. <strong>Black Ops 7</strong> drops you into classified missions that test your skills, strategy, and survival.
              </p>
              <p className="mt-3 text-base md:text-xl font-[Helvetica_Now_Display]">
                From stealth infiltration to chaotic firefights, your choices define the mission. This is where legends are made.
              </p>
              <p className="mt-6 md:mt-10 text-sm md:text-lg text-gray-300 font-[Helvetica_Now_Display]">
                Intel is limited. Backup is not guaranteed. Trust no one.
              </p>
              <button className="group relative overflow-hidden bg-yellow-400 text-lg md:text-2xl rounded-xl hover:bg-yellow-500 mt-7 cursor-pointer px-6 py-4 text-black transition-transform duration-300 hover:scale-105">
  <span className="absolute w-full h-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-700 rounded-full -z-10"></span>
Learn More
</button>

            </div>
            <div className="leftimg relative w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center">
              <img
                className="h-full md:h-[90%] w-64 md:w-80 object-contain md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:scale-[1.3]"
                src="./src/assets/soldier2.png"
                alt="Soldier 2"
              />
            </div>

          </div>
        </div>

        <footer className="bg-black font-[Helvetica_Now_Display] text-white px-6 py-12 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold uppercase tracking-wide">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Campaign</a>
            <a href="#" className="hover:underline">Multiplayer</a>
            <a href="#" className="hover:underline">Zombies</a>
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center mt-10">
            <img src="./src/assets/activision-logo.png" alt="Activision" className="h-6" />
            <img src="./src/assets/treyarch-logo.png" alt="Treyarch" className="h-6" />
            <img src="./src/assets/shg-logo.png" alt="Sledgehammer" className="h-6" />
            <img src="./src/assets/raven-logo.png" alt="Raven" className="h-6" />
            <img src="./src/assets/beenox-logo.png" alt="Beenox" className="h-6" />
            <img src="./src/assets/high-moon-logo.png" alt="High Moon" className="h-6" />
          </div>


          <div className="flex flex-col items-center mt-12">
            <div className="flex flex-wrap justify-center gap-6">
              <img src="./src/assets/esrb-privacy.jpg" alt="ESRB Rating" className="h-20" />
              <img src="./src//assets/cod-hub-esrb-en.png" alt="ESRB Privacy Certified" className="h-20" />
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center max-w-4xl">
              © 2025 Activision Publishing, Inc. Call of Duty, Black Ops, Warzone, Modern Warfare and all associated logos are trademarks of Activision.
              All other trademarks are property of their respective owners.
            </p>
          </div>
          <div className="flex flex-col items-center mt-6">
            <button className="mt-4 bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider">
              Manage Cookie Settings
            </button>
          </div>
        </footer>

      </div>}
    </>
  )
}

export default App

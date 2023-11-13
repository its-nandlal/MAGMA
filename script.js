function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

loco();


var cluter = "";

document.querySelector("#page2>h1").textContent.split("").forEach(function (dets) {
  cluter += `<span>${dets}</span>`;

  document.querySelector("#page2>h1").innerHTML = cluter;
})

gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2>h1>span`,
    scroller: `#main`,
    start: `-50% bottom`,
    end: `bottom top`,
    scrub: 0.5,
    // markers: true,
  },
  stagger: 0.5,
  color: `#fff`
})


function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canv-1-img/frames00007.png
canv-1-img/frames00010.png
canv-1-img/frames00013.png
canv-1-img/frames00016.png
canv-1-img/frames00019.png
canv-1-img/frames00022.png
canv-1-img/frames00025.png
canv-1-img/frames00028.png
canv-1-img/frames00031.png
canv-1-img/frames00034.png
canv-1-img/frames00037.png
canv-1-img/frames00040.png
canv-1-img/frames00043.png
canv-1-img/frames00046.png
canv-1-img/frames00049.png
canv-1-img/frames00052.png
canv-1-img/frames00055.png
canv-1-img/frames00058.png
canv-1-img/frames00061.png
canv-1-img/frames00064.png
canv-1-img/frames00067.png
canv-1-img/frames00070.png
canv-1-img/frames00073.png
canv-1-img/frames00076.png
canv-1-img/frames00079.png
canv-1-img/frames00082.png
canv-1-img/frames00085.png
canv-1-img/frames00088.png
canv-1-img/frames00091.png
canv-1-img/frames00094.png
canv-1-img/frames00097.png
canv-1-img/frames00100.png
canv-1-img/frames00103.png
canv-1-img/frames00106.png
canv-1-img/frames00109.png
canv-1-img/frames00112.png
canv-1-img/frames00115.png
canv-1-img/frames00118.png
canv-1-img/frames00121.png
canv-1-img/frames00124.png
canv-1-img/frames00127.png
canv-1-img/frames00130.png
canv-1-img/frames00133.png
canv-1-img/frames00136.png
canv-1-img/frames00139.png
canv-1-img/frames00142.png
canv-1-img/frames00145.png
canv-1-img/frames00148.png
canv-1-img/frames00151.png
canv-1-img/frames00154.png
canv-1-img/frames00157.png
canv-1-img/frames00160.png
canv-1-img/frames00163.png
canv-1-img/frames00166.png
canv-1-img/frames00169.png
canv-1-img/frames00172.png
canv-1-img/frames00175.png
canv-1-img/frames00178.png
canv-1-img/frames00181.png
canv-1-img/frames00184.png
canv-1-img/frames00187.png
canv-1-img/frames00190.png
canv-1-img/frames00193.png
canv-1-img/frames00196.png
canv-1-img/frames00199.png
canv-1-img/frames00202.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas()


var cluter = "";

document.querySelector("#page4>h1").textContent.split("").forEach(function (dets) {
  cluter += `<span>${dets}</span>`;

  document.querySelector("#page4>h1").innerHTML = cluter;
})

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    scroller: `#main`,
    start: `-50% bottom`,
    end: `bottom top`,
    scrub: 1,
    // markers: true,
  },
  stagger: 1,
  color: `#fff`,
})

function canvas1() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canv-2-img/bridges00004.png
canv-2-img/bridges00007.png
canv-2-img/bridges00010.png
canv-2-img/bridges00013.png
canv-2-img/bridges00016.png
canv-2-img/bridges00019.png
canv-2-img/bridges00022.png
canv-2-img/bridges00025.png
canv-2-img/bridges00028.png
canv-2-img/bridges00031.png
canv-2-img/bridges00034.png
canv-2-img/bridges00037.png
canv-2-img/bridges00040.png
canv-2-img/bridges00043.png
canv-2-img/bridges00046.png
canv-2-img/bridges00049.png
canv-2-img/bridges00052.png
canv-2-img/bridges00055.png
canv-2-img/bridges00058.png
canv-2-img/bridges00061.png
canv-2-img/bridges00064.png
canv-2-img/bridges00067.png
canv-2-img/bridges00070.png
canv-2-img/bridges00073.png
canv-2-img/bridges00076.png
canv-2-img/bridges00079.png
canv-2-img/bridges00082.png
canv-2-img/bridges00085.png
canv-2-img/bridges00088.png
canv-2-img/bridges00091.png
canv-2-img/bridges00094.png
canv-2-img/bridges00097.png
canv-2-img/bridges00100.png
canv-2-img/bridges00103.png
canv-2-img/bridges00106.png
canv-2-img/bridges00109.png
canv-2-img/bridges00112.png
canv-2-img/bridges00115.png
canv-2-img/bridges00118.png
canv-2-img/bridges00121.png
canv-2-img/bridges00124.png
canv-2-img/bridges00127.png
canv-2-img/bridges00130.png
canv-2-img/bridges00133.png
canv-2-img/bridges00136.png
canv-2-img/bridges00139.png
canv-2-img/bridges00142.png
canv-2-img/bridges00145.png
canv-2-img/bridges00148.png
canv-2-img/bridges00151.png
canv-2-img/bridges00154.png
canv-2-img/bridges00157.png
canv-2-img/bridges00160.png
canv-2-img/bridges00163.png
canv-2-img/bridges00166.png
canv-2-img/bridges00169.png
canv-2-img/bridges00172.png
canv-2-img/bridges00175.png
canv-2-img/bridges00178.png
canv-2-img/bridges00181.png
canv-2-img/bridges00184.png
canv-2-img/bridges00187.png
canv-2-img/bridges00190.png
canv-2-img/bridges00193.png
canv-2-img/bridges00196.png
canv-2-img/bridges00199.png
canv-2-img/bridges00202.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 55;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas1()

var cluter = "";

document.querySelector("#page6>h1").textContent.split("").forEach(function (dets) {
  cluter += `<span>${dets}</span>`;
  document.querySelector("#page6>h1").innerHTML = cluter;
})

gsap.to("#page6>h1>span", {
  scrollTrigger: {
    trigger: `#page6>h1>span`,
    scroller: `#main`,
    start: `-50% bottom`,
    end: `bottom top`,
    // markers: true,
    scrub: 1,
  },
  stagger: 1,
  color: `#fff`
})

function canvas2() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canv-3-img/1.webp?2
canv-3-img/2.webp?2
canv-3-img/3.webp?2
canv-3-img/4.webp?2
canv-3-img/5.webp?2
canv-3-img/6.webp?2
canv-3-img/7.webp?2
canv-3-img/8.webp?2
canv-3-img/9.webp?2
canv-3-img/10.webp?2
canv-3-img/11.webp?2
canv-3-img/12.webp?2
canv-3-img/13.webp?2
canv-3-img/14.webp?2
canv-3-img/15.webp?2
canv-3-img/16.webp?2
canv-3-img/17.webp?2
canv-3-img/18.webp?2
canv-3-img/19.webp?2
canv-3-img/20.webp?2
canv-3-img/21.webp?2
canv-3-img/22.webp?2
canv-3-img/23.webp?2
canv-3-img/24.webp?2
canv-3-img/25.webp?2
canv-3-img/26.webp?2
canv-3-img/27.webp?2
canv-3-img/28.webp?2
canv-3-img/29.webp?2
canv-3-img/30.webp?2
canv-3-img/31.webp?2
canv-3-img/32.webp?2
canv-3-img/33.webp?2
canv-3-img/34.webp?2
canv-3-img/35.webp?2
canv-3-img/36.webp?2
canv-3-img/37.webp?2
canv-3-img/38.webp?2
canv-3-img/39.webp?2
canv-3-img/40.webp?2
canv-3-img/41.webp?2
canv-3-img/42.webp?2
canv-3-img/43.webp?2
canv-3-img/44.webp?2
canv-3-img/45.webp?2
canv-3-img/46.webp?2
canv-3-img/47.webp?2
canv-3-img/48.webp?2
canv-3-img/49.webp?2
canv-3-img/50.webp?2
canv-3-img/51.webp?2
canv-3-img/52.webp?2
canv-3-img/53.webp?2
canv-3-img/54.webp?2
canv-3-img/55.webp?2
canv-3-img/56.webp?2
canv-3-img/57.webp?2
canv-3-img/58.webp?2
canv-3-img/59.webp?2
canv-3-img/60.webp?2
canv-3-img/61.webp?2
canv-3-img/62.webp?2
canv-3-img/63.webp?2
canv-3-img/64.webp?2
canv-3-img/65.webp?2
canv-3-img/66.webp?2
canv-3-img/67.webp?2
canv-3-img/68.webp?2
canv-3-img/69.webp?2
canv-3-img/70.webp?2
canv-3-img/71.webp?2
canv-3-img/72.webp?2
canv-3-img/73.webp?2
canv-3-img/74.webp?2
canv-3-img/75.webp?2
canv-3-img/76.webp?2
canv-3-img/77.webp?2
canv-3-img/78.webp?2
canv-3-img/79.webp?2
canv-3-img/80.webp?2
canv-3-img/81.webp?2
canv-3-img/82.webp?2
canv-3-img/83.webp?2
canv-3-img/84.webp?2
canv-3-img/85.webp?2
canv-3-img/86.webp?2
canv-3-img/87.webp?2
canv-3-img/88.webp?2
canv-3-img/89.webp?2
canv-3-img/90.webp?2
canv-3-img/91.webp?2
canv-3-img/92.webp?2
canv-3-img/93.webp?2
canv-3-img/94.webp?2
canv-3-img/95.webp?2
canv-3-img/96.webp?2
canv-3-img/97.webp?2
canv-3-img/98.webp?2
canv-3-img/99.webp?2
canv-3-img/100.webp?2
canv-3-img/101.webp?2
canv-3-img/102.webp?2
canv-3-img/103.webp?2
canv-3-img/104.webp?2
canv-3-img/105.webp?2
canv-3-img/106.webp?2
canv-3-img/107.webp?2
canv-3-img/108.webp?2
canv-3-img/109.webp?2
canv-3-img/110.webp?2
canv-3-img/111.webp?2
canv-3-img/112.webp?2
canv-3-img/113.webp?2
canv-3-img/114.webp?2
canv-3-img/115.webp?2
canv-3-img/116.webp?2
canv-3-img/117.webp?2
canv-3-img/118.webp?2
canv-3-img/119.webp?2
canv-3-img/120.webp?2
canv-3-img/121.webp?2
canv-3-img/122.webp?2
canv-3-img/123.webp?2
canv-3-img/124.webp?2
canv-3-img/125.webp?2
canv-3-img/126.webp?2
canv-3-img/127.webp?2
canv-3-img/128.webp?2
canv-3-img/129.webp?2
canv-3-img/130.webp?2
canv-3-img/131.webp?2
canv-3-img/132.webp?2
canv-3-img/133.webp?2
canv-3-img/134.webp?2
canv-3-img/135.webp?2
canv-3-img/136.webp?2
`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2()

var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: `#pg7-curcl`,
    scroller: `#main`,
    start: `-30% top`,
    end: `bottom top`,
    // markers: true,
    scrub: 1,
  }
})

tl1.to("#pg7-curcl", {
  opacity: 1
})

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: `#pg7-curcl`,
    scroller: `#main`,
    start: `-10% top`,
    end: `240% top`,
    // markers: true,
    scrub: 2,
  }
})

tl2.to("#curcl1", {
  transform: `translate(-50%, -50%) scale(1.5)`,
}, "t2l2")
tl2.to("#curcl2", {
  transform: `translate(-50%, -50%) scale(1.5)`,
}, "t2l2")


var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: `#pg7-curcl`,
    scroller: `#main`,
    start: `240% top`,
    end: `bottom top`,
    // markers: true,
    scrub: 2,
  }
})


tl3.to("#pg7-curcl", {
  opacity: 0,
})

var pg7video = document.querySelector("#pg7-vid>video")
var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: `#pg7-vid`,
    scroller: `#main`,
    start: `230% top`,
    end: `bottom top`,
    // markers: true,
    scrub: 0.90,
    pin: true,
  },
  onStart: () => {
    pg7video.play();
  }
})

tl4.to("#pg7-vid>video", {
  scale: 1,
  opacity: 1,
}, "t3l3l")

tl4.to("#pg7-vid-txt", {
  opacity: 1,
}, "t3l3l")

tl4.to("#pg7-vid-txt>h1", {
  rotate: `0deg`,
}, "t3l3l")


var tl5 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page10`,
    scroller: `#main`,
    start: `-20% top`,
    end: `1% top`,
    scrub: 1,
  }
})


tl5.to("#main",{
  backgroundColor: `#052087`
})



function canvas3() {

  const canvas = document.querySelector("#page10>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canv-4-img/cnv_001.jpg
canv-4-img/cnv_002.jpg 
canv-4-img/cnv_003.jpg 
canv-4-img/cnv_004.jpg
canv-4-img/cnv_005.jpg
canv-4-img/cnv_006.jpg
canv-4-img/cnv_007.jpg
canv-4-img/cnv_008.jpg
canv-4-img/cnv_009.jpg
canv-4-img/cnv_010.jpg
canv-4-img/cnv_011.jpg
canv-4-img/cnv_012.jpg
canv-4-img/cnv_013.jpg
canv-4-img/cnv_014.jpg
canv-4-img/cnv_015.jpg
canv-4-img/cnv_016.jpg
canv-4-img/cnv_017.jpg
canv-4-img/cnv_018.jpg
canv-4-img/cnv_019.jpg 
canv-4-img/cnv_020.jpg
canv-4-img/cnv_021.jpg
canv-4-img/cnv_022.jpg
canv-4-img/cnv_023.jpg
canv-4-img/cnv_024.jpg
canv-4-img/cnv_025.jpg
canv-4-img/cnv_026.jpg
canv-4-img/cnv_027.jpg
canv-4-img/cnv_028.jpg
canv-4-img/cnv_029.jpg
canv-4-img/cnv_030.jpg
canv-4-img/cnv_031.jpg
canv-4-img/cnv_032.jpg
canv-4-img/cnv_033.jpg
canv-4-img/cnv_034.jpg 
canv-4-img/cnv_035.jpg
canv-4-img/cnv_036.jpg
canv-4-img/cnv_037.jpg
canv-4-img/cnv_038.jpg
canv-4-img/cnv_039.jpg
canv-4-img/cnv_040.jpg
canv-4-img/cnv_041.jpg
canv-4-img/cnv_042.jpg
canv-4-img/cnv_043.jpg
canv-4-img/cnv_044.jpg
canv-4-img/cnv_045.jpg
canv-4-img/cnv_046.jpg
canv-4-img/cnv_047.jpg
canv-4-img/cnv_048.jpg
canv-4-img/cnv_049.jpg
canv-4-img/cnv_050.jpg
canv-4-img/cnv_051.jpg
canv-4-img/cnv_052.jpg
canv-4-img/cnv_053.jpg
canv-4-img/cnv_054.jpg
canv-4-img/cnv_055.jpg
canv-4-img/cnv_056.jpg
canv-4-img/cnv_057.jpg
canv-4-img/cnv_058.jpg
canv-4-img/cnv_059.jpg
canv-4-img/cnv_060.jpg
canv-4-img/cnv_061.jpg
canv-4-img/cnv_062.jpg
canv-4-img/cnv_063.jpg
canv-4-img/cnv_064.jpg
canv-4-img/cnv_065.jpg
canv-4-img/cnv_066.jpg
canv-4-img/cnv_067.jpg
canv-4-img/cnv_068.jpg
canv-4-img/cnv_069.jpg
canv-4-img/cnv_070.jpg
canv-4-img/cnv_071.jpg
canv-4-img/cnv_072.jpg
canv-4-img/cnv_073.jpg
canv-4-img/cnv_074.jpg
canv-4-img/cnv_075.jpg
canv-4-img/cnv_076.jpg
canv-4-img/cnv_077.jpg
canv-4-img/cnv_078.jpg
canv-4-img/cnv_079.jpg
canv-4-img/cnv_080.jpg
canv-4-img/cnv_081.jpg
canv-4-img/cnv_082.jpg
canv-4-img/cnv_083.jpg
canv-4-img/cnv_084.jpg 
canv-4-img/cnv_085.jpg 
canv-4-img/cnv_086.jpg 
canv-4-img/cnv_087.jpg 
canv-4-img/cnv_088.jpg 
canv-4-img/cnv_089.jpg 
canv-4-img/cnv_090.jpg 
canv-4-img/cnv_091.jpg 
canv-4-img/cnv_092.jpg 
canv-4-img/cnv_093.jpg 
canv-4-img/cnv_094.jpg 
canv-4-img/cnv_095.jpg 
canv-4-img/cnv_096.jpg 
canv-4-img/cnv_097.jpg 
canv-4-img/cnv_098.jpg 
canv-4-img/cnv_099.jpg 
canv-4-img/cnv_100.jpg 
canv-4-img/cnv_101.jpg 
canv-4-img/cnv_102.jpg 
canv-4-img/cnv_103.jpg 
canv-4-img/cnv_104.jpg 
canv-4-img/cnv_105.jpg 
canv-4-img/cnv_106.jpg 
canv-4-img/cnv_107.jpg 
canv-4-img/cnv_108.jpg 
canv-4-img/cnv_109.jpg 
canv-4-img/cnv_110.jpg 
canv-4-img/cnv_111.jpg 
canv-4-img/cnv_112.jpg 
canv-4-img/cnv_113.jpg 
canv-4-img/cnv_114.jpg 
canv-4-img/cnv_115.jpg 
canv-4-img/cnv_116.jpg 
canv-4-img/cnv_117.jpg 
canv-4-img/cnv_118.jpg 
canv-4-img/cnv_119.jpg 
canv-4-img/cnv_120.jpg 
canv-4-img/cnv_121.jpg 
canv-4-img/cnv_122.jpg 
canv-4-img/cnv_123.jpg 
canv-4-img/cnv_124.jpg 
canv-4-img/cnv_125.jpg 
canv-4-img/cnv_126.jpg 
canv-4-img/cnv_127.jpg 
canv-4-img/cnv_128.jpg 
canv-4-img/cnv_129.jpg 
canv-4-img/cnv_130.jpg 
canv-4-img/cnv_131.jpg 
canv-4-img/cnv_132.jpg 
canv-4-img/cnv_133.jpg 
canv-4-img/cnv_134.jpg 
canv-4-img/cnv_135.jpg 
canv-4-img/cnv_136.jpg 
canv-4-img/cnv_137.jpg 
canv-4-img/cnv_138.jpg 
canv-4-img/cnv_139.jpg 
canv-4-img/cnv_140.jpg 
canv-4-img/cnv_141.jpg 
canv-4-img/cnv_142.jpg 
canv-4-img/cnv_143.jpg 
canv-4-img/cnv_144.jpg 
canv-4-img/cnv_145.jpg 
canv-4-img/cnv_146.jpg 
canv-4-img/cnv_147.jpg 
canv-4-img/cnv_148.jpg 
canv-4-img/cnv_149.jpg 
canv-4-img/cnv_150.jpg 
canv-4-img/cnv_151.jpg 
canv-4-img/cnv_152.jpg 
canv-4-img/cnv_153.jpg 
canv-4-img/cnv_154.jpg 
canv-4-img/cnv_155.jpg 
canv-4-img/cnv_156.jpg 
canv-4-img/cnv_157.jpg 
canv-4-img/cnv_158.jpg 
canv-4-img/cnv_159.jpg 
canv-4-img/cnv_160.jpg 
canv-4-img/cnv_161.jpg 
canv-4-img/cnv_162.jpg 
canv-4-img/cnv_163.jpg 
canv-4-img/cnv_164.jpg 
canv-4-img/cnv_165.jpg 
canv-4-img/cnv_166.jpg 
canv-4-img/cnv_167.jpg 
canv-4-img/cnv_168.jpg 
canv-4-img/cnv_169.jpg 
canv-4-img/cnv_170.jpg 
canv-4-img/cnv_171.jpg 
canv-4-img/cnv_172.jpg 
canv-4-img/cnv_173.jpg 
canv-4-img/cnv_174.jpg 
canv-4-img/cnv_175.jpg 
canv-4-img/cnv_176.jpg 
canv-4-img/cnv_177.jpg 
canv-4-img/cnv_178.jpg 
canv-4-img/cnv_179.jpg 
canv-4-img/cnv_180.jpg 
canv-4-img/cnv_181.jpg 
canv-4-img/cnv_182.jpg 
canv-4-img/cnv_183.jpg 
canv-4-img/cnv_184.jpg 
canv-4-img/cnv_185.jpg 
canv-4-img/cnv_186.jpg 
canv-4-img/cnv_187.jpg 
canv-4-img/cnv_188.jpg 
canv-4-img/cnv_189.jpg 
canv-4-img/cnv_190.jpg 
canv-4-img/cnv_191.jpg 
canv-4-img/cnv_192.jpg 
canv-4-img/cnv_193.jpg 
canv-4-img/cnv_194.jpg 
canv-4-img/cnv_195.jpg 
canv-4-img/cnv_196.jpg 
canv-4-img/cnv_197.jpg 
canv-4-img/cnv_198.jpg 
canv-4-img/cnv_199.jpg 
canv-4-img/cnv_200.jpg 
canv-4-img/cnv_201.jpg 
canv-4-img/cnv_202.jpg 
canv-4-img/cnv_203.jpg 
canv-4-img/cnv_204.jpg 
canv-4-img/cnv_205.jpg 
canv-4-img/cnv_206.jpg 
canv-4-img/cnv_207.jpg 
canv-4-img/cnv_208.jpg 
canv-4-img/cnv_209.jpg 
canv-4-img/cnv_210.jpg 
canv-4-img/cnv_211.jpg 
canv-4-img/cnv_212.jpg 
canv-4-img/cnv_213.jpg 
canv-4-img/cnv_214.jpg 
canv-4-img/cnv_215.jpg 
canv-4-img/cnv_216.jpg 
canv-4-img/cnv_217.jpg 
canv-4-img/cnv_218.jpg 
canv-4-img/cnv_219.jpg 
canv-4-img/cnv_220.jpg 
canv-4-img/cnv_221.jpg 
canv-4-img/cnv_222.jpg 
canv-4-img/cnv_223.jpg 
canv-4-img/cnv_224.jpg 
canv-4-img/cnv_225.jpg 
canv-4-img/cnv_226.jpg 
canv-4-img/cnv_227.jpg 
canv-4-img/cnv_228.jpg 
canv-4-img/cnv_229.jpg 
canv-4-img/cnv_230.jpg 
canv-4-img/cnv_231.jpg 
canv-4-img/cnv_232.jpg 
canv-4-img/cnv_233.jpg 
canv-4-img/cnv_234.jpg 
canv-4-img/cnv_235.jpg 
canv-4-img/cnv_236.jpg 
canv-4-img/cnv_237.jpg 
canv-4-img/cnv_238.jpg 
canv-4-img/cnv_239.jpg 
canv-4-img/cnv_240.jpg 
canv-4-img/cnv_241.jpg 
canv-4-img/cnv_242.jpg 
canv-4-img/cnv_243.jpg 
canv-4-img/cnv_244.jpg 
canv-4-img/cnv_245.jpg 
canv-4-img/cnv_246.jpg 
canv-4-img/cnv_247.jpg 
canv-4-img/cnv_248.jpg 
canv-4-img/cnv_249.jpg 
canv-4-img/cnv_250.jpg 
canv-4-img/cnv_251.jpg 
canv-4-img/cnv_252.jpg 
canv-4-img/cnv_253.jpg 
canv-4-img/cnv_254.jpg 
canv-4-img/cnv_255.jpg 
canv-4-img/cnv_256.jpg 
canv-4-img/cnv_257.jpg 
canv-4-img/cnv_258.jpg 
canv-4-img/cnv_259.jpg 
canv-4-img/cnv_260.jpg 
canv-4-img/cnv_261.jpg 
canv-4-img/cnv_262.jpg 
canv-4-img/cnv_263.jpg 
canv-4-img/cnv_264.jpg 
canv-4-img/cnv_265.jpg 
canv-4-img/cnv_266.jpg 
canv-4-img/cnv_267.jpg 
canv-4-img/cnv_268.jpg 
canv-4-img/cnv_269.jpg 
canv-4-img/cnv_270.jpg 
canv-4-img/cnv_271.jpg 
canv-4-img/cnv_272.jpg 
canv-4-img/cnv_273.jpg
`;
    return data.split("\n")[index];
  }

  const frameCount = 273;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page10>canvas`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page10>canvas",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}

canvas3();


var tl6 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page11`,
    scroller: `#main`,
    start: `-20% top`,
    end: `top top`,
    scrub: 1,
    // markers: true,
  }
})


tl6.to("#page11>h2",{
  opacity: 1,
},"t6l6")
tl6.to("#page11>h3",{
  opacity: 1,
},"t6l6")
tl6.to("#page11>.hr2>h4",{
  opacity: 1,
},"t6l6")

var tl7 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page12`,
    scroller: `#main`,
    start: `-60% top`,
    end: `-40% top`,
    scrub: 1,
    // markers: true,
  }
})


tl7.to("#page12>h2",{
  opacity: 1,
},"t7l7")
tl7.to("#page12>h3",{
  opacity: 1,
},"t7l7")
tl7.to("#page12>.hr2>h4",{
  opacity: 1,
},"t7l7")

tl7.to("#page11>h2",{
  opacity: 0.3,
},"t7l7")
tl7.to("#page11>h3",{
  opacity: 0.3,
},"t7l7")
tl7.to("#page11>.hr2>h4",{
  opacity: 0.3,
},"t7l7")


var tl8 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page13`,
    scroller: `#main`,
    start: `-60% top`,
    end: `-40% top`,
    scrub: 1,
    // markers: true,
  }
})


tl8.to("#page13>h2",{
  opacity: 1,
},"t8l8")
tl8.to("#page13>h3",{
  opacity: 1,
},"t8l8")
tl8.to("#page13>.hr2>h4",{
  opacity: 1,
},"t8l8")

tl8.to("#page12>h2",{
  opacity: 0.3,
},"t8l8")
tl8.to("#page12>h3",{
  opacity: 0.3,
},"t8l8")
tl8.to("#page12>.hr2>h4",{
  opacity: 0.3,
},"t8l8")

var tl9 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page14`,
    scroller: `#main`,
    start: `-60% top`,
    end: `-40% top`,
    scrub: 1,
    // markers: true,
  }
})


tl9.to("#page14>h2",{
  opacity: 1,
},"t9l9")
tl9.to("#page14>h3",{
  opacity: 1,
},"t9l9")
tl9.to("#page14>.hr2>h4",{
  opacity: 1,
},"t9l9")

tl9.to("#page13>h2",{
  opacity: 0.3,
},"t9l9")
tl9.to("#page13>h3",{
  opacity: 0.3,
},"t9l9")
tl9.to("#page13>.hr2>h4",{
  opacity: 0.3,
},"t9l9")

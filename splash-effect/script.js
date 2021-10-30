const canv = document.getElementById("canvas"),
      ctx = canv.getContext("2d"),
      img = new Image(),
      imgMask = new Image();

imgMask.src = "https://res.cloudinary.com/dkcygpizo/image/upload/v1505176017/codepen/cloud-texture.png";
img.src = "https://splianel.sirv.com/z.png";

let speed = 0;
let requestId;

function draw() {
  speed += 10;

  const maskX = (canv.width - (70 + speed)) / 2,
        maskY = (canv.height - (40 + speed)) / 2;

  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.globalCompositeOperation = "source-over";

  ctx.drawImage(imgMask, maskX, maskY, 70 + speed, 40 + speed);

  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  requestId = window.requestAnimationFrame(draw);
}

img.onload = () => {
  canv.width = img.naturalWidth;
  canv.height = img.naturalHeight;

  setTimeout(() => {
    canv.style.display = "block";
    draw();
  }, 500);
}

canv.onclick = () => {
  speed = 0;
  draw();
  window.cancelAnimationFrame(requestId);
}
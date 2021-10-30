var HEIGHT = window.innerHeight,
    WIDTH = window.innerWidth;
var castle, 
    frame, maskIllu, cornerTL, cornerTR, cornerBL, cornerBR, frameLineTop, frameLineBottom, frameTopMiddle, frameBottomMiddle;

var sizeL = 1200;
var sizeM = 960;
var sizeS = 720;
var sizeXS = 480;

var pixiCanvas = document.getElementById("pixiCanvas");

var framePadding = -20;
var framePaddingTarget = 40;
var parallaxCoeff = 3;
var globalScale = 1;
var brightness = 8; //change brightness (gray layer)
var repulsion = .95;
var noise = .0;

var elements = [];
var mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};
var myDisplayResolution = window.devicePixelRatio;

var renderer = PIXI.autoDetectRenderer(800, 600, {
    antialiasing:true,
    transparent:true,
    resolution:1
});
pixiCanvas.appendChild(renderer.view);
var container = new PIXI.Container();

//*
var noiseFilter = new PIXI.filters.NoiseFilter()
noiseFilter.noise = noise;
var colorMatrix = new PIXI.filters.ColorMatrixFilter();
colorMatrix.brightness(brightness);
container.filters = [noiseFilter, colorMatrix];
//*/

var loader = new PIXI.loaders.Loader('https://s3-us-west-2.amazonaws.com/s.cdpn.io/264161/',10);

loader.add('world', 'world.json');
loader.once('complete', onAssetsLoaded);
loader.load();

window.addEventListener('resize', onWindowResize, false);

document.addEventListener("mousemove", onMouseMove);

function onMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
  globalScale = .8 + (event.clientX / WIDTH)*.4;
  repulsion = .95 + (event.clientX / WIDTH)*.05;
}

function onWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.resize(WIDTH, HEIGHT);
  repositionAll();
}

function repositionAll(speed){
  
  for(var i=0, l = elements.length; i<l; i++){
    var el = elements[i];
    el.updatePosition(speed);
  }
  repositionFrame();
}

function repositionFrame(){
  
  if (frameLineTop){
    frameLineTop.sprite.width = WIDTH - framePadding*2;
    frameLineTop.sprite.y = framePadding;
    frameLineTop.sprite.x = framePadding;
    
    frameLineBottom.sprite.width = WIDTH - framePadding*2;
    frameLineBottom.sprite.y = HEIGHT - framePadding;
    frameLineBottom.sprite.x = framePadding;
    
    frameLineRight.sprite.width = HEIGHT- framePadding*2;
    frameLineRight.sprite.x = WIDTH- framePadding;
    frameLineRight.sprite.y = framePadding;
    
    frameLineLeft.sprite.width = HEIGHT - framePadding*2;
    frameLineLeft.sprite.x = framePadding;
    frameLineLeft.sprite.y = framePadding;
    
    
    frameTopMiddle.sprite.x = WIDTH/2;
    frameTopMiddle.sprite.y = framePadding+5;
    
    frameBottomMiddle.sprite.x = WIDTH/2;
    frameBottomMiddle.sprite.y = HEIGHT - framePadding-5;
    
    cornerTL.sprite.x = framePadding;
    cornerTL.sprite.y = framePadding;
    
    cornerTR.sprite.x = WIDTH - framePadding;
    cornerTR.sprite.y = framePadding;
    
    cornerBR.sprite.x = WIDTH - framePadding;
    cornerBR.sprite.y = HEIGHT - framePadding;
    
    cornerBL.sprite.x = framePadding;
    cornerBL.sprite.y = HEIGHT - framePadding;
    
    backgroundPlane.sprite.width = WIDTH*2;
    backgroundPlane.sprite.height = HEIGHT*2;
  }
  
  
  if (maskIllu){
    maskIllu.clear();
    maskIllu.drawRect(framePadding+2, framePadding+2, WIDTH-framePadding*2, HEIGHT-framePadding*2);
  }
}

TweenMax.to(this, 4, {framePadding:framePaddingTarget, ease:Power4.easeInOut, onUpdate:repositionFrame});
    

var pic;

function onAssetsLoaded(loader,resources){
  
  backgroundPlane = new FloatingObject( "background-base.png", container, { tiling:true, depth:0, initPcX:0, initPcY:0, initDispY:0, initDispX:0, centerPivotX:false, centerPivotY:false, affectedByScale:false});
  
  illu = new PIXI.Sprite();
  container.addChild(illu);
  
  maskIllu = new PIXI.Graphics();
  container.addChild(maskIllu);
  illu.mask = maskIllu;

  cupolaLeft = new FloatingObject( "cupola-left.png", illu, { depth:-7, initPcX:.5, initPcY:0, initDispY:125, initDispX:-220, hideBelowX:sizeM });
  
  cupolaRight = new FloatingObject( "cupola-left.png", illu, { depth:-7, initPcX:.5, initPcY:0, initDispY:125, initDispX:220, initScaleX:-.5, hideBelowX:sizeM });
  
  starTopBig = new FloatingObject( "star-top-big.png", illu, { depth:-8, initPcX:.5, initPcY:.1, hideBelowX:sizeM });
  
  starTopSmall = new FloatingObject( "star-top-small.png", illu, { depth:-8, initPcX:.55, initPcY:.11, hideBelowX:sizeS });
  
  sun = new FloatingObject( "sun.png", illu, { depth:-6, initPcX:0, initPcY:0, initDispY:140, initDispX:240, hideBelowX:sizeXS });
  
  moonTopRight = new FloatingObject( "moon-top-right.png", illu, { depth:-6, initPcX:1, initPcY:0, initDispX:-125, initDispY:125, hideBelowX:sizeXS });
  
  saturnTopRight = new FloatingObject( "saturn-top-right.png", illu, { depth:-6, initPcX:1, initPcY:0, initDispX:-185, initDispY:60, hideBelowX:sizeS });
  
  saturnCloudTopRight = new FloatingObject( "saturn-cloud-top-right.png", illu, { depth:-7, initPcX:.77, initPcY:.15, hideBelowX:sizeL });
  
  planetTopLeft = new FloatingObject( "planet-top-left.png", illu, { depth:-7, initPcX:.35, initPcY:.13, hideBelowX:sizeS });
  
  meteorite = new FloatingObject( "meteorite.png", illu, { depth:-7, initPcX:.92, initPcY:.35, hideBelowX:sizeL });
  
  planetOrbitTopRight = new FloatingObject( "planet-orbit-top-right.png", illu, { depth:-6, initPcX:1, initPcY:0, initDispX:-145, initDispY:200 });

  mountainTopRight = new FloatingObject( "mountain-top-right.png", illu, { depth:-5, initPcX:.65, initPcY:.2, hideBelowX:sizeS });
  mountainTopLeft = new FloatingObject( "mountain-top-left.png", illu, { depth:-5, initPcX:.35, initPcY:.2, hideBelowX:sizeS });
  cloudTop = new FloatingObject( "cloud-top.png", illu, { depth:-5, initPcX:.5, initPcY:.2, hideBelowX:sizeS });
  
  cloudB3 = new FloatingObject( "cloud-b.png", illu, { depth:-4, initRotation:.1, initPcX:.71, initPcY:.27, hideBelowX:sizeS });
  
  shelfLeftSmall = new FloatingObject( "shelf-left-small.png", illu, { depth:-4, initPcX:.23, initPcY:.48, hideBelowX:sizeL, floatFrequency:.02, floatAmplitude:2, floatAngle:0});
  
  cloudB = new FloatingObject( "cloud-b.png", illu, { depth:-3, initPcX:.25, initPcY:.53, hideBelowX:sizeM });
  
  shipLeftSmall = new FloatingObject( "ship-left-small.png", illu, { depth:-3, initPcX:.28, initPcY:.55, hideBelowX:sizeS,floatFrequency:.035, floatAmplitude:3, floatAngle:0 });
  
  cloudA = new FloatingObject( "cloud-a.png", illu, { depth:-2, initPcX:.25, initPcY:.6, hideBelowX:sizeS });
  
  balloonRightSmall = new FloatingObject( "balloon-right-small.png", illu, { depth:-3, initPcX:.77, initPcY:.48, hideBelowX:sizeL,floatFrequency:.02, floatAmplitude:2, floatAngle:0 });
  
  balloonsCastle = new FloatingObject( "balloons-castle.png", illu, { depth:-1, initPcX:.25, initPcY:.15, hideBelowX:sizeM });
  
  troy = new FloatingObject( "troy.png", illu, { depth:2, initPcX:.7, initPcY:.45, hideBelowX:sizeM,floatFrequency:.02, floatAmplitude:3, floatAngle:0 });
  
  cloudC = new FloatingObject( "cloud-c.png", illu, { depth:2, initPcX:.03, initPcY:.27 });
  
  bubblesCastle = new FloatingObject( "bubbles-castle.png", illu, {depth:3, initPcX:.23, initPcY:.35, hideBelowX:sizeM,floatFrequency:.01, floatAmplitude:3, floatAngle:0 });
  
  smallCastle = new FloatingObject( "small-castle.png", illu, { depth:3, initPcX:.80, initPcY:.25, hideBelowX:sizeL,floatFrequency:.025, floatAmplitude:2, floatAngle:0});
  
  balloonTopRightSmall = new FloatingObject( "balloon-top-right-small.png", illu, { depth:3, initPcX:.70, initPcY:.22, hideBelowX:sizeL,floatFrequency:.02, floatAmplitude:1, floatAngle:0 });
  
  
  mountainLeftSmall = new FloatingObject( "mountain-left-small.png", illu, { depth:7, initPcX:.05, initPcY:.4, hideBelowX:sizeS});
  
  mountainLeftSmall4 = new FloatingObject( "mountain-right-small2.png", illu, { depth:7.5, initPcX:.12, initPcY:.46,  hideBelowX:sizeL });
    
  var mountain= new PIXI.Sprite();
  container.addChild(mountain)
  
  cloudA2 = new FloatingObject( "cloud-a.png", illu, { depth:8, initPcX:.13, initPcY:.5, hideBelowX:sizeL });
  
  cloudBottomLeft = new FloatingObject( "cloud-top.png", illu, { depth:8, initPcX:.35, initPcY:.75, initRotation:Math.PI/6, hideBelowX:sizeL });
  
  mountainLeftBig = new FloatingObject( "mountain-left-big.png", illu, { depth:9, initPcX:.15, initPcY:.69 });
  
  mountainRightSmall3 = new FloatingObject( "mountain-right-small3.png", illu, { depth:8, initPcX:.90, initPcY:.50   });
  
  smokeBig = new FloatingObject( "smoke-big.png", mountainRightSmall3.sprite, {initScaleX:1, initScaleY:1, initDispX:90, initDispY:30, hideBelowX:sizeL});
  
  smokeSmall = new FloatingObject( "smoke-small.png", mountainRightSmall3.sprite, {initScaleX:1, initScaleY:1, initDispX:70, initDispY:-80, hideBelowX:sizeM});
  
  cloudB2  = new FloatingObject( "cloud-b.png", illu, { depth:8, initRotation:-.75, initPcX:.71, initPcY:.57, hideBelowX:sizeS });
  
  mountainRightBig = new FloatingObject( "mountain-right-big.png", illu, { depth:9, initPcX:.80, initPcY:.65 });
  
  diamond = new FloatingObject( "diamond.png", mountainRightBig.sprite, {initScaleX:1, initScaleY:1, initDispX:440, initDispY:-60, hideBelowX:sizeM,floatFrequency:.02, floatAmplitude:4, floatAngle:0});
  
   cloudC2 = new FloatingObject( "cloud-c.png", illu, { depth:11, initPcX:.6, initPcY:.7, hideBelowX:sizeM });
  
  mountainRightSmall3 = new FloatingObject( "mountain-right-small2.png", illu, { depth:12, initPcX:.77, initPcY:.65, hideBelowX:sizeS });
  
  mountainRightSmall1 = new FloatingObject( "mountain-right-small1.png", illu, { depth:12, initPcX:.70, initPcY:.70, hideBelowX:sizeS });
  
  cloudC3 = new FloatingObject( "cloud-c.png", illu, { depth:13, initPcX:.55, initPcY:.75, initRotation:-Math.PI/6, hideBelowX:sizeL });
  
  mountainRightSmall2 = new FloatingObject( "mountain-right-small2.png", illu, { depth:12, initPcX:.95, initPcY:.65, hideBelowX:sizeS });
  
   cloudC4 = new FloatingObject( "cloud-c.png", illu, { depth:13, initPcX:.85, initPcY:.7, hideBelowX:sizeL });
   
  hillsBottomLeft = new FloatingObject( "hills-bottom-left.png", illu, { depth:11, initPcX:.15, initPcY:.74, hideBelowX:sizeS });
  
  
  
  waterSurfaceA = new FloatingObject( "water-surface-a.png", illu, { depth:12, initPcX:.25, initPcY:.91, initDispY:-65, hideBelowX:sizeM });
  
  waterSurfaceB = new FloatingObject( "water-surface-b.png", illu, { depth:12, initPcX:.35, initPcY:.91, initDispY:-65 });
  
  waterSurfaceC = new FloatingObject( "water-surface-c.png", illu, { depth:12, initPcX:.45, initPcY:.91, initDispY:-65 });
  
  waterSurfaceD = new FloatingObject( "water-surface-d.png", illu, { depth:12, initPcX:.65, initPcY:.91, initDispY:-65 });
  
  waterSurfaceE = new FloatingObject( "water-surface-e.png", illu, { depth:12, initPcX:.85, initPcY:.91, initDispY:-65 });
  
  castle = new FloatingObject( "castle.png", illu, { depth:14, initPcX:.5, initPcY:.45, floatFrequency:.03, floatAmplitude:5, floatAngle:0 });
  
  tentacleLeft = new FloatingObject( "tentacle-left.png", illu, { depth:18, initPcX:.5, initDispX:-115, initPcY:.92, initDispY:-70, hideBelowX:sizeL });
  
  tentacleRight = new FloatingObject( "tentacle-right.png", illu, { depth:18, initPcX:.5, initDispX:115, initPcY:.92, initDispY:-70, hideBelowX:sizeL });
  
  
  whale = new FloatingObject( "whale.png", illu, { depth:22, initPcX:.5, initPcY:.97, initDispY:-70, hideBelowX:sizeXS });
  
  
  beachLeft = new FloatingObject( "beach-left.png", illu, { depth:21, initPcX:.17, initPcY:.91 });
  
  beachRight = new FloatingObject( "beach-left.png", illu, { depth:21, initPcX:.9, initPcY:.91, initScaleX:-.5 });
  
  smallShipBottomRight = new FloatingObject( "small-ship-bottom-right.png", illu, { depth:21, initPcX:.82, initPcY:.8});
  
  swordTreeLeft = new FloatingObject( "sword-tree-left.png", illu, { depth:22, initPcX:.17, initPcY:.91 });
  
  treesLeft = new FloatingObject( "trees-left.png", illu, { depth:22, initPcX:.11, initPcY:.86 });
  
  columnLeft = new FloatingObject( "column-left.png", illu, { depth:25, initPcX:.05, initPcY:1, initDispY:-150 });
  
  treeBottomRight = new FloatingObject( "tree-bottom-right.png", illu, { depth:25, initPcX:.95, initPcY:1, initDispY:-150 });
  
  spartan = new FloatingObject( "spartan.png", illu, { depth:26, initPcX:.3, initPcY:1, initDispY:-110, hideBelowX:sizeS });
  
  viking = new FloatingObject( "viking.png", illu, { depth:26, initPcX:.7, initPcY:1, initDispY:-110, hideBelowX:sizeS });
  
  
  frame = new PIXI.Sprite();
  container.addChild(frame);
  
  
  frameLineTop = new FloatingObject( "frame-line.png", frame, { centerPivotX:false, initDispX:framePadding, initDispY:framePadding, affectedByScale:false});
  
  frameLineBottom = new FloatingObject( "frame-line.png", frame, { centerPivotX:false, initDispX:framePadding, initPcY:1, initDispY:-framePadding, affectedByScale:false});
  
  frameLineLeft = new FloatingObject( "frame-line.png", frame, { centerPivotX:false, initRotation:Math.PI/2, initDispX:framePadding, initDispY:framePadding, affectedByScale:false });
  
  frameLineRight = new FloatingObject( "frame-line.png", frame, { centerPivotX:false, initRotation:Math.PI/2, initPcX:1, initDispX:-framePadding, initDispY:framePadding, affectedByScale:false });
  
  frameTopMiddle = new FloatingObject( "frame-top-middle.png", frame, { initPcX:.5, initDispY:framePadding+5, affectedByScale:false });
  frameBottomMiddle = new FloatingObject( "frame-top-middle.png", frame, { initPcX:.5, initPcY:1, initDispY:-framePadding-5, initRotation:Math.PI, affectedByScale:false });
  
  cornerTL = new FloatingObject( "frame-corner.png", frame, { initDispX:framePadding, initDispY:framePadding, affectedByScale:false });
  cornerTR = new FloatingObject( "frame-corner.png", frame, { initPcX:1, initDispX:-framePadding, initDispY:framePadding, affectedByScale:false });
  cornerBL = new FloatingObject( "frame-corner.png", frame, { initDispX:framePadding, initPcY:1, initDispY:-framePadding, affectedByScale:false });
  cornerBR = new FloatingObject( "frame-corner.png", frame, { initPcX:1, initDispX:-framePadding, initPcY:1, initDispY:-framePadding, affectedByScale:false });
  
  onWindowResize();
  animate();
}

var FloatingObject = function(texName, parent, params){
  this.params = params || {};
  this.initPcX = this.params.initPcX || 0;
  this.initPcY = this.params.initPcY || 0;
  this.initDispX = this.params.initDispX || 0;
  this.initDispY = this.params.initDispY || 0;
  this.depth = this.params.depth || 0;
  this.tiling = (this.params.tiling) ? true : false;
  this.initRotation = this.params.initRotation || 0; 
  this.initScaleX = this.params.initScaleX || .5;
  this.initScaleY = this.params.initScaleY || .5;
  this.affectedByScale = (this.params.affectedByScale==false)? false : true;
  this.centerPivotX = (this.params.centerPivotX==false) ? false : true;
  this.centerPivotY = (this.params.centerPivotY==false)? false : true;
  this.hideBelowX = this.params.hideBelowX || 0;
  this.hideBelowY = this.params.hideBelowY || 0;
  this.floatFrequency = this.params.floatFrequency || 0;
  this.floatAmplitude= this.params.floatAmplitude || 0;
  this.floatAngle = this.params.floatAngle || 0;
  
  this.texName = texName;
  this.visible = false;
  
  this.parent = parent;
  if (this.tiling){
    this.sprite = PIXI.TilingSprite.fromFrame(texName);
  }else{
    this.sprite = PIXI.Sprite.fromFrame(texName);  
  }
  
  
  if (this.centerPivotX) this.sprite.pivot.x = this.sprite.width/2;
  if (this.centerPivotY) this.sprite.pivot.y = this.sprite.height/2;
    
  
  
  this.parent.addChild(this.sprite);
  elements.push(this);
  
  this.updatePosition();
}

FloatingObject.prototype.updatePosition = function(speed){
  var sp = speed || 0;
  
  var floatY = 0;
  
  if (this.floatFrequency>0){
    this.floatAngle += this.floatFrequency;
    floatY = Math.cos(this.floatAngle)*this.floatAmplitude*2;
  }
  
  var tx = (WIDTH*this.initPcX) + this.initDispX - mousePos.x * this.depth * parallaxCoeff;
  var ty = (HEIGHT*this.initPcY) + this.initDispY + floatY + mousePos.y * this.depth * parallaxCoeff;
  
  var tsx = this.initScaleX;
  var tsy = this.initScaleY;
  
  
  if (this.affectedByScale){
    var ratioS = (1 + ((this.depth-18)/100));
    var ratioT = (1 + ((this.depth-18)/50));
    
    tsx *= globalScale * ratioS;
    tsy *= globalScale * ratioS;
    
    tx = (WIDTH/2) + (tx - WIDTH/2) * globalScale * repulsion; 
    ty = (HEIGHT/2) + (ty - HEIGHT/2) * globalScale * repulsion; 
  }
  
  this.sprite.rotation = this.initRotation;  
  
  // not visible but it should be visible
  if (!this.visible && WIDTH > this.hideBelowX && HEIGHT > this.hideBelowY){
    this.visible = true;
    TweenMax.to(this.sprite.scale, 1, {x:tsx, y:tsy, ease:Power4.easeInOut});
    this.sprite.x = tx;
    this.sprite.y = ty;
    return;
  // not visible and it should stay not visible
  }else if (!this.visible){
    this.sprite.x = tx;
    this.sprite.y = ty;
    return;
    
  // visible but it should be not visible
  }else if (this.visible && (WIDTH < this.hideBelowX || HEIGHT < this.hideBelowY)){
    this.visible = false;
    TweenMax.killTweensOf(this.sprite.scale);
    TweenMax.to(this.sprite.scale, 1, {x:0, y:0, ease:Power4.easeInOut});
    
    return;
  }
  
  this.visible = true;
  
  if (this.affectedByScale){
    this.sprite.x += (tx-this.sprite.x) *.1;
    this.sprite.y += (ty-this.sprite.y) *.1;
    this.sprite.scale.x += (tsx-this.sprite.scale.x)*.1;
    this.sprite.scale.y += (tsy-this.sprite.scale.y)*.1;
    
    //TweenMax.to(this.sprite.scale, .5, {x:tsx, y:tsy, ease:Power4.easeInOut});
  
  }else{
    this.sprite.x = tx;
    this.sprite.y = ty;
    this.sprite.scale.x = tsx;
    this.sprite.scale.y = tsy;
  }

  
  //this.sprite.visible = (WIDTH > this.hideBelowX) && (HEIGHT > this.hideBelowY);
}


function animate() {
  requestAnimationFrame( animate );
  repositionAll();
  renderer.render(container);
}
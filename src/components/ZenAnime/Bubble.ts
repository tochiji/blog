export class Bubble {
  x: number;
  y: number;
  size: number;
  r: number;
  g: number;
  b: number;
  width: number;
  height: number;
  constructor(_x:number, _y:number, _width:number, _height:number) {
    this.x = _x;
    this.y = _y;
    this.size = this.random(20, 100);
    this.r = this.random(0, 255);
    this.g = this.random(0, 255);
    this.b = this.random(0, 255);
    this.width = _width;
    this.height = _height;
  }

  random(left: number, right: number) {
    const range = right - left;
    return range * Math.random() + left;
  }

  move() {
    this.x += this.random(-0.8, 0.8);
    this.y += this.random(-0.9, -0.6);
    if (this.y < -this.size) {
      this.y = this.random(this.height, this.height + 100);
    }
    if (this.x > this.width) {
      this.x = 0;
    }
    if (this.x < -this.size) {
      this.x = this.width;
    }
  }
}

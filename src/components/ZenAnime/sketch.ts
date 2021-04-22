import p5 from "p5";

import { Bubble } from "./Bubble";

export const sketch = (p: p5) => {
  let bubbles: Bubble[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for (let i = 0; i < 100; i++) {
      bubbles[i] = new Bubble(
        p.random(p.width),
        p.random(0, p.windowHeight),
        p.windowWidth,
        p.windowHeight,
      );
    }
  };

  p.draw = () => {
    p.clear();
    for (let i = 0; i < bubbles.length; i++) {
      show(bubbles[i]);
      bubbles[i].move();
    }
  };

  function show(b: Bubble) {
    // p.stroke(255,255,255,10);
    p.strokeWeight(0);
    p.fill(b.r, b.g, b.b, 12);
    p.ellipse(b.x, b.y, b.size, b.size);
  }
};

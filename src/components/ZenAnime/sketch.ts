import p5 from "p5";

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth,p.windowHeight);
  };

  p.draw = () => {
    p.clear();
    // p.background(200);
    let squareColor = p.color(100, 50, 100);
    squareColor.setAlpha(128 + 128 * p.sin(p.millis() / 1000));
    p.fill(squareColor);
    p.ellipse(800, 800, 80, 80);
  };
};

import p5 from "p5";

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(2000,2000);
  };

  p.draw = () => {
    p.ellipse(50, 50, 80, 80);
  };
};

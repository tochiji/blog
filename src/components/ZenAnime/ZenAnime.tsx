import p5 from "p5";
import React, { useEffect, useRef } from "react";

import { sketch } from "./sketch";
import * as classes from "./ZenAnime.module.css";

export const ZenAnime = () => {
  const ref = useRef(null);

  useEffect(() => {
    new p5(sketch, ref.current || undefined);
  }, []);

  return <div className={classes.sketch} ref={ref} />;
};

import React, { useEffect, useRef } from "react";

import { sketch } from "./sketch";
import * as classes from "./ZenAnime.module.css";

export const ZenAnime = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== `undefined`) {
        const p5 = require('p5');
        new p5(sketch, ref.current || undefined);
    }
  }, []);

  return <div className={classes.sketch} ref={ref} />;
};

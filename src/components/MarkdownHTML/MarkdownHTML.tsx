import React from "react";

import * as classes from "./MarkdownHTML.module.css";

type Props = {
  html: string;
};

export const MarkdownHTML = ({ html }: Props) => (
  <div className={classes.wrapper} dangerouslySetInnerHTML={{ __html: html }} />
);

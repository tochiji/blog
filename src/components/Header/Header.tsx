import { Link } from "gatsby";
import React from "react";

import * as classes from "./Header.module.css";

export const Header = () => {
  return (
    <header className={classes.headerRoot}>
      <div className={classes.headerInner}>
        <LogoLink />
        <PostsLink />
      </div>
    </header>
  );
};

const LogoLink = () => (
  <Link to="/" className={classes.link}>
    <span className={classes.logoMark}>&gt;</span>tochiji
    <span className={classes.logoCursor}></span>
  </Link>
);

const PostsLink = () => (
  <Link to="/posts" className={classes.postLink}>
    <span className={classes.posts}>Posts</span>
  </Link>
);

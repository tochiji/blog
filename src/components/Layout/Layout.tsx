import React, { ReactNode } from "react";

import { Footer } from "../Footer";
import { Head } from "../Head";
import { Header } from "../Header";
import { ZenAnime } from "../ZenAnime";
import * as classes from "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  image: string;
  slug: string;
  isTop: boolean;
  isBlogPost: boolean;
  meta: [
    {
      name: string;
      content: string;
    },
  ];
};

export const Layout = ({
  children,
  title,
  description,
  image,
  slug,
  isTop = false,
  isBlogPost = false,
  meta,
}: Partial<Props>) => {
  if (typeof window !== `undefined`) {
    const innerHeight = window.innerHeight;
    document.documentElement.style.height = `${innerHeight}px`;
  }

  return (
    <div className={classes.container}>
      <Head
        title={title}
        description={description}
        image={image}
        slug={slug}
        isBlogPost={isBlogPost}
        meta={meta}
      />

      <Header />

      <main className={classes.main}>{children}</main>
      {isTop && <ZenAnime />}
      <Footer />
    </div>
  );
};

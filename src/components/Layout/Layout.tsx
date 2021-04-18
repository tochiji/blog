import React, { ReactNode } from "react";

import { Footer } from "../Footer";
import { Head } from "../Head";
import { Header } from "../Header";
import * as classes from "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  image: string;
  slug: string;
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
  isBlogPost = false,
  meta
}: Partial<Props>) => {
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

      <Footer />
    </div>
  );
};

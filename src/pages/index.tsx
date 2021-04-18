import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { Layout } from "../components/Layout";
import * as classes from "../styles/pages/index.module.css";

const query = graphql`
  query Top {
    site {
      siteMetadata {
        title
        description
        image
        siteUrl
      }
    }
  }
`;


const Home = () => {
  const data = useStaticQuery<GatsbyTypes.TopQuery>(query);
  const siteMetadata = data.site?.siteMetadata;

  const pageTitle = siteMetadata?.title
  const metaDescription = siteMetadata?.description;

  return (
    <Layout>
      <section className={classes.wrapper}>
        <h1>{pageTitle}</h1>
        <h2>{metaDescription}</h2>
      </section>
    </Layout>
  );
};

export default Home;

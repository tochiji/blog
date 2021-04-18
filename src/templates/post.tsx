import { graphql, Link, PageProps } from "gatsby";
import React from "react";

import { Layout } from "../components/Layout";
import { MarkdownHTML } from "../components/MarkdownHTML";
import * as classes from "../styles/pages/post.module.css";

export const query = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        image
      }
      fields {
        slug
      }
    }
  }
`;

type Post = {
  fields: { slug: string };
  frontmatter: { title: string };
};

type Props = PageProps<GatsbyTypes.PostQuery> & {
  pageContext: {
    next: Post | null;
    previous: Post | null;
  };
};

const Post = ({ data }: Props) => {
  const title = data.markdownRemark?.frontmatter?.title;
  const description = data.markdownRemark?.frontmatter?.description;
  const date = data.markdownRemark?.frontmatter?.date;
  const image = data.markdownRemark?.frontmatter?.image;
  const slug = data.markdownRemark?.fields?.slug;
  const html = data.markdownRemark?.html;

  return (
    <Layout
      title={title}
      description={description}
      image={image}
      slug={slug}
      isBlogPost
    >
      <article>
        <div className={classes.head}>
          <h1 className={classes.title}>{title}</h1>

          <p className={classes.date}>
            {date}
          </p>

          {image && (
            <div className={classes.keyVisual}>
              <img src={image} width="100%" alt="" />
            </div>
          )}
        </div>

        <div className={classes.content}>
          <MarkdownHTML html={html || ''} />
        </div>
      </article>


      <div className={classes.links}>
        <div className={classes.move}>
          <Link to="/posts" className={classes.moveLink}>
            記事一覧に戻る
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Post;

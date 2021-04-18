import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { Layout } from "../components/Layout";
import * as classes from "../styles/pages/posts.module.css";

const query = graphql`
  query Posts {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

type Post = {
  path: string;
  title: string;
  date: string;
  year: number;
};

type PostList = Post[];

const Posts = () => {
  const data = useStaticQuery<GatsbyTypes.PostsQuery>(query);

  const posts: PostList = data.posts?.edges.map((v) => ({
    path: v.node.fields?.slug || '',
    title: v.node.frontmatter?.title || '',
    date: v.node.frontmatter?.date || '',
    year: Number(v.node.frontmatter?.date?.split('-')[0]) || 0,
  }));

  const yearList = Array.from(new Set(posts.map((v) => v.year))).sort(
    (a, b) => b - a,
  );

  return (
    <Layout>
      <section className={classes.posts}>
        <h1>Posts</h1>
        {yearList.map((y) => (
          <div key={y} className={classes.postsGroup}>
            <div className={classes.postYear}>{y}</div>
            <ul className={classes.postsList}>
              {posts
                .filter((p) => p.year === y)
                .map((v) => (
                  <li key={v.path} className={classes.postItem}>
                    <a href={v.path}>
                      <span className={classes.postTitle}>{v.title}</span>
                      <span className={classes.postDay}>{v.date}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Posts;

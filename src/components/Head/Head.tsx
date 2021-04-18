import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const query = graphql`
  query Head {
    site {
      siteMetadata {
        title
        description
        image
        twitterImage
        siteUrl
        social {
          twitter {
            account
          }
        }
      }
    }
  }
`;

type Props = {
  title: string;
  description: string;
  image: string;
  slug: string;
  isBlogPost: boolean;
  meta: Array<{
    name: string;
    content: string;
  }>;
};

export const Head = ({
  title,
  description,
  image,
  slug,
  isBlogPost = false,
  meta = [],
}: Partial<Props>) => {
  const data = useStaticQuery<GatsbyTypes.HeadQuery>(query);
  const siteMetadata = data.site?.siteMetadata;
  let siteUrl: string;
  if (process.env.NODE_ENV === 'production') {
    siteUrl = siteMetadata?.siteUrl || '';
  } else {
    siteUrl = 'https://localhost:8000';
  }

  const pageTitle = title
    ? `${title} | ${siteMetadata?.title}`
    : siteMetadata?.title;
  const metaDescription = description || siteMetadata?.description;
  const metaImage = image ? siteUrl + image : siteUrl + siteMetadata?.image;
  const twitterImage = siteUrl + siteMetadata?.twitterImage;
  const metaUrl = slug ? siteUrl + slug : siteUrl;

  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={pageTitle}
      link={[
        {
          rel: 'icon',
          href: '/images/favicon.ico',
        },
      ]}
      meta={[
        ...meta,
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'image',
          content: metaImage,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:site_name',
          content: siteMetadata?.title,
        },
        {
          property: 'og:type',
          content: isBlogPost ? 'article' : 'website',
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: `${siteMetadata?.social?.twitter?.account}`,
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: twitterImage,
        },
      ]}
    />
  );
};

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FiGithub, FiTwitter } from "react-icons/fi";

import * as classes from "./Footer.module.css";

const query = graphql`
  query Footer {
    site {
      siteMetadata {
        social {
          twitter {
            url
          }
          github {
            url
          }
        }
      }
    }
  }
`

export const Footer = () => {
  const data = useStaticQuery<GatsbyTypes.FooterQuery>(query)
  const social = data.site?.siteMetadata?.social

  return (
    <footer className={classes.wrapper}>

      <ul className={classes.social}>
        <li>
          <a href={social?.twitter?.url} className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <FiTwitter size={22} />
          </a>
        </li>
        <li>
          <a href={social?.github?.url} className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <FiGithub size={22} />
          </a>
        </li>
      </ul>

      <p className={classes.copyright}>© 2021 tochiji</p>
    </footer>
  )
}

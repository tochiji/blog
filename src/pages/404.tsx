import React from "react";

import { Layout } from "../components/Layout";
import * as classes from "../styles/pages/404.module.css";

const NotFound = () => (
  <Layout
    title="404 Page not found"
    meta={[
      {
        name: 'robots',
        content: 'noindex',
      },
    ]}
  >
    <div className={classes.wrapper}>
        <h2 className={classes.title}>404</h2>
        <div>ページが見つかりません</div>
    </div>
  </Layout>
)

export default NotFound

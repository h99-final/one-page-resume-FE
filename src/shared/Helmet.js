import { Helmet } from "react-helmet";
import React from "react";

const Seo = ({ title, description, id, keywords }) => {
  const url = `https://poug.me/portfolio/${id}`;
  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          name: "keywords",
          content: keywords.join(),
        },
      ]}
      links={[
        {
          rel: "canonical",
          href: url,
        },
      ]}
    />
  );
};
export default Seo;

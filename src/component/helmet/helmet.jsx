
import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetComponent = ({ title, description, keywords, ogTitle, ogDescription, ogUrl, ogImage, ogImageAlt, ogImageWidth, ogImageHeight }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property='og:image:width' content={ogImageWidth} />
      <meta property='og:image:height' content={ogImageHeight} />
    </Helmet>
  );
};

export default HelmetComponent;

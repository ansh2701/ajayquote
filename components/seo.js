import Head from "next/head";

const Seo = ({ seo, slug }) => {
  const defaultSeo = {
    metaDescription:
      "India's Largest Investor Community |\nA Community wherein members interact and grow their wealth.",
    metaTitle: "The Dalal Times",
    shareImage: {
      url: "https://res.cloudinary.com/mrxox/image/upload/v1627476000/Whats_App_Image_2021_07_27_at_17_51_21_0907e4c81e.png",
    },
  };
  const siteName = "The Dalal Times";
  const siteUrl = `https://thedalaltimes.com/${slug}`;

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    // Get full image URL
    shareImage: seoWithDefaults.shareImage.url,
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      <meta property="og:url" content={siteUrl} key="og:url" />
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={siteUrl} />
    </Head>
  );
};

export default Seo;

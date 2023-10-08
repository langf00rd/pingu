import { MetaProps } from "@/interface";
import { META_CONTENT } from "@/lib";
import Head from "next/head";

const Meta = (props: MetaProps) => {
  return (
    <>
      <Head>
        {/* Global Metadata */}
        <meta name="robots" content="follow, index" />
        <meta name="title" content={props.title || META_CONTENT.title} />
        <meta
          name="description"
          content={props.description ?? META_CONTENT.description}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta name="keywords" content={META_CONTENT.keywords} />
        <title>{props.title || META_CONTENT.title}</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={META_CONTENT.siteName} />
        <meta property="og:url" content={props.url ?? META_CONTENT.url} />
        <meta property="og:title" content={props.title || META_CONTENT.title} />
        <meta
          property="og:description"
          content={props.description ?? META_CONTENT.description}
        />
        <meta property="og:image" content={props.image ?? META_CONTENT.image} />
        <meta property="og:image:alt" content={props.imageAlt ?? META_CONTENT.imageAlt} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={props.url ?? META_CONTENT.url} />
        <meta property="twitter:title" content={props.title || META_CONTENT.title} />
        <meta
          property="twitter:description"
          content={props.description ?? META_CONTENT.description}
        />
        <meta property="twitter:image" content={props.image ?? META_CONTENT.image} />
        <meta property="twitter:domain" content={props.url ?? META_CONTENT.url} />
        <meta name="twitter:creator" content={META_CONTENT.twitterCreator} />
        <meta
          name="twitter:image:alt"
          content={props.imageAlt ?? META_CONTENT.imageAlt}
        />
      </Head>
    </>
  );
};

export default Meta;

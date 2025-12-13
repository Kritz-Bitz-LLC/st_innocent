import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Saint Innocent Orthodox Church in Olmsted Falls, Ohio. A vibrant Orthodox Christian community serving God and neighbor through worship, education, fellowship, and outreach." />
        <meta name="keywords" content="Orthodox Church, Orthodox Christianity, Olmsted Falls, Ohio, St. Innocent, OCA, Orthodox Church in America, Christian worship, Orthodox parish" />
        <meta name="author" content="Saint Innocent Orthodox Church" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saintinnocent.org/" />
        <meta property="og:title" content="Saint Innocent Orthodox Church - Olmsted Falls, Ohio" />
        <meta property="og:description" content="A vibrant Orthodox Christian community serving God and neighbor through worship, education, fellowship, and outreach." />
        <meta property="og:image" content="https://saintinnocent.org/img/hero_background.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://saintinnocent.org/" />
        <meta name="twitter:title" content="Saint Innocent Orthodox Church - Olmsted Falls, Ohio" />
        <meta name="twitter:description" content="A vibrant Orthodox Christian community serving God and neighbor through worship, education, fellowship, and outreach." />
        <meta name="twitter:image" content="https://saintinnocent.org/img/hero_background.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://saintinnocent.org/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/assets/ico.png" type="image/png" />
          <link rel="apple-touch-icon" href="/assets/ico.png" />
          <link rel="shortcut icon" href="/assets/ico.png" type="image/png" />
          <link rel="icon" href="/assets/ico_svg.svg" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

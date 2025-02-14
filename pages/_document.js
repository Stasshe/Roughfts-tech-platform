import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/assets/ico.png" />
        <link rel="icon" type="image/svg+xml" href="/assets/ico_svg.svg" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/assets/ico.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/ico.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/ico.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/ico.png" />
        
        {/* Shortcut Icon */}
        <link rel="shortcut icon" href="/assets/ico.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

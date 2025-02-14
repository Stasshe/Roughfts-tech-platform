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
        
        {/* Add initial loading styles */}
        <style>{`
          body {
            background: black;
            margin: 0;
            padding: 0;
          }
          #__next {
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          #__next.loaded {
            opacity: 1;
          }
          .initial-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: black;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

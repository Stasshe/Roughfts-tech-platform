import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="//cdn.jsdelivr.net/npm/eruda"></script>
        <script>
          eruda.init();
        </script>
        <meta httpEquiv="content-language" content="en,ja" />
        <meta name="google-site-verification" content="DEgw9x5qg54-nkcoE9493eaEFFU0kxke_ff9_faoRhY" />
        <meta name="msvalidate.01" content="C3267624A0885DF4ACF4A680014D4512" />
        <meta name='description' content="Hi! I'm Roughfts, and this is a PLATFORM about my introduction to Shogi(Cecon) and other game apps, as well as technology and other technical guidance on circumventing school filtering regulations." lang="en" />
        <meta name='description' content="Roughftsです!このサイトでは、私の将棋（Cecon）やその他のゲームアプリの紹介、IT技術について、そして学校のフィルタリング規制を回避するための技術的なガイドを提供します。" lang="ja" />
        <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;600&display=swap"
            rel="stylesheet"
          />

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
          
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

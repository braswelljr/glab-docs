import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="antialiased text-neutral-800">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link href="/icons/icon192.png" rel="icon" type="image/png" />
          <link href="/icons/icon512.png" rel="icon" type="image/png" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <meta name="theme-color" content="#317EFB" />

          <meta name="application-name" content="GLab Documentation" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="GLab Documentation"
          />
          <meta name="description" content="Open source GitLab CLI tool" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    )
  }
}

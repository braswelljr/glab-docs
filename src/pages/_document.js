import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="antialiased text-gray-800">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link href="/icons/icon192.png" rel="icon" type="image/png" />
          <link href="/icons/icon512.png" rel="icon" type="image/png" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <meta name="theme-color" content="#317EFB" />
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

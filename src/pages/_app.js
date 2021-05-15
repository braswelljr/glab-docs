import "../styles/index.css";
import Head from "next/head";
import Navbar from "../conponents/Navbar";
import useStore from "../store";

const App = ({ Component, pageProps }) => {
  const appName = `glab`;
  const theme = useStore(state => state.theme);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>
          GLAB - An open-source GitLab command line tool bringing GitLab's cool features to your
          command line
        </title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link href="/icons/icon192.png" rel="icon" type="image/png" />
        <link href="/icons/icon512.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <main className={`${theme === `light` ? `text-gray-900` : `text-white`}`}>
        <Navbar appName={appName} />
        <div className="pt-40 md:pt-20">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
};

export default App;

import Head from 'next/head'
import { useRouter } from 'next/router'

export function Title({
  suffix,
  children
}: {
  suffix?: string
  children?: string | JSX.Element
}) {
  const router = useRouter()
  let title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="glab" content="GitLab command line tool" />
      <meta name="keywords" content="Keywords" />
      {router.pathname === '/' ? (
        <title key="title">glab - GitLab command line tool</title>
      ) : (
        <title key="title">{title}</title>
      )}
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  )
}

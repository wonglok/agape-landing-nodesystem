import Head from 'next/head'

const titleDefault = 'Agape Town'
const url = 'https://agape.town/'
const description = 'The land of the living that you create.'
const author = 'Agape Metaverse'
const keywords = `Metaverse , Agape, Web3, crypto, blockchain, game, gamefi, builder, developer, WebGL, Creator`
const Header = ({ referrer = '', host = '', title = titleDefault }) => {
  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#ffffff'
        />
        <link rel='shortcut icon' href='/icons/favicon.ico' />
        <meta name='apple-mobile-web-app-title' content='Agape Town' />
        <meta name='application-name' content='Agape Town' />
        <meta name='msapplication-TileColor' content='#00aba9' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='theme-color' content='#ffffff'></meta>

        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />
        {/*
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta name='og:title' content={title} />
        <meta name='og:type' content='site' />
        <meta name='og:url' content={url} />
        <meta name='og:image' content={'/icons/share.png'} />
        <meta name='og:site_name' content={title} />
        <meta name='og:description' content={description} />

        {/* <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link
          rel='apple-touch-icon'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          color='#00ffff'
          href='/icons/safari-pinned-tab.svg'
        />
        <link rel='apple-touch-startup-image' href='/startup.png' /> */}

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, initial-scale=1.0'
        />
        <meta name='theme-color' content='#ffffff' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />

        {/*
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@onirenaud' />
      </Head>
    </>
  )
}

export default Header

// import Head from 'next/head'

// const titleDefault = 'Agape - Effect Node'
// const url = 'https://forge.toykit.me/'
// const description = 'Thank you Jesus'
// const author = 'Agape'

// const Header = ({ title = titleDefault }) => {
//   return (
//     <>
//       <Head>
//         {/* Recommended Meta Tags */}
//         <meta charSet='utf-8' />
//         <meta name='language' content='english' />
//         <meta httpEquiv='content-type' content='text/html' />
//         <meta name='author' content={author} />
//         <meta name='designer' content={author} />
//         <meta name='publisher' content={author} />

//         {/* Search Engine Optimization Meta Tags */}
//         <title>{title}</title>
//         <meta name='description' content={description} />
//         <meta name='keywords' content='Agape' />
//         <meta name='robots' content='index,follow' />
//         <meta name='distribution' content='web' />
//         {/*
//       Facebook Open Graph meta tags
//         documentation: https://developers.facebook.com/docs/sharing/opengraph */}
//         <meta name='og:title' content={title} />
//         <meta name='og:type' content='site' />
//         <meta name='og:url' content={url} />
//         <meta name='og:image' content={'/icons/share.png'} />
//         <meta name='og:site_name' content={title} />
//         <meta name='og:description' content={description} />

//         <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
//         <link
//           rel='apple-touch-icon'
//           sizes='16x16'
//           href='/icons/favicon-16x16.png'
//         />
//         <link
//           rel='apple-touch-icon'
//           sizes='32x32'
//           href='/icons/favicon-32x32.png'
//         />
//         <link
//           rel='apple-touch-icon'
//           sizes='180x180'
//           href='/icons/apple-touch-icon.png'
//         />
//         <link rel='manifest' href='/manifest.json' />
//         <link
//           rel='mask-icon'
//           color='#000000'
//           href='/icons/safari-pinned-tab.svg'
//         />
//         <link rel='apple-touch-startup-image' href='/startup.png' />

//         {/* Meta Tags for HTML pages on Mobile */}
//         {/* <meta name="format-detection" content="telephone=yes"/>
//         <meta name="HandheldFriendly" content="true"/>  */}
//         <meta
//           name='viewport'
//           content='width=device-width, minimum-scale=1, initial-scale=1.0'
//         />
//         <meta name='theme-color' content='#000' />
//         <link rel='shortcut icon' href='/icons/favicon.ico' />

//         {/*
//       Twitter Summary card
//         documentation: https://dev.twitter.com/cards/getting-started
//         Be sure validate your Twitter card markup on the documentation site. */}
//         <meta name='twitter:card' content='summary' />
//         <meta name='twitter:site' content='@onirenaud' />
//       </Head>
//     </>
//   )
// }

// export default Header

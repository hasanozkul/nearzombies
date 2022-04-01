import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps | any) {
  const [show, setShow] = useState({
    sign: false,
    register: false,
    coin: false,
  })

  const handleClick = () => {
    setShow({
      sign: false,
      register: false,
      coin: false,
    })
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  return (
    <>
      <Head>
        <title>NearZombies</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <div onClick={handleClick}>
        <Navbar showState={{ show: show, setShow }} />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}

export default MyApp

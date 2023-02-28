import '../styles/globals.css'
import Navbar from '../components/Navbar.js'
import { SessionProvider } from 'next-auth/react'
function MyApp({ Component, pageProps }) {
    return (
    <>
    <SessionProvider session={pageProps.session}>
    <Navbar></Navbar>
      <Component {...pageProps} />
      </SessionProvider>
    </>
    )
}

export default MyApp

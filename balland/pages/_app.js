import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/AppLyout'
function MyApp({ Component, pageProps }) {
    return (
    <div className = "bg-slate-100">
    <SessionProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </div>
    )
}

export default MyApp

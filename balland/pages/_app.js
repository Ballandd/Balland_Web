import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Layout from "../components/AppLyout"
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }) {
  return (
    <div className="h-inherit bg-slate-100">
      <SessionProvider session={pageProps.session}>
        <Layout>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Layout>
      </SessionProvider>
    </div>
  )
}

export default MyApp

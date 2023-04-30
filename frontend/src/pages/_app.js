import '../styles/globals.css'
import { UIProvider } from '../contexts/ui'
import Head from 'next/head'

const App = ({ Component, pageProps }) => (
    <>
        <Head>
            <script src="/__ENV.js" />
        </Head>
        <UIProvider>
            <Component {...pageProps} />
        </UIProvider>
    </>
)

export default App

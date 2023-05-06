import '../styles/globals.css'
import { UIProvider } from '../contexts/ui'
import Head from 'next/head'
import ErrorBoundary from '@/components/ErrorBoundary'

const App = ({ Component, pageProps }) => (
    <>
        <Head>
            <script src="/__ENV.js" />
        </Head>
        <ErrorBoundary>
            <UIProvider>
                <Component {...pageProps} />
            </UIProvider>
        </ErrorBoundary>
    </>
)

export default App

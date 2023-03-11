import '../styles/globals.css'
import { UIProvider } from '../contexts/ui'

const App = ({ Component, pageProps }) => (
    <UIProvider>
        <Component {...pageProps} />
    </UIProvider>
)

export default App

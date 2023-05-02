import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import LandingHeader from '@/components/LandingPage/Header'
import LandingHero from '@/components/LandingPage/Hero'
import LandingMainContent from '@/components/LandingPage/MainContent'
import LandingFooter from '@/components/LandingPage/Footer'
import LandingContact from '@/components/LandingPage/Contact'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Sparkbooks</title>
                <script src="/__ENV.js" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <LandingHeader />
            <LandingHero />
            <LandingMainContent />
            <LandingContact />
            <LandingFooter />
        </>
    )
}

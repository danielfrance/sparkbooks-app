import { Box, Heading, Text } from 'grommet'
import Link from 'next/link'
const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
}

const TermsOfService = () => {
    return (
        <>
            <div style={backgroundStyles}>
                <Box
                    alignContent="center"
                    justifyContent="center"
                    background={{ color: '#EBF1F3' }}
                    pad="medium"
                    width="large"
                    margin={{ top: '1em', bottom: '1em' }}
                    round="small">
                    <Heading level="2" margin="none">
                        Terms of Service
                    </Heading>
                    <Text>
                        Welcome to Sparkbooks! These Terms of Service (the
                        "Terms") apply to your use of our website, applications,
                        products, and services (collectively, the "Services").
                        By accessing or using our Services, you agree to be
                        bound by these Terms.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            2. Privacy
                        </Heading>
                        We value your privacy and are committed to protecting
                        your personal information. Please refer to our Privacy
                        Policy for more information on how we collect, use, and
                        disclose your personal information.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            3. Proprietary Rights
                        </Heading>
                        Our Services and all content, features, and
                        functionality provided through our Services are owned by
                        us or our licensors and are protected by copyright,
                        trademark, and other intellectual property laws. You may
                        not use our Services for any purpose that is not
                        expressly permitted by these Terms.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            4. Disclaimer of Warranties
                        </Heading>
                        Our Services are provided "as is" and "as available." We
                        do not make any warranties, either express or implied,
                        about the Services or their suitability for your
                        particular purposes. We also do not guarantee that the
                        Services will be available at all times, uninterrupted,
                        or error-free.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            5. Limitation of Liability
                        </Heading>
                        We are not liable for any damages, including but not
                        limited to indirect, incidental, consequential,
                        punitive, or special damages, arising from or in
                        connection with your use of our Services.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            6. Indemnification
                        </Heading>
                        You agree to indemnify, defend, and hold us harmless
                        from any claims, liabilities, damages, and expenses
                        (including reasonable attorneys' fees) arising from your
                        use of our Services, your violation of these Terms, or
                        your violation of any rights of another.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            7. Governing Law
                        </Heading>
                        These Terms and any dispute arising from or in
                        connection with these Terms or our Services will be
                        governed by and construed in accordance with the laws of
                        the State of Oklahoma, without regard to its conflict of
                        law provisions.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            8. Changes to Terms
                        </Heading>
                        We reserve the right to modify these Terms at any time.
                        If we make material changes to these Terms, we will
                        notify you by email or by posting a notice on our
                        website. Your continued use of our Services after such
                        modifications constitutes your acceptance of the
                        modified Terms.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            9. Termination
                        </Heading>
                        We may terminate your access to our Services at any time
                        for any reason, without notice. All provisions of these
                        Terms which by their nature should survive termination
                        shall survive termination, including, without
                        limitation, ownership provisions, warranty disclaimers,
                        indemnity, and limitations of liability.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            10. Entire Agreement
                        </Heading>
                        These Terms constitute the entire agreement between you
                        and Sparkbooks with respect to your use of our Services
                        and supersede all prior or contemporaneous agreements or
                        representations, whether written or oral. If you have
                        any questions or concerns about these Terms, please
                        contact us at{' '}
                        <Link href={'mailto:contact@sparkbooks.io'}>
                            contact@sparkbooks.io
                        </Link>
                        .
                    </Text>
                </Box>
            </div>
        </>
    )
}

export default TermsOfService

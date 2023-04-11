import { Box, Heading, Text } from 'grommet'
import Link from 'next/link'
const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
}

const PrivacyPolicy = () => {
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
                        Privacy Policy
                    </Heading>
                    <Text>
                        We at Sparkbooks are committed to protecting your
                        privacy. This privacy policy explains how we collect,
                        use, and disclose your personal information. By using
                        our Services, you consent to our collection, use, and
                        disclosure of your personal information as described in
                        this privacy policy.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            1. Personal Information We Collect
                        </Heading>
                        We may collect the following personal information from
                        you when you use our Services:
                        <ul>
                            <li>First and last name</li>
                            <li>Email</li>
                            <li>Business Address</li>
                            <li>Phone number(s)</li>
                            <li>Company name</li>
                        </ul>
                        We collect this information via web forms that you fill
                        out when you register for our Services. We may collect
                        additional information in the future if we decide to add
                        new features to our Services.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            2. How We Use Your Personal Information
                        </Heading>
                        We may use your personal information for the following
                        purposes:
                        <ul>
                            <li>To provide and improve our Services</li>
                            <li>To communicate with you about our Services</li>
                            <li>
                                To find other potential customers for our
                                Services
                            </li>
                        </ul>
                        We may also use your personal information to comply with
                        our legal obligations.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            3. How We Protect Your Personal Information
                        </Heading>
                        We take reasonable measures to protect your personal
                        information from unauthorized access, use, or
                        disclosure. We store your personal information in an
                        encrypted database and limit access to your personal
                        information to only those employees who need it to
                        provide our Services.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            4. Sharing Your Personal Information
                        </Heading>
                        We may share your personal information with the
                        following parties:
                        <ul>
                            <li>
                                Our employees, contractors, and service
                                providers, who need access to your personal
                                information to provide our Services
                            </li>
                            <li>
                                Our affiliates, who need access to your personal
                                information to provide our Services
                            </li>
                            <li>
                                Our business partners, who need access to your
                                personal information to provide our Services
                            </li>
                            <li>
                                Our legal advisors, who need access to your
                                personal information to provide legal advice
                            </li>
                            <li>
                                Our investors, who need access to your personal
                                information to provide funding for our Services
                            </li>
                        </ul>
                        We may also share your personal information with other
                        parties if we are required to do so by law or if you
                        give us your consent to do so.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            5. Retention of Your Personal Information
                        </Heading>
                        We will retain your personal information for as long as
                        a customer relationship exists between you and us. We
                        will retain and use your personal information as
                        necessary to comply with our legal obligations, resolve
                        disputes, and enforce our agreements.
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            6. Your Rights
                        </Heading>
                        You have the following rights with respect to your data:
                        <ul>
                            <li>
                                The right to access, correct, or delete your
                                personal information
                            </li>
                            <li>
                                The right to restrict or object to our use of
                                your personal information
                            </li>
                            <li>
                                The right to data portability, which means that
                                you can request a copy of your personal
                                information in a machine-readable format
                            </li>
                        </ul>
                        You can exercise these rights by contacting us at{' '}
                        <Link href="mailto:privacy@sparkbooks.io">
                            privacy@sparkbooks.io
                        </Link>
                    </Text>
                    <Text>
                        <Heading
                            level="3"
                            margin={{ top: 'medium', bottom: 'small' }}>
                            7. Contact Us
                        </Heading>
                        If you have any questions or concerns about your
                        personal information or this privacy policy, you can
                        contact us at{' '}
                        <Link href="mailto:privacy@sparkbooks.io">
                            privacy@sparkbooks.io
                        </Link>
                        .
                    </Text>
                </Box>
            </div>
        </>
    )
}

export default PrivacyPolicy

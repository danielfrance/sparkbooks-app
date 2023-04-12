import { useUIContext } from '@/contexts/ui'
import { Box, Card, CardBody, CardFooter, CardHeader } from 'grommet'
import { v4 } from 'uuid'
const Plan = ({ name }) => {
    const { withDiscount } = useUIContext()

    const plans = {
        starter: {
            name: 'Starter',
            price: 35,
            yearDiscount: 0.29,
            features: [
                '100 Pages / Month',
                '1 user',
                '1 client',
                'No integrations',
                'No File Vault',
            ],
        },
        basic: {
            name: 'Basic',
            price: 699,
            yearDiscount: 0.72,
            features: [
                '1000 Pages / Month',
                '1 user',
                '10 clients',
                'Integrations: coming soon',
                'Access to vault',
            ],
        },
        standard: {
            name: 'Standard',
            price: 899,
            yearDiscount: 0.55,
            features: [
                '2500 Pages / Month',
                '2 users',
                '30 clients',
                'Integrations: coming soon',
                'Access to vault',
            ],
        },
        premium: {
            name: 'Premium',
            price: 1799,
            yearDiscount: 0.55,
            features: [
                '5000 Pages / Month',
                '20 user',
                'Unlimited clients',
                'Integrations: coming soon',
                'Access to vault',
            ],
        },
    }

    const { yearDiscount: discount, price } = plans[name]
    return (
        <Card
            pad="medium"
            gap="large"
            className="ff-sans-serif card"
            style={{ minWidth: '40%', maxWidth: '40%' }}>
            <CardHeader justify="center">
                <div className=" fs-500 text-accent">{plans[name].name}</div>
            </CardHeader>
            <CardHeader
                justify="center"
                margin={{ top: '-20px', bottom: '-20px' }}>
                <div>
                    <span className="text-dark fs-700">
                        $
                        {withDiscount
                            ? `${parseFloat(price * discount).toFixed(0)}`
                            : `${parseFloat(price).toFixed(0)}`}
                    </span>{' '}
                    <span className="fs-300 text-dark">/month</span>
                </div>
            </CardHeader>
            <CardHeader
                justify="center"
                margin={{ top: '-20px', bottom: '-20px' }}>
                {withDiscount && (
                    <div className="fs-300 text-accent">
                        You save {parseFloat(discount * 100).toFixed(0)}%
                    </div>
                )}
            </CardHeader>
            <CardBody>
                <ul style={{ listStyle: 'none' }}>
                    {plans[name].features.map(feature => (
                        <li
                            key={v4()}
                            style={{ marginBottom: '20px' }}
                            className="fs-400">
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardBody>
            <CardFooter justify="center">
                <button className="btn  primary " style={{ width: '100%' }}>
                    Select
                </button>
            </CardFooter>
        </Card>
    )
}

export default Plan

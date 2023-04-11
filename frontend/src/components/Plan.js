import { Box, Card, CardBody, CardFooter, CardHeader } from 'grommet'
import { v4 } from 'uuid'
const Plan = ({ name, withDiscount }) => {
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
                'Integrations: coming',
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
                'Integrations: coming',
                'Access to vault',
            ],
        },
        primium: {
            name: 'Primium',
            price: 1799,
            yearDiscount: 0.55,
            features: [
                '5000 Pages / Month',
                '20 user',
                'Unlimited clients',
                'Integrations: coming',
                'Access to vault',
            ],
        },
    }
    return (
        <Card
            pad="medium"
            gap="large"
            className="ff-sans-serif card"
            style={{ minWidth: '25%' }}>
            <CardHeader justify="center">
                <div className=" fs-500 text-accent">{plans[name].name}</div>
            </CardHeader>
            <CardHeader
                justify="center"
                margin={{ top: '-20px', bottom: '-20px' }}>
                <div className="">
                    <span className="title fs-700">
                        $
                        {withDiscount
                            ? `${
                                  (plans[name].price * 12) /
                                  plans[name].yearDiscount
                              }`
                            : `${plans[name].price}`}
                    </span>{' '}
                    <span className="fs-300 text-accent">/month</span>
                </div>
                {withDiscount && (
                    <div className="fs-400">
                        You save {plans[name].yearDiscount * 100}%
                    </div>
                )}
            </CardHeader>
            <CardBody pad={{ horizontal: 'small' }}>
                <ul style={{ listStyle: 'none' }}>
                    {plans[name].features.map(feature => (
                        <li
                            key={v4()}
                            style={{ margin: '10px' }}
                            className="fs-400">
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardBody>
            <CardFooter justify="center">
                <button
                    className="btn  primary inverse"
                    style={{ width: '100%' }}>
                    Select
                </button>
            </CardFooter>
        </Card>
    )
}

export default Plan

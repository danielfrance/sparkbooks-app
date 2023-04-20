import { useUIContext } from '@/contexts/ui'
import { Card, CardBody, CardFooter, CardHeader } from 'grommet'
import { v4 } from 'uuid'
const Plan = ({ plan }) => {
    const { withDiscount } = useUIContext()

    const {
        annual_payment_link,
        annual_price,
        clients,
        description,
        id,
        integrations_access,
        monthly_payment_link,
        monthly_price,
        name,
        pages,
        reports_access,
        seats,
        stripe_id,
        support_access,
        vault_access,
    } = plan

    const features = [
        `${pages ? `${pages} Pages / Month` : ''}`,
        `${seats ? `${seats} users` : ''}`,
        `${clients ? `${clients} clients` : ''}`,
        `${integrations_access ? 'Integrations' : ''}`,
        `${vault_access ? 'Access to vault' : ''}`,
        `${support_access ? 'Support access' : ''}`,
        `${reports_access ? 'Report access' : ''}`,
    ]

    const discount =
        100 -
        ((parseFloat(monthly_price.replace(',', '')) * 12) /
            parseFloat(annual_price.replace(',', ''))) *
            100

    const handleclick = () => {
        const url = withDiscount ? annual_payment_link : monthly_payment_link
        window.open(url, '_blank')
    }

    return (
        <Card
            pad="medium"
            gap="large"
            className="ff-sans-serif card"
            style={{
                maxHeight: '520px',
                minHeight: '520px',
                minWidth: '280px',
                maxWidth: '280px',
            }}>
            <CardHeader justify="center">
                <div className=" fs-500 text-accent">{name}</div>
            </CardHeader>
            <CardHeader
                justify="center"
                margin={{ top: '-20px', bottom: '-20px' }}>
                <div>
                    <span className="text-dark fs-700">
                        ${withDiscount ? annual_price : monthly_price}
                    </span>{' '}
                    <span className="fs-300 text-dark">
                        {withDiscount ? '/year' : '/month'}
                    </span>
                </div>
            </CardHeader>
            {withDiscount && (
                <CardHeader
                    justify="center"
                    margin={{ top: '-20px', bottom: '-20px' }}>
                    <div className="fs-300 text-accent">
                        You save {Math.abs(discount.toFixed(0))}%
                    </div>
                </CardHeader>
            )}
            <CardBody>
                {/* <div
                    className="fs-200"
                    style={{
                        border: 'solid #C767F5 2px',
                        padding: '10px',
                        borderRadius: '7px',
                        fontWeight: 'bold',
                    }}>
                    {description}
                </div> */}
                <ul style={{ listStyle: 'none' }}>
                    {features
                        .filter(el => el.trim() !== '')
                        .map(feature => (
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
                <button
                    className="btn  primary "
                    style={{ width: '100%' }}
                    onClick={handleclick}>
                    Select
                </button>
            </CardFooter>
        </Card>
    )
}

export default Plan

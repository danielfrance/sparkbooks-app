import { Box } from 'grommet'
import { useUIContext } from '@/contexts/ui'

const Plans = ({ children }) => {
    const { withDiscount, setWithDiscount } = useUIContext()

    return (
        <Box>
            <Box direction="row" justify="center" gap="small">
                <button
                    className={[
                        'btn',
                        'primary',
                        withDiscount ? 'inverse' : '',
                    ].join(' ')}
                    onClick={() => setWithDiscount(false)}>
                    Monthly
                </button>
                <button
                    className={[
                        'btn',
                        'primary',
                        withDiscount ? '' : 'inverse',
                    ].join(' ')}
                    onClick={() => setWithDiscount(true)}>
                    Yearly
                </button>
            </Box>
            <Box
                direction="row"
                justify="center"
                className="flex"
                pad="none"
                margin="none"
                style={{
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1em',
                }}>
                {children}
            </Box>
        </Box>
    )
}

export default Plans

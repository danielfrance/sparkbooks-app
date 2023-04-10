import { Box } from 'grommet'
const backgroundStyles = {
    background: 'linear-gradient(180deg, #3b86d8 0%, #9881eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
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
                    round="small">
                    Terms of Service
                </Box>
            </div>
        </>
    )
}

export default TermsOfService

import { Box } from 'grommet'
const Plans = ({ children }) => {
    return (
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
    )
}

export default Plans

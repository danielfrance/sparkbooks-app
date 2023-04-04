const AccountDetails = ({ data }) => {
    return <div>{data}</div>
}

export default AccountDetails

export async function getServerSideProps(context) {
    return {
        props: { data: 'details' },
    }
}

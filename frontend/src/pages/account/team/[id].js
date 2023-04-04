const TeamMember = ({ data }) => {
    return <div>{data}</div>
}

export default TeamMember

export async function getServerSideProps(context) {
    return {
        props: { data: 'the member' },
    }
}

import { useAuth } from '@/hooks/auth'

const ErrorMessage = ({ status, statusText }) => {
    const { logout } = useAuth()

    return (
        <div
            className="card"
            style={{
                font: 'ff-sans-serif',
                margin: '10% auto',
                padding: '2rem',
                width: '50%',
            }}>
            {status == 500 && (
                <>
                    <span className="title">Account</span>
                    <p>Please contact your manageer to activate your account</p>

                    <button
                        className="btn secondary"
                        style={{ marginTop: '2rem' }}
                        onClick={logout}>
                        Logout
                    </button>
                </>
            )}
            {status != 500 && (
                <>
                    <span className="title">Login problem</span>
                    <p>{statusText}</p>
                    <p>Get the problem solved and try again. </p>

                    <button
                        className="btn secondary"
                        style={{ marginTop: '2rem' }}
                        onClick={logout}>
                        Try in again
                    </button>
                </>
            )}
        </div>
    )
}

export default ErrorMessage

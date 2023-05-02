import { useState } from 'react'
import axios from 'axios'

export default function LandingContact() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [spamFilter, setSpamFilter] = useState('')
    const [responseMessage, setResponseMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name,
            email,
        }

        if (spamFilter.length < 1) {
            try {
                const res = await axios.post(
                    '/api/contact-us',
                    {
                        name: data.name,
                        email: data.email,
                    },
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                    },
                )

                setResponseMessage("Thanks! We'll be in touch soon.")
                setEmail('')
                setName('')
                setTimeout(() => {
                    setResponseMessage('')
                }, 3000)
            } catch (error) {
                setResponseMessage('An error occurred. Please try again later.')
            }
        } else {
            setResponseMessage('bad bot!')
        }
    }

    return (
        <>
            <section className="bg-gray-50 bg-purple-500">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                        Get in touch
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-100 sm:text-xl">
                        Sparkbooks is currently invite only. If you'd like to be
                        considered, fill out the form below.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <input
                            type="hidden"
                            name="important_info"
                            value={spamFilter}
                            onChange={e =>
                                setSpamFilter(e.target.value)
                            }></input>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-500 dark:placeholder-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="John Doe"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-500 dark:placeholder-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="name@sparkbooks.io"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gray-700 sm:w-fit hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-900 dark:hover:bg-primary-900 dark:focus:ring-primary-800">
                            Send message
                        </button>
                    </form>

                    {responseMessage && (
                        <div
                            className="flex mt-4 p-4 text-sm text-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                            role="alert">
                            <span className="sr-only">Info</span>
                            <div>{responseMessage}</div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

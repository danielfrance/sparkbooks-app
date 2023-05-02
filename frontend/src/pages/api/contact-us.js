import axios from 'axios'

export default async (req, res) => {
    try {
        const response = await axios.post(
            'https://hooks.airtable.com/workflows/v1/genericWebhook/appX9zSEkfn1BJ3Lk/wflVwK0VPz7X9kl31/wtrrGP2rMfPRlywYd',
            req.body,
        )
        console.log('succes')
        res.status(200).json({ message: 'Thanks! We will be in touch soon.' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

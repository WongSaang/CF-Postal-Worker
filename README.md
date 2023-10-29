# CF Postal Worker

This is a project using [Cloudflare Workers](https://workers.cloudflare.com/) and leveraging [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/) to enable you to send information to your email by calling the Worker's API. You don't need an email server or third-party email forwarding services, and you don't have to maintain a database or develop a backend.

Use cases:
- If you have a static web project and don't want to develop a backend or manage a database, you can integrate a contact form and directly send the information to your email.
- Other scenarios that require forwarding messages to an email.

## Prerequisites

- A Cloudflare account
- A domain name (you can register the cheapest domain on Cloudflare)
- If deploying via the command line, you need to have Node.js environment installed locally.

## Deployment

1. Follow the instructions in [Enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/) to enable Email Routing.

2. Clone or download this project.

3. Rename the file "wrangler.toml.example" to "wrangler.toml" and set the following environment variables:
```toml
SENDER_ADDRESS = "sender@example.com" # Set it to the email address you configured in Email Routing
SENDER_NAME = "Sender" # Sender's name
RECIPIENT_ADDRESS = "recipient@example.com" # Set it to your recipient email address
ALLOWED_ORIGINS = "https://example.com" # The domain name of the site allowed to call the API, multiple domain names are separated by commas, "*" means all domain names are allowed.
```

4. Deploy to Cloudflare Workers:
```bash
npm install
npm run deploy
```

## API

| Endpoint  | Method | Parameters         | Description               |
|-----------|--------|--------------------|---------------------------|
| /send     | POST   | - subject Email subject<br>- body Email content, can be an HTML string | Send an email |

## Acknowledgments

- [Cloudflare](https://www.cloudflare.com/)
- [Hono](https://hono.dev/), this project is developed based on this framework

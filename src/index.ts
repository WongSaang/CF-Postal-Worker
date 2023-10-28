import { Hono } from 'hono'
import { EmailMessage } from "cloudflare:email"
import { createMimeMessage } from "mimetext"

const app = new Hono()

app.post('/send', async (c) => {
    var subject = c.get('subject')
    var body = c.get('body')
    if (!subject || !body) {
        c.status(400)
        return c.json({
            "status": "error",
            "message": "Missing subject or body"
        })
    }

    const msg = createMimeMessage()
    msg.setSender({ name: c.env.SENDER_NAME, addr: c.env.SENDER_ADDRESS })
    msg.setRecipient(c.env.RECIPIENT_ADDRESS)
    msg.setSubject(c.get('subject'))
    msg.addMessage({
        contentType: 'text/html',
        data: c.get('body')
    })

    var message = new EmailMessage(
        c.env.SENDER_ADDRESS,
        c.env.RECIPIENT_ADDRESS,
        msg.asRaw()
    );

    try {
        await c.env.SEB.send(message)
    } catch (e) {
        c.status(500)
        return c.json({
            "status": "error",
            "message": "Email failed to send",
            "error_details": e.message
        });
    }

    return c.json({
        "status": "success",
        "message": "Email sent successfully"
    });
})

export default app

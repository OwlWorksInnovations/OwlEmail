require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from owl email!");
})

app.post('/send', (req, res) => {
    // const target = req.params.target;
    // const subject = req.params.subject;
    // const text = req.params.text;
    const { target, subject, text } = req.body;

    if (!target, !subject, !text) {
        return res.status(400).send('Missing target, subject, or text');
    }

    console.log('Email Target:', target);
    console.log('Subject:', subject);
    console.log('Text:', text);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: target,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully')
        }
    });

    res.send(`Email sent to ${target} with subject "${subject}" and text "${text}"`);
})

app.listen(port, () => {
    console.log(`Server listening at http://192.168.0.7:${port}`);
});
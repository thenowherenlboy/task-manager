const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send( {
        to: email,
        from: 'nobody@eatmyshorts.org',
        subject: 'Welcome to Task App',
        text: `Welcome to Task Manager, ${name}. Let me know your deepest desire.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send ({
        to: email,
        from: 'nobody@eatmyshorts.org',
        subject: 'Breaking up is so hard to do ...',
        text: `Dear ${name}, We truly hate to see you leave. Please contact us if you have any suggestion about how we can improve our services.  Thank you so much for your support. --The Task Manager Team. `
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
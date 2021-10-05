const sgMail = require('@sendgrid/mail')

// const sendgridAPI = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setApiKey(sendgridAPI)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
    to: email,
    from: 'omar@barcudi.com',
    subject: 'Thanks for joining in', 
    text: `Welcome to the app, ${name}. let me know you like the app`,
    html: `<h1>HI YOU</h1>
    <img src="https://images.unsplash.com/photo-1626696285176-0a06e55f0421?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80" alt="" />`
})
}
 
const sendCancelation = (email, name) => {
    sgMail.send(
        {
            to: email,
            from: 'omar@barcudi.com',
            subject: 'We Hoppe You return soon',
            text:`Goodbye, ${name}. I hope to see you back sometime soon, wish you best.`
         }
    )
}

module.exports = {
    sendWelcomeEmail,
    sendCancelation
}
// .then(() => {
//     console.log('Email sent')
//   }).catch((error) => {
//     console.error(error)
//   })
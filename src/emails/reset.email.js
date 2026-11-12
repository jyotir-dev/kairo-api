// Layout
const renderEmail = require('./layout.email');

// Reset Email
module.exports = ({ user, resetURL }) => ({
    subject: 'Reset your Kairo password',
    ...renderEmail({
        preheader: 'Use this link to choose a new password for your Kairo account.',
        heading: 'Reset your password',
        paragraphs: [
            `Hi ${user.username}, we got a request to reset the password for your Kairo account. If it was you, choose a new one below.`
        ],
        details: [
            ['Expires', 'In 60 minutes'],
            ['Single use', 'Yes']
        ],
        action: {
            label: 'Choose new password',
            url: resetURL
        },
        note: 'Choosing a new password **signs you out on every device**.',
        footnote: "Didn't ask for this? You can safely ignore this email. Your password won't change.",
        recipient: user.email
    })
});
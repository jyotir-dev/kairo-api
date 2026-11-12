// Layout
const renderEmail = require('./layout.email');

// Verification Email
module.exports = ({ user, verificationURL }) => ({
    subject: 'Verify your Kairo account',
    ...renderEmail({
        preheader: 'Confirm your email to finish setting up your Kairo account.',
        heading: 'Confirm your email',
        paragraphs: [
            `Hi ${user.username}, welcome to Kairo. Confirm your email to finish setting up your account. Once it's verified, you can:`
        ],
        points: [
            '**Create escrows** with anyone on Kairo',
            '**Accept escrow requests** sent to you'
        ],
        action: {
            label: 'Verify email address',
            url: verificationURL
        },
        note: 'This link expires in **24 hours** and can only be used once.',
        footnote: "Didn't create a Kairo account? You can safely ignore this email.",
        recipient: user.email
    })
});
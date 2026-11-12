// Layout
const renderEmail = require('./layout.email');

// Changed At (shown in UTC so it reads the same for everyone)
const formatChangedAt = () => new Date().toLocaleString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}) + ' UTC';

// Security Email
module.exports = ({ user, secureAccountURL }) => ({
    subject: 'Your Kairo password was changed',
    ...renderEmail({
        preheader: 'Your Kairo password was just changed and every device was signed out.',
        heading: 'Your password was changed',
        paragraphs: [
            `Hi ${user.username}, the password for your Kairo account was just changed, and every device has been signed out.`
        ],
        details: [
            ['Changed', formatChangedAt()],
            ['Sessions', 'Signed out everywhere']
        ],
        action: {
            label: 'Reset my password',
            url: secureAccountURL
        },
        note: "If this was you, there's nothing else to do. If it wasn't, **reset your password right away** to lock your account.",
        footnote: 'You received this email because the password on your Kairo account changed.',
        recipient: user.email
    })
});
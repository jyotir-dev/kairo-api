// Fonts (SF Pro on Apple devices, Inter where available, native system fonts elsewhere)
const FONT = {
    display: `'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    text: `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
};

// Colors (Apple's graphite dark palette, with Kairo's lavender as the only accent)
const COLOR = {
    page: '#111113',
    card: '#1a1a1d',
    border: '#27272b',
    group: '#222226',
    groupRule: '#2f2f34',
    heading: '#f5f5f7',
    text: '#a1a1a6',
    strong: '#f5f5f7',
    muted: '#86868b',
    rule: '#27272b',
    accent: '#c4b5fd',
    button: '#f5f5f7',
    buttonText: '#000000'
};

// Orb (Kairo's aurora colours fused into a flat, fluid circle; Outlook draws a gradient circle, clients without gradients show solid indigo)
const ORB = {
    color: '#4338ca',
    image: [
        'radial-gradient(circle at 0% 35%, #e9d5ff 0%, rgba(233, 213, 255, 0) 32%)',
        'radial-gradient(circle at 25% 15%, #a855f7 0%, rgba(168, 85, 247, 0) 50%)',
        'radial-gradient(circle at 95% 20%, #c4b5fd 0%, rgba(196, 181, 253, 0) 30%)',
        'radial-gradient(circle at 92% 72%, #1e1b4b 0%, rgba(30, 27, 75, 0) 34%)',
        'radial-gradient(circle at 20% 95%, #7c3aed 0%, rgba(124, 58, 237, 0) 50%)',
        'radial-gradient(circle at 100% 100%, #6d28d9 0%, rgba(109, 40, 217, 0) 45%)'
    ].join(', ')
};

// Escape
const escape = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Format (escapes the text, then turns **words** into bold)
const format = (value) => escape(value).replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight: 600; color: ${COLOR.strong};">$1</strong>`);

// Plain (removes the bold markers for the text version)
const plain = (value) => String(value).replace(/\*\*(.+?)\*\*/g, '$1');

// Render HTML
const renderHTML = ({ preheader, heading, paragraphs, points = [], details = [], action, note, footnote, recipient }) => {

    const url = escape(action.url);

    const paragraphRows = paragraphs.map((paragraph) => `
                                            <tr>
                                                <td style="padding-bottom: 18px; font-family: ${FONT.text}; font-size: 14px; line-height: 21px; letter-spacing: -0.1px; color: ${COLOR.text};">
                                                    ${format(paragraph)}
                                                </td>
                                            </tr>`).join('');

    // Grouped list, like an inset table in iOS Settings
    const pointRows = points.length ? `
                                            <tr>
                                                <td style="padding-bottom: 20px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.group}" style="background-color: ${COLOR.group}; border-radius: 10px; border-collapse: separate; border-spacing: 0;">${points.map((point, index) => `
                                                        <tr>
                                                            <td valign="middle" style="width: 20px; padding: 10px 0 10px 14px; ${index ? `border-top: 1px solid ${COLOR.groupRule};` : ''} font-family: ${FONT.text}; font-size: 13px; line-height: 18px; color: ${COLOR.accent};">&#10003;</td>
                                                            <td style="padding: 10px 14px 10px 8px; ${index ? `border-top: 1px solid ${COLOR.groupRule};` : ''} font-family: ${FONT.text}; font-size: 13px; line-height: 18px; letter-spacing: -0.1px; color: ${COLOR.text};">${format(point)}</td>
                                                        </tr>`).join('')}
                                                    </table>
                                                </td>
                                            </tr>` : '';

    // Details panel: a label on the left and its value on the right, in the same grouped style
    const detailRows = details.length ? `
                                            <tr>
                                                <td style="padding-bottom: 20px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.group}" style="background-color: ${COLOR.group}; border-radius: 10px; border-collapse: separate; border-spacing: 0;">${details.map(([label, value], index) => `
                                                        <tr>
                                                            <td align="left" style="padding: 10px 14px; ${index ? `border-top: 1px solid ${COLOR.groupRule};` : ''} font-family: ${FONT.text}; font-size: 13px; line-height: 18px; letter-spacing: -0.1px; color: ${COLOR.text};">${escape(label)}</td>
                                                            <td align="right" style="padding: 10px 14px; ${index ? `border-top: 1px solid ${COLOR.groupRule};` : ''} font-family: ${FONT.text}; font-size: 13px; line-height: 18px; letter-spacing: -0.1px; font-weight: 500; color: ${COLOR.strong}; text-align: right;">${escape(value)}</td>
                                                        </tr>`).join('')}
                                                    </table>
                                                </td>
                                            </tr>` : '';

    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escape(heading)}</title>
    <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
    <style>
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }

        @media only screen and (max-width: 600px) {
            .outer { padding: 12px 8px 24px 8px !important; }
            .card-body { padding: 24px 20px 20px 20px !important; }
            .heading { font-size: 21px !important; line-height: 27px !important; }
            .button { width: 100% !important; }
            .button a { display: block !important; padding: 12px 18px !important; text-align: center !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLOR.page}; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">

    <!-- Preheader -->
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        ${escape(preheader)}&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;
    </div>

    <!-- Page -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="background-color: ${COLOR.page};">
        <tr>
            <td class="outer" align="center" style="padding: 32px 16px 32px 16px;">

                <!--[if mso]><table role="presentation" width="440" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 440px;">
                    <tr>
                        <td>

                            <!-- Card -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.card}" style="background-color: ${COLOR.card}; border: 1px solid ${COLOR.border}; border-radius: 16px; border-collapse: separate; border-spacing: 0;">
                                <tr>
                                    <td class="card-body" style="padding: 28px 28px 24px 28px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                                            <!-- Wordmark -->
                                            <tr>
                                                <td style="padding-bottom: 24px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td valign="middle" style="width: 20px; padding-right: 8px; font-size: 0; line-height: 0;">
                                                                <!--[if mso]><v:oval style="width: 20px; height: 20px;" stroked="false"><v:fill type="gradient" color="#a855f7" color2="#4338ca" angle="135" /></v:oval><![endif]-->
                                                                <!--[if !mso]><!--><div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${ORB.color}; background-image: ${ORB.image};"></div><!--<![endif]-->
                                                            </td>
                                                            <td valign="middle" style="font-family: ${FONT.display}; font-size: 16px; line-height: 20px; font-weight: 600; letter-spacing: -0.5px; color: ${COLOR.heading};">
                                                                Kairo<span style="color: ${COLOR.accent};">.</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Heading -->
                                            <tr>
                                                <td class="heading" style="padding-bottom: 8px; font-family: ${FONT.display}; font-size: 22px; line-height: 28px; font-weight: 600; letter-spacing: -0.5px; color: ${COLOR.heading};">
                                                    ${escape(heading)}
                                                </td>
                                            </tr>

                                            <!-- Body -->${paragraphRows}${pointRows}${detailRows}

                                            <!-- Button -->
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table role="presentation" class="button" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td bgcolor="${COLOR.button}" style="border-radius: 980px; mso-padding-alt: 9px 18px;">
                                                                <a href="${url}" target="_blank" style="display: inline-block; padding: 9px 18px; font-family: ${FONT.text}; font-size: 13.5px; line-height: 18px; font-weight: 500; letter-spacing: -0.2px; color: ${COLOR.buttonText}; text-decoration: none; border-radius: 980px;">${escape(action.label)}</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Note -->
                                            <tr>
                                                <td style="padding-bottom: 22px; font-family: ${FONT.text}; font-size: 12px; line-height: 17px; letter-spacing: -0.05px; color: ${COLOR.muted};">
                                                    ${format(note)}
                                                </td>
                                            </tr>

                                            <!-- Footer -->
                                            <tr>
                                                <td style="padding-top: 18px; border-top: 1px solid ${COLOR.rule}; font-family: ${FONT.text}; font-size: 11px; line-height: 16px; color: ${COLOR.muted};">
                                                    ${format(footnote)}<br><br>
                                                    Button not working? Paste this link into your browser:<br>
                                                    <a href="${url}" target="_blank" style="color: ${COLOR.text}; text-decoration: underline; word-break: break-all;">${url}</a>
                                                </td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Legal -->
                    <tr>
                        <td align="center" style="padding: 18px 20px 0 20px; font-family: ${FONT.text}; font-size: 10.5px; line-height: 15px; color: ${COLOR.muted}; text-align: center;">
                            Copyright &copy; ${new Date().getFullYear()} Kairo. Secure peer-to-peer escrow on Solana.<br>
                            Sent to ${escape(recipient)}. Kairo will never ask for your password by email.
                        </td>
                    </tr>
                </table>
                <!--[if mso]></td></tr></table><![endif]-->

            </td>
        </tr>
    </table>

</body>
</html>`;
};

// Render Text
const renderText = ({ heading, paragraphs, points = [], details = [], action, note, footnote, recipient }) => [
    heading,
    ...paragraphs.map(plain),
    points.map((point) => `- ${plain(point)}`).join('\n'),
    details.map(([label, value]) => `${label}: ${value}`).join('\n'),
    `${action.label}: ${action.url}`,
    plain(note),
    plain(footnote),
    `Copyright © ${new Date().getFullYear()} Kairo. Secure peer-to-peer escrow on Solana.\nSent to ${recipient}. Kairo will never ask for your password by email.`
].filter(Boolean).join('\n\n');

// Render Email
const renderEmail = (content) => ({
    html: renderHTML(content),
    text: renderText(content)
});

// Export Layout
module.exports = renderEmail;
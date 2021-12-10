const sendGridMail = require('@sendgrid/mail')
const apiKey = "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"
sendGridMail.setApiKey(apiKey)
const FROM = "sender_system@p-delivery.com"
const NAME = "Sender system"

function buildMessage( to, subject ,messageBody, html = null) {
  if(html != null && html !== undefined ){
      return {
            to: to,
            from: FROM,
            name:NAME,
            subject: subject,
            text: messageBody,
            html: html,
          }    
  }

  return {
      to: to,
      from: FROM,
      name:NAME,
      subject: subject,
      text: messageBody,
  }
}

async function sendEmail(to, subject ,messageBody, html = null) {
  try {
        const messageRequest = buildMessage(to, subject ,messageBody, html)
        await sendGridMail.send(messageRequest);
        console.log('Test email sent successfully');
  } catch (error) {
        console.error('Error sending test email');
        console.error(error);
    if (error.response) {
        console.error(error.response.body)
    }
  }
}


module.exports = {sendEmail}

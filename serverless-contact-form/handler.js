// hander.js
const AWS = require('aws-sdk');
const SES = new AWS.SES();

/* This tutorial was used for reference
https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/
*/

function sendEmail(formData, callback) {
// Verify email address in aws console !

/* If you are getting an "access denied" error in the console reference the below article to change lambda JSON
https://stackoverflow.com/questions/34949316/access-denied-while-sending-email-from-aws-ses-in-lambda-function */

  const emailParams = {
    Source: 'zachariahcrowell@gmail.com', // SES SENDING EMAIL CHANGE TO VERIFIED EMAIL
    ReplyToAddresses: [formData.reply_to],
    Destination: {
      ToAddresses: ['zachariahcrowell@gmail.com'], // SES RECEIVING EMAIL CHANGE TO VERIFIED EMAIL
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New message from Zach Crowell Portfolio',
      },
    },
  };

  SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);
  sendEmail(formData, function(err, data) {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };

    callback(null, response);
  });
}

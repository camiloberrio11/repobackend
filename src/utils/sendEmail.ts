const KEY_SENGRID = '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';
const EMAIL_COMPANY = 'testfomzls@gmail.com'

import sgMail from '@sendgrid/mail';


  export function sendEmail(emailSend: string, subject: string, body: string): void  {
    sgMail.setApiKey(KEY_SENGRID)
    const msg = {
      to: emailSend, // Change to your recipient
      from: EMAIL_COMPANY, // Change to your verified sender
      subject,
      text: 'Testing Pqrs App',
      html: getHtmlInEmail(body),
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }



  function getHtmlInEmail(body: string): string {
    const html =
      '<!DOCTYPE html>' +
      '            <html>' +
      '            <head>' +
      '                <title></title>' +
      '            </head>' +
      '            <body>' +
      '                <table align="center" cellpadding="0" cellspacing="0" style="width:100%;background:#FFFFFF">' +
      '                    <tbody>' +
      '                        <tr>' +
      '                            <td>' +
      '                                <table align="center" cellpadding="0" cellspacing="0" style="width:600px">' +
      '                                    <tbody>' +
      '                                        <tr>' +
      '                                            <td align="center">' +
      '                                                <span class="im"></span>' +
      '                                                <table style="padding:30px 0px;margin: 0 auto;text-align:center" width="600px">' +
      '                                                    <tbody>' +
      '                                                        <tr>' +
      '                                                            <td><img style="width: 50%;" alt="Logo de Flota Ospina" class="CToWUd" src="https://res.cloudinary.com/dupegtamn/image/upload/v1633401289/flotaospina/logo_flota_qyhcy5.png"></td>' +
      '                                                        </tr>' +
      '                                                    </tbody>' +
      '                                                </table>' +
      '                                                <table style="border: 1px solid #08009b;color:black;padding:35px 50px" width="600px">' +
      '                                                    <tbody>' +
      '                                                        <tr>' +
      '                                                            <td>' +
      '                                                                <p style="font-size:14px;text-align:justify">' +
      body +
      '</p>' +
      '                                                            </td>' +
      '                                                        </tr>' +
      '                                                    </tbody>' +
      '                                                </table><span class="im"></span>' +
      '                                                <table align="left" style="padding:10px 0px;color:#ffffff;font-size:12px;text-align:center;margin:20px 0px" width="600px">' +
      '                                                    <tbody>' +
      '                                                        <tr>' +
      '                                                            <td style="padding:0px;font-size:12px">© 2018 Derechos Reservados. <a href="https://www.flotaospina.com/" target="_blank">flotaospina.com</a></td>' +
      '                                                        </tr>' +
      '                                                    </tbody>' +
      '                                                </table>' +
      '                                            </td>' +
      '                                        </tr>' +
      '                                    </tbody>' +
      '                                </table>' +
      '                            </td>' +
      '                        </tr>' +
      '                    </tbody>' +
      '                </table>' +
      '            </body>' +
      '            </html>';
    return html;
  }
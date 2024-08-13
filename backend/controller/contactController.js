import nodemailer from "nodemailer";
const sendMessageToMail = async (req, res) => {
  const { email, message } = req.body;
  const htmlTemplate = `
    <!DOCTYPE html>
     <html lang="en">
       <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Transactional Email</title>
       <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .email-header {
              background-color: #44b89d;
              color: white;
              padding: 10px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .email-header h1 {
              margin: 15px;
            }
            .content {
              display:flex;
              min-height: 250px;
              background-color: #4f5e65;
              color: white;
              padding: 0 10px;
              font-size: 14px;
              border-radius: 0 0 10px 10px;
              text-align:center;
            }
       </style>
       </head>
       <body>
            <div class="container">
              <div class="email-header">
                <h1>Message from ${email}</h1>
              </div>
              <div class="content">
                <p>${message}</p>
              </div>
            </div>
       </body>
    </html>`;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: process.env.GMAIL_TO,
      subject: `Mail from ${email}`,
      html: htmlTemplate,
    });

    return res
      .status(200)
      .json({ message: "Your message received successful !" });
  } catch (error) {
    console.error("Error at sendMessageToMail", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { sendMessageToMail };

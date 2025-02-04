export function EmailTemplate({ email }: { email: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome to the PentaTON Waitlist!</title>
      </head>
      <body>
        <p>Hi ${email},</p>
        <p>Welcome to the PentaTON waitlist! We're thrilled you're interested in our product.</p>
        <p>We'll notify you as soon as it's launched.</p>
        <p>Thanks,<br>The PentaTON Team</p>
      </body>
    </html>
  `
}


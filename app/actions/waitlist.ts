"use server"

import { z } from "zod"
import { Resend } from "resend"
import { EmailTemplate } from "../components/email-template"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const email = formData.get("email")

    if (!email) {
      return { success: false, message: "Email is required" }
    }

    const result = schema.safeParse({ email })

    if (!result.success) {
      return { success: false, message: result.error.errors[0].message }
    }

    // Add subscriber to Mailchimp
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
    const MAILCHIMP_DC = process.env.MAILCHIMP_API_KEY?.split("-")[1]

    const response = await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      if (error.title === "Member Exists") {
        return { success: false, message: "You are already subscribed to the waitlist!" }
      }
      throw new Error("Failed to subscribe to waitlist")
    }

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: "PentaTON <onboarding@resend.dev>",
      to: email.toString(),
      subject: "Welcome to the PentaTON Waitlist!",
      html: EmailTemplate({ email: email.toString() }),
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Failed to join waitlist. Please try again." }
    }

    // Get subscriber count from Mailchimp
    const countResponse = await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}`, {
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      },
    })

    const listData = await countResponse.json()
    const count = listData.stats.member_count

    return {
      success: true,
      message: "You have been added to the waitlist! Check your email for confirmation.",
      count,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getWaitlistCount() {
  try {
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
    const MAILCHIMP_DC = process.env.MAILCHIMP_API_KEY?.split("-")[1]

    const response = await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}`, {
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      },
    })

    const data = await response.json()
    return data.stats.member_count
  } catch (error) {
    return 0
  }
}



import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface EmailRequest {
  userId: string;
  status: 'approved' | 'rejected' | 'in_review';
  rejectionReason?: string;
  userEmail: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, status, rejectionReason, userEmail }: EmailRequest = await req.json()

    const emailContent = getEmailContent(status, rejectionReason)

    const { data, error } = await resend.emails.send({
      from: 'Verification Team <verification@uberescorts.com>',
      to: [userEmail],
      subject: `Verification Status Update: ${status.toUpperCase()}`,
      html: emailContent,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

function getEmailContent(status: string, rejectionReason?: string) {
  switch (status) {
    case 'approved':
      return `
        <h1>Congratulations! Your verification has been approved</h1>
        <p>Your account has been successfully verified. You now have access to all verified user features.</p>
      `
    case 'rejected':
      return `
        <h1>Verification Status Update</h1>
        <p>Unfortunately, your verification request was not approved.</p>
        ${rejectionReason ? `<p>Reason: ${rejectionReason}</p>` : ''}
        <p>You can submit a new verification request after addressing the issues.</p>
      `
    case 'in_review':
      return `
        <h1>Verification Update</h1>
        <p>Your verification request is now being reviewed by our team.</p>
        <p>We'll notify you as soon as the review is complete.</p>
      `
    default:
      return `
        <h1>Verification Status Update</h1>
        <p>There has been an update to your verification status.</p>
      `
  }
}

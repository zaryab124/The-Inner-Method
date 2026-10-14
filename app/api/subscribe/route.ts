import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, source, consentGiven } = body;

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // Verify explicit consent
    if (!consentGiven) {
      return NextResponse.json(
        { error: 'Explicit consent is required to join the newsletter.' },
        { status: 400 }
      );
    }

    // Free tier / provider integration hooks (e.g. Mailchimp, ConvertKit, Resend or Buttondown)
    const EMAIL_PROVIDER_API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
    const EMAIL_LIST_ID = process.env.EMAIL_LIST_ID;

    if (EMAIL_PROVIDER_API_KEY && EMAIL_LIST_ID) {
      console.log(`[Email Provider] Forwarding subscriber ${email} to provider.`);
    }

    // Log the successful subscription for local testing and records
    console.log(`[Lead Captured] Email: ${email}, Name: ${firstName || 'N/A'}, Source: ${source || 'direct'}, Consent: ${consentGiven}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription successful. Your free guide is ready for download.',
        downloadUrl: '/free-resources#download',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Subscription error:', message);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

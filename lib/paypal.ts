// Base URL
const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

// Sets up order form and takes payment
export const paypal = {};

// Generates paypal access token
async function generateAccessToken() {
  // Destruct the process.env to get the client ID and secret
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  // Encode the paypal client id and secret to base64
  // CLIENT_ID:CLIENT_SECRET

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64'
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
    const jsonData = await response.json();
    return jsonData.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

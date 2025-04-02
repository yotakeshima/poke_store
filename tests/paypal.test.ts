import { generateAccessToken } from '../lib/paypal';

// Test to generate access token from paypal
test('generate token from paypal', async () => {
  const tokennResponse = await generateAccessToken();
  console.log(tokennResponse);
  expect(typeof tokennResponse).toBe('string');
  expect(tokennResponse.length).toBeGreaterThan(0);
});

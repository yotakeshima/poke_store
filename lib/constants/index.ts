export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Pokestore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_DESCRIPTION || 'Ecommerce website for Pokemon TCG';
export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
export const RECENT_LISTING_LIMIT =
  Number(process.env.RECENT_LISTING_LIMIT) || 4;

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const shippingAddressDefaultValues = {
  fullName: 'John Doe',
  streetAddress: '123 Main st.',
  city: 'Randomville',
  postalCode: '12345',
  country: 'USA',
};

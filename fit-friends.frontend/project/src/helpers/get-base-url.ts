const DEFAULT_BASE_URL = 'http://localhost:3333';

export const getBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log('REACT_APP_BASE_URL', baseUrl);
  return baseUrl ?? DEFAULT_BASE_URL;
};

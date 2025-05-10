module.exports = {
  reactStrictMode: true,
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE || 'default_value',
  },
};
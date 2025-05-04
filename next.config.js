module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE || 'default_value',
  },
};
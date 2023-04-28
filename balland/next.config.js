/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["localhost", "*","drive.google.com"],
  },
  env : {
    API_URL : process.env.API_URL,
  },
  reactStrictMode: true,
}

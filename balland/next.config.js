/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: ["localhost", "*","drive.google.com"],
  },
  env : {
    API_URL : process.env.API_URL,
    IMAGE_URL : process.env.IMAGE_URL
  },
  reactStrictMode: true,
}

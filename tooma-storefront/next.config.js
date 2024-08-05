// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['tooma.s3.eu-north-1.amazonaws.com'], 
    },
  }
  
  module.exports = nextConfig
  
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
});

module.exports = nextConfig({ reactStrictMode: true, swcMinify: true });

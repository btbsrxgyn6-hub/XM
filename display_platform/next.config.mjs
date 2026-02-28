import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: false
  }
};

export default withNextIntl(nextConfig);

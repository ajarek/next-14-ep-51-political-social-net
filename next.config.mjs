/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.prawo.pl' },
      { protocol: 'https', hostname: 'ocdn.eu' },
    ],
  },
}

export default nextConfig

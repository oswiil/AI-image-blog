    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
      images: {
        domains: [`localhost`],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/public/**',
          },
        ],
       
      },
      experimental: {
        images: {
            unoptimized: false
        }
    }
    };
    
    module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'instagram.fbom63-1.fna.fbcdn.net',
            port: '',
            pathname: '/**',
        },
    ],
},
};

export default nextConfig;

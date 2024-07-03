/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/default_pages/home",
                destination: "/home",
                permanent: true,
            }
        ]
    }
};


export default nextConfig;


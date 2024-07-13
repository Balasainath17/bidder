/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
           {
                 hostname: "pub-525cee75e37a47a29e1c093d6b2a8578.r2.dev",
                 protocol: "https",
                 port: "",
           },
           {
            hostname: "lh3.googleusercontent.com",
            protocol: "https",
            port: "",
          },
        ]
    }
};

export default nextConfig;

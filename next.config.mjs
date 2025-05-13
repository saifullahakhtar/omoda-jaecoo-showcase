/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: true,
	experimental: {
		appDir: true, // This is for Next.js App Directory
	},
};

export default nextConfig;

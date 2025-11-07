import type { NextConfig } from 'next';
import { withPlausibleProxy } from 'next-plausible';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default withPlausibleProxy({
  customDomain: 'https://plausible.cl3tusdev.com',
})(nextConfig);

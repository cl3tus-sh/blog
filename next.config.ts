import type { NextConfig } from 'next';
import { withPlausibleProxy } from 'next-plausible';

import { siteConfig } from '@/config/site';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default withPlausibleProxy({
  customDomain: siteConfig.analytics.plausibleCustomDomain,
})(nextConfig);

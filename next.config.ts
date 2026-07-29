import type { NextConfig } from 'next'

// github pages serves a project site from /<repo-name>, but `npm run dev` serves from /.
// so basePath is only applied to production builds, which keeps localhost:3000 clean.
const REPO = 'technical-training-pos'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${REPO}` : '',
  images: { unoptimized: true },
}

export default nextConfig

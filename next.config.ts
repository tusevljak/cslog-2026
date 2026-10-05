import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Standalone output → potreban za Docker/Coolify deploy.
  // Vercel ignoriše ovaj flag, pa je bezbedno držati ga uvek.
  output: 'standalone',

  // Statične slike su se služile sa max-age=0 → browser ih je proveravao pri
  // svakoj poseti. 7 dana keš + 30 dana stale-while-revalidate: brzo, a ako
  // se fajl zameni pod istim imenom (npr. pratnja.jpg), osveži se u roku od nedelju.
  async headers() {
    const week = 'public, max-age=604800, stale-while-revalidate=2592000'
    return [
      ...['slike', 'galerija', 'prikolice', 'blog', 'usluge', 'sertifikat', 'potpisi', 'logo', 'flags']
        .map(dir => ({ source: `/${dir}/:path*`, headers: [{ key: 'Cache-Control', value: week }] })),
      // Upload-ovi imaju jedinstveno ime (timestamp) — nikad se ne menjaju
      { source: '/uploads/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
}

export default nextConfig

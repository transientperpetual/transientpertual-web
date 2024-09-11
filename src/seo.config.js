export const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

const seoConfig = {
  defaultTitle: 'Ankit Jangid | Thinker',
  titleTemplate: '%s | Ankit Jangid',
  description:
    'Thinker',
  openGraph: {
    title: 'Ankit Jangid',
    description:
      'Thinker',
    images: [
      {
        url: `${baseUrl}api/og?title=home`,
        width: 1200,
        height: 600,
        alt: `Ankit Jangid | Thinker`,
      },
    ],
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Ankit Jangid',
  },
  twitter: {
    handle: '@_workingathlete',
    site: '@_workingathlete',
    cardType: 'summary_large_image',
  },
}

export default seoConfig

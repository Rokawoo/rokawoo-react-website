import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export function SEO({ 
  title = 'Rokawoo',
  description = 'Wεlcοmε Tο Μγ Rοκαspacε <3',
  image = '/favicon.ico',
  url = 'https://rokawoo.com',
  type = 'website'
}: SEOProps) {

  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `${url}${image}`

  return (
    <Helmet>
      {/* Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  )
}
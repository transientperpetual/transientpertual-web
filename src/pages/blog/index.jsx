import { NextSeo } from 'next-seo'
import slugify from 'slugify'

import { SimpleLayout } from '@/components/SimpleLayout'
import { BlogCard } from '@/components/BlogCard'
import { getDatabase } from '@/lib/notion'
import { getArticlePositions } from '@/lib/getArticlePositions'
import { baseUrl } from '../../seo.config'

import { createClient } from '@supabase/supabase-js'

export default function Blog({ articles, articlePositions }) {
  const rearrangedArticles = Object.values(articlePositions).map(
    (pos) => articles[pos - 1]
  )
  return (
    <>
      <NextSeo
        title="Blog"
        description="An exploration of how intuition leads to the discovery of personal truths, as layers of conditioning fall away, leaving behind clarity and authenticity."
        canonical={`${baseUrl}blog/`}
        openGraph={{
          url: `${baseUrl}blog/`,
          title: 'Blog',
          description:
            'An exploration of how intuition leads to the discovery of personal truths, as layers of conditioning fall away, leaving behind clarity and authenticity.',
          images: [
            {
              url: `${baseUrl}api/og?title=Blog`,
              width: 1200,
              height: 600,
              alt: `Blog | Ankit Jangid`,
            },
          ],
        }}
      />
      <SimpleLayout
        title="Shedding Conditioning to"
        postTitle="Find Truth."
        intro="An exploration of how intuition leads to the discovery of personal truths, as layers of conditioning fall away, leaving behind clarity and authenticity."
      >
        <div className="masonry lg:masonry-md md:masonry-sm">
          <div className="hidden space-y-10 md:block">
            {rearrangedArticles.map(
              (article, index) =>
                article.properties.Publish.checkbox &&
                article.properties.Type.select.name === 'Writing' && (
                  <BlogCard key={index} article={article} index={index} />
                )
            )}
          </div>
          <div className="space-y-10 md:hidden">
            {articles.map(
              (article, index) =>
                article.properties.Publish.checkbox &&
                article.properties.Type.select.name === 'Writing' && (
                  <BlogCard key={index} article={article} index={index} />
                )
            )}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
export const getStaticProps = async () => {
  const databaseId = process.env.NOTION_BLOG_DB_ID
  const database = await getDatabase(databaseId, 'date', 'descending')
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  // const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || ''
  // const SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey)

  // // Fetch pageViews data for each article and update the database object
  // for (const article of database) {
  //   const title = slugify(article.properties?.name.title[0].plain_text, {
  //     strict: true,
  //     lower: true,
  //   })
  //   const response = await SupabaseAdmin.from('analytics')
  //     .select('views')
  //     .filter('slug', 'eq', title)
  //   const pageViews = response.data[0]?.views || 0

  //   // Update the article object with the pageViews data
  //   article.pageViews = pageViews
  // }

  return {
    props: {
      articles: database,
      articlePositions: getArticlePositions(database.length),
    },
    revalidate: 1,
  }
}

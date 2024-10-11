import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import slugify from 'slugify'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDatabase } from '@/lib/notion'
import { getArticlePositions } from '@/lib/getArticlePositions'
import { baseUrl } from '../../seo.config'
import { useState, Fragment, useEffect } from 'react'
import { Card } from '@/components/Card'

const delay = ['', 'delay-200', 'delay-500', 'delay-1000']

function Project({ project, index }) {
  const [isLoading, setLoading] = useState(true)
  const projectTitle = project.properties?.Name.title[0]?.plain_text
  const projectDescription = project.properties.Description.rich_text
  const slug = slugify(projectTitle, { strict: true, lower: true })
  const techUsed = project.properties.Tech?.multi_select

  //todo: add logic to understand links and assign icon accordingly.
  const github = undefined
  const link = undefined
  // const image = project.image
  const coverImgFn = () => {
    if (project.cover) {
      const imgType = project.cover.type
      const image =
        imgType === 'external'
          ? project.cover.external.url
          : project.cover.file.url
      return image
    } else {
      return false
    }
  }

  // add something that can show that the project is loading
  useEffect(() => {
    // console.log('loading : ', isLoading)
  }, [isLoading])

  const coverImg = coverImgFn()

  const ArticleWrapper = Link
  const linkProps = { href: '/projects/' + slug }

  return (
    <>
      <ArticleWrapper
        {...linkProps}
        className={'cursor-pointer'}
        // onClick={handleClick}
      >
        <Card as="li">
          <div className=" aspect-w-16 aspect-h-9 group relative z-10 flex h-56 w-full cursor-pointer items-center justify-center transition duration-500 dark:ring-0 tab:h-80 md:group-hover:scale-105 lg:h-64">
            <Image
              unoptimized
              src={coverImg}
              alt={`Screenshot of ${projectTitle}`}
              className={clsx(
                `h-full w-full rounded-xl shadow-md object-cover duration-1000 ease-in-out ${delay[index]}`,
                isLoading ? 'blur-xl' : 'blur-0'
              )}
              height="300"
              width="500"
              priority
              // placeholder="blur"
              onLoad={() => setLoading(false)}
            />
          </div>
          <h2 className="z-10 mt-6 cursor-pointer font-heading text-xl tracking-wider text-zinc-800 group-hover:underline dark:text-zinc-100">
            {projectTitle}
          </h2>
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-100/80 opacity-0 transition dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl md:group-hover:scale-100 md:group-hover:opacity-100" />
          <div className="z-10 pt-2">
            {techUsed.map((item, i) => {
              return (
                <Fragment key={i}>
                  <span className="mr-2 inline-flex rounded-md font-poppins text-sm font-medium text-indigo-500/80 dark:text-indigo-400/70">
                    {item.name}
                  </span>
                  {techUsed.length - 1 !== i && (
                    <span className="mr-2 text-zinc-400 dark:text-zinc-500">
                      |
                    </span>
                  )}
                </Fragment>
              )
            })}
          </div>
          <Card.Description>
            {projectDescription[0].plain_text}
          </Card.Description>
          {/* <p className="relative z-10 mt-4 flex items-center space-x-4 font-poppins text-xs font-medium text-zinc-500 transition dark:text-zinc-200">
        {github && (
          <Link
          href={github}
          className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300 md:hover:text-indigo-500"
          >
          <BsGithub className="h-[0.9rem] w-[0.9rem] flex-none fill-current transition" />
          <span className="ml-2">Source Code</span>
          </Link>
          )}
        {link && (
          <Link
          href={link}
          className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300 md:hover:text-indigo-500"
          >
          <BsLink45Deg className="h-4 w-4 flex-none fill-current transition" />
          <span className="-ml-4">Live Demo</span>
          </Link>
          )}
          </p> */}
        </Card>
      </ArticleWrapper>
    </>
  )
}

export default function Projects({ projects, articlePositions }) {
  const rearrangedArticles = Object.values(articlePositions).map(
    (pos) => projects[pos - 1]
  )

  return (
    <>
      <NextSeo
        title="Projects"
        description="Creations born from curiosity and the pursuit of innovation."
        canonical={`${baseUrl}projects/`}
        openGraph={{
          url: `${baseUrl}projects/`,
          title: 'Projects',
          description:
            'Creations born from curiosity and the pursuit of innovation',
          images: [
            {
              url: `${baseUrl}api/og?title=Projects`,
              width: 1200,
              height: 600,
              alt: `Projects | Ankit Jangid`,
            },
          ],
        }}
      />
      <SimpleLayout
        preTitle="Things built through me."
        // title="trying to put my dent in the universe."
        intro="Creations born from curiosity and the pursuit of innovation."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
export const getStaticProps = async () => {
  const databaseId = process.env.NOTION_PROJECTS_DB_ID
  const database = await getDatabase(databaseId, 'date', 'descending')
  return {
    props: {
      projects: database,
      articlePositions: getArticlePositions(database.length),
    },
    revalidate: 1,
  }
}

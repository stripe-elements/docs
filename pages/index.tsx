import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {remark} from 'remark'
import html from 'remark-html'
import { getAllPosts, getPostBySlug } from '../libs/markdownPosts'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {(props as any).posts.map((post: any) => {
          return (
            <Link href={`/${post.slug}`} passHref>
              <a>
                {post.title}
              </a>
            </Link>
          )
        })}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const getStaticProps: GetStaticProps = async () => {

  const postSlugs = getAllPosts()
  const posts = await Promise.all(postSlugs.map(async(slug) => {
    const post = getPostBySlug(slug, ['date', 'title', 'content',])
    return {
      slug: Array.isArray(slug) ? slug.join('/'):slug,
      ...post,
      content: await markdownToHtml(post.content as any)
    }
  }))
  console.log(posts)

  return {
    props: {
      posts
    }
  }
}
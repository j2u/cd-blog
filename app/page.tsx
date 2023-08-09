import Head from "next/head"
import utilStyles from './styles/utils.module.css'
import { getSortedPostsData } from './api/posts';
import { Post } from "./model/post";
import Link from "next/link";
import FNDate from './components/date'
import RootLayout, { siteTitle } from "./layout";
import { GetStaticProps } from 'next';

interface PostProps {
  allPostsData: Array<Post>;
}


export default function Home({ allPostsData }: PostProps) {
  return (
    <RootLayout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <FNDate dateString={date.toISOString()} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </RootLayout>
  )
}

export const getStaticProps: GetStaticProps<Array<Post>> = async (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: allPostsData
  }
}


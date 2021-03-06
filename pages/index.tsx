import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "../components/Layouts/PageLayout";
import { getGitHubReadme } from "../libs/github/getReadme";
import { markdownToHtml } from "../libs/markdown/converters";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return (
    <PageLayout title="stripe-elements Home">
      <Head>
        <title>stripe-elements - Stripe Webcomponent library</title>
        <meta
          name="description"
          content="Simple Web Component library by using Stripe Element"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="ion-padding">
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      </main>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  text: string;
}> = async () => {
  const { text } = await getGitHubReadme();

  return {
    props: {
      text: await markdownToHtml(text),
    },
  };
};

import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/clex1oiky01pk01ui0pgecz7d/master"
);

const QUERY = gql`
  {
    posts {
      title
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
      createdAt
      createdBy {
        id
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
  };
}
export default function Home({ posts }) {
  console.log("posts", posts);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {posts.map((post) => {
          return (
            <div key={post.createdAt}>
              <h1>{post.title}</h1>
              <p>{post.datePublished}</p>
              <p>{post.name} </p>

            
            </div>
          );
        })}
      </main>
    </>
  );
}

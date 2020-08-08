import { BaseLayout } from '../../components/layouts/BaseLayout';
import Router from 'next/router';
import { Post } from '../../types/post';
import axios from 'axios';
import { NextPageContext } from 'next';

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

export const getServerSideProps = async ({ query }: PostNextPageContext) => {
  let post: Post;
  try {
    const { data } = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
    post = data;
  } catch (e) {
    console.log(e);
  }

  return { props: { post }};
}

interface PostPageProps {
  post: Post,
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <BaseLayout>
      <h1>Post {post.id}</h1>
      <h2>{post.title}</h2>
      <h3>{post.body}</h3>
    </BaseLayout>
  )
}
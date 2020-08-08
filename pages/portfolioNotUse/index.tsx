import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Post } from '../../types/post';
import Link from 'next/link';
import axios from 'axios';

export const getServerSideProps = async () => {
  let posts: Post[] = [];
  try {
    const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    posts = data;
  } catch (e) {
    console.log(e);
  }
  return { props: { posts }};
}

interface PortfolioProps {
  posts: Post[]
}

export default function Portfolio({ posts }: PortfolioProps) {
  return (
    <BaseLayout>
      <h1>Hello Portfolio</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href="/portfolio/[id]" as={`/portfolio/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </BaseLayout>
  )
}

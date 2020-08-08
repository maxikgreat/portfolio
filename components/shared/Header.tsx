import Link from 'next/link';
import { Container } from 'semantic-ui-react';

export const Header = () => {
  return (
    <header>
      <Container>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/portfolio">
          <a>Portfolio</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </Container>
    </header>
  )
}

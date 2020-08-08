import Link from 'next/link';

export const Header = () => {
  return (
    <>
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
    </>
  )
}

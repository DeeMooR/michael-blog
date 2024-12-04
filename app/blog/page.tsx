import Link from "next/link";

interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string
}

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 60
    }
  });
  if (!response.ok) throw new Error('Unable to fetch posts!')
  return response.json();
}

export default async function Blog() {
  const posts = await getData();

  return (
    <>
      <h1>Blog page</h1>
      <ul>
        {posts.map((post: IPost) =>
          <li key={post.id}>
            <Link href={`blog/${post.id}`}>{post.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}
import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  }
}

async function getData(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 60
    }
  });
  if (!response.ok) return null;
  return response.json();
}

export async function generateMetadata({ params: {id} }: Props) {
  const post = await getData(id);

  return {
    title: post.title
  }
}

export default async function Post({params: { id }}: Props) {
  const post = await getData(id);

  if (!post) {
    redirect('/blog');
    return null;
  }

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  )
}
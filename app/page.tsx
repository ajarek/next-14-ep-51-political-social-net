import Hero from '@/components/Hero'
import { auth } from '@/app/api/auth/auth'
import CreatePost from '@/components/CreatePost'
import {getArticles} from '@/lib/action'
export default async function Home() {
  const session = await auth()
  const articles= await getArticles()
  console.log(articles);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-24 py-8 gap-8">
      {session ? <CreatePost /> : <Hero />}
     
    </main>
  )
}

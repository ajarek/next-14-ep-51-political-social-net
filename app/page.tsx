import Hero from '@/components/Hero'
import { auth } from '@/app/api/auth/auth'
import CreatePost from '@/components/CreatePost'
import { getArticles } from '@/lib/action'
import Articles from '@/components/Articles'

export default async function Home() {
  const session = await auth()
  const articles = await getArticles()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-24 max-sm:px-4 py-8 gap-8">
      {session ? <CreatePost /> : <Hero />}
      {articles ? <Articles articles={articles} /> : <div>Brak Artykułów</div>}
    </main>
  )
}

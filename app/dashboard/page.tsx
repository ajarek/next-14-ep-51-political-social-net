import { auth } from '@/app/api/auth/auth'
import { getArticles } from '@/lib/action'
import Articles from '@/components/Articles'
const Dashboard = async() => {
    const session =await auth()
    const articles = await getArticles()
    const myArticles = articles?.filter((article) =>( article.userName).toLowerCase() === (session?.user?.name)?.toString().toLowerCase())
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-24 max-sm:px-4 py-8 gap-8">

         {myArticles && myArticles?.length>0 ? <Articles articles={myArticles} /> : <div>Brak Artykułów</div>}
        </div>
  )
}

export default Dashboard
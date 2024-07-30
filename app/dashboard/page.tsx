import { auth } from '@/app/api/auth/auth'
import { getArticles } from '@/lib/action'
import Articles from '@/components/Articles'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircleMore } from 'lucide-react'
import DeleteBtnArticle from '@/components/DeleteBtnArticle'

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}
const Dashboard = async () => {
  const session = await auth()
  const articles = await getArticles()
  const myArticles = articles?.filter(
    (article) =>
      article.userName.toLowerCase() ===
      session?.user?.name?.toString().toLowerCase()
  )
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-24 max-sm:px-4 py-8 gap-8">
      <>
        {myArticles?.map((art) => {
          return (
            <div
              key={art._id}
              className="w-3/4 max-lg:w-full flex flex-col   border-2 p-4 rounded-lg gap-4"
            >
              <div className="flex justify-between items-center max-lg:flex-col">
                <div>
                  <h1 className="text-xl font-semibold capitalize">
                    {art.title}
                  </h1>
                  <div>{art.createdAt.toLocaleString('pl-PL', options)}</div>
                </div>
                <div className="capitalize">
                  <span className="text-gray-400">autor: </span>
                  {art.userName}
                </div>
              </div>

              <div className="flex items-center  gap-8">
                <Image
                  src={art.image}
                  width={80}
                  height={80}
                  alt="image"
                />
                <div>{art.contents.slice(0, 150)} ...</div>
              </div>
              <div className="flex items-center justify-between gap-8">

                <div className='flex items-center gap-2 '>
                  <div className="flex gap-2 max-sm:flex-col">
                    <Heart color={art.likes.length > 0 ? 'red' : 'gray'} />
                    <span>{art.likes.length} polubień</span>
                  </div>
                  <div className="flex gap-2  max-sm:flex-col">
                    <MessageCircleMore
                      color={art.comments.length > 0 ? 'green' : 'gray'}
                    />
                    <span>{art.comments.length} komentarzy</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/article/${(art._id).toString()}`}
                    passHref={true}
                    className="hover:scale-150 transition-all duration-200"
                  >
                    👁️
                  </Link>
                  <DeleteBtnArticle id={(art._id).toString()} />
                  <Link
                    href={`/edit?id=${(art._id).toString()}&title=${art.title}&contents=${art.contents}&image=${art.image}`}
                     className="hover:scale-150 transition-all duration-200"
                  >
                    🖊️
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </>
    </div>
  )
}

export default Dashboard

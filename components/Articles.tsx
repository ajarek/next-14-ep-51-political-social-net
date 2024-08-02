import Image from 'next/image'
import { Heart, MessageCircleMore } from 'lucide-react'
import type { Article as ArticleType } from '@/lib/models'
import Link from 'next/link'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const Articles = ({ articles }: { articles: ArticleType[] }) => {
  return (
    <>
      {articles?.map((art) => {
        return (
          <Link
            href={`/article/${art._id}`}
            passHref={true}
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

            <div className="flex flex-wrap items-center  gap-8">
              <Image
                src={art.image}
                width={80}
                height={80}
                alt="image"
              />
              <div>{art.contents.slice(0, 150)} ...</div>
            </div>
            <div className="flex gap-8">
              <div className="flex gap-2">
                <Heart color={art.likes.length > 0 ? 'red' : 'gray'} />
                <span>{art.likes.length} polubień</span>
              </div>
              <div className="flex gap-2">
                <MessageCircleMore
                  color={art.comments.length > 0 ? 'green' : 'gray'}
                />
                <span>{art.comments.length} komentarzy</span>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default Articles

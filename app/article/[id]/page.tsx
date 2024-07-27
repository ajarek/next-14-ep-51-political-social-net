import { getArticle } from '@/lib/action'
import Image from 'next/image'
import { Heart, MessageCircleMore } from 'lucide-react'
import AddLike from '@/components/AddLike'
import AddComment from '@/components/AddComment'

const ArticleId = async ({ params }: { params: { id: string } }) => {
  const newArticle = await getArticle(params.id)
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-2 max-lg:grid-cols-1 px-24 py-12 items-start justify-center gap-8">
      <div className="">
        <Image
          src={newArticle?.image || ''}
          alt="foto"
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <span className="text-gray-400">autor:</span>
          <h1>{newArticle?.userName}</h1>
        </div>
        <h1 className="text-2xl ">{newArticle?.title}</h1>
        <p className='text-xl'>{newArticle?.contents}</p>
        <div className="flex gap-16 ">
          <div className="flex gap-2">
            <Heart
              color={
                newArticle && newArticle.likes && newArticle.likes.length > 0
                  ? 'red'
                  : 'gray'
              }
            />
            <span>{newArticle?.likes.length} polubień</span>
          </div>
          <div className="flex gap-2">
            <MessageCircleMore
              color={newArticle && newArticle.comments && newArticle.comments.length > 0 ? 'red' : 'gray'
            }
            />
            <span>{newArticle?.comments.length} komentarzy</span>
          </div>
        </div>
        <div className="flex gap-8">
          <AddLike id={newArticle && (newArticle._id).toString()}/>
          <AddComment id={newArticle && (newArticle._id).toString()}/>
        </div>
        <div className="flex flex-col gap-4">
          <h2>Komentarze:</h2>{' '}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            eveniet, molestias illo ex aliquam quia blanditiis unde ducimus
            recusandae repellat sunt impedit, doloribus autem doloremque
            voluptas ad odit odio? Reprehenderit, perspiciatis eum soluta sint
            cupiditate laboriosam alias debitis aliquam in consequuntur aperiam
            unde quasi voluptatem dolorem ad itaque quos porro.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            eveniet, molestias illo ex aliquam quia blanditiis unde ducimus
            recusandae repellat sunt impedit, doloribus autem doloremque
            voluptas ad odit odio? Reprehenderit, perspiciatis eum soluta sint
            cupiditate laboriosam alias debitis aliquam in consequuntur aperiam
            unde quasi voluptatem dolorem ad itaque quos porro.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArticleId

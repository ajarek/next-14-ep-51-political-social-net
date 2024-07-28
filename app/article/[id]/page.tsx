import { getArticle } from '@/lib/action'
import Image from 'next/image'
import { Heart, MessageCircleMore } from 'lucide-react'
import AddLike from '@/components/AddLike'
import AddComment from '@/components/AddComment'
import { Button } from '@/components/ui/button'
import { auth } from '@/app/api/auth/auth'
const ArticleId = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
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
        <p className="text-xl">{newArticle?.contents}</p>
        <div className="flex gap-16 "></div>
        <div className="flex flex-col gap-4">
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
          {session ? (
            <AddLike id={newArticle && newArticle._id.toString()} />
          ) : (
            <Button variant={'destructive'} className="w-fit">Zaloguj się aby polubić</Button>
          )}
          <div className="flex gap-2 ">
            <MessageCircleMore
              color={
                newArticle &&
                newArticle.comments &&
                newArticle.comments.length > 0
                  ? 'green'
                  : 'gray'
              }
            />
            <span>{newArticle?.comments.length} komentarzy</span>
          </div>
          {session ? (
            <AddComment id={newArticle && newArticle._id.toString()} />
          ) : (
            <Button variant={'destructive'} className="w-fit">
              Zaloguj się aby dodać komentarz
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2>Komentarze:</h2>
          {newArticle &&
            newArticle.comments &&
            newArticle.comments.length > 0 &&
            newArticle.comments.map((comment: any, index: number) => (
              <div key={index}>
                <div className="flex gap-2">
                  <span className="text-gray-400">autor:</span>
                  <h1>{comment.userName}</h1>
                </div>
                <p>{comment.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ArticleId

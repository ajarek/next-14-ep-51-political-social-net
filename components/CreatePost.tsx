'use client'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Image as Img, Video, Send } from 'lucide-react'
import { createArticle } from '@/lib/action'

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [openImage, setOpenImage] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)

  return (
    <div className="  w-3/4 max-lg:w-full grid grid-cols-1 gap-8 items-center justify-center border-2 p-4 rounded-lg">
      <div className=" flex flex-col  gap-4">
        <h1 className="text-2xl font-bold">Napisz Artykuł</h1>

        <form
          ref={ref}
          className="w-full  flex flex-col gap-4 p-6  text-primary"
          action={async (formData) => {
            await createArticle(formData)
            ref.current?.reset()
          }}
        >
          <Input
            type="text"
            placeholder="Tytuł Artykułu"
            name="title"
            required
          />
          <Textarea
            placeholder="Treść Artykułu"
            name="contents"
            required
          />
          {openImage && (
            <Input
              type="text"
              placeholder="Dodaj foto"
              name="image"
            />
          )}
          {openVideo && (
            <Input
              type="text"
              placeholder="Dodaj wideo"
              name="video"
            />
          )}
          <div className="flex items-center justify-between gap-4 mt-4">
            <div>
              <Button
                type="button"
                onClick={() => setOpenImage(!openImage)}
                className="bg-transparent text-primary hover:text-primary-foreground"
              >
                <Img />
              </Button>
              <Button
                type="button"
                onClick={() => setOpenVideo(!openVideo)}
                className="bg-transparent text-primary hover:text-primary-foreground"
              >
                <Video />
              </Button>
            </div>
            <Button
              className=" flex items-center  gap-2 "
              type="submit"
            >
              <Send />
              Zapisz i Publikuj
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost

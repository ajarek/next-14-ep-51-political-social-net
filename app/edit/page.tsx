'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { editArticle } from '@/lib/action'
type PropsArticle = {
  id: string
  title: string
  contents: string
  image: string
}

const EditArticle = ({ searchParams }: { searchParams: PropsArticle }) => {
  const { id, title, contents, image } = searchParams
  const ref = useRef<HTMLFormElement>(null)
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-24 max-sm:px-4 py-8 gap-8">
      <h1 className="text-2xl font-bold">Zmień Artykuł</h1>

      <form
        ref={ref}
        className="w-full  flex flex-col gap-4 p-6  text-primary"
        action={async (formData) => {
          await editArticle(formData)
          ref.current?.reset()
        }}
      >
        <input
          type="hidden"
          name="id"
          value={id}
        />
        <Input
          type="text"
          placeholder="Tytuł Artykułu"
          name="title"
          defaultValue={title}
          required
        />
        <Textarea
          placeholder="Treść Artykułu"
          name="contents"
          defaultValue={contents}
          required
        />

        <Input
          type="text"
          placeholder="Dodaj foto"
          name="image"
          defaultValue={image}
          required
        />

        <Button
          className=" w-fit flex items-center self-end  gap-2 "
          type="submit"
        >
          Zapisz Zmiany
        </Button>
      </form>
    </div>
  )
}

export default EditArticle

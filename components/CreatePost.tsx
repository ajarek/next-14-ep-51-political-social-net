'use client'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
  }

  return (
    <div className="w-3/4 grid grid-cols-1 gap-8 items-center justify-center border-2 p-4 rounded-lg">
      <div className=" flex flex-col  gap-4">
        <h1 className="text-2xl font-bold">Napisz Artykuł</h1>

        <form
          className="w-full  flex flex-col gap-4 p-6  text-primary"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Tytuł Artykułu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Treść Artykułu"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />

          <Button
            className="bg-[#0E78F9] hover:bg-[#0E78F9]/90"
            type="submit"
          >
            Registration
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost

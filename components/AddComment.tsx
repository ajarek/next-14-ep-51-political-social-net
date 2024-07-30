'use client'

import React, { useRef } from 'react'
import { addComment } from '@/lib/action'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'

const AddComment = ({ id}: { id: string | undefined}) => {
  const ref = useRef<HTMLFormElement>(null)
  return (
    <form className='w-full flex flex-col gap-4'
    ref={ref}
    action={async (formData) => {
      const res = await addComment(formData)
      ref.current?.reset()
    }}
  >
    <input
      type='hidden'
      name='id'
      value={id}
    />
   
    <Textarea
      name='comment'
      placeholder='Dodaj Komentarz'
      required
    />
    <Button
      type='submit'
      className='w-fit'
    >
      Dodaj Komentarz
    </Button>
  </form>
  )
}
export default AddComment
'use client'

import React from 'react'
import { addComment } from '@/lib/action'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'

const AddComment = ({ id}: { id: string | undefined}) => {
  return (
    <form className='w-full flex flex-col gap-4'
    action={async (formData) => {
      const res = await addComment(formData)
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
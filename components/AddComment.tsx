'use client'

import React from 'react'
import { addComment } from '@/lib/action'
import { Button } from './ui/button'


const AddComment = ({ id}: { id: string | undefined}) => {
  return (
    <form
    action={async (formData) => {
      const res = await addComment(formData)
    }}
  >
    <input
      type='hidden'
      name='id'
      value={id}
    />

    <Button
      type='submit'
      className=''
    >
      Dodaj Komentarz
    </Button>
  </form>
  )
}
export default AddComment
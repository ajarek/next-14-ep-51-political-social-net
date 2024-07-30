'use client'

import React from 'react'
import { deleteBtnArticle } from '@/lib/action'
import { Button } from './ui/button'


const DeleteBtnArticle = ({ id}: { id: string | undefined}) => {
  return (
    <form
    action={async (formData) => {
      const res = await deleteBtnArticle(formData)
    }}
  >
    <input
      type='hidden'
      name='id'
      value={id}
    />

<Button type='submit'  size={'icon'} className='bg-transparent hover:bg-transparent hover:scale-150 transition-all duration-200'>❌</Button>
  </form>
  )
}

export default DeleteBtnArticle
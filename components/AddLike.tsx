'use client'

import React from 'react'
import { addLike } from '@/lib/action'
import { Button } from './ui/button'


const AddLike = ({ id}: { id: string | undefined}) => {
  return (
    <form
    action={async (formData) => {
      const res = await addLike(formData)
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
      Dodaj Polubienie
    </Button>
  </form>
  )
}

export default AddLike
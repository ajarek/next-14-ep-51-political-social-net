import React from 'react'

const ArticleId = ({ params }: { params: { id: string } }) => {
  return (
    <div>ArticleId {params.id}</div>
  )
}

export default ArticleId
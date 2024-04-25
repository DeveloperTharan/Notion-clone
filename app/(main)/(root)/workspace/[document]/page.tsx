import React from 'react'

export default function DocumentPage({ params }: { params: { document: string } }) {
  return (
    <div>{params.document}</div>
  )
}
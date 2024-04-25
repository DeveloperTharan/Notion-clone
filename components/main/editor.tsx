'use client'

import React from 'react'

interface EditorProps {
    onChange: (e: string) => void;
    initialData: string | null | undefined;
}

export const Editor = ({ onChange, initialData }: EditorProps) => {
  return (
    <div>Editor</div>
  )
}

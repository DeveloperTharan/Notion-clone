'use client'

import { Doc } from '@/convex/_generated/dataModel';
import React from 'react'

interface TitleProps {
    initialData: Doc<"documents">;
  };

export default function Title({ initialData } : TitleProps) {
  return (
    <div>Title</div>
  )
}
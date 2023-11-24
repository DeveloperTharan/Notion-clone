'use client'

import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Title from './Title';

export default function NavBar() {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    });

    if (document === null) {
        return null;
    }

  return (
    <>
    {document === undefined ? (
        <nav className='navbar max-h-fit py-1'>
            <div className='navbar-start skeleton w-28 h-6' />
            <div className='navbar-end'>
                <div className='skeleton w-12 h-6' />
                <div className='skeleton w-6 h-6 rounded-full' />
                <div className='skeleton w-6 h-6 rounded-full' />
                <div className='skeleton w-6 h-6 rounded-full' />
                <div className='skeleton w-6 h-6 rounded-full' />
            </div>
        </nav>
    ) : (
        <nav className='navbar'>
            <div className="navbar-start ms-5">
                <Title initialData={document}/>
            </div>
        </nav>
    )}
    </>
  )
}


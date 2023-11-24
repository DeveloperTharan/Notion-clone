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
        <nav className='navbar max-h-fit min-h-0 py-1'>
            <div className='navbar-start ms-2'>
                <div className='skeleton w-16 h-4'/>
            </div>
            <div className='navbar-end gap-3 me-2'>
                <div className='skeleton w-8 h-4' />
                <div className='skeleton w-5 h-5 rounded-full' />
                <div className='skeleton w-5 h-5 rounded-full' />
                <div className='skeleton w-5 h-5 rounded-full' />
                <div className='skeleton w-5 h-5 rounded-full' />
            </div>
        </nav>
    ) : (
        <nav className='navbar max-h-fit min-h-0 py-1'>
            <div className="navbar-start ms-2">
                <Title initialData={document}/>
            </div>
            <div className="navbar-end me-2">
                
            </div>
        </nav>
    )}
    </>
  )
}


'use client'

import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

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
        </nav>
    ) : (
        <nav className='navbar'>
            <div className="navbar-start ms-5">working</div>
        </nav>
    )}
    </>
  )
}


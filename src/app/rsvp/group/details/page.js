'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default async function Page() {
    const searchParams = useSearchParams()
 
  const search = searchParams.get('rsvp-group')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default async function Home() {

  return (
    <>
    <div class={styles.titleContent}>
      <h1 class="home-title mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Dillon & Jennifer</h1>
      <nav className="flex sm:justify-center space-x-4">
      {[
        ['Home', '/'],
        ['Our Story', '/story'],
        ['Photos', '/photos'],
        ['Q + A', '/qa'],
        ['Travel', '/travel'],
        ['Things to Do', '/activities'],
        ['Registry', '/registry'],
        ['RSVP', '/rsvp']
      ].map(([title, url]) => (
        <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
      ))}
    </nav>
    </div>
    


      <div><Link href="/activities">Activities</Link></div>
      <div><Link href="/photos">Photos</Link></div>
      <div><Link href="/qa">QA</Link></div>
      <div><Link href="/registry">Registry</Link></div>
      <div><Link href="/rsvp">Rsvp</Link></div>
      <div><Link href="/story">Story</Link></div>
      <div><Link href="/travel">Travel</Link></div>
    </>
  )
}

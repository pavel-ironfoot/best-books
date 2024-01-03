import Image from 'next/image'
import styles from './page.module.css'
import { Novels } from '@/components/Novels'

export default function Home() {
  return (
    <main className={styles.main}>
      <Novels />
    </main>
  )
}

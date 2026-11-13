import {getTranslations, setRequestLocale} from 'next-intl/server'
import type {Locale} from 'next-intl'
import {CommonButton} from '@/components/common/CommonButton'
import styles from './page.module.css'

type HomeProps = {
  params: Promise<{locale: string}>
}

export default async function Home({params}: HomeProps) {
  const {locale} = await params
  // Safe: app/[locale]/layout.tsx already rejected unknown locales via hasLocale().
  setRequestLocale(locale as Locale)

  // Server Component: await getTranslations(). In a Client Component use useTranslations().
  const t = await getTranslations('home')

  return (
    <main className={`${styles.root} grid`}>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>
      <CommonButton>{t('title')}</CommonButton>
    </main>
  )
}

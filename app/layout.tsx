import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Noto_Sans_JP } from "next/font/google";

const NotoSansJPFont = Noto_Sans_JP({ weight: "400", subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: '2023卒業・進級制作展評価アプリ',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="bg-[#fafafa]" >
      <body className="bg-background text-foreground">
        <main className={NotoSansJPFont.className}>
          {children}
        </main>
      </body>
    </html>
  )
}

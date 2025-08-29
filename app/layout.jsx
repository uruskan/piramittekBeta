import { GeistSans } from "geist/font/sans"
import { LanguageProvider } from "@/components/language-context"
import SiteNavNew from "@/components/site-nav-new"
import DynamicHtmlLang from "@/components/dynamic-html-lang"
import "./globals.css"

export const metadata = {
  title: "PiramitTek - Teknoloji Çözümleri",
  description: "Karmaşık fikirleri zarif yazılımlara dönüştürüyoruz. Web, mobil, AI/ML, IoT ve güvenlik alanlarında profesyonel çözümler.",
}

function LayoutWithLanguage({ children }) {
  return (
    <LanguageProvider>
      <DynamicHtmlLang />
      <SiteNavNew />
      {children}
    </LanguageProvider>
  )
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeistSans.className} bg-black text-white`}>
        <LayoutWithLanguage>{children}</LayoutWithLanguage>
      </body>
    </html>
  )
}
import type { Metadata } from "next";
import { lato } from "@/app/ui/fonts";
import "@/app/ui/globals.css"
import NavLinks from "@/app/ui/nav-links";
import Footer from "@/app/ui/footer";
import Provider from "@/app/ui/provider";



export const metadata: Metadata = {
  title: {
    template: '%s | NaijaDeli',
    default: 'NaijaDeli',
  },
  description: 'NaijaDeli, World of Nigerian Popular Tribal Dishes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Additional Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Metadata */}
        <meta name="theme-color" content="#008000" />
      </head>
      <body className={`${lato.className} antialiased`}>
        <Provider>
          <div>
            <div></div>
          </div>
          <header>
            <NavLinks />
          </header>
          <main>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Provider>
      </body>
    </html>
  );
}

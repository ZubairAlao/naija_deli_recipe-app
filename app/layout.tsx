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
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

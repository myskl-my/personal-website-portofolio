import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollSpyProvider } from "@/components/providers/scroll-spy";
import { RegisterSection } from "@/components/providers/register-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WelcomeExperience } from "@/components/welcome/welcome-experience";
import { site, sectionIds } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Diki Candra",
    "portfolio",
    "AI-Assisted Developer",
    "Full-Stack Developer",
    "AI-driven development",
    "vibe coding",
    "web developer",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `https://${site.domain}`,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — Portfolio`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Tema situs default gelap dan `enableSystem={false}`, jadi warna browser
  // chrome cukup satu warna gelap — tidak diikuti prefers-color-scheme OS
  // yang bisa bertabrakan dengan tema situs.
  themeColor: "#0c0f11",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-dvh overflow-x-hidden antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* #site-root dibungkus agar layar sambutan bisa menonaktifkan
              interaksi konten di belakangnya (inert) selama intro. */}
          <div id="site-root" className="flex min-h-dvh flex-col">
            <ScrollSpyProvider sections={[...sectionIds]}>
              <Navbar />
              <main className="flex-1">{children}</main>
              <RegisterSection id="kontak">
                <Footer />
              </RegisterSection>
            </ScrollSpyProvider>
          </div>

          <WelcomeExperience />
        </ThemeProvider>
      </body>
    </html>
  );
}

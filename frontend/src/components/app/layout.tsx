import "@/styles/index.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from '@/components/app/footer'

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (   
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col bg-background">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>           
    </ThemeProvider>
  );
}

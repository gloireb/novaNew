import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { AuthProvider } from '@/hooks/use-auth';
import ScrollProgress from '@/components/scroll-progress';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'NOVA+ Connect | Internet Rapide et Illimité à Likasi',
  description: 'Rejoignez NOVA+ Connect et profitez d\'une connexion internet rapide, illimitée et abordable.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <ScrollProgress />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

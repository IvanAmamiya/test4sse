import 'antd/dist/reset.css';
import '../../global.css';
import Providers from './Providers';
import ThemeSwitcher from './ThemeSwitcher';

export const metadata = {
  title: 'Anon Saijo',
  description: 'test4SSE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
            <ThemeSwitcher />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}

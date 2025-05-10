import 'antd/dist/reset.css';
import '../styles/global.css';
import Providers from './Providers';

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
          {children}
        </Providers>
      </body>
    </html>
  );
}

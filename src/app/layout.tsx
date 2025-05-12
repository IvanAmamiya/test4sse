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
  children?: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 24px 0 0' }}>
          </div>
        </Providers>
      </body>
    </html>
  );
}

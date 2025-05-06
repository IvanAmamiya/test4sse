import '../../global.css';

export const metadata = {
  title: 'Anon Saijo',
  description: 'test4SSE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

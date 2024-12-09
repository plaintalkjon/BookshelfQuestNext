export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="articles-layout">
      {children}
    </div>
  );
} 
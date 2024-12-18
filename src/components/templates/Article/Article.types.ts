export interface ArticleProps {
  title: string;
  date: string;
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
  };
  children: React.ReactNode;
}

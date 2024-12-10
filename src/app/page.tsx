import { Home } from "@/components/pages";
import { getRecentArticles } from "@/utils/mdx";

export default async function HomePage() {
  const articles = await getRecentArticles(3);
  
  return <Home articles={articles} />;
}

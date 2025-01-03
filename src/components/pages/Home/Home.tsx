"use client";

import { useUser } from "@/hooks/useUser";
import { Text, Button } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { ArticleShowcase } from "@/components/organisms";
import "./Home.css";
import type { AppRoute } from "@/types/routes";
import type { Article } from "@/types/mdx";

export const Home = ({ articles }: { articles: Article[] }) => {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <div className="home-loading">Loading...</div>;
  }
  return (
    <div className="home-container">
      {user ? (
        // Logged-in view (Dashboard content)
        <>

          <ArticleShowcase title={"Newest Articles"} articles={articles} />
        </>
      ) : (
        // Public landing page
        <>
          <header className="home-hero">
            <Text variant="h1">Track Your Reading Journey</Text>
            <Text variant="body">
              Join BookshelfQuest to discover, track, and share your reading
              adventures
            </Text>
            <Button
              variant="primary"
              onClick={() => router.push("/login" as AppRoute)}
            >
              Get Started
            </Button>
          </header>
          <ArticleShowcase title={"Newest Articles"} articles={articles} />

        </>
      )}
    </div>
  );
};

export default Home;

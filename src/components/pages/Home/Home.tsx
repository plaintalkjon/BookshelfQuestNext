"use client";

import { useUser } from "@/hooks/useUser";
import { Text, Button } from "@/components/atoms";
import { useRouter } from "next/navigation";
import "./Home.css";
import type { AppRoute } from "@/types/routes";

const Home = () => {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <div className="home-loading">Loading...</div>;
  }
  console.log(user);

  return (
    <div className="home-container">
      {user ? (
        // Logged-in view (Dashboard content)
        <>
          <header className="dashboard-header">
            <Text variant="h1">
              Welcome back, {user?.display_name || "Reader"}
            </Text>
            <Text variant="body">Your reading journey continues</Text>
          </header>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <Text variant="h3">Currently Reading</Text>
              <Text variant="body">0 books</Text>
            </div>
          </div>
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
        </>
      )}
    </div>
  );
};

export default Home;

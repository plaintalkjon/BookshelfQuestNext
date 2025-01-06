"use client";

import { Button, Text } from "@/components/atoms";
import { SearchBar } from "@/components/molecules";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useLogin } from "@/hooks/useLogin";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";
import type { AppRoute } from "@/types/routes";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const { data: userData, isLoading: userLoading } = useUser();
  const { logout } = useLogin();

  const navItems: Array<{ label: string; path: AppRoute }> = [
    { label: "Home", path: "/" },
    { label: "Shelf", path: "/shelf" },
    { label: "Articles", path: "/articles" },
    { label: "Settings", path: "/settings" }
  ];

  const handleNavigation = (path: AppRoute) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated && userData?.username) {
      router.push(`/profile/${userData.username}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Button variant="secondary" size="medium" onClick={() => handleNavigation("/")}>
          BookshelfQuest
        </Button>
      </div>

      <div className="navbar-links">
        {navItems.map((item) => (
          <Text
            key={item.path}
            variant="body"
            color="inverse"
            className="nav-link"
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </Text>
        ))}
        <Text 
          variant="body" 
          color="inverse" 
          className="nav-link" 
          onClick={handleProfileClick}
        >
          Profile
        </Text>
        <SearchBar />
      </div>

      <div className="navbar-actions">
        {isLoading || userLoading ? null : isAuthenticated ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => logout.mutate()}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="small"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


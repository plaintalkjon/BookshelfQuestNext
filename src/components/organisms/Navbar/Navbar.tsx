"use client";

import { Button, Text } from "@/components/atoms";
import { SearchBar } from "@/components/molecules";
import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";
import type { AppRoute } from "@/types/routes";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuth();
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
          onClick={() => {
            if (user?.username) {
              handleNavigation(`/profile/${user.username}`);
            } else {
              handleNavigation('/login');
            }
          }}
        >
          Profile
        </Text>
        <SearchBar />
      </div>

      <div className="navbar-actions">
        {isLoading ? null : isAuthenticated ? (
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
            onClick={() => handleNavigation("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;


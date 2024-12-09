"use client";

import { Button, Text } from "@/components/atoms";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";
import type { AppRoute } from "@/types/routes";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();
  const { logout } = useAuth();

  const navItems: Array<{ label: string; path: AppRoute }> = [
    { label: "Home", path: "/" },
    { label: "Library", path: "/library" },
    { label: "Community", path: "/community" },
    { label: "Articles", path: "/articles" },
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
            color="primary"
            className="nav-link"
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </Text>
        ))}
        <Text 
          variant="body" 
          color="primary" 
          className="nav-link" 
          onClick={() => handleNavigation("/profile")}
        >
          Profile
        </Text>
      </div>

      <div className="navbar-actions">
        {isLoading ? null : user ? (
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

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Simple utility function to conditionally join class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Simple Button component
function Button({ 
  children, 
  variant = "default", 
  className = "", 
  onClick,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4",
    outline: "border border-gray-300 hover:bg-gray-50 hover:text-gray-900 h-10 py-2 px-4"
  };
  
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Simple Avatar components
function Avatar({ children, className = "" }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  );
}

function AvatarImage({ src, alt }) {
  return src ? (
    <img className="aspect-square h-full w-full" src={src} alt={alt} />
  ) : null;
}

function AvatarFallback({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
      {children}
    </div>
  );
}

// Simple icon components (using text symbols)
const icons = {
  dashboard: "📊",
  user: "",
  logout: "🚪",
  menu: "☰",
  close: "✕",
  chart: "📈"
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("User Name");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: icons.dashboard },
    { href: "/profile", label: "Profile", icon: icons.user },
    { href: "/settings", label: "Settings", icon: icons.chart },
  ];

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
      }

      setIsMobileOpen(false);
      router.push("/auth/login");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      router.push("/auth/login");
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center py-4">
        <Avatar className="h-16 w-16 md:h-14 md:w-14">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>
            {userName === "Loading..." || userName.length <= 1
              ? "U"
              : userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-2 text-sm font-semibold md:hidden lg:block text-center px-2">
          {userName}
        </h2>
      </div>

      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "flex items-center md:justify-center mx-2 md:mx-0 lg:justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
              pathname.startsWith(item.href)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span className={cn("hidden lg:inline", isMobileOpen && "inline")}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pb-4 px-2">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-gray-100"
          onClick={handleLogout}
        >
          <span className="text-lg">{icons.logout}</span>
          <span className={cn("md:hidden lg:inline", isMobileOpen && "inline")}>
            Log Out
          </span>
        </Button>
      </div>
    </div>
  );

  // Mobile menu button component
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileOpen(true)}
      className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label="Open navigation menu"
    >
      <span className="text-lg">{icons.menu}</span>
    </button>
  );

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <div
          className={cn(
            "fixed inset-0 z-40 transition-all duration-300 ease-in-out",
            isMobileOpen ? "visible bg-black/30" : "invisible"
          )}
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <span className="text-lg">{icons.close}</span>
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed hidden md:block left-0 top-0 z-50 h-screen flex-col border-r bg-white shadow-md p-4 w-64 md:w-20 lg:w-64">
      {sidebarContent}
    </div>
  );
}

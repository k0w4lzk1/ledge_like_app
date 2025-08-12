"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Home, 
  Package, 
  Users, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
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
    outline: "border border-black text-black hover:bg-gray-50 hover:text-black h-10 py-2 px-4"
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
  logout: "🚪",
  menu: "☰",
  close: "✕"
};

// Sidebar Component with Skydash styling
function Sidebar({ role = "admin" }) {
  const router = useRouter();
  const [userName, setUserName] = useState("Aamir");
  const [userBalance, setUserBalance] = useState("25,000.00");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPath, setCurrentPath] = useState("/admin/dashboard");

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

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/bank-data", label: "Bank Data", icon: Package },
    { href: "/admin/admin-bank-data", label: "Admin Bank Data", icon: Settings },
    { href: "/admin/today-payout", label: "Today Payout", icon: TrendingUp },
    { href: "/admin/ledger-book", label: "Ledger Book", icon: Package },
    { href: "/admin/create-user", label: "Create User", icon: Users },
    { href: "/admin/all-beneficiary", label: "All Beneficiary", icon: Users },
    { href: "/admin/balance-request", label: "Balance Request", icon: Bell },
    { href: "/admin/transactions", label: "Transactions", icon: Package },
    { href: "/admin/transaction-type", label: "Transaction Type", icon: Settings },
    { href: "/admin/todays-profit", label: "Todays Profit Overview", icon: TrendingUp },
  ];

  const userNavItems = [
    { href: "/user/dashboard", label: "Dashboard", icon: Home },
    { href: "/user/today-payout", label: "Today Payout", icon: TrendingUp },
    { href: "/user/ledger-book", label: "Ledger Book", icon: Package },
    { href: "/user/balance-request", label: "Balance Request", icon: Bell },
    { href: "/user/transaction", label: "Transaction", icon: Package },
  ];

  const navItems = role === "admin" ? adminNavItems : userNavItems;

  const handleLogout = () => {
    console.log("User logged out successfully");
    router.push("/login");
  };

  const handleNavClick = (href) => {
    setCurrentPath(href);
    router.push(href); // ✅ Navigate to the page
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-lg font-bold text-gray-800 md:hidden lg:block">ETAKA</span>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 py-4 px-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage
            src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
            alt="User"
          />
          <AvatarFallback>
            {userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 md:hidden lg:block">
          <h2 className="text-sm font-semibold text-gray-800 truncate">{userName}</h2>
          <p className="text-xs text-gray-600 mt-1">₹ {userBalance}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 py-3">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavClick(item.href)}
            className={cn(
              "w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors rounded-md",
              currentPath === item.href
                ? "bg-purple-50 text-purple-600 font-medium"
                : "text-gray-700 hover:text-gray-900"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 mr-3",
                currentPath === item.href ? "text-purple-500" : "text-gray-500"
              )}
            />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pb-3 px-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-sm font-medium"
          onClick={handleLogout}
        >
          <span className="text-lg">{icons.logout}</span>
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );

  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileOpen(true)}
      className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {icons.menu}
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
              "absolute left-0 top-0 h-full w-56 bg-white shadow-lg transition-all duration-300 ease-in-out",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-3 top-3">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                {icons.close}
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-56 md:w-20 lg:w-56 bg-white shadow-lg z-10">
      {sidebarContent}
    </div>
  );
}
export { Sidebar, Button, Avatar, AvatarImage, AvatarFallback, cn };
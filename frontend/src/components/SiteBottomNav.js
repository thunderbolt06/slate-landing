import { Link, useLocation } from "react-router-dom";
import { Home, Newspaper, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SiteBottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t-2 border-[#073B4C]/15 pb-[env(safe-area-inset-bottom)]"
      aria-label="Site"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around h-14 px-2">
        <Link
          to="/"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-tight transition-colors",
            path === "/" ? "text-[#118AB2]" : "text-[#073B4C]/60"
          )}
        >
          <Home size={20} strokeWidth={2.25} />
          Home
        </Link>
        <Link
          to="/blogs"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-tight transition-colors",
            path.startsWith("/blogs") ? "text-[#118AB2]" : "text-[#073B4C]/60"
          )}
        >
          <Newspaper size={20} strokeWidth={2.25} />
          Blogs
        </Link>
        <Link
          to="/pricing"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-tight transition-colors",
            path === "/pricing" ? "text-[#118AB2]" : "text-[#073B4C]/60"
          )}
        >
          <DollarSign size={20} strokeWidth={2.25} />
          Pricing
        </Link>
      </div>
    </nav>
  );
}

import { HeaderLogo } from "@/components/layouts/Header/HeaderLogo";
import { UserProfile } from "@/components/layouts/Header/UserProfile";
import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";
import { Link } from "@tanstack/react-router";

const headerMenuList = [
  { title: "Home", href: "/" },
  { title: "Mentors", href: "/mentors" },
  { title: "Chat", href: "/chat" },
];

export const MainHeader = () => {
  const { currentUser } = useCurrentUserStore();

  return (
    <header className="bg-zinc-900 min-h-12 z-[999999] fixed inset-x-0 top-0 overflow-hidden">
      <nav className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/">
            <HeaderLogo className="fill-white" />
          </Link>
          <ul className="flex gap-2 items-center">
            {headerMenuList.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                activeProps={{ className: "text-white after:w-1/2" }}
                className={cn(
                  "font-medium text-gray-400 hover:text-white text-sm px-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 hover:after:w-1/2 after:bg-white after:transition-all"
                )}
              >
                <li className="text-center">{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div
          className={cn(currentUser ? "gap-4" : "gap-2", "flex items-center ")}
        >
          {currentUser ? (
            <>
              <SVGIcon
                path={SVGIcon.paths.bell}
                className="stroke-2 fill-white rounded-full hover:ring-8 hover:bg-zinc-400/10 hover:ring-zinc-400/10"
              />
              <UserProfile user={currentUser} />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-xs font-semibold text-white hover:text-white hover:bg-white/40"
                >
                  Log In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="text-xs font-semibold">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

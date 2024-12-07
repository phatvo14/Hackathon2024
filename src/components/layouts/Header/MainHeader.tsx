import { HeaderLogo } from "@/components/layouts/Header/HeaderLogo";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const headerMenuList = [
  { title: "Home", href: "/" },
  { title: "Mentors", href: "/mentors" },
];

export const MainHeader = () => {
  return (
    <header className="bg-zinc-900 min-h-12 z-[999999] fixed inset-x-0 top-0">
      <nav className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/">
            <HeaderLogo className="fill-white" />
          </Link>
          <ul className="flex gap-2 items-center">
            {headerMenuList.map((item) => (
              <Link
                href={item.href}
                className="font-medium text-gray-400 hover:text-white text-sm px-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 hover:after:w-1/2 after:bg-white after:transition-all"
              >
                <li className="text-center">{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-xs font-semibold text-white hover:text-white hover:bg-white/40"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-xs font-semibold">Sign Up</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

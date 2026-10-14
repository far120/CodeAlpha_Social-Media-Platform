import { Link, useLocation } from "react-router-dom";
import { useuserprofile } from "../../features/user/hooks/useUserProfile";

export interface NavLinkItem {
  name: string;
  path: string;
  roles?: string[];
}

const defaultNavLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard", roles: ["super-admin"] },
  { name: "User Directory", path: "/dashboard/users", roles: ["super-admin"] },
  { name: "Audit Logs", path: "/dashboard/logs", roles: ["super-admin"] },
];

interface NavbarProps {
  links?: NavLinkItem[];
  className?: string;
  onItemClick?: () => void;
  vertical?: boolean;
}

export default function Navbar({
  links = defaultNavLinks,
  className = "",
  onItemClick,
  vertical = false,
}: NavbarProps) {
  const location = useLocation();
  const { userprofile } = useuserprofile();

  const userRole = userprofile?.role;

  // Filter navigation links based on user role
  const filteredLinks = links.filter((link) => {
    if (!link.roles || link.roles.length === 0) return true;
    if (!userRole) return false;
    return link.roles.includes(userRole);
  });

  return (
    <nav
      className={`${
        vertical
          ? "flex flex-col gap-1 w-full"
          : "hidden md:flex items-center gap-1.5"
      } ${className}`}
    >
      {filteredLinks.map((link) => {
        const isActive =
          location.pathname === link.path ||
          (link.path.startsWith("/#") &&
            location.pathname === "/" &&
            location.hash === link.path.substring(1));

        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={onItemClick}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              vertical ? "w-full block py-2.5 px-4 text-base rounded-xl" : ""
            } ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 font-semibold shadow-sm dark:shadow-none"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
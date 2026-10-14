import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedinIn,
  FaCode,
  FaLaptopCode,
  FaEnvelope,
} from "react-icons/fa";

const socialLinks = [
  {
    Icon: FaGithub,
    href: "https://github.com/far120",
    label: "GitHub",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/mostafa-mahmoud-elfar-6a67732b/",
    label: "LinkedIn",
  },
  {
    Icon: FaCode,
    href: "https://codeforces.com/profile/mostafaelfar20",
    label: "Codeforces",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-slate-100 text-slate-600 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-400">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-600/5" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-600/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-5">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-transform duration-200 group-hover:scale-105">
                ME
              </div>

              <div>
                <span className="block text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Mostafa Elfar
                </span>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Full-Stack Developer
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              I'm a Computer Science graduate passionate about building
              modern web applications using React, Node.js, Express.js,
              and MongoDB. I enjoy solving problems, writing clean code,
              and continuously improving my software engineering skills.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-indigo-600/10 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {/* Explore */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Explore
              </h3>

              <ul className="space-y-3">
                {[
                  { name: "Home", to: "/" },
                  { name: "About Me", to: "/about" },
                  { name: "Projects", to: "/projects" },
                  { name: "Skills", to: "/skills" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Technologies
              </h3>

              <ul className="space-y-3">
                {[
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "TypeScript",
                ].map((technology) => (
                  <li
                    key={technology}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Get in Touch
              </h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/far120"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/mostafa-mahmoud-elfar-6a67732b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FaLinkedinIn className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:YOUR_EMAIL@example.com"
                    className="flex items-center gap-2 text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FaEnvelope className="h-4 w-4" />
                    Email Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800/80 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Mostafa Elfar. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <FaLaptopCode className="h-4 w-4 text-indigo-500" />
            <span>Designed & Built with React and Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

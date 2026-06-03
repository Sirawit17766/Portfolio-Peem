const navLinks = [
  { label: "About", active: true },
  { label: "Projects", active: false },
  { label: "Tech Stack", active: false },
  { label: "Contact", active: false },
];

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-[84px] h-[72px] z-50">
      {/* Logo */}
      <span className="font-bold text-white text-[16px] font-inter tracking-wide">
        ST
      </span>

      {/* Nav links */}
      <div className="flex items-center gap-[120px]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={`#${link.label.toLowerCase().replace(" ", "-")}`}
            className={`text-[14px] font-inter cursor-pointer transition-colors ${
              link.active
                ? "text-[#a78bfa] font-semibold"
                : "text-[#94a3b8] font-normal hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

const navLinks = [
  { label: "About", active: true },
  { label: "Projects", active: false },
  { label: "Tech Stack", active: false },
];

type NavbarProps = {
  onContactClick: () => void;
};

export default function Navbar({ onContactClick }: NavbarProps) {
  return (
    <nav className="animate-fade-down absolute left-0 top-0 z-50 flex h-[72px] w-full items-center justify-between px-[84px]">
      <a className="font-inter text-[16px] font-bold tracking-wide text-white transition-colors hover:text-[#a78bfa]" href="#about">
        ST
      </a>

      <div className="flex items-center gap-[120px]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={`#${link.label.toLowerCase().replace(" ", "-")}`}
            className={`font-inter text-[14px] transition-colors ${
              link.active
                ? "font-semibold text-[#a78bfa]"
                : "font-normal text-[#94a3b8] hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
        <button
          className="font-inter text-[14px] font-normal text-[#94a3b8] transition-colors hover:text-white"
          type="button"
          onClick={onContactClick}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

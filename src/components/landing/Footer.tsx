import { content } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {content.footer.copyright}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {content.footer.links.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

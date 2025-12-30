'use client';

import Link from 'next/link';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    {
      href: 'https://github.com/joaovitorkc',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/joaovitorkc/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://www.instagram.com/joaovitork.c/',
      icon: Instagram,
      label: 'Instagram',
    },
  ];

  return (
    <footer className="border-t bg-card/50">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
              JV
            </div>
            <div>
              <p className="font-semibold">João Vitor</p>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {t('rights')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './lang-toggle';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          João Vitor
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{t('title')}</span>
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            {t('about')}
          </Link>
          <Link
            href="#projects"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('projects')}
          </Link>
          <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary">
            {t('skills')}
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('contact')}
          </Link>
          <ThemeToggle />
          <LanguageToggle />
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4">
              <Link
                href="#about"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {t('about')}
              </Link>
              <Link
                href="#projects"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {t('projects')}
              </Link>
              <Link
                href="#skills"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {t('skills')}
              </Link>
              <Link
                href="#contact"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {t('contact')}
              </Link>
              <div className="py-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

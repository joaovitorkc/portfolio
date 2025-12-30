'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './lang-toggle';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';

export default function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#projects', label: t('projects') },
    { href: '#skills', label: t('skills') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg transition-transform group-hover:scale-105">
            JV
          </div>
          <span className="font-semibold text-lg hidden sm:block">João Vitor</span>
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden rounded-xl" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{t('title')}</span>
        </Button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-px h-px bg-primary scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-1 pl-4 border-l">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        <div
          className={cn(
            'absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b md:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 mt-2 border-t">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav.language');

  const toggleLanguage = (locale: 'en' | 'pt') => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleLanguage('en')}>{t('english')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleLanguage('pt')}>{t('portuguese')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

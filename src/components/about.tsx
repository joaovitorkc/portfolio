'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function About() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const t = useTranslations('about');

  const handleDownload = () => {
    const link = document.createElement('a');
    const fileName = lang === 'en' ? 'resume' : 'curriculo';
    link.href = `/${fileName}.pdf`;
    link.download = `joaovitorkc-${fileName}.pdf`;
    link.click();
  };

  const infoCards = [
    {
      icon: GraduationCap,
      title: t('education.title'),
      main: t('education.degree'),
      sub: t('education.university'),
    },
    {
      icon: Briefcase,
      title: t('experience.title'),
      main: t('experience.role'),
      sub: t('experience.company'),
    },
    {
      icon: MapPin,
      title: t('location.title'),
      main: t('location.place'),
      sub: t('location.country'),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="/profile-image.png"
                  alt="Profile Image"
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary/20 rounded-xl -z-10" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t('role')}
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">{t('description1')}</p>
              <p>{t('description2')}</p>
            </div>

            <Button className="rounded-full gap-2 px-6 h-11 mt-4" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              {t('downloadResume')}
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                    <p className="font-semibold">{card.main}</p>
                    <p className="text-sm text-muted-foreground">{card.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

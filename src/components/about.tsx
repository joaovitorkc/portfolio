import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="/profile-image.png"
                alt="Profile Image"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('role')}</h3>
            <p className="text-muted-foreground mb-6">{t('description1')}</p>
            <p className="text-muted-foreground mb-6">{t('description2')}</p>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              {t('downloadResume')}
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{t('education.title')}</h3>
              <p className="font-medium">{t('education.degree')}</p>
              <p className="text-muted-foreground">{t('education.university')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{t('experience.title')}</h3>
              <p className="font-medium">{t('experience.role')}</p>
              <p className="text-muted-foreground">{t('experience.company')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{t('location.title')}</h3>
              <p className="font-medium">{t('location.place')}</p>
              <p className="text-muted-foreground">{t('location.country')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

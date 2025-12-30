'use client';

import type React from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  const schema = z.object({
    name: z.string().min(3, { message: t('form.validation.name') }),
    email: z.string().email({ message: t('form.validation.email') }),
    subject: z.string().min(3, { message: t('form.validation.subject') }),
    message: z.string().min(5, { message: t('form.validation.message') }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async () => {
    const x = new Promise((resolve) => setTimeout(resolve, 1000));

    toast.promise(x, {
      loading: t('form.sending'),
      success: t('form.success'),
      error: (error) => error.message,
    });

    form.reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'jv0488598@gmail.com',
      href: 'mailto:jv0488598@gmail.com',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+55 (81) 98212-0328',
      href: 'tel:+5581982120328',
    },
    {
      icon: MapPin,
      label: t('location.title'),
      value: t('location.place'),
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('getInTouch')}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">{t('description')}</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-card shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4">
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-4 group">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {item.value}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-0 bg-card shadow-lg">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">{t('form.name')}</FormLabel>
                          <FormControl>
                            <Input
                              maxLength={64}
                              {...field}
                              placeholder={t('form.namePlaceholder')}
                              className="rounded-xl h-11 bg-muted/50 border-0 focus-visible:ring-primary"
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                field.onChange(event.target.value.toUpperCase())
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">{t('form.email')}</FormLabel>
                          <FormControl>
                            <Input
                              maxLength={64}
                              {...field}
                              placeholder={t('form.emailPlaceholder')}
                              className="rounded-xl h-11 bg-muted/50 border-0 focus-visible:ring-primary"
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                field.onChange(event.target.value.toUpperCase())
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">{t('form.subject')}</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={64}
                            {...field}
                            placeholder={t('form.subjectPlaceholder')}
                            className="rounded-xl h-11 bg-muted/50 border-0 focus-visible:ring-primary"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              field.onChange(event.target.value.toUpperCase())
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">{t('form.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            maxLength={1024}
                            {...field}
                            placeholder={t('form.messagePlaceholder')}
                            rows={5}
                            className="rounded-xl bg-muted/50 border-0 focus-visible:ring-primary resize-none"
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                              field.onChange(event.target.value.toUpperCase())
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 rounded-xl text-base gap-2 group">
                    {t('form.send')}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

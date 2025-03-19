'use client';

// @ts-ignore
import type React from 'react';

// @ts-ignore
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// @ts-ignore
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

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('getInTouch')}</h3>
            <p className="text-muted-foreground mb-8">{t('description')}</p>

            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('email')}</p>
                    <p className="text-muted-foreground">jv0488598@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('phone')}</p>
                    <p className="text-muted-foreground">+55 (81) 98212-0328</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{t('location.title')}</p>
                    <p className="text-muted-foreground">{t('location.place')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="py-20">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.name')}</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={64}
                            {...field}
                            placeholder={t('form.namePlaceholder')}
                            onChange={(event: any) =>
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
                        <FormLabel>{t('form.email')}</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={64}
                            {...field}
                            placeholder={t('form.emailPlaceholder')}
                            onChange={(event: any) =>
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
                      <FormLabel>{t('form.subject')}</FormLabel>
                      <FormControl>
                        <Input
                          maxLength={64}
                          {...field}
                          placeholder={t('form.subjectPlaceholder')}
                          onChange={(event: any) =>
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
                      <FormLabel>{t('form.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={1024}
                          {...field}
                          placeholder={t('form.messagePlaceholder')}
                          rows={5}
                          onChange={(event: any) =>
                            field.onChange(event.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full gap-2 mt-2">
                  {t('form.send')}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

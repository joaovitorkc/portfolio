'use client';

// @ts-ignore
import type React from 'react';

// @ts-ignore
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// @ts-ignore
import { useForm, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

const schema = z.object({
  name: z.string().min(3, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(3, { message: "Please enter a subject" }),
  message: z.string().min(5, { message: "Please enter a message" }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const x = new Promise((resolve) => setTimeout(resolve, 1000));

    toast.promise(x, {
      loading: 'Sending message...',
      success: 'Message sent!',
      error: (error) => error.message,
    });

    form.reset();
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or want to discuss a potential collaboration? Feel free to
              reach out to me using the contact form or through any of the channels below.
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">jv0488598@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+55 (81) 98212-0328</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Caruaru, Pernambuco, Brasil</p>
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
                    render={({ field }: { field: ControllerRenderProps<FieldValues, "name"> }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={64}
                            {...field}
                            placeholder="Your name"
                            onChange={(event: any) => field.onChange(event.target.value.toUpperCase())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: ControllerRenderProps<FieldValues, "name"> }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={64}
                            {...field}
                            placeholder="Your email"
                            onChange={(event: any) => field.onChange(event.target.value.toUpperCase())}
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
                  render={({ field }: { field: ControllerRenderProps<FieldValues, "name"> }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          maxLength={64}
                          {...field}
                          placeholder="Subject"
                          onChange={(event: any) => field.onChange(event.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }: { field: ControllerRenderProps<FieldValues, "name"> }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={1024}
                          {...field}
                          placeholder="Your message"
                          rows={5}
                          onChange={(event: any) => field.onChange(event.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full gap-2 mt-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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

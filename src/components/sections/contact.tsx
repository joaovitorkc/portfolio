'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/libs/utils';
import { chapterNum } from '@/libs/chapters';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Magnetic } from '@/components/fx/magnetic';

const socialIcon = { github: Github, linkedin: Linkedin, instagram: Instagram } as const;

export default function Contact() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const [copied, setCopied] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(2, { message: t('contact.form.validation.name') }),
    email: z.string().email({ message: t('contact.form.validation.email') }),
    subject: z.string().min(3, { message: t('contact.form.validation.subject') }),
    message: z.string().min(12, { message: t('contact.form.validation.message') }),
  });

  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  /**
   * No backend, no third-party form service, no silently-dropped messages.
   * We hand the composed email to the user's own client — they see exactly
   * what gets sent, and it works with zero server configuration.
   */
  const onSubmit = (values: Values) => {
    const body = [
      values.message,
      '',
      '—',
      `${values.name} · ${values.email}`,
      `via ${profile.domain}`,
    ].join('\n');

    const href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    toast.success(t('contact.form.ready'));
  };

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success(t('contact.copied'), { description: value });
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error(value);
    }
  };

  const channels = [
    {
      key: 'email',
      icon: Mail,
      label: t('contact.form.email'),
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
      copyable: true,
    },
    {
      key: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      value: profile.contact.phoneDisplay,
      href: profile.contact.whatsapp,
      copyable: true,
      external: true,
    },
    ...profile.socials.map((s) => ({
      key: s.key,
      icon: socialIcon[s.key as keyof typeof socialIcon] ?? ArrowUpRight,
      label: s.label,
      value: s.handle,
      href: s.url,
      copyable: false,
      external: true,
    })),
  ];

  return (
    <Chapter
      id="contact"
      num={chapterNum('contact')}
      label={t('chapters.contact')}
      tone="surface"
      title={
        <div className="grid grid-cols-12 items-end gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-6 lg:col-span-8">
            {t('contact.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-4">
            <p className="max-w-md text-step-0 text-ink-muted">{t('contact.intro')}</p>
            <p className="mt-5 flex items-center gap-2.5 label">
              <span className="h-2 w-2 shrink-0 animate-pulse-dot bg-brand" />
              <span className="text-ink">{profile.availability.label[locale]}</span>
            </p>
          </Reveal>
        </div>
      }
    >
      <div className="mt-14 grid grid-cols-12 gap-y-12 md:mt-20 md:gap-x-10">
        {/* ---------- direct channels ---------- */}
        <div className="col-span-12 lg:col-span-5">
          <h3 className="label rule-b pb-3 text-ink-faint">{t('contact.directTitle')}</h3>

          <Reveal className="mt-1" stagger={0.05} distance={16}>
            {channels.map((c) => (
              <div key={c.key} className="group flex items-stretch rule-b">
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex min-w-0 flex-1 items-center gap-4 py-4 pr-3 transition-colors hover:text-brand"
                >
                  <c.icon className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                  <span className="min-w-0">
                    <span className="label block text-ink-faint">{c.label}</span>
                    <span className="mt-1 block truncate text-step--1 font-medium">{c.value}</span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  {c.external && <span className="sr-only">({t('a11y.externalLink')})</span>}
                </a>

                {c.copyable && (
                  <button
                    type="button"
                    onClick={() => copy(c.value, c.key)}
                    className="flex w-11 shrink-0 items-center justify-center rule-l text-ink-faint transition-colors hover:bg-ink hover:text-paper"
                    aria-label={`${t('contact.copy')} ${c.label}`}
                  >
                    {copied === c.key ? (
                      <Check className="h-3.5 w-3.5 text-brand" aria-hidden />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                    )}
                  </button>
                )}
              </div>
            ))}
          </Reveal>
        </div>

        {/* ---------- form ---------- */}
        <div className="col-span-12 lg:col-span-7">
          <h3 className="label rule-b pb-3 text-ink-faint">{t('contact.formTitle')}</h3>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label={t('contact.form.name')}
                placeholder={t('contact.form.namePlaceholder')}
                error={errors.name?.message}
                registration={register('name')}
              />
              <Field
                id="email"
                type="email"
                label={t('contact.form.email')}
                placeholder={t('contact.form.emailPlaceholder')}
                error={errors.email?.message}
                registration={register('email')}
              />
            </div>

            <div className="mt-5">
              <Field
                id="subject"
                label={t('contact.form.subject')}
                placeholder={t('contact.form.subjectPlaceholder')}
                error={errors.subject?.message}
                registration={register('subject')}
              />
            </div>

            <div className="mt-5">
              <Field
                id="message"
                as="textarea"
                rows={6}
                label={t('contact.form.message')}
                placeholder={t('contact.form.messagePlaceholder')}
                error={errors.message?.message}
                registration={register('message')}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Magnetic>
                <button
                  type="submit"
                  className="group flex items-center gap-3 border-rule border-ink bg-brand px-7 py-4 text-brand-foreground transition-colors hover:bg-ink hover:text-paper"
                >
                  <span data-magnetic-inner className="label">
                    {t('contact.form.send')}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </Magnetic>
              <p className="max-w-xs text-step--2 leading-snug text-ink-faint">
                {t('contact.formNote')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm>['register']>;
  as?: 'input' | 'textarea';
  type?: string;
  rows?: number;
};

function Field({
  id,
  label,
  placeholder,
  error,
  registration,
  as = 'input',
  type = 'text',
  rows,
}: FieldProps) {
  const shared = cn(
    'w-full border-rule bg-paper px-4 py-3 text-step--1 text-ink outline-none transition-colors',
    'placeholder:text-ink-faint focus:border-brand',
    error ? 'border-destructive' : 'border-hairline',
  );

  return (
    <div>
      <label htmlFor={id} className="label mb-2 block text-ink-faint">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(shared, 'resize-none')}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
          {...registration}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 label text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

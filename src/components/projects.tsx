'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Projects() {
  const t = useTranslations('projects');

  const projects = [
    {
      title: t('cacWiki.title'),
      description: t('cacWiki.description'),
      image: '/project-1.jpg?height=300&width=600',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://joaovitorkc.github.io/cac-wiki2.0/',
      githubLink: 'https://github.com/joaovitorkc/cac-wiki2.0',
    },
    {
      title: t('wiConsultoria.title'),
      description: t('wiConsultoria.description'),
      image: '/project-2.jpg?height=300&width=600',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      demoLink: 'https://wiconsultoria.com.br',
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Image container with overlay */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.demoLink && (
                    <Button
                      asChild
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-10 w-10 backdrop-blur-sm"
                    >
                      <Link href={project.demoLink} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button
                      asChild
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-10 w-10 backdrop-blur-sm"
                    >
                      <Link href={project.githubLink} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title and description */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Action links */}
                <div className="flex gap-3 pt-2">
                  <Button
                    asChild={!!project?.demoLink}
                    variant="default"
                    size="sm"
                    disabled={!project?.demoLink}
                    className="rounded-full gap-2"
                  >
                    <Link href={project?.demoLink ? project.demoLink : '#'} target="_blank">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t('demo')}
                    </Link>
                  </Button>
                  <Button
                    asChild={!!project?.githubLink}
                    variant="outline"
                    size="sm"
                    disabled={!project?.githubLink}
                    className="rounded-full gap-2 bg-transparent"
                  >
                    <Link href={project?.githubLink ? project.githubLink : '#'} target="_blank">
                      <Github className="h-3.5 w-3.5" />
                      {t('code')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

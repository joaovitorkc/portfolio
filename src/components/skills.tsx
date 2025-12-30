'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Server, Workflow } from 'lucide-react';
import { useTranslations } from 'next-intl';

const languagesSkills = ['JavaScript', 'TypeScript', 'Python', 'C#', 'PHP'];
const backendSkills = ['Node.js', 'Express', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'Nginx'];
const otherSkills = [
  'React',
  'Next.js',
  'Git/GitHub',
  'Docker',
  'AWS',
  'CI/CD',
  'RESTful APIs',
  'GraphQL',
];

export default function Skills() {
  const t = useTranslations('skills');

  const skillCategories = [
    {
      title: t('categories.languages'),
      icon: Code2,
      skills: languagesSkills,
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      title: t('categories.backend'),
      icon: Server,
      skills: backendSkills,
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: t('categories.frameworks'),
      icon: Workflow,
      skills: otherSkills,
      color: 'from-orange-500/20 to-amber-500/20',
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <CardContent className="relative p-8">
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                {/* Skills badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="rounded-full px-4 py-1.5 text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SkillCard
            title={t('categories.languages')}
            icon={<Code2 className="h-8 w-8 mb-4 text-primary" />}
            skills={languagesSkills}
          />
          <SkillCard
            title={t('categories.backend')}
            icon={<Server className="h-8 w-8 mb-4 text-primary" />}
            skills={backendSkills}
          />
          <SkillCard
            title={t('categories.frameworks')}
            icon={<Workflow className="h-8 w-8 mb-4 text-primary" />}
            skills={otherSkills}
          />
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  title,
  icon,
  skills,
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        {icon}
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

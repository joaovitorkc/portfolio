import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'CAC Wiki',
    description: 'Projeto educativo escolar simples com foco em biologia.',
    image: '/project-1.jpg?height=300&width=600',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoLink: 'https://joaovitorkc.github.io/cac-wiki2.0/',
    githubLink: 'https://github.com/joaovitorkc/cac-wiki2.0',
  },
  {
    title: 'Wi Consultoria',
    description: 'Landing page para a empresa Wi Consultoria.',
    image: '/project-2.jpg?height=300&width=600',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    demoLink: 'https://wiconsultoria.com.br',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Some of my Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
              <CardFooter className="mt-auto flex gap-2">
                <Button asChild={!!project?.demoLink} variant="outline" size="sm" disabled={!project?.demoLink}>
                  <Link href={project?.demoLink ? project.demoLink : '#'} className="flex items-center gap-1" target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Link>
                </Button>
                <Button asChild={!!project?.githubLink} variant="outline" size="sm" disabled={!project?.githubLink}>
                  <Link href={project?.githubLink ? project.githubLink : '#'} className="flex items-center gap-1" target="_blank">
                    <Github className="h-4 w-4" />
                    Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <Button asChild>
            <Link href="#">View All Projects</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}

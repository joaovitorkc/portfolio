import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
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
            <h3 className="text-2xl font-semibold mb-4">Full Stack Developer</h3>
            <p className="text-muted-foreground mb-6">
              {`I'm a passionate developer working as a mid-level (pleno) developer at Wi Consultoria
              since 2023. I specialize in web technologies and enjoy building user-friendly
              applications.`}
            </p>
            <p className="text-muted-foreground mb-6">
              {`When I'm not coding, you can find me exploring new technologies and expanding my
              knowledge in computer science.`}
            </p>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="font-medium">Ciências da Computação</p>
              <p className="text-muted-foreground">UniFavip Wyden, 2025-Present</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="font-medium">Desenvolvedor Pleno</p>
              <p className="text-muted-foreground">Wi Consultoria, 2023-Present</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="font-medium">Caruaru, Pernambuco</p>
              <p className="text-muted-foreground">Brasil</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

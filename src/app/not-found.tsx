'use client';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl font-bold text-muted-foreground">404</div>
          <CardTitle className="text-3xl">Page introuvable</CardTitle>
          <CardDescription className="text-base">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button className="w-full" size="lg" asChild>
            <Link href="/" className="w-full">
              <IconHome className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Page précédente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

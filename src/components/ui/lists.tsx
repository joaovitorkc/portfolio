'use client';

import { createContext, useContext } from 'react';

import { cn } from '@/libs/utils';
import { Button } from './button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ListContextType {
  cols: string;
}

const ListContext = createContext({} as ListContextType);

interface ListRootProps {
  children: React.ReactNode;
  cols: string;
}

const ListRoot: React.FC<ListRootProps> = ({ children, cols }) => {
  return <ListContext.Provider value={{ cols }}>{children}</ListContext.Provider>;
};

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

interface ListContentProps {
  children: React.ReactNode;
  className?: string;
}

const ListContent: React.FC<ListContentProps> = ({ children, className }) => {
  return (
    <div className="w-screen sm:w-full overflow-x-auto -mx-6 sm:mx-0 flex flex-col">
      <ul className={cn('w-max min-w-full', className)}>{children}</ul>
    </div>
  );
};

const ListHead: React.FC<ListItemProps> = ({ children, className }) => {
  const { cols } = useContext(ListContext);

  return (
    <li className={cn('py-2 grid gap-4 border-b text-sm px-2 text-foreground/70', cols, className)}>
      {children}
    </li>
  );
};

const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
  const { cols } = useContext(ListContext);

  return (
    <li
      className={cn(
        'py-2 grid gap-4 border-b text-sm px-2 text-foreground transition-colors hover:bg-muted *:inline-flex *:items-center',
        cols,
        className,
      )}
    >
      {children}
    </li>
  );
};

const ListItemEmpty: React.FC<{ className?: string }> = ({ className }) => {
  const { cols } = useContext(ListContext);

  return (
    <li className={cn('py-2 grid gap-4 border-b text-sm px-2 bg-muted', cols, className)}>
      <p className="text-transparent pointer-events-none select-none">.</p>
    </li>
  );
};

interface ListFooterProps {
  className?: string;
  total?: number;
  page?: number;
  pages?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

const ListFooter: React.FC<ListFooterProps> = ({
  className,
  total,
  page,
  pages,
  perPage,
  onPageChange,
}) => {
  const hasNexPage = (page ?? 1) < (pages ?? 1);
  const hasPrevPage = (page ?? 1) > 1;

  return (
    <div className={cn('flex items-center mt-6 flex-col sm:flex-row', className)}>
      <p className="text-sm">
        Mostrando {perPage ?? '-'} registros de {total ?? '-'}
      </p>

      <div className="flex items-center sm:ml-auto">
        <Button
          variant="ghost"
          onClick={() => onPageChange?.((page ?? 1) - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronLeftIcon size={16} />
          <span>Anterior</span>
        </Button>

        <p className="mx-4 text-sm inline-flex">
          <span className="hidden sm:block">Página&nbsp;</span>
          {page ?? '-'} de {pages ?? '-'}
        </p>

        <Button
          variant="ghost"
          onClick={() => onPageChange?.((page ?? 1) + 1)}
          disabled={!hasNexPage}
        >
          <span>Próxima</span>
          <ChevronRightIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export { ListContent, ListFooter, ListHead, ListItem, ListItemEmpty, ListRoot };

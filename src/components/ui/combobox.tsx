'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/ui/command';

export interface Option {
  value: string;
  label: string;
  details?: unknown;
}

interface ComboboxRootProps {
  children: React.ReactNode;
}

const ComboboxRoot: React.FC<ComboboxRootProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
};

interface ComboboxTriggerProps extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {}

const ComboboxTrigger: React.FC<ComboboxTriggerProps> = ({ children, ...props }) => {
  return (
    <PopoverTrigger className="overflow-hidden" {...props}>
      {children}
    </PopoverTrigger>
  );
};

interface ComboboxContentProps {
  children: React.ReactNode;
  shouldFilter?: boolean;
}

const ComboboxContent: React.FC<ComboboxContentProps> = ({ children, shouldFilter }) => {
  return (
    <PopoverContent className="w-[300px] p-0">
      <Command shouldFilter={shouldFilter}>{children}</Command>
    </PopoverContent>
  );
};

interface ComboboxInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CommandInput>, 'value'> {}

const ComboboxInput: React.FC<ComboboxInputProps> = ({ defaultValue, onValueChange, ...props }) => {
  const [value, setValue] = React.useState(defaultValue?.toString() || '');

  return (
    <CommandInput
      placeholder="Pesquisar..."
      {...props}
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        onValueChange?.(newValue);
      }}
    />
  );
};

interface ComboboxOptionsProps {
  children: React.ReactNode;
}

const ComboboxOptions: React.FC<ComboboxOptionsProps> = ({ children }) => {
  return <CommandList>{children}</CommandList>;
};

interface ComboboxOptionProps {
  option: Option;
  selected?: boolean;
  onSelect: (option: Option) => void;
  ibge?: string;
}

const ComboboxOption: React.FC<ComboboxOptionProps> = ({ option, selected, onSelect, ibge }) => {
  return (
    <CommandItem value={option.value} data-ibge={ibge} onSelect={() => onSelect(option)}>
      <Check className={cn('mr-2 h-4 w-4', selected ? 'opacity-100' : 'opacity-0')} />
      {option.label}
    </CommandItem>
  );
};

interface ComboboxLoadingProps {
  children: React.ReactNode;
}

const ComboboxLoading: React.FC<ComboboxLoadingProps> = ({ children }) => {
  return <CommandLoading>{children}</CommandLoading>;
};

interface ComboboxEmptyProps {
  children: React.ReactNode;
}

const ComboboxEmpty: React.FC<ComboboxEmptyProps> = ({ children }) => {
  return <CommandEmpty>{children}</CommandEmpty>;
};

export {
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLoading,
  ComboboxEmpty,
};

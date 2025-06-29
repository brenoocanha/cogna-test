'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const countries = [
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
  { code: '+33', name: 'França', flag: '🇫🇷' },
  { code: '+49', name: 'Alemanha', flag: '🇩🇪' },
  { code: '+34', name: 'Espanha', flag: '🇪🇸' },
  { code: '+39', name: 'Itália', flag: '🇮🇹' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
];

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CountrySelector({
  value,
  onValueChange,
  className,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedCountry =
    countries.find((country) => country.code === value) || countries[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between', className)}
        >
          <span className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.code}</span>
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue: string) => {
                    onValueChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === country.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="text-muted-foreground">
                      ({country.code})
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

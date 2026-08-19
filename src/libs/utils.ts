import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge has to be told about our custom scale values, or it silently
 * drops them.
 *
 * `border-rule` is a *width* (borderWidth.rule = var(--rule)) but tailwind-merge
 * only knows the stock widths, so it filed `border-rule` under border-*colour*
 * and treated `border-rule border-ink` as a conflict — keeping only `border-ink`.
 * Every card, input and monogram that set both lost its border width with no
 * error anywhere. Registering the value fixes all of them at once.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'border-w': [{ border: ['rule'] }],
      'font-size': [
        {
          text: [
            'step--2',
            'step--1',
            'step-0',
            'step-1',
            'step-2',
            'step-3',
            'step-4',
            'step-5',
            'step-6',
            'step-7',
            'poster',
            'poster-xl',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

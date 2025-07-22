import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function numberToWords(n: number) {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  if (n === 0) return 'zéro';

  function convertLessThanOneThousand(num: number): string {
    if (num === 0) return '';

    let result = '';

    if (num >= 100) {
      if (Math.floor(num / 100) === 1) {
        result += 'cent ';
      } else {
        result += units[Math.floor(num / 100)] + ' cent ';
      }
      num %= 100;
    }

    if (num >= 10 && num < 20) {
      return result + teens[num - 10];
    } else if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        result += '-' + units[num % 10];
      }
    } else if (num > 0) {
      result += units[num];
    }

    return result.trim();
  }

  const euros = Math.floor(n);
  const cents = Math.round((n - euros) * 100);

  let result = convertLessThanOneThousand(euros);
  result += ' euros';
  
  if (cents > 0) {
    result += ' et ' + convertLessThanOneThousand(cents) + ' centimes';
  }

  return result;
}
export const BACKEND_URL="http://localhost:3000/"

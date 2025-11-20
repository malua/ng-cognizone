import { Pipe, PipeTransform } from '@angular/core';
import { calculateReadingTimeMinutes } from '../../core/utils/calculate-reading-time';

@Pipe({
  name: 'readingTime',
  standalone: false,
})
export class ReadingTimePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    let minutes = calculateReadingTimeMinutes(value);
    minutes = Math.ceil(minutes);
    return `${minutes} min read`;
  }
}

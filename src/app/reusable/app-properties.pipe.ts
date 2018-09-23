import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appProperties'
})
export class AppPropertiesPipe implements PipeTransform {

  transform(value: {}, type: string): any {
    if(!value) return [];
    if (type === 'key') {
      return Object.keys(value);
    }
    else if (type === 'value') {
      return Object.values(value);
    }

  }

}

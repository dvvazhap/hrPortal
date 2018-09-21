import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appProperties'
})
export class AppPropertiesPipe implements PipeTransform {

  transform(value: {}, type: string): any {

    if (type === 'key') {
      console.log("value :", Object.keys(value))
      return Object.keys(value);
    }
    else if (type === 'value') {
      console.log("value :", Object.values(value))
      return Object.values(value);
    }

  }

}

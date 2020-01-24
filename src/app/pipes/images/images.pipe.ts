import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(img: any): any {
    const url = `http://127.0.0.1:8888/api/v1/pictures/${img}`;
    return url;
  }

}

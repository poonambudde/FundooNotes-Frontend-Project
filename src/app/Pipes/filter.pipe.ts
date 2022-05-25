import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, Searchtitle: string) {
    if(items && items.length){
      return items.filter((item:{ title: string}) =>{
        if (Searchtitle && item.title.toLowerCase().indexOf(Searchtitle.toLowerCase()) === -1){
          return false;

        }
      return true;
    })
  }
  else{
    return items;
  }   
  }
}


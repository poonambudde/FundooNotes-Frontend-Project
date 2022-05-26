import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any) {
    console.log(args);
    if(args == "default message"){
      console.log("inside if in pipe", args);
      return value;
    }else{
      args=args.toLocaleLowerCase();
    }
    

     console.log("value in pipe",value);
     console.log("argument", args, typeof args);
    
    return value.filter((note:any) =>{
      return note.title.toLocaleLowerCase().includes(args) | note.description.toLocaleLowerCase().includes(args);
      
    })
  //   if(items && items.length){
  //     return items.filter((item:{ title: string}) =>{
  //       if (Searchtitle && item.title.toLocaleLowerCase().indexOf(Searchtitle.toLocaleLowerCase()) === -1){
  //         return false;

  //       }
  //     return true;
  //   })
  // }
  // else{
  //   return items;
  // }  

  }
}


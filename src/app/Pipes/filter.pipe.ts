import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any) 
  {
 
    console.log(args);
    if(args=="default message" ){
      console.log("inside if in pipe" ,args);
      return value
    }else{
      console.log("inside else in pipe" ,args);
      args=args.toLocaleLowerCase();
    }
    
 
    console.log("value in pipe",value);
    console.log("argument", args, typeof args);
    
    return value.filter((note:any) =>{
      return note.title.toLocaleLowerCase().includes(args) | note.description.toLocaleLowerCase().includes(args);
      
    })
   }

  }



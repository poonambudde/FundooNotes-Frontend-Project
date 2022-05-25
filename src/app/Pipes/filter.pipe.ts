import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString: string) {
      if (value.length === 0 || filteredString === ''){
        return value;
      }
      const receivedNoteList = [];
      for (const note of value){
        if(note.title.toLocaleLowerCase().includes(filteredString) || note.description.toLocaleLowerCase().includes(filteredString)){
          receivedNoteList.push(note);
        }
      }
      return receivedNoteList;
  }
}


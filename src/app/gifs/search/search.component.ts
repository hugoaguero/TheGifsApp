import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {

  }


  search() {
    const search = this.txtSearch.nativeElement.value;  // captura el valor
    
    if(search.trim().length === 0) {  // no ingresar entradas vacías
      return;
    }


    this.gifsService.gifsSearch(search);  // inserta valores al array
    this.txtSearch.nativeElement.value = '';  // inicializa el inputBox
  }

}

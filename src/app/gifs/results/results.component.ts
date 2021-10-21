import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent {

  get queryResult() {
    return this.gifsService.queryResult;
  }

  constructor(private gifsService: GifsService) { }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'M1Fvl79LluRZKy1F1goorJyeAsH65DPz';
  private _history: string[] = [];

  public queryResult: Gif[] = []; // Gif es la interface para la propiedad

  get history() {
    return [...this._history];  // utilizar el operador spread para romper la referencia
  }

  constructor(private http: HttpClient) {  // inyectar el servicio de HttpClient

  }

  gifsSearch(query: string) {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {  // valida si se repite el valor
      this._history.unshift(query); // insertar el nuevo elemento al comienzo del array
      this._history = this._history.splice(0, 10);  // corta el array con splice(x a y)
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=M1Fvl79LluRZKy1F1goorJyeAsH65DPz&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.queryResult = resp.data;
      });
  }

}

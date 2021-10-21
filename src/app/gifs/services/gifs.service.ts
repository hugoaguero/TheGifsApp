import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'M1Fvl79LluRZKy1F1goorJyeAsH65DPz';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public queryResult: Gif[] = []; // Gif es la interface para la propiedad

  get history() {
    return [...this._history];  // utilizar el operador spread para romper la referencia
  }

  constructor(private http: HttpClient) {  // inyectar el servicio de HttpClient
    this._history = JSON.parse(localStorage.getItem('history')!) || []; // almacena en la variable lo que quedo guardado en el local storage
    this.queryResult = JSON.parse(localStorage.getItem('queryResult')!) || []; // almacena las imagenes de la ultima busqueda


    // if(localStorage.getItem('history')) {
    //   this._history = JSON.parse(localStorage.getItem('history')!);
    // }
  }

  gifsSearch(query: string) {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {  // valida si se repite el valor
      this._history.unshift(query); // insertar el nuevo elemento al comienzo del array
      this._history = this._history.splice(0, 10);  // corta el array con splice(x a y)

      localStorage.setItem('history', JSON.stringify(this._history)); // esto guarda las busquedas almacenadas apesar de refrescar página
    }

    const params = new HttpParams() // permite construir los parametros para el get
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('query', 'query');

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`,{params}) // forma simple de controlar los parametros para la consulta
      .subscribe((resp) => {
        this.queryResult = resp.data;
        localStorage.setItem('queryResult', JSON.stringify(this.queryResult));
      });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsearchService {

  private items: Array<Object> = [];
  private api = "http://localhost:4200/api/trade/data/items";

  constructor(private http: HttpClient) { 
    this.http.get(this.api).subscribe(data => {
      console.log(data)
    })
  }
}

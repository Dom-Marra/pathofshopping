import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryitemService {

  private fetchResApi: string = "http://localhost:4200/api/trade/search/Heist"
  private fetchItemsApi: string = "http://localhost:4200/api/trade/fetch/";

  constructor(private http: HttpClient) { }


  public fetchResults(data: any) {
    return this.http.post(this.fetchResApi, data);
  }

  public fetchFields(searchField: string) {

  }

  public fetchItems(results: Array<string>) {
    return this.http.get(this.fetchItemsApi + results.toString());
  } 
}

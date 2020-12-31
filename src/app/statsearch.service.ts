import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface statCategory {
  category: string,
  stats: Array<{
    id: string,
    text: string
  }>
}

@Injectable({
  providedIn: 'root'
})
export class StatsearchService {

  private stats: Array<statCategory> = [];                        //Array of items to search from
  private api = "http://localhost:4200/api/trade/data/stats";

  constructor(private http: HttpClient) { 

    this.http.get(this.api).subscribe(data => {                 //Get the items
      data['result'].forEach(result => {
        result['entries'].forEach(entry => {
          
          let stat = this.stats.find(item => item.category == result['label']);

          if (stat != null) {
            stat.stats.push({
              id: entry['id'],
              text: entry['text']
            });
          } else {
            this.stats.push({
              category: result['label'],
              stats: [{
                id: entry['id'],
                text: entry['text']
              }]
            });
          }

        });
      });
    });
  }

  /**
   * Returns stats
   * 
   * @returns
   *        Array<statCategory>: The array of all stats to search from
   */
  public getStats(): Array<statCategory> {
    return this.stats;
  }
}

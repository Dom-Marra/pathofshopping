import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface statCategory {
  category: string,
  stats: Array<{
    id: string,
    text: string,
    option?: Array<{
      id: number | string,
      text: string
    }>
  }>
}

@Injectable({
  providedIn: 'root'
})
export class StatsearchService {

  private stats: Array<statCategory> = [];                       //Array of items to search from
  private api = "http://localhost:4200/api/trade/data/stats";    //API

  constructor(private http: HttpClient) { 

    this.http.get(this.api).subscribe(data => {                 //Fetch Data
      data['result'].forEach(result => {                        //Cycle through stat categories
        result['entries'].forEach(entry => {                    //Cycle through stats
          
          let statCat = this.stats.find(item => item.category == result['label']);    //Check if stat exists
          let stat = {                    //Create stat object
            id: entry['id'],
            text: entry['text']
          };

          if (statCat != null) {          //If stat cetegory already exist push the new sat
            statCat.stats.push(stat);
          } else {                        //If not add the category to the stored stats, and push the new stat to it
            this.stats.push({
              category: result['label'],
              stats: [stat]
            });
          }

          if (entry['option'] != null) {                  //If there are options add them to the stat
            stat['option'] = new Array<any>();
            
            entry['option'].options.forEach(option => {
              stat['option'].push({
                id: option['id'],
                text: option['text']
              })
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

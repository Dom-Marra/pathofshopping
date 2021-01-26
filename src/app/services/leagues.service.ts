import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface leagueData {
  [id: string]: string,
}

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  private leagues: leagueData = {};                          //Array of items to search from
  private api = "http://localhost:4200/api/trade/data/leagues";     //API to fetch leagues

  constructor(private http: HttpClient) { 

    this.http.get(this.api).subscribe(data => { 
      data['result'].forEach(league => { 
        this.leagues[league.id] = league.text;
      });
    })
  }

  /**
   * Returns the leagues fetched by the API
   * 
   * @returns
   *        Array of league data
   */
  public getLeagues(): leagueData {
    return this.leagues;
  }
}

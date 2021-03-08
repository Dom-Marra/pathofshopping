import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { poeCategorizedItems } from '../models/poeCategorizedItems';
import { poeCategorizedStats } from '../models/poeCategorizedStats';
import { simpleData } from '../models/simpleData';
import { poeCategorizedStatic } from '../models/poeCategorizedStatic';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  //Cloud Functions for each poe api service
  private readonly POE_ITEMS: string = 'http://localhost:4200/api/getPOEItems';
  private readonly POE_STATS: string = 'http://localhost:4200/api/getPOEStats';
  private readonly POE_LEAGUES: string = 'http://localhost:4200/api/getPOELeagues';
  private readonly POE_STATIC: string = 'http://localhost:4200/api/getPOEStatic';
  private readonly POE_FETCH: string = 'http://localhost:4200/api/poeFetch';
  private readonly POE_SEARCH: string = 'http://localhost:4200/api/poeSearch';

  //POE API Data
  private leagueData: Array<simpleData>;
  private poeItems: Array<poeCategorizedItems>; 
  private poeStats: Array<poeCategorizedStats>; 
  private poeStatic: Array<poeCategorizedStatic>;

  //Whether the data has been loaded or not
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.setLeagues();
    this.setItems();
    this.setStats();
    this.setStatic();
  }

  /**
   * Sets the searchable item data
   */
  private setItems() {
    let poeItemsSetter = this.http.get(this.POE_ITEMS).pipe(
      map((data: any) => {
        let items: Array<poeCategorizedItems> = [];

        data['result'].forEach(entry => {                         //Traverse each category
          entry['entries'].forEach(item => {                      //Traverse each entry per category
  
            let category = items.find(item => item.category == entry['label']);    //Get category
  
            if (category != null) {               //push item to category if it exists
              category.items.push({
                name: item['name'],
                type: item['type'],
                text: item['text']});
            } else {                                //if not push new category with the item
              items.push({
                category: entry['label'],
                items: [{
                  name: item['name'],
                  type: item['type'],
                  text: item['text']}]
              });
            }
          });
        });

        return items;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe((items) => {
      this.poeItems = items;
        if (this.leagueData && this.poeStats && this.poeStatic) this.loaded.next(true);
        poeItemsSetter.unsubscribe();
      },
      (error) => {
        this.loaded.error(error);
      }
    );
  }

  /**
   * Returns the item data from the poe API
   */
  public getItems(): Array<poeCategorizedItems> {
    return this.poeItems;
  }

  /**
   * Sets the stat data
   */
  private setStats() {
    let poeStatsSetter = this.http.get(this.POE_STATS).pipe(
      map(data => {
        let stats: Array<poeCategorizedStats> = [];               //Array of the stats

        data['result'].forEach(result => {                        //Cycle through stat categories
          result['entries'].forEach(entry => {                    //Cycle through stats
            
            let statCat = stats.find(item => item.category == result['label']);    //Check if stat exists
            let stat = {                    //Create stat object
              id: entry['id'],
              text: entry['text']
            };
  
            if (statCat != null) {          //If stat cetegory already exist push the new sat
              statCat.stats.push(stat);
            } else {                        //If not add the category to the stored stats, and push the new stat to it
              stats.push({
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

        return stats;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (stats) => {
        this.poeStats = stats;
        if (this.leagueData && this.poeItems && this.poeStatic) this.loaded.next(true);
        poeStatsSetter.unsubscribe();
      },
      (error) => {
        this.loaded.error(error);
      }
    )
  }

  /**
   * Returns the stats from the poe API
   */
  public getStats(): Array<poeCategorizedStats> {
    return this.poeStats;
  }

  /**
   * Sets the league data
   */
  private setLeagues() {
    let poeLeaguesSetter = this.http.get(this.POE_LEAGUES).pipe(
      map((data: any) => {
        let leagues: Array<simpleData> = [];

        data.result.forEach(league => {
          leagues.push({id: league.id, text: league.text});
        });

        return leagues;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (leagues) => {
        this.leagueData = leagues;
        if (this.poeItems && this.poeStats && this.poeStatic) this.loaded.next(true);
        poeLeaguesSetter.unsubscribe();
      },
      (error) => {
        this.loaded.error(error);
      }
    )
  }

  /**
   * Returns the leagues from the poe API
   */
  public getLeagues(): Array<simpleData> {
    return this.leagueData;
  }

  /**
   * Sets the poe static data
   */
  private setStatic() {
    let poeStaticSetter = this.http.get(this.POE_STATIC)
    .pipe(
      map((data: any) => {
        return data.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (poeStatic: Array<poeCategorizedStatic>) => {
        this.poeStatic = poeStatic;
        if (this.poeItems && this.poeStats && this.leagueData) this.loaded.next(true);
        poeStaticSetter.unsubscribe();
      },
      (error) => {
        this.loaded.error(error);
      }
    );
  }

  /**
   * returns the static data
   */
  public getPoeStatic(): Array<poeCategorizedStatic> {
    return this.poeStatic;
  }

  /**
   * Fetches a set of items
   * 
   * @param items 
   *          Array<string>: item IDs to fetch
   * @param endingParams 
   *          string: any ending params, such as psuedo parameters or query id
   */
  public fetch(items: Array<string>, endingParams?: string) {
    let body = {
      items: items.toString() + endingParams
    };

    return this.http.post(this.POE_FETCH, body);
  }

  /**
   * Searches the API for items based on the query
   * 
   * @param data 
   *         Query data
   * @param league 
   *          string: the league to search the items in
   */
  public search(data: any, league: string) {
    let body = {
      data: data,
      league: league
    }
    return this.http.post(this.POE_SEARCH, body).pipe(catchError(error => {
      return throwError(this.handleError(error));
    }));
  }

  /**
   * Handles errors that occur during poe API operations
   * 
   * @param error 
   *        error recieved by the POE api
   */
  private handleError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
          return 'Error with search parameters, please revise them';
      }
      case 503: {
        return 'Error: Service unavailable';
      }
      default: {
          return "Error: Cannot process your request at this time";
      }
    }
  }
}
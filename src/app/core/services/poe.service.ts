import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { PoeCategorizedItems } from '../models/poe-api-item.model';
import { PoeCategorizedStats, PoeStat } from '../models/poe-api-stat.model';
import { SimpleData } from '../models/simple-data.model';
import { PoeCategorizedStatic } from '../models/poe-api-static.model';
import { PoeAPIResult } from '../models/poe-api-result.model';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  //POE Base API
  private readonly POE_API: string = 'https://www.dominicmarra.com/pos/api.php?q=';

  //POE API end points
  private readonly POE_ITEMS: string = this.POE_API + 'data/items';
  private readonly POE_STATS: string = this.POE_API + 'data/stats';
  private readonly POE_LEAGUES: string = this.POE_API + 'data/leagues';
  private readonly POE_STATIC: string = this.POE_API + 'data/static';
  private readonly POE_FETCH: string = this.POE_API + 'fetch/';
  private readonly POE_SEARCH: string = this.POE_API + 'search/';

  //POE API Data
  private leagueData: Array<SimpleData>;
  private poeItems: Array<PoeCategorizedItems>; 
  private poeStats: Array<PoeCategorizedStats>; 
  private poeStatic: Array<PoeCategorizedStatic>;

  //Whether the data has been loaded or not
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

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
    this.http.get(this.POE_ITEMS).pipe(
      map((result: PoeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe((items: Array<PoeCategorizedItems>) => {
      this.poeItems = items;
        if (this.leagueData && this.poeStats && this.poeStatic) this.loaded.next(true);
      },
      (error) => {
        this.loaded.error(error);
      }
    );
  }

  /**
   * Returns the item data from the poe API
   */
  public getItems(): Array<PoeCategorizedItems> {
    return this.poeItems;
  }

  /**
   * Sets the stat data
   */
  private setStats() {
    this.http.get(this.POE_STATS).pipe(
      map((result: PoeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (stats: Array<PoeCategorizedStats>) => {
        this.poeStats = stats;
        if (this.leagueData && this.poeItems && this.poeStatic) this.loaded.next(true);
      },
      (error) => {
        this.loaded.error(error);
      }
    )
  }

  /**
   * Returns the stats from the poe API
   */
  public getStats(): Array<PoeCategorizedStats> {
    return this.poeStats;
  }

  /**
   * Returns a stat that matches the provided ID
   * 
   * @param id
   *        sting: ID of the stat 
   * @returns 
   *        poeStat
   */
  public getStatByID(id: string): PoeStat {
    let statToReturn: PoeStat;

    this.poeStats.forEach((statCategory: PoeCategorizedStats) => {
      statCategory.entries.forEach((stat: PoeStat) => {
        if (stat.id == id) statToReturn = stat;
      });
    });
    
    return statToReturn;
  }

  /**
   * Sets the league data
   */
  private setLeagues() {
    this.http.get(this.POE_LEAGUES).pipe(
      map((result: PoeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (leagues: Array<SimpleData>) => {
        this.leagueData = leagues;
        if (this.poeItems && this.poeStats && this.poeStatic) this.loaded.next(true);
      },
      (error) => {
        this.loaded.error(error);
      }
    )
  }

  /**
   * Returns the leagues from the poe API
   */
  public getLeagues(): Array<SimpleData> {
    return this.leagueData;
  }

  /**
   * Sets the poe static data
   */
  private setStatic() {
    this.http.get(this.POE_STATIC)
    .pipe(
      map((data: PoeAPIResult) => {
        return data.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (poeStatic: Array<PoeCategorizedStatic>) => {
        this.poeStatic = poeStatic;
        if (this.poeItems && this.poeStats && this.leagueData) this.loaded.next(true);
      },
      (error) => {
        this.loaded.error(error);
      }
    );
  }

  /**
   * returns the static data
   */
  public getPoeStatic(): Array<PoeCategorizedStatic> {
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
    return this.http.get(this.POE_FETCH + items.toString() + endingParams);
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
    return this.http.post(this.POE_SEARCH + league, data).pipe(catchError(error => {
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

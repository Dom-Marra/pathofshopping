import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { poeCategorizedItems } from '../models/poeAPIItems';
import { poeCategorizedStats, poeStat } from '../models/poeAPIStats';
import { simpleData } from '../models/simpleData';
import { poeCategorizedStatic } from '../models/poeAPIStatic';
import { poeAPIResult } from '../models/poeAPIResult';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  //Cloud Functions for each poe api service
  private readonly POE_ITEMS: string = 'https://us-central1-pathofshopping.cloudfunctions.net/getPOEItems';
  private readonly POE_STATS: string = 'https://us-central1-pathofshopping.cloudfunctions.net/getPOEStats';
  private readonly POE_LEAGUES: string = 'https://us-central1-pathofshopping.cloudfunctions.net/getPOELeagues';
  private readonly POE_STATIC: string = 'https://us-central1-pathofshopping.cloudfunctions.net/getPOEStatic';
  private readonly POE_FETCH: string = 'https://us-central1-pathofshopping.cloudfunctions.net/poeFetch';
  private readonly POE_SEARCH: string = 'https://us-central1-pathofshopping.cloudfunctions.net/poeSearch';

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
      map((result: poeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe((items: Array<poeCategorizedItems>) => {
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
      map((result: poeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (stats: Array<poeCategorizedStats>) => {
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
   * Returns a stat that matches the provided ID
   * 
   * @param id
   *        sting: ID of the stat 
   * @returns 
   *        poeStat
   */
  public getStatByID(id: string): poeStat {
    let statToReturn: poeStat;

    this.poeStats.forEach((statCategory: poeCategorizedStats) => {
      statCategory.entries.forEach((stat: poeStat) => {
        if (stat.id == id) statToReturn = stat;
      });
    });
    
    return statToReturn;
  }

  /**
   * Sets the league data
   */
  private setLeagues() {
    let poeLeaguesSetter = this.http.get(this.POE_LEAGUES).pipe(
      map((result: poeAPIResult) => {
        return result.result;
      }),
      catchError((err) => {
        return throwError('Unable to connect to the service.');
      })
    ).subscribe(
      (leagues: Array<simpleData>) => {
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
      map((data: poeAPIResult) => {
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

import { Injectable } from '@angular/core';
import { SimpleData } from '../models/simple-data.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleDataService {

  /**
   * Filters object keys based on search text
   * 
   * @param searchText
   *        string: search text 
   * 
   * @returns
   *         Array<simpleData>: list of filtered object keys
   */
  public filterSimpleData(searchText: string, values: Array<SimpleData>): Array<SimpleData> {
    const text = searchText.toLowerCase();

    return values.filter(value => value.text.toLowerCase().indexOf(text.toLocaleLowerCase()) != -1);
  }

  /**
   * Returns the simpledata text value
   * 
   * @param value
   *        simple data object 
   */
  public displayByText(value: SimpleData): string {
    return value.text;
  }

  /**
   * Finds the simple data object associated with the id
   * 
   * 
   * @param id
   *        string: the id of the simple data object
   * 
   * @param values
   *        Array<simpleData>: the group of simple data objects
   * 
   * @returns
   *         simpleData
   */
  public getSelectedValue(id: string, values: Array<SimpleData>): SimpleData {
    if (id === null || id === undefined) console.log(values);
    return values.find(value => value.id === id);
  }
}

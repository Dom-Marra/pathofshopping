import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { shoppingListSaveData } from '../models/shoppingListSaveData';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private readonly SHOPPING_LIST_CO: string = 'shoppinglists';    //Collection that holds shopping lists

  constructor(private firestore: AngularFirestore) { }

  /**
   * Adds a shopping list
   * 
   * @param shoppingListData 
   *        shoppingListSaveData: Holds the data for the shopping list
   */
  public addShoppingList(shoppingListData: shoppingListSaveData): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.SHOPPING_LIST_CO).add(shoppingListData);
  }

  /**
   * Retrives a shopping list
   * 
   * @param id 
   *        string: shopping list doc name
   */
  public getShoppingList(id: string): Promise<firebase.default.firestore.DocumentSnapshot<unknown>> {
    return this.firestore.collection(this.SHOPPING_LIST_CO).doc(id).ref.get();
  }
}

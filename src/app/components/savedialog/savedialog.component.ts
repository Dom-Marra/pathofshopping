import { Component, Inject, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-savedialog',
  templateUrl: './savedialog.component.html',
  styleUrls: ['./savedialog.component.scss']
})
export class SavedialogComponent implements OnInit {

  public readonly STATUS: typeof status = status;

  public header: string = "Saving List";    //Dialog title
  public errMessage: string;                //Error message
  public url: string;                       //URL string
  public copied: boolean;                   //Whether the URL has been copied from the copy button

  constructor(@Inject(MAT_DIALOG_DATA) public data: Promise<DocumentReference<unknown>>, public dialogRef: MatDialogRef<SavedialogComponent>) {
    
    //Return the URL on successful upload
    this.data.then(docRef => {                                    
      this.url = 'www.pathofshopping.com/shoppinglist?list=' + docRef.id;
      this.header = 'List Saved';
    }).catch(() => { 

      //Give error on failed upload
      this.dialogRef.addPanelClass('error');
      this.header = 'Error!'
      this.errMessage = 'An error occurred while saving the data, please try again.'
    })
  }

  ngOnInit(): void {
  }

  /**
   * Closes the panel
   */
  public close() {
    this.dialogRef.close();
  }

}

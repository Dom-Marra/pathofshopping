import { Component, Inject, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pos-savedialog',
  templateUrl: './savedialog.component.html',
  styleUrls: ['./savedialog.component.scss']
})
export class SavedialogComponent implements OnInit {

  /** Dialog Title */
  public header: string = "Saving";

  /** Error Message */
  public errMessage: string;

  /** Save URL */
  public url: string;

  /** Whether the input was copied */
  public copied: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Promise<DocumentReference<unknown>>, public dialogRef: MatDialogRef<SavedialogComponent>) {
    
    //Return the URL on successful upload
    this.data.then(docRef => {                                    
      this.url = 'www.pathofshopping.com/list/' + docRef.id;
      this.header = 'Saved!';
    }).catch(() => { 
      this.header = 'Error :('
      this.errMessage = 'An error occurred while saving the data.';
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

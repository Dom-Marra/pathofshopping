import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface socketData {
  label: string,
  control: AbstractControl,
  inputClass: string
}

@Component({
  selector: 'app-socketfilters',
  templateUrl: './socketfilters.component.html',
  styleUrls: ['./socketfilters.component.scss']
})
export class SocketfiltersComponent implements OnInit {

  @Input() socketForm: FormGroup;     //Socket form

  public socketLinksExtras: Array<socketData>;    //links extra input data

  public socketSocketsExtras: Array<socketData>;  //sockets extra input data

  constructor() {
  }

  ngOnInit(): void {
    this.socketForm.controls.disabled.valueChanges.subscribe(disabled => {     //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.socketForm.disabled) this.socketForm.enable({emitEvent: false});
    });

    this.initLinksData();
    this.initSocketsData();
  }
  
  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.socketForm.controls.disabled.value && this.socketForm.enabled) {
      this.socketForm.disable();
    }
  }

  /**
   * Sets the socketLinksExtras data
   */
  private initLinksData() {
    this.socketLinksExtras = [                                                           //links extra input data
      {label: 'R', control: this.socketForm.get('filters.links.r'), inputClass: 'socket-input-r'},
      {label: 'G', control: this.socketForm.get('filters.links.g'), inputClass: 'socket-input-g'},
      {label: 'B', control: this.socketForm.get('filters.links.b'), inputClass: 'socket-input-b'},
      {label: 'W', control: this.socketForm.get('filters.links.w'), inputClass: 'socket-input-w'}
    ]
  }

  /**
   * Sets the socketSocketExtras data
   */
  private initSocketsData() {
    this.socketSocketsExtras = [                                                         //sockets extra input data
      {label: 'R', control: this.socketForm.get('filters.sockets.r'), inputClass: 'socket-input-r'},
      {label: 'G', control: this.socketForm.get('filters.sockets.g'), inputClass: 'socket-input-g'},
      {label: 'B', control: this.socketForm.get('filters.sockets.b'), inputClass: 'socket-input-b'},
      {label: 'W', control: this.socketForm.get('filters.sockets.w'), inputClass: 'socket-input-w'}
    ]
  }
}

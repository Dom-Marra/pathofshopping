import { Component, Input, OnInit } from '@angular/core';
import { SocketForm } from 'src/app/classes/formgroups/socket-form';
import { minmaxExtras } from '../../inputs/minmaxinput/minmaxinput.component';

@Component({
  selector: 'app-socketfilters',
  templateUrl: './socketfilters.component.html',
  styleUrls: ['./socketfilters.component.scss']
})
export class SocketfiltersComponent implements OnInit {

  @Input() socketForm: SocketForm;     //Socket form

  public socketLinksExtras: Array<minmaxExtras>;    //links extra input data

  public socketSocketsExtras: Array<minmaxExtras>;  //sockets extra input data

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

  private initLinksData() {
    this.socketLinksExtras = [                                                           //links extra input data
      {label: 'Red', control: this.socketForm.get('filters.links.r'), inputClass: 'socket-input-r'},
      {label: 'Green', control: this.socketForm.get('filters.links.g'), inputClass: 'socket-input-g'},
      {label: 'Blue', control: this.socketForm.get('filters.links.b'), inputClass: 'socket-input-b'},
      {label: 'White', control: this.socketForm.get('filters.links.w'), inputClass: 'socket-input-w'}
    ]
  }

  private initSocketsData() {
    this.socketSocketsExtras = [                                                         //sockets extra input data
      {label: 'Red', control: this.socketForm.get('filters.sockets.r'), inputClass: 'socket-input-r'},
      {label: 'Green', control: this.socketForm.get('filters.sockets.g'), inputClass: 'socket-input-g'},
      {label: 'Blue', control: this.socketForm.get('filters.sockets.b'), inputClass: 'socket-input-b'},
      {label: 'White', control: this.socketForm.get('filters.sockets.w'), inputClass: 'socket-input-w'}
    ]
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.socketForm.reset();
  }

}

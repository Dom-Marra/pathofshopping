import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { minmaxExtras } from '../../minmaxinput/minmaxinput.component';

@Component({
  selector: 'app-socketfilters',
  templateUrl: './socketfilters.component.html',
  styleUrls: ['./socketfilters.component.scss']
})
export class SocketfiltersComponent implements OnInit {

  @Input() itemForm: FormGroup;                                           //Main item form

  public socketFilters: FormGroup = new FormGroup({                       //Socket filters
    sockets: new FormGroup({
      red: new FormControl(''),
      green: new FormControl(''),
      blue: new FormControl(''),
      white: new FormControl(''),
      min: new FormControl(''),
      max: new FormControl('')
    }),
    links: new FormGroup({
      red: new FormControl(''),
      green: new FormControl(''),
      blue: new FormControl(''),
      white: new FormControl(''),
      min: new FormControl(''),
      max: new FormControl('')
    })
  })

  public socketLinksExtras: Array<minmaxExtras> = [                                                           //links extra input data
    {label: 'Red', control: this.socketFilters.get('links.red'), inputClass: 'socket-input-r'},
    {label: 'Green', control: this.socketFilters.get('links.green'), inputClass: 'socket-input-g'},
    {label: 'Blue', control: this.socketFilters.get('links.blue'), inputClass: 'socket-input-b'},
    {label: 'White', control: this.socketFilters.get('links.white'), inputClass: 'socket-input-w'}
  ]

  public socketSocketsExtras: Array<minmaxExtras> = [                                                         //sockets extra input data
    {label: 'Red', control: this.socketFilters.get('sockets.red'), inputClass: 'socket-input-r'},
    {label: 'Green', control: this.socketFilters.get('sockets.green'), inputClass: 'socket-input-g'},
    {label: 'Blue', control: this.socketFilters.get('sockets.blue'), inputClass: 'socket-input-b'},
    {label: 'White', control: this.socketFilters.get('sockets.white'), inputClass: 'socket-input-w'}
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.itemForm.addControl('socketFilters', this.socketFilters);
  }

}

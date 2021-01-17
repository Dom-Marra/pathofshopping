import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { minmaxExtras } from '../../minmaxinput/minmaxinput.component';

@Component({
  selector: 'app-socketfilters',
  templateUrl: './socketfilters.component.html',
  styleUrls: ['./socketfilters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocketfiltersComponent implements OnInit {

  @Input() itemForm: FormGroup;                                           //Main item form

  public socketFilters: FormGroup = new FormGroup({                       //Socket filters
    disabled: new FormControl(false),
    filters: new FormGroup({
      sockets: new FormGroup({
        r: new FormControl(''),
        g: new FormControl(''),
        b: new FormControl(''),
        w: new FormControl(''),
        min: new FormControl(''),
        max: new FormControl('')
      }),
      links: new FormGroup({
        r: new FormControl(''),
        g: new FormControl(''),
        b: new FormControl(''),
        w: new FormControl(''),
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
  })

  public socketLinksExtras: Array<minmaxExtras>;    //links extra input data

  public socketSocketsExtras: Array<minmaxExtras>;  //sockets extra input data

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.itemForm.controls['socket_filters']) {                               //Retain item socket data
      this.socketFilters = this.itemForm.controls['socket_filters'] as FormGroup;
    } else {                                                                      //Add field for socket data
      this.itemForm.addControl('socket_filters', this.socketFilters);
    }

    this.initLinksData();
    this.initSocketsData();
  }

  private initLinksData() {
    this.socketLinksExtras = [                                                           //links extra input data
      {label: 'Red', control: this.socketFilters.get('filters.links.r'), inputClass: 'socket-input-r'},
      {label: 'Green', control: this.socketFilters.get('filters.links.g'), inputClass: 'socket-input-g'},
      {label: 'Blue', control: this.socketFilters.get('filters.links.b'), inputClass: 'socket-input-b'},
      {label: 'White', control: this.socketFilters.get('filters.links.w'), inputClass: 'socket-input-w'}
    ]
  }

  private initSocketsData() {
    this.socketSocketsExtras = [                                                         //sockets extra input data
      {label: 'Red', control: this.socketFilters.get('filters.sockets.r'), inputClass: 'socket-input-r'},
      {label: 'Green', control: this.socketFilters.get('filters.sockets.g'), inputClass: 'socket-input-g'},
      {label: 'Blue', control: this.socketFilters.get('filters.sockets.b'), inputClass: 'socket-input-b'},
      {label: 'White', control: this.socketFilters.get('filters.sockets.w'), inputClass: 'socket-input-w'}
    ]
  }

}

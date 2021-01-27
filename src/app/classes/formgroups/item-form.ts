import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ArmourForm } from "./armour-form";
import { MapForm } from "./map-form";
import { MiscForm } from "./misc-form";
import { RequirementsForm } from "./requirements-form";
import { SocketForm } from "./socket-form";
import { TradeForm } from "./trade-form";
import { TypeForm } from "./type-form";
import { WeaponForm } from "./weapon-form";

export class ItemForm extends FormGroup {
    constructor() { 
        super({
            itemName: new FormControl('New Item'),
            queryForm: new FormGroup({
              query: new FormGroup({
                  name: new FormControl(''),
                  term: new FormControl(''),
                  type: new FormControl(''),
                  filters: new FormGroup({
                      armour_filters: new ArmourForm(),
                      map_filters: new MapForm(),
                      misc_filters: new MiscForm(),
                      req_filters: new RequirementsForm(),
                      socket_filters: new SocketForm(),
                      trade_filters: new TradeForm(),
                      weapon_filters: new WeaponForm(),
                      type_filters: new TypeForm()
                  }),
                  stats: new FormArray([
                  ]),
                  status: new FormGroup({
                    option: new FormControl('online')
                  })
                }),
                sort: new FormGroup({
                  price: new FormControl("asc")
                })
            })
        });
    }
}

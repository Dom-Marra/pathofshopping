import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Resultdata } from "../resultdata/resultdata";
import { ArmourForm } from "./armour-form";
import { MapForm } from "./map-form";
import { MiscForm } from "./misc-form";
import { RequirementsForm } from "./requirements-form";
import { SocketForm } from "./socket-form";
import { TradeForm } from "./trade-form";
import { WeaponForm } from "./weapon-form";

export class ItemForm extends FormGroup {

    public resultData: Resultdata = new Resultdata();   //Data pertaining to the results
    
    constructor(private savedItemData?: any) { 
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
                        weapon_Filters: new WeaponForm()
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

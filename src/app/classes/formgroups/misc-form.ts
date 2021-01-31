import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class MiscForm extends FormGroup {

    public gemForm = new FormGroup({                                    //Data for gems
        gemForm_disabled: this.controls.gemForm_disabled,
        gem_alternate_quality: (this.controls.filters as FormGroup).controls.gem_alternate_quality,
        gem_level: (this.controls.filters as FormGroup).controls.gem_level,
        gem_level_progress: (this.controls.filters as FormGroup).controls.gem_level_progress
    });

    public otherForm = new FormGroup ({                                 //Other data
        otherForm_disabled: this.controls.otherForm_disabled,
        quality: (this.controls.filters as FormGroup).controls.quality,
        ilvl: (this.controls.filters as FormGroup).controls.ilvl,
        talisman_tier: (this.controls.filters as FormGroup).controls.talisman_tier,
        stored_experience: (this.controls.filters as FormGroup).controls.stored_experience,
        stack_size: (this.controls.filters as FormGroup).controls.stack_size,
        alternate_art: (this.controls.filters as FormGroup).controls.alternate_art,
        identified: (this.controls.filters as FormGroup).controls.identified,
        corrupted: (this.controls.filters as FormGroup).controls.corrupted,
        mirrored: (this.controls.filters as FormGroup).controls.mirrored,
        crafted: (this.controls.filters as FormGroup).controls.crafted,
        veiled: (this.controls.filters as FormGroup).controls.veiled,
        enchanted: (this.controls.filters as FormGroup).controls.enchanted,
    });

    public influenceForm = new FormGroup({                              //Data for influence and special bases
        influenceForm_disabled: this.controls.influenceForm_disabled,          
        shaper_item: (this.controls.filters as FormGroup).controls.shaper_item,
        elder_item: (this.controls.filters as FormGroup).controls.elder_item,
        crusader_item: (this.controls.filters as FormGroup).controls.crusader_item,
        redeemer_item: (this.controls.filters as FormGroup).controls.redeemer_item,
        hunter_item: (this.controls.filters as FormGroup).controls.hunter_item,
        warlord_item: (this.controls.filters as FormGroup).controls.warlord_item,
        fractured_item: (this.controls.filters as FormGroup).controls.fractured_item,
        synthesised_item: (this.controls.filters as FormGroup).controls.synthesised_item
    })

    constructor() {
        super({
            gemForm_disabled: new FormControl({value: false, disabled: true}),
            otherForm_disabled: new FormControl({value: false, disabled: true}),
            influenceForm_disabled: new FormControl({value: false, disabled: true}),  
            filters: new FormGroup({
              gem_alternate_quality: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              gem_level: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              gem_level_progress: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              quality: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              ilvl: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              talisman_tier: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              stored_experience: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              stack_size: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              alternate_art: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              identified: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              corrupted: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              mirrored: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              crafted: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              veiled: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),
              enchanted: new FormGroup({ 
                option: new Defaultvaluecontrol('', '')
              }),        
              shaper_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              elder_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              crusader_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              redeemer_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              hunter_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              warlord_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              fractured_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              }),
              synthesised_item: new FormGroup({
                option: new Defaultvaluecontrol('', '')
              })
            })
        });
    }
}

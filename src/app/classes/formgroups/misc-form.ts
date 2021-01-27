import { FormControl, FormGroup } from "@angular/forms";

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
                option: new FormControl('')
              }),
              gem_level: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              gem_level_progress: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              quality: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              ilvl: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              talisman_tier: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              stored_experience: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              stack_size: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              alternate_art: new FormGroup({ 
                option: new FormControl('')
              }),
              identified: new FormGroup({ 
                option: new FormControl('')
              }),
              corrupted: new FormGroup({ 
                option: new FormControl('')
              }),
              mirrored: new FormGroup({ 
                option: new FormControl('')
              }),
              crafted: new FormGroup({ 
                option: new FormControl('')
              }),
              veiled: new FormGroup({ 
                option: new FormControl('')
              }),
              enchanted: new FormGroup({ 
                option: new FormControl('')
              }),        
              shaper_item: new FormGroup({
                option: new FormControl('')
              }),
              elder_item: new FormGroup({
                option: new FormControl('')
              }),
              crusader_item: new FormGroup({
                option: new FormControl('')
              }),
              redeemer_item: new FormGroup({
                option: new FormControl('')
              }),
              hunter_item: new FormGroup({
                option: new FormControl('')
              }),
              warlord_item: new FormGroup({
                option: new FormControl('')
              }),
              fractured_item: new FormGroup({
                option: new FormControl('')
              }),
              synthesised_item: new FormGroup({
                option: new FormControl('')
              })
            })
        });
    }
}

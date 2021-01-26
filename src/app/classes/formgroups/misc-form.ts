import { FormControl, FormGroup } from "@angular/forms";

export class MiscForm extends FormGroup {

    public gemForm = new FormGroup({                                    //Data for gems
        gemForm_disabled: this.controls.gemForm_disabled,
        gem_alternate_quality: this.controls.gem_alternate_quality,
        gem_level: this.controls.gem_level,
        gem_level_progress: this.controls.gem_level_progress
    });

    public otherForm = new FormGroup ({                                 //Other data
        otherForm_disabled: this.controls.otherForm_disabled,
        quality: this.controls.quality,
        ilvl: this.controls.ilvl,
        talisman_tier: this.controls.talisman_tier,
        stored_experience: this.controls.stored_experience,
        stack_size: this.controls.stack_size,
        alternate_art: this.controls.alternate_art,
        identified: this.controls.identified,
        corrupted: this.controls.corrupted,
        mirrored: this.controls.mirrored,
        crafted: this.controls.crafted,
        veiled: this.controls.veiled,
        enchanted: this.controls.enchanted,
    });

    public influenceForm = new FormGroup({                              //Data for influence and special bases
        influenceForm_disabled: this.controls.influenceForm_disabled,          
        shaper_item: this.controls.shaper_item,
        elder_item: this.controls.elder_item,
        crusader_item: this.controls.crusader_item,
        redeemer_item: this.controls.redeemer_item,
        hunter_item: this.controls.hunter_item,
        warlord_item: this.controls.warlord_item,
        fractured_item: this.controls.fractured_item,
        synthesised_item: this.controls.synthesised_item
    })

    constructor() {
        super({
            gemForm_disabled: new FormControl({value: false, disabled: true}),
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
            otherForm_disabled: new FormControl({value: false, disabled: true}),
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
            influenceForm_disabled: new FormControl({value: false, disabled: true}),          
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
        });
    }
}

import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { itemSaveData } from "src/app/core/models/itemSaveData";
import { Defaultvaluecontrol } from "./defaultvaluecontrol";
import { Resultdata } from "./resultdata";
import { StatFilterForm } from "./stat-filter-form";
import { StatForm } from "./stat-form";
export class Item {

    public resultData: Resultdata = new Resultdata();   //Data pertaining to the results

    public gemForm = new FormGroup({                                    //Data for gems
        gemForm_disabled: new FormControl({ value: false, disabled: true }),
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
        })
    });

    public otherForm = new FormGroup({                                 //Other data
        otherForm_disabled: new FormControl({ value: false, disabled: true }),
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
    });

    public influenceForm = new FormGroup({                              //Data for influence and special bases
        influenceForm_disabled: new FormControl({ value: false, disabled: true }),
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

    public itemForm = new FormGroup({                   //The main item data
        itemName: new FormControl('New Item'),
        queryForm: new FormGroup({
            query: new FormGroup({
                name: new FormControl(''),
                term: new FormControl(''),
                type: new FormControl(''),
                filters: new FormGroup({
                    armour_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            ar: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            es: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            ev: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            block: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            })
                        })
                    }),
                    map_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            map_region: new FormGroup(
                                { option: new Defaultvaluecontrol('', '') }
                            ),
                            map_series: new FormGroup(
                                { option: new Defaultvaluecontrol('', '') }
                            ),
                            map_shaped: new FormGroup(
                                { option: new Defaultvaluecontrol('', '') }
                            ),
                            map_elder: new FormGroup(
                                { option: new Defaultvaluecontrol('', '') }
                            ),
                            map_blighted: new FormGroup(
                                { option: new Defaultvaluecontrol('', '') }
                            ),
                            map_tier: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            map_packsize: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            map_iiq: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            map_iir: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            })
                        })
                    }),
                    misc_filters: new FormGroup({
                        gemForm_disabled: this.gemForm.controls.gemForm_disabled,
                        otherForm_disabled: this.otherForm.controls.otherForm_disabled,
                        influenceForm_disabled: this.influenceForm.controls.influenceForm_disabled,
                        filters: new FormGroup({
                            gem_alternate_quality: this.gemForm.controls.gem_alternate_quality,
                            gem_level: this.gemForm.controls.gem_level,
                            gem_level_progress: this.gemForm.controls.gem_level_progress,
                            quality: this.otherForm.controls.quality,
                            ilvl: this.otherForm.controls.ilvl,
                            talisman_tier: this.otherForm.controls.talisman_tier,
                            stored_experience: this.otherForm.controls.stored_experience,
                            stack_size: this.otherForm.controls.stack_size,
                            alternate_art: this.otherForm.controls.alternate_art,
                            identified: this.otherForm.controls.identified,
                            corrupted: this.otherForm.controls.corrupted,
                            mirrored: this.otherForm.controls.mirrored,
                            crafted: this.otherForm.controls.crafted,
                            veiled: this.otherForm.controls.veiled,
                            enchanted: this.otherForm.controls.enchanted,
                            shaper_item: this.influenceForm.controls.shaper_item,
                            elder_item: this.influenceForm.controls.elder_item,
                            crusader_item: this.influenceForm.controls.crusader_item,
                            redeemer_item: this.influenceForm.controls.redeemer_item,
                            hunter_item: this.influenceForm.controls.hunter_item,
                            warlord_item: this.influenceForm.controls.warlord_item,
                            fractured_item: this.influenceForm.controls.fractured_item,
                            synthesised_item: this.influenceForm.controls.synthesised_item
                        })
                    }),
                    req_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            lvl: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', ''),
                            }),
                            str: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            dex: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            int: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            })
                        }),
                    }),
                    socket_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            sockets: new FormGroup({
                                r: new Defaultvaluecontrol('', ''),
                                g: new Defaultvaluecontrol('', ''),
                                b: new Defaultvaluecontrol('', ''),
                                w: new Defaultvaluecontrol('', ''),
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', ''),
                            }),
                            links: new FormGroup({
                                r: new Defaultvaluecontrol('', ''),
                                g: new Defaultvaluecontrol('', ''),
                                b: new Defaultvaluecontrol('', ''),
                                w: new Defaultvaluecontrol('', ''),
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', ''),
                            })
                        }),
                    }),
                    trade_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            price: new FormGroup({
                                min: new Defaultvaluecontrol(''),
                                max: new Defaultvaluecontrol(''),
                                option: new Defaultvaluecontrol('', ''),
                            }),
                            account: new FormGroup({
                                input: new Defaultvaluecontrol('', ''),
                            }),
                            sale_type: new FormGroup({
                                option: new Defaultvaluecontrol('', ''),
                            }),
                            indexed: new FormGroup({
                                option: new Defaultvaluecontrol('', ''),
                            })
                        }),
                    }),
                    weapon_filters: new FormGroup({
                        disabled: new FormControl({ value: false, disabled: true }),
                        filters: new FormGroup({
                            damage: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            aps: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            crit: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            dps: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            pdps: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            }),
                            edps: new FormGroup({
                                min: new Defaultvaluecontrol('', ''),
                                max: new Defaultvaluecontrol('', '')
                            })
                        })
                    }),
                    type_filters: new FormGroup({
                        filters: new FormGroup({
                            category: new FormGroup({
                              option: new Defaultvaluecontrol('', '')
                            }),
                            rarity: new FormGroup({
                              option: new Defaultvaluecontrol('', '')
                            }),
                        })
                    })
                }),
                stats: new FormArray([
                ]),
                status: new FormGroup({
                    option: new Defaultvaluecontrol('online', 'online'),
                })
            }),
            sort: new FormGroup({
                price: new FormControl("asc")
            })
        })
    });

    constructor(public savedItemData?: itemSaveData) {
        if (this.savedItemData) {
            this.loadSaveData();
        }
    }

    /**
     * Loads the saved item data
     */
    public loadSaveData() {

        //Have to add a new stat filter for each one saved
        this.savedItemData.queryForm.query.stats?.forEach(statGroup => {
            let newStatGroup = new StatFilterForm();
            (this.itemForm.get('queryForm.query.stats') as FormArray).push(newStatGroup);

            //Have to add a stat for each on saved
            statGroup.filters?.forEach(filter => {
                (newStatGroup.controls.filters as FormArray).push(new StatForm);
            });
        });

        //Patch the saved values
        this.itemForm.patchValue(this.savedItemData);
    }

    /**
     * Resets the data for this item
     */
    public clear() {
        this.resultData = new Resultdata();
        this.itemForm.reset('');
        this.itemForm.controls.itemName.patchValue('New Item');
        (this.itemForm.get('queryForm.query.stats') as FormArray).clear();
    }
}

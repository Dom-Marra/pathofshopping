import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemsearchService, searchItem } from '../../itemsearch.service';
import {map, startWith} from 'rxjs/operators';
import { minmaxExtras } from '../minmaxinput/minmaxinput.component';

export const filterSearch = (items: Array<string>, searchText: string): Array<string> => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.toLowerCase().indexOf(text) != -1);
}

enum trueFlase {
  all = 'All',
  true = 'Yes',
  false = 'No'
}

enum gemQualityTypes {
  all = 'All',
  '"0"' = 'Default',
  'alternate' = 'Only Alternatives',
  '"1"' = 'Anomalous',
  '"2"' = 'Divergent',
  '"3"' = 'Phantasmal',
}

enum mapSeries {
  all = 'All',
  current = 'Current',
  harvest = 'Harvest',
  delirium = 'Delirium',
  metamorph = 'Metamorph',
  blight = 'Blight',
  legion = 'Legion',
  synthesis = 'Synthesis',
  betrayal = 'Betrayal',
  worfortheatlas = 'War for The Atlas',
  atlasofworlds = 'Atlas of Worlds',
  theawakening = 'The Awakening',
  legacy = 'Legacy'
}

enum mapRegion {
  all = "All",
  otl = "Haewark Hamlet",
  itl = "Tirn's End",
  itr = "Lex Proxima",
  otr = "Lex Ejoris",
  obl = "New Vastir",
  ibl = "Glennach Cairn",
  ibr = "Valdo's Rest",
  obr = "Lira Arthain"
}

enum itemRarities {
  all = 'All',
  normal = 'Normal',
  magic = 'Magic',
  rare = 'Rare',
  unique = 'Unique',
  uniqueFoil = 'Unique Relic',
  nonunique = 'Non Unique'
}

enum itemTypes {
  all = 'All',
  weapon = 'All Weapons',
  'weapon.one' = 'One-Handed Weapon',
  'weapon.onemelee' = 'One-Handed Melee Weapon',
  'weapon.twomelee' = 'Two-Handed Melee Weapon',
  'weapon.bow' = 'Bow',
  'weapon.claw' = 'Claw',
  'weapon.dagger' = 'All Daggers',
  'weapon.basedagger' = 'Base Dagger',
  'weapon.runicdagger' = 'Runic Dagger',
  'weapon.oneaxe' = 'One-Handed Axe',
  'weapon.onemace' = 'One-Handed Mace',
  'weapon.onesword' = 'One-Handed Sword',
  'weapon.sceptre' = 'Sceptre',
  'weapon.staff' = 'All Staffs',
  'weapon.basestaff' = 'Base Staffs',
  'weapon.warstaff' = 'War Staffs',
  'weapon.twoaxe' = 'Two-Handed Axe',
  'weapon.twosword' = 'Two-Handed Sword',
  'weapon.wand' = 'Wand',
  'weapon.rod' = 'Rod',
  'armour' = 'All Armour',
  'armour.chest' = 'Body Armour',
  'armour.boots' = 'Boots',
  'armour.gloves' = 'Gloves',
  'armour.helmet' = 'Helmet',
  'armour.shield' = 'Shield',
  'armour.quiver' = 'Quiver',
  'accessory' = 'Accessory',
  'accessory.amulet' = 'Amulet',
  'accessory.belt' = 'Belt',
  'accessory.ring' = 'Ring',
  'accessory.trinket' = 'Trinket',
  'gem' = 'All Gems',
  'gem.activegem' = 'Skill Gem',
  'gem.supportgem' = 'Support Gem',
  'gem.supportgemplus' = 'Awakened Support Gem',
  'jewel' = 'All Jewels',
  'jewel.base' = 'Base Jewel',
  'jewel.abyss' = 'Abyss Jewel',
  'jewel.cluster' = 'Cluster Jewel',
  'flask' = 'Flask',
  'map' = 'Map',
  'map.fragment' = 'Map Fragment',
  'map.scarab' = 'Scarab',
  'watchstone' = 'Watchstone',
  'leaguestone' = 'Leaguestone',
  'prophecy' = 'Prophecy',
  'card' = 'Divination Card',
  'monster.beast' = 'Beast',
  'monster.sample' = 'Metamorph Sample',
  'currency' = 'All Currencies',
  'currency.piece' = 'Unique Fragment',
  'currency.resonator' = 'Resonator',
  'currency.fossil' = 'Fossil',
  'currency.incubator' = 'Incubator',
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  public readonly MAP_REGION: typeof mapRegion = mapRegion;               //Used for map region selection

  public readonly MAP_SERIES: typeof mapSeries = mapSeries;               //used for map series selection

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection

  public readonly ITEM_TYPES: typeof itemTypes = itemTypes;               //Used for item type selection

  public readonly ITEM_RARITIES: typeof itemRarities = itemRarities;      //Used for item rarity selection

  public readonly GEM_QUALITY_TYPES: typeof gemQualityTypes = gemQualityTypes; //Used for gem quality type selection

  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;    //Item name input element

  private editName: boolean = false;                        //Whether name is in edit mode or not

  private viewRef: ViewRef = null;                          //Reference of the view, used when deleting the component

  private itemsToSearch: Array<searchItem> = [];            //POE items
  private filteredItems: Observable<Array<searchItem>>;     //Filtered results of the items
  public filteredTypes: Array<typeof itemTypes>;           //Filtered item types

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    itemSearch: new FormControl(''),
    itemCategory: new FormControl(this.ITEM_TYPES.all),
    itemRarity: new FormControl(this.ITEM_RARITIES.all),
    weaponFilters: new FormGroup({
      damage: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      APS: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      criticalStrikeChance: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      totalDPS: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      pDPS: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      eDPS: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
    }),
    armourFilters: new FormGroup({
      armour: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      energyShield: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      evasion: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      blockChance: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
    socketFilters: new FormGroup({
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
    }),
    requirementFilters: new FormGroup({
      level: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      strength: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      dexterity: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      intelligence: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
    mapFilters: new FormGroup({
      region: new FormControl(this.MAP_REGION.all),
      series: new FormControl(this.MAP_SERIES.all),
      shaped: new FormControl(this.TRUE_FALSE.all),
      elder: new FormControl(this.TRUE_FALSE.all),
      blighted: new FormControl(this.TRUE_FALSE.all),
      tier: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      packsize: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      iiq: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      iir: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
    influenceFilters: new FormGroup({
      shaper: new FormControl(this.TRUE_FALSE.all),
      elder: new FormControl(this.TRUE_FALSE.all),
      crusader: new FormControl(this.TRUE_FALSE.all),
      redeemer: new FormControl(this.TRUE_FALSE.all),
      hunter: new FormControl(this.TRUE_FALSE.all),
      warlord: new FormControl(this.TRUE_FALSE.all),
      fractured: new FormControl(this.TRUE_FALSE.all),
      synthesised: new FormControl(this.TRUE_FALSE.all)
    }),
    gemFilters: new FormGroup({
      qualityType: new FormControl(this.GEM_QUALITY_TYPES.all),
      level: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      experience: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
    otherFilters: new FormGroup({
      quality: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      itemLevel: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      talismanTier: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      storedExperience: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      stackSize: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      alternateArt: new FormControl(this.TRUE_FALSE.all),
      identified: new FormControl(this.TRUE_FALSE.all),
      corrupted: new FormControl(this.TRUE_FALSE.all),
      mirrored: new FormControl(this.TRUE_FALSE.all),
      crafted: new FormControl(this.TRUE_FALSE.all),
      veiled: new FormControl(this.TRUE_FALSE.all),
      enchanted: new FormControl(this.TRUE_FALSE.all),
    }),
  });

  public socketLinksExtras: Array<minmaxExtras> = [                                                           //links extra input data
    {label: 'Red', control: this.itemForm.get('socketFilters.links.red'), inputClass: 'socket-input-r'},
    {label: 'Green', control: this.itemForm.get('socketFilters.links.green'), inputClass: 'socket-input-g'},
    {label: 'Blue', control: this.itemForm.get('socketFilters.links.blue'), inputClass: 'socket-input-b'},
    {label: 'White', control: this.itemForm.get('socketFilters.links.white'), inputClass: 'socket-input-w'}
  ]

  public socketSocketsExtras: Array<minmaxExtras> = [                                                         //sockets extra input data
    {label: 'Red', control: this.itemForm.get('socketFilters.sockets.red'), inputClass: 'socket-input-r'},
    {label: 'Green', control: this.itemForm.get('socketFilters.sockets.green'), inputClass: 'socket-input-g'},
    {label: 'Blue', control: this.itemForm.get('socketFilters.sockets.blue'), inputClass: 'socket-input-b'},
    {label: 'White', control: this.itemForm.get('socketFilters.sockets.white'), inputClass: 'socket-input-w'}
  ]

  constructor(private cd: ChangeDetectorRef, private itemSearch: ItemsearchService) { 
    this.itemsToSearch = this.itemSearch.getItems();                            //Init items to search

    this.filteredItems = this.itemForm.controls.itemSearch.valueChanges.pipe(   //filter items when item search changes
      startWith(''),
      map(searchText => this.filterGroups(searchText))
    );
  }

  ngAfterViewInit() {
    this.itemNameInput.changes.subscribe(() => {        //focus name input element after processed by ngIf
      
      if (this.editName) {
        this.itemNameInput.first.nativeElement.focus();
        this.cd.detectChanges();
      }
    })
  }

  ngOnInit(): void {
  }

  /**
   * Filters enumeration objects based on search text
   * 
   * @param searchText
   *        string: search text 
   * @param enumToFilter 
   *        typeof enum: the enumeration to filter
   */
  public filterEnums(searchText: string, enumToFilter: any): Array<any> {
    const text = searchText.toLowerCase();

    return Object.values(enumToFilter).filter((enumValue: string) => enumValue.toLowerCase().indexOf(text) != -1);
  }

  /**
   * Filters the items from each category of the search items
   * 
   * @param searchText
   *        string: text to filter by
   * 
   * @returns 
   *       Array<searchItem>: The filtered results
   */
  private filterGroups(searchText: string): Array<searchItem> {

    if (searchText != '') {
      return this.itemsToSearch.map(searchItem => ({category: searchItem.category, items: filterSearch(searchItem.items, searchText)}))
      .filter(searchItem => searchItem.items.length > 0);
    } else {
      return [];
    }
  }

  /**
   * Returns filtered items
   * 
   * @returns
   *        Observable<Array<searchItem>>: The filtered results of the search items
   */
  public getFilteredItems(): Observable<Array<searchItem>> {
    return this.filteredItems;
  }

  /**
   * Sets editName
   * 
   * @param edit
   *        boolean: whether to edit or not 
   */
  public setEditName(edit: boolean) {
    this.editName = edit;
  }

  /**
   * Retursn editName
   * 
   * @returns
   *        boolean: whether to edit or not
   */
  public getEditName(): boolean {
    return this.editName;
  }

  /**
   * Sets the View Ref variable
   * 
   * @param ref
   *        ViewRef: The view of this component 
   */
  public setViewRef(ref: ViewRef) {
    this.viewRef = ref;
  }

  /**
   * Returns the view ref
   * 
   * @returns
   *        ViewRef: The view of this component
   */
  public getViewRef(): ViewRef {
    return this.viewRef;
  }

  /**
   * Destroys this component
   */
  public remove() {
    this.viewRef.destroy();
  }
}

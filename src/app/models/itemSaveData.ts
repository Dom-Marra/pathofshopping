export interface itemSaveData {
    itemName: string,
    queryForm: {
        query: {
            name: string,
            term: string,
            type: string,
            cat_rar?: {
                filters: {
                    category?: {
                        option: string
                    },
                    rarity?: {
                        option: string
                    },
                }
            },
            filters?: {
                armour_filters?: {
                    disabled: boolean,
                    filters?: {
                        ar?: {
                            min?: number,
                            max?: number
                        },
                        es?: {
                            min?: number,
                            max?: number
                        },
                        ev?: {
                            min?: number,
                            max?: number
                        },
                        block?: {
                            min?: number,
                            max?: number
                        }
                    }
                },
                map_filters?: {
                    disabled: boolean,
                    filters?: {
                        map_region?: {
                            option: string
                        },
                        map_series?: {
                            option: string
                        },
                        map_shaped?: {
                            option: string
                        },
                        map_elder?: {
                            option: string
                        },
                        map_blighted?: {
                            option: string
                        },
                        map_tier?: {
                            min?: number,
                            max?: number
                        },
                        map_packsize?: {
                            min?: number,
                            max?: number
                        },
                        map_iiq?: {
                            min?: number,
                            max?: number
                        },
                        map_iir?: {
                            min?: number,
                            max?: number
                        }
                    }
                },
                misc_filters?: {
                    gemForm_disabled: boolean,
                    otherForm_disabled: boolean,
                    influenceForm_disabled: boolean,  
                    filters?: {
                        gem_alternate_quality?: {
                            option: string
                        },
                        gem_level?: {
                            min?: number,
                            max?: number
                        },
                        gem_level_progress?: {
                            min?: number,
                            max?: number
                        },
                        quality?: {
                            min?: number,
                            max?: number
                        },
                        ilvl?: {
                            min?: number,
                            max?: number
                        },
                        talisman_tier?: {
                            min?: number,
                            max?: number
                        },
                        stored_experience?: {
                            min?: number,
                            max?: number
                        },
                        stack_size?: {
                            min?: number,
                            max?: number
                        },
                        alternate_art?: { 
                            option: string
                        },
                        identified?: { 
                            option: string
                        },
                        corrupted?: { 
                            option: string
                        },
                        mirrored?: { 
                            option: string
                        },
                        crafted?: { 
                            option: string
                        },
                        veiled?: { 
                            option: string
                        },
                        enchanted?: { 
                            option: string
                        },        
                        shaper_item?: {
                            option: string
                        },
                        elder_item?: {
                            option: string
                        },
                        crusader_item?: {
                            option: string
                        },
                        redeemer_item?: {
                            option: string
                        },
                        hunter_item?: {
                            option: string
                        },
                        warlord_item?: {
                            option: string
                        },
                        fractured_item?: {
                            option: string
                        },
                        synthesised_item?: {
                            option: string
                        }
                    }
                },
                req_filters?: {
                    disabled: boolean,
                    filters?: {
                      lvl?: {
                        min?: number,
                        max?: number
                      },
                      str?: {
                        min?: number,
                        max?: number
                      },
                      dex?: {
                        min?: number,
                        max?: number
                      },
                      int?: {
                        min?: number,
                        max?: number
                      }
                    },
                },
                socket_filters?: {
                    disabled: boolean,
                    filters?: {
                        sockets?: {
                            r?: number,
                            g?: number,
                            b?: number,
                            w?: number,
                            min?: number,
                            max?: number
                        },
                        links?: {
                            r?: number,
                            g?: number,
                            b?: number,
                            w?: number,
                            min?: number,
                            max?: number
                        }
                    },
                },
                trade_filters?: {
                    disabled: boolean,
                    filters: { 
                      price: {
                        min: number,
                        max: number,
                        option: string
                      },
                      account: {
                        input: string
                      },
                      sale_type: {
                        option: string
                      },
                      indexed: {
                        option: string
                      }
                    },
                },
                weapon_filters?: {
                    disabled: boolean,
                    filters?: {
                      damage?: {
                        min?: number,
                        max?: number
                      },
                      aps?: {
                        min?: number,
                        max?: number
                      },
                      crit?: {
                        min?: number,
                        max?: number
                      },
                      dps?: {
                        min?: number,
                        max?: number
                      },
                      pdps?: {
                        min?: number,
                        max?: number
                      },
                      edps?: {
                        min?: number,
                        max?: number
                      }
                    }
                },
                type_filters?: {
                    filters?: {
                        category?: {
                          option: string
                        },
                        rarity?: {
                          option: string
                        },
                    }
                }
            },
            stats?: Array<{
                type: string,
                disabled: boolean,
                filters: Array<{
                    id: string,
                    disabled: boolean,
                    selectedStatOption: {
                        id: string | number,
                        text: string
                    },
                    selectedStat: {
                        id: string,
                        text: string,
                        option?: Array<{
                            id: number | string,
                            text: string
                        }>
                    },
                    value?: {
                        min?: number,
                        max?: number,
                        option?: string
                    }
                }>,
                value?: {
                  min?: number,
                  max?: number
                }
            }>,
            status: {
                option: string
            }
        },
        sort: {
            [key: string]: string
        }
    }
}
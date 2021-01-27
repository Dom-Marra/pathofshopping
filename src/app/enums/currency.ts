enum currencies {
    alt = "Orb of Alteration",
    fusing = "Orb of Fusing",
    alch = " Orb of Alchemy",
    chaos = "Chaos Orb",
    gcp = "Gemcutter's Prism",
    exalted = "Exalted Orb",
    chrom = "Chromatic Orb",
    jewellers = "Jeweller's Orb",
    chance = "Orb of Chance",
    chisel = "Cartographer's Chisel",
    scour = "Orb of Scouring",
    blessed = "Blessed Orb",
    regret = "Orb of Regret",
    regal = "Regal Orb",
    divine = "Divine Orb",
    vaal = "Vaal Orb",
    mirror = "Mirror of Kalandra",
    p = "Perandus Coin",
    silver = "Silver",
}

export class Currency {

    public readonly currencies: typeof currencies = currencies;     //Store all the currency types

    public getCurrencyIcon(currencyName: string): string {
        switch(currencyName) {
            case 'alt': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollMagic.png?v=6d9520174f6643e502da336e76b730d3';
            }
            case 'fusing': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketLinks.png?v=0ad7134a62e5c45e4f8bc8a44b95540f';
            }
            case 'alch': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToRare.png?v=89c110be97333995522c7b2c29cae728';
            }
            case 'chaos': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9';
            }
            case 'gcp': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyGemQuality.png?v=f11792b6dbd2f5f869351151bc3a4539';
            }
            case 'exalted': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?v=1745ebafbd533b6f91bccf588ab5efc5';
            }
            case 'chrom': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png?v=9d377f2cf04a16a39aac7b14abc9d7c3';
            }
            case 'jewellers': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png?v=2946b0825af70f796b8f15051d75164d';
            }
            case 'chance': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeRandomly.png?v=e4049939b9cd61291562f94364ee0f00';
            }
            case 'chisel': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyMapQuality.png?v=f46e0a1af7223e2d4cae52bc3f9f7a1f';
            }
            case 'scour': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyConvertToNormal.png?v=15e3ef97f04a39ae284359309697ef7d';
            }
            case 'blessed': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImplicitMod.png?v=472eeef04846d8a25d65b3d4f9ceecc8';
            }
            case 'regret': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPassiveSkillRefund.png?v=1de687952ce56385b74ac450f97fcc33';
            }
            case 'regal': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeMagicToRare.png?v=1187a8511b47b35815bd75698de1fa2a';
            }
            case 'divine': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png?v=0ad99d4a2b0356a60fa8194910d80f6b';
            }
            case 'vaal': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyVaal.png?v=64114709d67069cd665f8f1a918cd12a';
            }
            case 'mirror': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?v=6fd68c1a5c4292c05b97770e83aa22bc';
            }
            case 'p': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyCoin.png?v=b971d7d9ea1ad32f16cce8ee99c897cf';
            }
            case 'silver': {
                return 'https://web.poecdn.com/image/Art/2DItems/Currency/SilverObol.png?v=93c1b204ec2736a2fe5aabbb99510bcf';
            }
        }

        return '';
    }
}

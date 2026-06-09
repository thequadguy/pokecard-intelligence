import cardsData from "../../../assets/data/cards.json";
interface PriceResult{low:number;mid:number;high:number;currency:string}
interface CardWithPrices{id:string;prices?:any;rarity?:string;set?:string;language?:string;localNames?:any}
export class PricingEngine{
  private cards:CardWithPrices[];private baseMultipliers:Record<string,number>={Common:1,Uncommon:2,Rare:5,"Holo Rare":15,"Ultra Rare":50,"Secret Rare":150};
  private gradeMultipliers:Record<number,number>={10:5.0,9:2.5,8:1.5,7:1.1,6:0.9,5:0.7,4:0.5,3:0.3};
  constructor(){this.cards=cardsData as CardWithPrices[]}
  private detectLang(s:string):string{if(/[\u3040-\u309f\u30a0-\u30ff]/.test(s))return"ja";if(/[\u4e00-\u9fff]/.test(s))return"zh";if(/[\uac00-\ud7af]/.test(s))return"ko";return"en"}
  getPrice(cardId:string,grade=7,lang?:string):PriceResult{
    const card=this.cards.find(c=>c.id===cardId);if(!card)return{low:1,mid:1,high:1.5,currency:"USD"};
    let detectedLang=lang||(card.language||"en");if(!lang&&card.set)detectedLang=this.detectLang(card.set);
    let basePrice=1;
    if(card.prices&&typeof card.prices==="object"){if(card.prices[detectedLang])basePrice=card.prices[detectedLang].mid||1;else if(card.prices.en)basePrice=card.prices.en.mid||1;else if(card.prices.mid)basePrice=card.prices.mid}
    else basePrice=this.baseMultipliers[card.rarity??"Common"]||1;
    const gradeKey=Math.round(Math.min(10,Math.max(1,grade))),mult=this.gradeMultipliers[gradeKey]||1.0,mid=basePrice*mult;
    return{low:mid*0.75,mid,high:mid*1.35,currency:"USD"}
  }
  getMarketTrend(cardId:string):"rising"|"stable"|"falling"{const h=cardId.split("").reduce((a,c)=>a+c.charCodeAt(0),0),v=h%3;return v===0?"rising":v===1?"stable":"falling"}
}
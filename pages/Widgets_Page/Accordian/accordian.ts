import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class Accordian{

    private page:Page;
    private elementActions:ElementActions;
    private firstaccordian:string;
    private secondaccordian:string;
    private secondheading:string;
    private thirdaccordian:string;
    private thirdheading:string;
    private firstcontent:string;
    private firstheading:string;
    private showAccordian:string;
    constructor(page:Page) {
        this.page = page;
        this.elementActions = new ElementActions;
        this.showAccordian='//*[@class="card"]/div[2]';
        this.firstcontent='//div[@class="card"][1]//p';
        this.thirdaccordian='//div[@class="card"][3]';
        this.firstheading='//*[@id="section1Heading"]';
        this.secondheading='//*[@id="section2Heading"]';
        this.thirdheading='//*[@id="section3Heading"]';
        this.secondaccordian='//div[@class="card"][2]';
        this.firstaccordian='//div[@class="card"][1]';

    }

    async verifyAccordian(){
        return await this.page.url();
    }

    async verifyAccordianText(value:'first'|'second'|'third'){
        if(value==='first'){
            return await this.elementActions.returnText(await this.page.locator(this.firstheading));
        }else if(value === 'second'){
            return await this.elementActions.returnText(await this.page.locator(this.secondheading));
        }else if(value === 'third'){
            return await this.elementActions.returnText(await this.page.locator(this.thirdheading));
        }
    }

    async returnState(){
        return new Promise<{accordian1:string|null,accordian2:string|null,accordian3:string|null}>(async(resolve,reject)=>{
            try{
                const accordian1 = await this.page.locator(this.showAccordian).first().getAttribute('class');
                const accordian2 = await this.page.locator(this.showAccordian).nth(1).getAttribute('class');
                const accordian3 = await this.page.locator(this.showAccordian).nth(2).getAttribute('class');
                resolve({accordian1,accordian2,accordian3});
            }catch(err){
                reject(err);
            }
        })
    }

    async closeOpenAccordian(value:'first'|'second'|'third'){
        if(value === 'first'){
            await this.page.locator(this.firstheading).click();
        }else if(value == 'second'){
            await this.page.locator(this.secondaccordian).click();
        }else if(value === 'third'){
            await this.page.locator(this.thirdaccordian).click();
        }
    }
    

}export{Accordian};
import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class Buttons{
    private page:Page;
    private elementActions:ElementActions;
    private doubleBTN:string;
    private rightBTN:string;
    private dynamicBTN:string;
    private result:string;
    constructor(page:Page){
        this.page = page;
        this.elementActions= new ElementActions;
        this.result='//p[contains(@id,"Click")]';
        this.doubleBTN='//*[@id="doubleClickBtn"]';
        this.rightBTN='//*[@id="rightClickBtn"]';
        this.dynamicBTN='//button[text()="Click Me"]';
    }

    async verifyButtonPage(){
        return await this.page.url();
    }

    async clickDoubleBTN(){
        const dbtn = await this.page.locator(this.doubleBTN);
        await this.elementActions.doubleClick(dbtn);
    }

    async clickRightBTN(){
        const rbtn = await this.page.locator(this.rightBTN);
        await this.elementActions.clickWithAction(rbtn,'right');
    }

    async clickDynamicBTN(){
        const dynamic = await this.page.locator(this.dynamicBTN);
        await this.elementActions.clickElement(dynamic);
    }

    async verifyResult(){
        const resultBox = await this.page.locator(this.result);
        return await this.elementActions.visibilityCheck(resultBox);
    }
    
    async verifyDoubleClick(){
        const flag = await this.page.locator(this.result);
        return flag.textContent();
    }
    async verifyRightClick(){
        const flag = await this.page.locator(this.result);
        return flag.textContent();
    }
    async verifyDynamicClick(){
        const flag = await this.page.locator(this.result);
        return flag.textContent();
    }
    async verifyAllClick(){
        const flag = await this.page.locator(this.result);
        const count = await flag.count();
        let temp:string[]=[]
        if(count == 3){
            for(let i = 0;i<count;i++){
                let f = await flag.nth(i).textContent();
                temp.push(f!);
            }
        }else{
            throw new Error('All buttons not clicked');
        }
        return temp;
    }

}
export {Buttons};



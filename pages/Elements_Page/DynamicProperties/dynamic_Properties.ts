import {Locator, Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class DynamicProperties{
    private page:Page;
    private elementActions:ElementActions;
    private randomIdText:string;
    private visibleAfterCTA:string;
    private enableAfterCTA:string;
    private colorChangeCTA:string;
    constructor(page:Page){
        this.page = page;
        this.elementActions = new ElementActions;
        this.randomIdText = '//p[text()="This text has random Id"]';
        this.visibleAfterCTA='button#visibleAfter';
        this.enableAfterCTA='button#enableAfter';
        this.colorChangeCTA='button#colorChange';
    }

    async verifyDynamicPropertiesPage(){
        return await this.page.url();
    }

    async verifyRandomTextVisible():Promise<boolean>{
        const randomText = await this.page.locator(this.randomIdText);
        const flag = await this.elementActions.visibilityCheck(randomText);
        if(flag){
            return true;
        }else{ return false; }
    }

    async before5SecVisibleCTA(){
        return await this.page.locator(this.visibleAfterCTA);
    }

    async enableAfter5SecCTA(){
        return await this.page.locator(this.enableAfterCTA);
    }

    async beforeColorChangeCTA(){
        const cta = await this.page.locator(this.colorChangeCTA);
        const style = await this.elementActions.CSSproperty(cta);
        return style.color;
    }

    async afterWait(){
        const enableCTA = await this.page.locator(this.enableAfterCTA);
        const colorCTA = await this.page.locator(this.colorChangeCTA);
        const visibleCTA = await this.page.locator(this.visibleAfterCTA);        
        await visibleCTA.waitFor({state:'visible'});
        const visibleflag = await visibleCTA.isVisible()?true:false;
        const colorflag = await (await this.elementActions.CSSproperty(colorCTA)).color;
        return [await enableCTA.isEnabled(), visibleflag, colorflag];
    }


}
export{DynamicProperties};
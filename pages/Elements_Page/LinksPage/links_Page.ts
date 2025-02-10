import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class Links{
    private page:Page;
    private elementActions:ElementActions;
    private homeSimpleLink:string;
    constructor(page:Page){
        this.page = page;
        this.homeSimpleLink='a#simpleLink';
        this.elementActions = new ElementActions();
    }

    async verifyLinksPage(){
        return await this.page.url();
    }

    async verifyHomeSimpleLink(){
        const value = await this.page.locator(this.homeSimpleLink).innerText();
        return value;
    }

    async actionLink(){
        const homeLink = await this.page.locator(this.homeSimpleLink);
       // await homeLink.click();
        const [newPage] = await Promise.all([
             this.page.context().waitForEvent('page'),
              homeLink.click(),            
        ]);

        await newPage.waitForLoadState();
        const newUrl = await newPage.url();
        await newPage.close();
        return newUrl;
    }
}
export{Links}
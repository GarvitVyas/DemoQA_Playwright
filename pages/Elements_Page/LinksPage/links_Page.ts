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
}
export{Links}
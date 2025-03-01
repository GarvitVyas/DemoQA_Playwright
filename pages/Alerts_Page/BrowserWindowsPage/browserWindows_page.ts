import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class BrowserWindows{
    private page:Page;
    private newtab:string;

    constructor(page:Page){
        this.page = page;
        this.newtab='//*[@id="tabButton"]';
    }

    async verifyBrowserWindowsPage(){
        return await this.page.url();
    }

    async newTab(){
        const newtab = await this.page.locator(this.newtab,{hasText:'New Tab'});
        const actions = await Promise.all([
            this.page.context().waitForEvent('page'),
            newtab.click()
        ])
       const url = await actions[0].url();
       const text = await actions[0].textContent('#sampleHeading');
       await actions[0].close();
       return [url,text];
    }


}export{BrowserWindows}
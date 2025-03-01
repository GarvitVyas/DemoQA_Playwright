import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class BrowserWindows{
    private page:Page;
    private newtab:string;
    private newwindow:string;
    private windowheading:string;
    private newwindowmessage:string;
    constructor(page:Page){
        this.page = page;
        this.newwindowmessage='//*[@id="messageWindowButton"]';
        this.windowheading='#sampleHeading';
        this.newwindow='//*[@id="windowButton"]';
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
       const text = await actions[0].textContent(this.windowheading);
       await actions[0].close();
       return [url,text];
    }

    async newWindow(){
        const newWindow = await this.page.locator(this.newwindow,{hasText:'New Window'});
        const action = await Promise.all([
            this.page.waitForEvent('popup'),
            newWindow.click()
        ])
        const url = await action[0].url();
        const text = await action[0].textContent(this.windowheading);
        await action[0].close();
        return [url,text];
    }

    async newWindowMessage(){
        const newWindowMessage = await this.page.locator(this.newwindowmessage,{hasText:'New Window Message'});
        const [action] = await Promise.all([
            this.page.waitForEvent('popup'),
            newWindowMessage.click()
        ])
        const text = await action.textContent('//body');
        await action.close();
        return text;
    }

}export{BrowserWindows}
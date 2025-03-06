import {Page} from '@playwright/test';

class Frames{
    
    private page:Page;
    private frame1:string;
    private frame1Text:string;
    constructor(page:Page){
        this.page = page;
        this.frame1='//iframe[@id="frame1"]';
        this.frame1Text='//h1[@id="sampleHeading"]';
    }   

    async verifyFramesPage(){
        return await this.page.url();
    }

    async switchToFrame1(){
        const flag = await this.page.locator(this.frame1).isVisible();
        if(flag){
            const frame1Page = await this.page.locator(this.frame1).contentFrame();
            const text = await frame1Page.locator(this.frame1Text).innerText();
            return text;
        }else{
            throw new Error('frame 1 not visible');
        }
    }
}
export{Frames};
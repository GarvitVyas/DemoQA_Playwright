import {Page} from '@playwright/test';

class NestedFrames{
    private page:Page;
    private parentframe:string;
    private childframe:string;
    constructor(page:Page){
        this.page = page;
        this.childframe='//iframe[@srcdoc]';
        this.parentframe='//iframe[@id="frame1"]';
    }

    async verifyNestedFramesPage(){
        return await this.page.url();
    }

    async parentFrame():Promise<{text:string,childFrame:boolean}>{
        const flag = await this.page.locator(this.parentframe).isVisible();
        if(flag){
            const parent = await this.page.locator(this.parentframe).contentFrame();
            const text = await parent.locator('//body').innerText();
            const childFrame = await parent.locator(this.childframe).isVisible();
            return {text,childFrame};
        }else{
            throw new Error('Parent frame not visible');
        }
    }

    async childFrame(){
        const parentFlag = await this.page.locator(this.parentframe).isVisible();
        if(parentFlag){
            const parent = await this.page.locator(this.parentframe).contentFrame();
            const child = await parent.locator(this.childframe).contentFrame();
            const childtext = await child.locator('//p').innerText();
            return childtext;
        }else{
            throw new Error('Parent frame not visible');
        }
    }
}
export{NestedFrames};
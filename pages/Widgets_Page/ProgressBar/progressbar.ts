import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class ProgressBar{

    private page:Page;
    private elementAction:ElementActions;
    private button:string;
    private progressBar:string;
    private resetbutton:string;
    constructor(page:Page){
        this.page = page;
        this.elementAction = new ElementActions;
        this.resetbutton='//*[@id="resetButton"]'
        this.button = '//*[@id="startStopButton"]';
        this.progressBar='//*[@id="progressBar"]/div';
    }

    async verifyProgressBarPage(){
        return await this.page.url();
    }

    async startStopButtonValidation(){
        const flag = await this.page.locator(this.button);
        if(await flag.isVisible()){
            const initial = await flag.textContent();
            await flag.click();
            const middle = await flag.textContent();
            if(middle==='Stop'){
                await flag.click();
            }
            return [initial,middle];
        }else{
            throw new Error('Start/Stop button not visible!');
        }
    }

    async resetButton(){
        const cta = await this.page.locator(this.button);
        let flag = false;
        await cta.click();
        const reset = await this.page.locator(this.resetbutton);
        while(!flag){
            if(await reset.isVisible()){
                flag = true;
            }
        }
        return true;
    }

    async barCSS(){
        const bar = await this.page.locator(this.progressBar);
        await this.page.locator(this.button).click();
        const cssInitial = await this.elementAction.CSSproperty(bar);
        await this.page.locator(this.resetbutton).waitFor({state:'visible'});
        const cssFinal = await this.elementAction.CSSproperty(bar);
        return [await cssInitial.backgroundColor, await cssFinal.backgroundColor];
    }

    async moveProgress(){
        var target:string='85';
        var flag = false;
        while(!flag){
            await this.page.locator(this.button).click();
            const barValue = await this.page.locator(this.progressBar).getAttribute('aria-valuenow');
            if(await barValue === target){
                await this.page.locator(this.button).click();
                flag = true;
            }
        }
    }

    async barValue(){
        return await this.page.locator(this.progressBar).textContent();
    }


}export{ProgressBar};
import {Page} from '@playwright/test';

class Slider{

    private page:Page;
    private slidervalueField:string;
    private inputrange:string;
    constructor(page:Page){
        this.page = page;
        this.inputrange='//input[@type="range"]'
        this.slidervalueField='//input[@id="sliderValue"]';
    }

    async verifySliderPage(){
        return await this.page.url();
    }

    async sliderValue(){
        return await this.page.locator(this.slidervalueField).getAttribute('value');
    }

    async hoverOverSlider(){
        const ele = await this.page.locator(this.inputrange);
        await ele.hover();
        const flag = await this.page.getByText('25').isVisible();
        return flag;
    }

}export{Slider}
import {Page} from '@playwright/test';

class Slider{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async verifySliderPage(){
        return await this.page.url();
    }

}export{Slider}
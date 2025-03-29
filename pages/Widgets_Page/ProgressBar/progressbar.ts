import {Page} from '@playwright/test';

class ProgressBar{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async verifyProgressBarPage(){
        return await this.page.url();
    }

}export{ProgressBar};
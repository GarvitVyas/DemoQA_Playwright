import {Page} from '@playwright/test';

class PracticeForm{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async verifyPracticeForm(){
        return await this.page.url();
    }

}

export{PracticeForm};
import {Page} from '@playwright/test';

class ToolTip{
    
    private page:Page;

    constructor(page:Page){
        this.page = page;

    }

    async verifyToolTipPage(){
        return await this.page.url();
    }

}export{ToolTip}
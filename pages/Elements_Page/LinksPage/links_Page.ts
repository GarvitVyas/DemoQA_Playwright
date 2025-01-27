import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class Links{
    private page:Page;
    private elementActions:ElementActions;
    constructor(page:Page){
        this.page = page;
        this.elementActions = new ElementActions();
    }

    async verifyLinksPage(){
        return await this.page.url();
    }
}
export{Links}
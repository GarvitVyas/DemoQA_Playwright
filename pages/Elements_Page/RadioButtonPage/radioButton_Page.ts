import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class RadioButton{
    private page:Page;
    private elementAction:ElementActions;
    private rbParent : string;
    private radioButtonAll:string;
    private yesRB:string;
    private noRB:string;
    private impressiveRB:string;
    private radioButtonsConfig:{[key:string]:string};
    constructor(page:Page){
        this.page = page;
        this.elementAction = new ElementActions();
        this.rbParent='//div[@class="mb-3"]/following-sibling::div';
        this.radioButtonAll='//div[@class="mb-3"]/following-sibling::div/input';
        this.yesRB='//input[@id="yesRadio"]'
        this.noRB='//input[@id="noRadio"]'
        this.impressiveRB='//input[@id="impressiveRadio"]'
        this.radioButtonsConfig={
            'yes':'Yes',
            'no':'No',
            'impressive':'Impressive'                     
        };
    }
    

    async verifyRadioButtonPage(){
        return await this.page.url();
    }

    async getRadioButtons(){
        const locator = await this.page.locator(this.rbParent).nth(1);
        await locator.waitFor({state:'visible'});
        return await this.elementAction.visibilityCheck(locator);
    }

    async countRadioButtons(){
        const countRB = await this.page.locator(this.radioButtonAll);
        return countRB.count();
    }
    
    async actionRB(value:'yes'|'no'|'impressive'){
       const val = this.radioButtonsConfig[value];
       await this.page.getByText(val).click();
    }
}

export{RadioButton};
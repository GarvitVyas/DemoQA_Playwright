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
    private flag:boolean;
    
    private resultBox:string;
    constructor(page:Page){
        this.page = page;
        this.elementAction = new ElementActions();
        this.rbParent='//div[@class="mb-3"]/following-sibling::div';
        this.radioButtonAll='//div[@class="mb-3"]/following-sibling::div/input';
        this.yesRB='//input/following-sibling::label[text()="Yes"]';
        this.noRB='//input/following-sibling::label[text()="No"]';
        this.impressiveRB='//input/following-sibling::label[text()="Impressive"]';
        this.flag = false;
        
        this.resultBox='.mt-3'
        this.radioButtonsConfig={
            'yes':this.yesRB,
            'no':this.noRB,
            'impressive':this.impressiveRB,                     
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
    
    async editableRB(value:'yes'|'no'|'impressive'){
       const val = this.radioButtonsConfig[value];
       return await this.page.locator(val);
    }

    async actionRB(value:'yes'|'no'|'impressive'){
       
        const val = this.radioButtonsConfig[value];
        const rb = await this.page.locator(val);
        await this.elementAction.clickElement(rb);   
        if(await rb.first().isChecked()){
            this.flag = true;
            
            return true;
        }else{return false;}
    }

    async verifyInResult(){
        const yes = await this.page.getByText('Yes').count();
        const impressive = await this.page.getByText('Impressive').count();
        if(yes == 2){
            return 'Yes';
        }else if(impressive == 2){
            return 'Impressive';
        }

    }
}

export{RadioButton};
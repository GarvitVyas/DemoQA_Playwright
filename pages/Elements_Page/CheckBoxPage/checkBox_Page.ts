import { Page,Locator } from "playwright/test";
import { data } from "../../data/data";
import { ElementActions } from "../../data/utils/action_utils"; 

class CheckBox{
    private page:Page;
    private elementActions:ElementActions;
    private homeExpandBtn:string;
    private homeCheckBox:string;
    private homeParent:string;
    private fileDoc:string;
    private expandAll:string;
    private collapseAll:string;
    constructor(page:Page){
        this.page = page;
        this.elementActions = new ElementActions();
        this.expandAll='Expand all';
        this.fileDoc='//label[@for="tree-node-excelFile"]'
        this.homeParent='//label[@for="tree-node-home"]';
        this.homeCheckBox='//input[@id="tree-node-home"]';
        this.homeExpandBtn='#tree-node>ol>li>span>button';
        this.collapseAll='Collapse all';
    }

    async verifyCheckBoxPage(){
        return await this.page.url();
    }

    async actionHomeExpand(){
        await this.elementActions.clickElement(await this.page.locator(this.homeExpandBtn));
    }
    async verifyHomeCheckBox(){
        const homeCB = await this.page.locator(this.homeCheckBox);
        if(!homeCB.isVisible()){
            throw new Error('Home check box not visible!');
        }else{
            return await this.page.locator(this.homeParent);
        }
    }
    async actionHomeCB(){
        await this.elementActions.clickCheckBox(await this.page.locator(this.homeParent));
    }
    async verifyChecked(){
        const parent = await this.page.locator('label[for="tree-node-home"] .rct-checkbox svg');
        const classP = await parent.getAttribute('class');
        return classP;
    }
    
    async verifyExpand(){
       return await this.elementActions.visibilityCheck(await this.page.locator(this.fileDoc));
    }
    
    async expandList(){
        await this.elementActions.clickElement(await this.page.getByTitle(this.expandAll));
    }

    async collapseList(){
        await this.elementActions.clickElement(await this.page.getByTitle(this.collapseAll));
    }
}

export{CheckBox};
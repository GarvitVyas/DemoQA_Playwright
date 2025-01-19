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
    private cbNames:string;
    private cbCheckBoxes:string;
    private cbParentAll:string;
    private resultBox:string;
    
    constructor(page:Page){
        this.page = page;
        this.elementActions = new ElementActions();
        this.resultBox='div#result>span';
        this.cbCheckBoxes='[for*="tree-node"] .rct-checkbox svg';
        this.cbNames='//label[contains(@for,"tree-node")]/span[3]';
        this.expandAll='Expand all';
        this.fileDoc='//label[@for="tree-node-excelFile"]'
        this.homeParent='//label[@for="tree-node-home"]';
        this.homeCheckBox='//input[@id="tree-node-home"]';
        this.homeExpandBtn='#tree-node>ol>li>span>button';
        this.collapseAll='Collapse all';
        this.cbParentAll='[for*="tree-node"]'
        
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
    
    async verifyCheckBoxChecked(ele:number){
       return await this.elementActions.verifyChecked(await this.page.locator(this.cbCheckBoxes).nth(ele))
    }

    async checkCheckBox(ele:number){
        await this.elementActions.clickCheckBox(await this.page.locator(this.cbParentAll).nth(ele))
    }

    async uncheckCheckBox(ele:number){
        await this.elementActions.uncheckCheckBox(await this.page.locator(this.cbParentAll).nth(ele));
    }
    async verifyResultBoxVisible(){
        return await this.elementActions.visibilityCheck(await this.page.locator(this.resultBox).nth(1));
    }
    async verifyResultContent(){
        const results = await this.page.locator(this.resultBox);
        const count = await results.count()
        let arrayResult:string[]=[];
        for(let i=1; i<count ; i++){
            let temp = await results.nth(i).innerText();
            arrayResult.push(temp)
        }
        return arrayResult
    }
}

export{CheckBox};
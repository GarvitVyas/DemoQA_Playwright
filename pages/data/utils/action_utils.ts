import { Locator,Page } from "playwright/test";

class ElementActions{

    async clickElement(locator:Locator):Promise<void>{
        await locator.waitFor({state:'visible'});
        await locator.click();
    }

    async clickCheckBox(locator:Locator){
        await locator.check();
    }

    async uncheckCheckBox(locator:Locator){
        await locator.uncheck();
    }

    async visibilityCheck(locator:Locator):Promise<boolean>{
        
         const ele = await locator.isVisible();
         if(ele){return true}else{return false;}
    }

    async verifyChecked(locator:Locator){
        return await locator.getAttribute('class');
    }

    async CSSproperty(locator:Locator){
        return await locator.evaluate((i)=>{
            return window.getComputedStyle(i);
        })
    }

    async getCount(locator:Locator){
        await locator.waitFor({state:'visible'});
        return await locator.count();
    }

    async selectFromDropDown(locator:Locator,option:string){
        await locator.waitFor({state:'visible'});
        return await locator.selectOption({value:option});
    }

    async fillInData(locator:Locator,value:string){
        await locator.waitFor({state:'visible'});
        await locator.clear();
        await locator.fill(value);
    }

}

export{ElementActions};
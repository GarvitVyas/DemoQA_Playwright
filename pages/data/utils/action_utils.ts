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

    async clickWithAction(locator:Locator,action:'left'|'right'){
       
        await locator.waitFor({state:'visible'});
        await locator.click({button:action})
    }

    async doubleClick(locator:Locator){
        await locator.waitFor({state:'visible'});
        await locator.dblclick();
    }

    async dateFormat(){
        const cdate = new Date();
        const day = cdate.getDate();
        const month = cdate.toLocaleString('default',{month:'short'});
        const year = cdate.getFullYear();
        return `${day} ${month} ${year}`;
    }

    async returnText(locator:Locator):Promise<string>{
        await locator.waitFor({state:'visible'});
        const text = await locator.innerText();
        return text;
    }

}

export{ElementActions};

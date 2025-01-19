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

}

export{ElementActions};
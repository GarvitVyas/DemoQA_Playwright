import {Page} from '@playwright/test';

class Alerts{
    private page:Page;
    private falert:string;
    private salert:string;

    constructor(page:Page){
        this.page = page;
        this.falert='//*[@id="alertButton"]';
        this.salert='//*[@id="timerAlertButton"]';
    }

    async verifyAlertsPage(){
        return await this.page.url();
    }

    async verifyFirstAlert(){
        await this.page.on('dialog',async(res)=>{
            if(await res.message().includes('clicked a button')){
                await res.accept()
            }else{
                await res.dismiss();
            }
        })
        await this.page.locator(this.falert).click();
    }

    async verifySecondAlert(){
        const dia =  this.page.waitForEvent('dialog');
        await this.page.locator(this.salert).click();
        const dialog = await dia;
        await dialog.accept();

        return [await dialog.message(), await dialog.type()];
    }
     
    
}export {Alerts};
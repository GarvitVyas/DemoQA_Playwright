import {Dialog, Page} from '@playwright/test';

class Alerts{
    private page:Page;
    private falert:string;
    private salert:string;
    private talert:string;
    private tresult :string;
    constructor(page:Page){
        this.page = page;
        this.tresult='//*[@id="confirmResult"]';
        this.talert='//*[@id="confirmButton"]';
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


    async confirmThirdAlert(){
       return new Promise<{msg:string,type:string,result:string}>((resolve,reject)=>{
         this.page.once('dialog',async(res)=>{
          try{
            const dialog = res; 
            dialog.accept();
            let msg = await dialog.message();
            let type = await dialog.type();
            let result = await this.page.locator(this.tresult).innerText();
            resolve({msg,type,result});
          }catch(err){
            reject(err);
          }
         })
          this.page.locator(this.talert).click();
       })
   
    }

    async dismisThirdAlert(){
        return new Promise<{msg:string,type:string,result:string}>((resolve,reject)=>{
            this.page.on('dialog',async(res)=>{
                try{
                    res.dismiss();
                    const msg = await res.message();
                    const type = await res.type();
                    const result = await this.page.locator(this.tresult).innerText();
                    resolve({msg,type,result});
                }catch(err){
                    reject(err);
                }
            })
            
            this.page.locator(this.talert).click();
        })
    }
     
    
}export {Alerts};
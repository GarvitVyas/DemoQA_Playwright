import {Page} from '@playwright/test';

class Forms{
    private page:Page;
    private forms:string;
    private practiceForm:string;
    constructor(page:Page){
        this.page = page;
        this.forms = '.category-cards>div:nth-child(2)';
        this.practiceForm='.menu-list>#item-0'
    }

    async navigateToForms(){
            await this.page.locator(this.forms,{hasText:'Forms'}).click();
            const url = await this.page.url();
            if(url.includes('forms')){
                console.log('Navigation to forms page, successfull!');
            }else{
                throw new Error('Navigation to forms page, unsuccessfull!');
            }
    }

    async navigateToFormsPage(){
         try{
            const flag = await this.page.waitForSelector(this.practiceForm);
            if(flag){
                await this.page.locator(this.practiceForm,{hasText:'Practice Form'}).click();
                console.log('Navigation to practice form page, successfull!');
            }else{
                console.log('Navigation to practice form pagem=, unsuccessfull!');
            }
         }catch(err){
            throw err;
         }
    }
}
export {Forms};
import { Page } from "playwright/test";

class Element{
    private elementPage : string;
    private textboxpage:string;
    private checkboxPage:string;
    private radiobuttonPage:string;
    private page:Page;
    constructor(page:Page){
        this.page = page;
        this.textboxpage='.menu-list>#item-0';
        this.checkboxPage='.menu-list>#item-1'
        this.elementPage = '.category-cards>div:nth-child(1)';
        this.radiobuttonPage='.menu-list>#item-2'
    }

    async navigateToElementPage(){
        await this.page.locator(this.elementPage,{hasText:'Elements'}).click();
        const url = await this.page.url();
        if(url?.includes('elements')!=true){
            throw new Error('Not navigated to elements page');
        }else{
            console.log('Navigation to Elements home page, successfull!')
        }
    }

    async navigateToTextBox(){
        const textpage = await this.page.waitForSelector(this.textboxpage);
        if(textpage){
            await this.page.locator(this.textboxpage,{hasText:'Text Box'}).click();
        }else{
            throw new Error('Navigation to text box page, unsuccessfull!');
        }

        const pageurl = await this.page.url();
       pageurl.includes('text-box')!=true?console.log('Navigation to text box page unsuccessfull'):console.log('Navigation to text box page, successfull'); 
    }
    
    async navigateToCheckBox(){
        const checkboxPage = await this.page.waitForSelector(this.checkboxPage);
        if(checkboxPage){
            await this.page.locator(this.checkboxPage,{hasText:'Check Box'}).click();
            console.log('Navigation to check Box page,successfull');
        }else{
            throw new Error('Navigation to check box page, unsuccessfull!');
        }
    }

    async navigateToRadioButton(){
        const radiobuttonPage = await this.page.waitForSelector(this.radiobuttonPage);
        if(radiobuttonPage){
            await this.page.locator(this.radiobuttonPage,{hasText:'Radio Button'}).click();
            console.log('Navigation to Radio button page, successfull');
        }else{
            console.log('Navigation to Radio button page, unsuccessfull!');
        }
    }

}

export {Element};
import {Page} from '@playwright/test';

class ModalDialogs{

    private page:Page;
    private smallModalCTA:string;
    private largeModalCTA:string;
    private smallModalBox:string;
    private smallModalHeading:string;
    private smallModalMessage:string;
    private modalCloseCTA:string;
    private largeModalBox:string;
    private largeModalHeading:string;
    private largeModalMessage:string;
    constructor(page:Page){
        this.page = page;
        this.modalCloseCTA='//button[contains(@id,"close")]';
        this.smallModalMessage='//*[contains(@class,"modal-sm")]/div/div[2]';
        this.smallModalHeading='//*[contains(@id,"title-sm")]';
        this.smallModalBox='//*[contains(@class,"modal-sm")]';
        this.largeModalCTA='//*[@id="showLargeModal"]';
        this.smallModalCTA='//*[@id="showSmallModal"]';
        this.largeModalBox='//*[contains(@class,"modal-lg")]/div';
        this.largeModalHeading='//*[contains(@id,"title-lg")]';
        this.largeModalMessage='//*[contains(@class,"modal-lg")]/div/div[2]/p';

    }

    async verifyModalDialogPage(){
        return await this.page.url();
    }

    async modalCTAtext(value:'small'|'Small'|'large'|'Large'){
        if(value.toLowerCase()=='small'){
            return await this.page.locator(this.smallModalCTA).innerText();
        }else if(value.toLowerCase()=='large'){
            return await this.page.locator(this.largeModalCTA).innerText();
        }
    }

    async closeModal(){
        const flag = await this.page.locator(this.modalCloseCTA).isVisible();
        if(flag){
            await this.page.locator(this.modalCloseCTA).click();
        }else{
            throw new Error('Close cta not visible');
        }
    }

    async returnsMessage(value:'small'|'Small'|'large'|'Large'){
        if(value.toLowerCase()=='small'){
            return await this.page.locator(this.smallModalMessage).innerText();
        }else if(value.toLowerCase()=='large'){
            return await this.page.locator(this.largeModalMessage).innerText();
        }else{
            throw new Error('Issue with modal message retrievel');
        }
    }

    async returnsHeading(value:'small'|'Small'|'large'|'Large'){
        if(value.toLowerCase()=='small'){
            return await this.page.locator(this.smallModalHeading).innerText();
        }else if(value.toLowerCase()=='large'){
            return await this.page.locator(this.largeModalHeading).innerText();
        }else{
            throw new Error('Issue with modal heading retrievel');
        }
    }

    async actionModalCTA(value:'small'|'Small'|'large'|'Large'){
        if(value.toLowerCase()=='small'){
            await this.page.locator(this.smallModalCTA).click();
        }else if(value.toLowerCase()=='large'){
            await this.page.locator(this.largeModalCTA).click();
        }else{
            throw new Error('Issue with modal cta');
        }
    }

    async modalVisibility(value:'small'|'Small'|'large'|'Large'){
        if(value.toLowerCase()=='small'){
            return await this.page.locator(this.smallModalBox).isVisible();
        }else if(value.toLowerCase()=='large'){
            return await this.page.locator(this.largeModalBox).isVisible();
        }else{
            throw new Error('Modal not visible');
        }
    }

}
export{ModalDialogs};
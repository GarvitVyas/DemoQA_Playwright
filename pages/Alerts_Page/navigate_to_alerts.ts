import {Page} from '@playwright/test';

class AlertsPage{
    private page:Page;
    private alertPage:string;
    private browserWindows:string;
    private alerts:string;
    private frames:string;
    private nestedFrames:string;
    private modalDialogs:string;
    constructor(page:Page){
        this.page = page;
        this.alerts='//span[contains(text(),"Alerts")]';
        this.frames='//*[contains(text(),"Frames")]';
        this.nestedFrames='//*[contains(text(),"Frames")]';
        this.modalDialogs='//*[contains(text(),"Modal Dialogs")]';
        this.alertPage='.category-cards>div:nth-child(3)';
        this.browserWindows='//*[contains(text(),"Browser Windows")]';
    }

    async navigateToAlertPage(){
        await this.page.locator(this.alertPage,{hasText:'Alerts, Frame & Windows'}).click();
        const url = await this.page.url();
        if(await url.includes('alertsWindows')){
            console.log('Navigation to alerts page, successfull!');
        }else{ throw new Error('Navigation to alerts page, unsuccessfull!')};
    }

    async navigateToWindows(){
        await this.page.locator(this.browserWindows).click();
        const url = await this.page.url();
        if(await url.includes('browser-windows')){
            console.log('Navigation to browser windows page, successfull');
        }else{
            throw new Error('Navigation to browser windows page, unsuccessfull!');
        }
    }

    async navigateToAlerts(){
        await this.page.locator(this.alerts).click();
        const url = await this.page.url();
        if(await url.includes('alerts')){
            console.log('Navigation to alerts page, successfull');
        }else{
            throw new Error('Navigation to alerts page, unsuccessfull!');
        }
    }

    async navigateToFrames(){
        await this.page.locator(this.frames).first().click();
        const url = await this.page.url();
        if(await url.includes('frames')){
            console.log('Navigation to frames page, successfull');
        }else{
            throw new Error('Navigation to frames page, unsuccessfull!');
        }
    }

    async navigateToNestedFrames(){
        await this.page.locator(this.nestedFrames).nth(1).click();
        const url = await this.page.url();
        if(await url.includes('nestedframes')){
            console.log('Navigation to nested frames page, successfull');
        }else{
            throw new Error('Navigation to nested frames page, unsuccessfull!');
        }
    }

    async navigateToModalDialogs(){
        await this.page.locator(this.modalDialogs).click();
        const url = await this.page.url();
        if(await url.includes('modal-dialogs')){
            console.log('Navigation to modal dialogs page, successfull');
        }else{
            throw new Error('Navigation to modal dialogs page, unsuccessfull!');
        }
    }

}export{AlertsPage};
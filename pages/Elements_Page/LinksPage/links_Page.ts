import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class Links{
    private page:Page;
    private elementActions:ElementActions;
    private homeSimpleLink:string;
    private homeDynamicLink:string;
    private createLink:string;
    private noContent:string;
    constructor(page:Page){
        this.page = page;
        this.noContent='a#no-content';
        this.createLink='a#created';
        this.homeSimpleLink='a#simpleLink';
        this.homeDynamicLink='a#dynamicLink'
        this.elementActions = new ElementActions();
    }

    async verifyLinksPage(){
        return await this.page.url();
    }

    async verifyHomeSimpleLink(){
        const value = await this.page.locator(this.homeSimpleLink).innerText();
        return value;
    }

    async actionHomeLink(){
        const homeLink = await this.page.locator(this.homeSimpleLink);
        const [newPage] = await Promise.all([
             this.page.context().waitForEvent('page'),
              homeLink.click(),            
        ]);
        /**
         * here, if you dont use const [newPage] destructuring assignment you will get
         * a array from Promise.all([..]) and then you need to access the page object
         * return by the first statement in Promise.all([])
         * using it's index like newPage[0].
         */
        await newPage.waitForLoadState();
        const newUrl = await newPage.url();
        await newPage.close();
        return newUrl;
    }

    async verifyHomeDynamicLink(){
        const value = await this.page.locator(this.homeDynamicLink).innerText();
        return value;
    }

    async actionHomeDynamicLink(){
        const homedynamic = await this.page.locator(this.homeDynamicLink);
        const result = await Promise.all([
            this.page.context().waitForEvent('page'),
            homedynamic.click()
        ])
        const newPage = await result[0];
        return await newPage.url();
    }

    async createdLink(){
        const apiresponse = this.page.waitForResponse(response=>
            response.url().includes('/created') && response.status()===201
        );

        await this.page.locator(this.createLink).click();
        const response = await apiresponse;
        return response;
    }

    async noContentLink(){
        const apicall = this.page.waitForResponse(response=>
            response.url().includes('/no-content')
        )
        await this.page.locator(this.noContent).click();
        const response = await apicall;
        return response;
    }
}
export{Links}
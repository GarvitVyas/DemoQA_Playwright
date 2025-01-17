import { Page } from "playwright/test";
import { data } from "../../data/data";
import { callbackify } from "util";

class TextBox{
    private page:Page;
    private readonly fullName:string;
    private readonly email:string;
    private readonly currentAddress:string;
    private readonly permanentAddress:string;
    private readonly submitBTN:string;
    private readonly result:string;
    constructor(page:Page){
        this.page = page;
        this.fullName = '//input[@id="userName"]',
        this.email='//input[@id="userEmail"]';
        this.currentAddress='//textarea[@id="currentAddress"]';
        this.permanentAddress='//textarea[@id="permanentAddress"]';
        this.submitBTN='//button[@id="submit"]';
        this.result='div#output';
    }

    async verifyFullName(){
       return await this.page.locator(this.fullName);
    }

    async fillName(){
        await this.page.locator(this.fullName).fill(data['full-name']);
    }

    async verifyEmail(){
        return await this.page.locator(this.email);
    }
    async fillEmail():Promise<string>{
        await this.page.locator(this.email).fill(data['email']);
        return await this.page.locator(this.email).inputValue();
    }

    async verifyCurrentAddress(){
        return await this.page.locator(this.currentAddress);
    }
    async fillCurrentAddress(){
        await this.page.locator(this.currentAddress).fill(data['current-address']);
    }

    async verifyPermanentAddress(){
        return await this.page.locator(this.permanentAddress);
    }
    async fillPermanentAddress(){
        await this.page.locator(this.permanentAddress).fill(data['permanent-address']);
    }
    async verifySubmitBtn(){
        return await this.page.locator(this.submitBTN,{hasText:'Submit'});
    }
    async actionSubmit(){
        await this.page.locator(this.submitBTN).click();

    }
    async verifyResult(){
        return await this.page.locator(this.result);
    }

}

export{TextBox};


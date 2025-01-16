import { Page } from "playwright/test";
import { data } from "../../data/data";

class TextBox{
    private page:Page;
    private fullName:string;
    private email:string;
    private currentAddress:string;
    private permanentAddress:string;
    private submitBTN:string;
    private result:string;
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

}

export{TextBox};
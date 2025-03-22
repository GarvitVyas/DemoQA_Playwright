import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

class AutoComplete{

    private page:Page;
    private elementAction:ElementActions;
    private firstHeading:string;
    private secondHeading:string;
    private multipleinput:string;
    private multiplevalue:string;
    private clearsingle : string;
    private clearall:string;
    private singleinput:string;
    private singlevalue:string;

    constructor(page:Page){
        this.page = page;
        this.elementAction = new ElementActions;
        this.clearall='//div[contains(@class,"clear-indicator")]';
        this.multiplevalue='//div[contains(@class,"css-12jo7m5")]';
        this.firstHeading='//*[@id="autoCompleteMultiple"]/span';
        this.secondHeading='//*[@id="autoCompleteSingle"]/span';
        this.multipleinput='//*[@id="autoCompleteMultipleInput"]';
        this.clearsingle='//div[contains(@class,"multi-value__remove")]';
        this.singleinput='//*[@id="autoCompleteSingleInput"]';
        this.singlevalue='//*[contains(@class,"css-1uccc91-singleValue")]'
    }

    async verifyAutoCompletePage():Promise<string>{
        return await this.page.url();
    }

    async fieldHeadings():Promise<[heading1?:string,heading2?:string]>{
        const heading1 = await this.elementAction.returnText(await this.page.locator(this.firstHeading));
        const heading2 = await this.elementAction.returnText(await this.page.locator(this.secondHeading));
        return [heading1,heading2];
    }

    async multipleInputField(){
        await this.elementAction.fillInData(await this.page.locator(this.multipleinput),'r');
        await this.page.getByText('Green').click();
        await this.page.locator(this.multipleinput).fill('r')
        await this.page.getByText('Red').click();
    }

    async singleInputField(val:string)
    {  if(val=='r'){
            await this.page.locator(this.singleinput).fill(val);
            await this.page.getByText('Purple').click();
        }else if(val == 't'){
            await this.page.locator(this.singleinput).fill(val);
            await this.page.getByText('White').click();
        }
    }

    async verifySingleInputField()
    {
        const flag = await this.page.locator(this.singlevalue).isVisible();
        if(flag){
            return await this.page.locator(this.singlevalue).textContent();   
            }
    }

    async verifyMultipleInputField(){
        const values = await this.page.locator(this.multiplevalue).all();
        return values;
    }

    async clearSelected(){
        const flag = await this.page.getByText('Green').isVisible();
        if(flag){
            await this.page.locator(this.clearsingle).first().click();
        }
    }

    async clearAll(){
        try{
            const flag = await this.page.locator(this.clearall).isVisible();
            if(flag){
                await this.page.locator(this.clearall).click();
            }else{
                throw new Error('Clear all button is not visible');
            }
        }catch(err){
            console.log('Issue with clear all button',err)
        }
    }




}export{AutoComplete}
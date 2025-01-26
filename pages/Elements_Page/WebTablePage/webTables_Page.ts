import {Page} from '@playwright/test';
import { data,newUser } from '../../data/data';
import { ElementActions } from '../../data/utils/action_utils';

class WebTables{
    private page:Page;
    private rowsCount:string;
    private rowPerPage:string;
    private searchBox:string;
    private elementActions:ElementActions;
    private addCTA:string;
    private addFrame: string;
    private addFN:string;
    private addLN:string;
    private email:string;
    private age:string;
    private salary:string;
    private department:string;
    private submitcta:string;
    private closeCTA:string;
    private editRecordCTA:string;
    private allAddFields:string;
    private allAddLabels:string;
    private staticUserObject:{[key:string]:string};
    private newUserData:{[key:string]:string};
    constructor(page:Page){
        this.page = page;
        this.elementActions=new ElementActions;
        this.searchBox='//*[@id="searchBox"]';
        this.rowPerPage='[aria-label="rows per page"]';
        this.allAddFields='//*[@id="userForm"]/div//div[2]/input';
        this.allAddLabels='//*[@id="userForm"]/div//div[1]/label';
        this.editRecordCTA='//*[@id="edit-record-2"]';
        this.addFN='//*[@id="firstName-wrapper"]//input';
        this.addLN='//*[@id="lastName-wrapper"]//input';
        this.email='//*[@id="userEmail-wrapper"]//input';
        this.age='//*[@id="age-wrapper"]//input';
        this.salary='//*[@id="salary-wrapper"]//input';
        this.department='//*[@id="department-wrapper"]//input';
        this.addFrame='//div[@role="document"]/div';
        this.addCTA='//button[text()="Add"]';
        this.submitcta='//*[@id="submit"]';
        this.closeCTA='//button[@class="close"]';
        this.rowsCount='//div[@class="rt-table"]/div[2]/div';
        this.staticUserObject={
            'First Name':'//*[@class="rt-table"]/div[2]/div[2]/div/div[1]',
            'Last Name':'//*[@class="rt-table"]/div[2]/div[2]/div/div[2]',
            'Age':'//*[@class="rt-table"]/div[2]/div[2]/div/div[3]',
            'Email':'//*[@class="rt-table"]/div[2]/div[2]/div/div[4]',
            'Salary':'//*[@class="rt-table"]/div[2]/div[2]/div/div[5]',
            'Department':'//*[@class="rt-table"]/div[2]/div[2]/div/div[6]'
        }
        this.newUserData={
            'First Name':'//*[@class="rt-table"]/div[2]/div[4]/div/div[1]',
            'Last Name':'//*[@class="rt-table"]/div[2]/div[4]/div/div[2]',
            'Age':'//*[@class="rt-table"]/div[2]/div[4]/div/div[3]',
            'Email':'//*[@class="rt-table"]/div[2]/div[4]/div/div[4]',
            'Salary':'//*[@class="rt-table"]/div[2]/div[4]/div/div[5]',
            'Department':'//*[@class="rt-table"]/div[2]/div[4]/div/div[6]'
        }
    }

    async verifyWebTablePage(){
        return await this.page.url();
    }

    async verifyRowPerPage(){
        const rowPerPageCount=await this.page.locator(this.rowPerPage).inputValue();
        return rowPerPageCount; 
    }
    async verifyRowCount(){
        const rowsCount = await this.page.locator(this.rowsCount).count();
        return rowsCount+'';
    }

    //static user details return
    async verifyExistingUser(){
        const userData:{[key:string]:string|number}={};
        for(const key in this.staticUserObject){
            const local = this.staticUserObject[key]
            const textValue = await this.page.locator(local).textContent();
            userData[key]=textValue!;
        }
        return userData;
    }

    async verifyAddCTA(){
        return await this.elementActions.visibilityCheck(await this.page.locator(this.addCTA));
    }

    async addRecord(){
        await this.elementActions.clickElement(await this.page.locator(this.addCTA));
        await this.page.waitForSelector(this.addFrame);
        await this.page.locator(this.addFN).fill(newUser['First Name']);
        await this.page.locator(this.addLN).fill(newUser['last Name']);
        await this.page.locator(this.email).fill(newUser['Email']);
        await this.page.locator(this.age).fill(newUser['Age']);
        await this.page.locator(this.salary).fill(newUser['Salary']);
        await this.page.locator(this.department).fill(newUser['Department']);
        await this.elementActions.clickElement(await this.page.locator(this.submitcta));
    }

    async errorFields(){
        await this.elementActions.clickElement(await this.page.locator(this.addCTA));
        await  await this.page.locator(this.addFN).fill(newUser['First Name']);
        await this.page.locator(this.addLN).fill(newUser['last Name']);
        await this.elementActions.clickElement(await this.page.locator(this.submitcta));
    }

    async addedRecord(){
        const newUserData:{[key:string]:string}={};
        for(const key in this.newUserData){
            const local = this.newUserData[key]
            const textValue = await this.page.locator(local).textContent();
            newUserData[key]=textValue!;
        }
        return newUserData;
    }
    async verifyAddAcitonable(){
        return await this.page.locator(this.editRecordCTA);
    }

    async editRecord(){
        await this.page.locator(this.editRecordCTA).click();
        const frame = await this.page.locator(this.addFrame);
        const visible=await this.elementActions.visibilityCheck(frame);
        if(visible){
            await this.page.locator(this.addFN).clear();
            await this.page.locator(this.addFN).fill('Aksay');
            await this.page.locator(this.salary).clear();
            await this.page.locator(this.salary).fill('65000');
            await this.page.locator(this.submitcta).click();
        }
    }
    async verifyEdited(){
        const newName = await this.page.locator(this.staticUserObject['First Name']).textContent();
        const newSalary = await this.page.locator(this.staticUserObject['Salary']).textContent();
        return [newName,newSalary];
    }

    async verifyErrorFields(){
        const errorFields:string[]=[];
        await this.page.waitForTimeout(500);
        const ele = await this.page.locator(this.allAddFields);
        const label = await this.page.locator(this.allAddLabels);
        for(let i=0;i<await ele.count();i++){
            const style = await this.elementActions.CSSproperty(await ele.nth(i));
            if(style.borderBottomColor == 'rgb(220, 53, 69)'){
                const temp = await label.nth(i).textContent();
                errorFields.push(temp!);
            }
        } 
        return errorFields;       
      }  

      async changeRowPerPage(option:string){
        await this.elementActions.selectFromDropDown(await this.page.locator(this.rowPerPage),option);
        const newCount = await this.verifyRowPerPage();
        return newCount;
      }
      
      async verifySearchBox(){
        const searchbox = await this.page.locator(this.searchBox);
        return await this.elementActions.visibilityCheck(searchbox);
      }

      async searchBoxInput(value:string){
        const searchBox = await this.page.locator(this.searchBox);
        await this.elementActions.fillInData(searchBox,value);
        const values = await this.page.locator(this.rowsCount);
        const valcount = await values.count();
        for(let i =0; i<valcount;i++){
            const temp = await values.nth(i).innerText();
            if(temp?.includes(value)){
                return true;
            }
        }
        return false;
      }

    }



export {WebTables};
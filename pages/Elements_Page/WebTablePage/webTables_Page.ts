import {Page} from '@playwright/test';
import { data } from '../../data/data';
import { ElementActions } from '../../data/utils/action_utils';

class WebTables{
    private page:Page;
    private rowsCount:string;
    private rowPerPage:string;
    private staticUserObject:{[key:string]:string};
    constructor(page:Page){
        this.page = page;
        this.rowPerPage='.-center>span>select[aria-label="rows per page"]'
        this.rowsCount='//div[@class="rt-table"]/div[2]/div';
        this.staticUserObject={
            'First Name':'//*[@class="rt-table"]/div[2]/div[2]/div/div[1]',
            'Last Name':'//*[@class="rt-table"]/div[2]/div[2]/div/div[2]',
            'Age':'//*[@class="rt-table"]/div[2]/div[2]/div/div[3]',
            'Email':'//*[@class="rt-table"]/div[2]/div[2]/div/div[4]',
            'Salary':'//*[@class="rt-table"]/div[2]/div[2]/div/div[5]',
            'Department':'//*[@class="rt-table"]/div[2]/div[2]/div/div[6]'
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
        return rowsCount;
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
}
export {WebTables};
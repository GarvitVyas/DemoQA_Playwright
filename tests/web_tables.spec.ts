import {test,expect} from '@playwright/test';
import { data,staticUser } from '../pages/data/data';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { WebTables } from '../pages/Elements_Page/WebTablePage/webTables_Page';

test.describe('Tests for web tables',()=>{

    let elementPage:Element;
    let webtablePage:WebTables;
    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
            elementPage = new Element(page);
            webtablePage= new WebTables(page);
        }catch(err){
            console.log('Issue with before each hook'+err);
            throw err;
        }
    })

    test('Navigate to web table and verify record',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        
        const udata = await webtablePage.verifyExistingUser();
        expect(udata['First Name']).toEqual(staticUser['First Name']);
        expect(udata['Last Name']).toEqual(staticUser['last Name']);
        expect(udata['Age']).toEqual(staticUser['Age']);
        expect(udata['Email']).toEqual(staticUser['Email']);
        expect(udata['Salary']).toEqual(staticUser['Salary']);
        expect(udata['Department']).toEqual(staticUser['Department']);
    })


})


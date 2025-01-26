import {test,expect} from '@playwright/test';
import { data,staticUser,newUser } from '../pages/data/data';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { WebTables } from '../pages/Elements_Page/WebTablePage/webTables_Page';

test.describe('@webtables - Tests for web tables',()=>{

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

    test('@verifyRecord - Navigate to web table and verify record',async({})=>{
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
     
    test('@addRecord - Add a new record in the table',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        const addVisibility = await webtablePage.verifyAddCTA();
        expect(addVisibility).toBeTruthy();
        await webtablePage.addRecord();

        //VERIFY ADDED DATA
        const newData = await webtablePage.addedRecord();
        expect(newData['First Name']).toEqual(newUser['First Name']);
        expect(newData['Last Name']).toEqual(newUser['last Name']);
        expect(newData['Age']).toEqual(newUser['Age']);
        expect(newData['Email']).toEqual(newUser['Email']);
        expect(newData['Salary']).toEqual(newUser['Salary']);
        expect(newData['Department']).toEqual(newUser['Department']);
    })

    test('@actionEdit - Verify action edit second record name and salary',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        expect(await webtablePage.verifyAddAcitonable()).toBeEditable();
        await webtablePage.editRecord();
        const newdetails = await webtablePage.verifyEdited();
        expect(newdetails[0]).toBe(newUser['newName']);
        expect(newdetails[1]).toBe(newUser['newSalary']);
    })

    test('@errorOnAdd - Verify error field on add frame',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        if(await webtablePage.verifyAddCTA()){
            await webtablePage.errorFields();
           const errors = await webtablePage.verifyErrorFields();
           expect(await errors[0]).toBe('Email');
           expect(await errors[1]).toBe('Age');
           expect(await errors[2]).toBe('Salary');
           expect(await errors[3]).toBe('Department');
        }else{throw new Error('Frame not opening!')}
    })

    test('@numberOfRows - Verify changing the number of rows',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        const newCount = await webtablePage.changeRowPerPage('20');
        expect(await newCount).toEqual(await webtablePage.verifyRowCount());
    })

    test('@searchBoxValid - Search a valid record using search box',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToWebTalesPage();
        expect(await webtablePage.verifyWebTablePage()).toContain(data['webtablePage']);
        //search box visibility
        expect(await webtablePage.verifySearchBox()).toBeTruthy();
        //fill valid record in search box
        const present = await webtablePage.searchBoxInput('Alden');
        expect(present).toBeTruthy();
    })


})


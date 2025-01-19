import {test,expect} from '@playwright/test';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { CheckBox } from '../pages/Elements_Page/CheckBoxPage/checkBox_Page';
import { data } from '../pages/data/data';

test.describe('Tests for check box functionality',()=>{
    let elementPage:Element;
    let checkboxPage:CheckBox;

    test.beforeEach(async({page})=>{
        await page.goto('/');
        elementPage = new Element(page);
        checkboxPage = new CheckBox(page);
    })

    test('Verify the home checkbox',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToCheckBox();
        const url = await checkboxPage.verifyCheckBoxPage();
        expect(url).toContain('checkbox');
          
        await checkboxPage.actionHomeExpand();
        const homeCB = await checkboxPage.verifyHomeCheckBox();
        expect(homeCB).toBeVisible();
        expect(homeCB).toHaveText(data['Home-Text']);
        //verify initially unchecked
        expect(await checkboxPage.verifyChecked()).toContain('uncheck');
        await checkboxPage.actionHomeCB();
        //verify checked after performing check
        const check = await checkboxPage.verifyChecked();
        expect(check?.includes('check')).toBeTruthy();
       })

       test('verify the expand and collapse CTA',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToCheckBox();
        expect(await checkboxPage.verifyCheckBoxPage()).toContain('checkbox');
        
        //verify file excel not visible
        const fileCheck = await checkboxPage.verifyExpand();
        expect(fileCheck).toBeFalsy();
        await checkboxPage.expandList();
        expect(await checkboxPage.verifyExpand()).toBeTruthy();
        
        await checkboxPage.collapseList();
        expect(await checkboxPage.verifyExpand()).toBeFalsy();
        
        })
})

/**
 * 1. 
 */
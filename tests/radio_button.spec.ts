import {test,expect} from '@playwright/test';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { RadioButton } from '../pages/Elements_Page/RadioButtonPage/radioButton_Page';

test.describe('Tests for Radio Buttons',()=>{
    let elementPage:Element;
    let radiobuttonPage:RadioButton;

    test.beforeEach(async({page})=>{
       try{ await page.goto('/');
        elementPage = new Element(page);
        radiobuttonPage = new RadioButton(page);
       }catch(e){
        console.log('Issue with before each hook!',e);
        throw e;
       }
    })
  
    test('verify radio button actionable',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToRadioButton();

        //verify if radio buttons are visible
        expect(await radiobuttonPage.getRadioButtons()).toBeTruthy();
        //verify number of radio buttons
        expect(await radiobuttonPage.countRadioButtons()).toBe(3);
        //verify yes radio button actionable
        const radioYes = await radiobuttonPage.editableRB('yes');
        expect(await radioYes).toBeEditable();
        //verify impressive option radio button to be actionable
        const radioImpressive = await radiobuttonPage.editableRB('impressive');
        expect(await radioImpressive).toBeEditable();
        //verify no option radiobutton is not actionable
        const radioNo = await radiobuttonPage.editableRB('no');
        expect(await radioNo).not.toBeEditable();

        //verify actionale via clicking the radio button
        expect(await radiobuttonPage.actionRB('yes')).toBeTruthy();
        expect(await radiobuttonPage.actionRB('impressive')).toBeTruthy();
    })


})
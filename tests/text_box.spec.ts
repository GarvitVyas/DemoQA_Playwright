import {test,expect} from '@playwright/test';
import {Element} from '../pages/Elements_Page/navigate_to_element';
import { TextBox } from '../pages/Elements_Page/TextBoxPage/textBox_Page';
test.describe('Text Box tests',()=>{
    let elementPage:Element;
    let textboxPage:TextBox;
    
    test.beforeEach(async({page})=>{
      try{
        await page.goto('/');
        elementPage = new Element(page);
        textboxPage = new TextBox(page);
      }catch(error){
        console.log('Error in before each hook',error);
        throw error;
      }
    })

    test('Navigate to text box page',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToTextBox();
        const fullname = await textboxPage.verifyFullName();
        expect(await fullname).toHaveAttribute('placeholder','Full Name');

        await textboxPage.fillName();
        expect(await fullname).not.toBeEmpty();

        const email = await textboxPage.verifyEmail();
        expect(email).toHaveAttribute('placeholder','name@example.com');

        const filledEmail = await textboxPage.fillEmail();
        expect(email).not.toBeEmpty();
        const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        expect(filledEmail).toMatch(emailregex);


        


    })


})

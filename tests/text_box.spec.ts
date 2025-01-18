import {test,expect} from '@playwright/test';
import {Element} from '../pages/Elements_Page/navigate_to_element';
import { TextBox } from '../pages/Elements_Page/TextBoxPage/textBox_Page';
import {data} from '../pages/data/data';



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
    
    test('Navigate to text box page and fill in details',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToTextBox();
        //full name
        const fullname = await textboxPage.verifyFullName();
        expect(await fullname).toHaveAttribute('placeholder','Full Name');

        await textboxPage.fillName();
        expect(await fullname).not.toBeEmpty();
        //email
        const email = await textboxPage.verifyEmail();
        expect(email).toHaveAttribute('placeholder','name@example.com');

        const filledEmail = await textboxPage.fillEmail();
        expect(email).not.toBeEmpty();
        const emailregex=data['email-valid'];
        expect(filledEmail).toMatch(emailregex);

        //current address
        const currentAddress = await textboxPage.verifyCurrentAddress();
        expect(currentAddress).toHaveAttribute('placeholder','Current Address');
        await textboxPage.fillCurrentAddress();
   
        //permanent address
        const permanentAddress = await textboxPage.verifyPermanentAddress();
        expect(permanentAddress).not.toHaveAttribute('placeholder');
        await textboxPage.fillPermanentAddress();

        //submit
        const submitBTN = await textboxPage.verifySubmitBtn();
        expect(submitBTN).toBeVisible();
        expect(submitBTN).toHaveCSS('background-color','rgb(0, 123, 255)');

        //verify the result not visible before actioning submit cta
        const resultWindow = await textboxPage.verifyResult();
        expect(resultWindow).toBeHidden();

        await textboxPage.actionSubmit();
        if(!resultWindow.isVisible()){
          throw new Error('Result window not visible yet!')
        }
        else{
          expect(resultWindow).toBeVisible();
        }

        expect(resultWindow).toContainText(data['full-name']);
        expect(resultWindow).toContainText(data['email']);
        expect(resultWindow).toContainText(data['current-address']);
        expect(resultWindow).toContainText(data['permanent-address']);
      })

      test('Navigate to test box page and verify result on empty fields',async({})=>{

        await elementPage.navigateToElementPage();
        await elementPage.navigateToTextBox();

        await textboxPage.actionSubmit();
        const result = await textboxPage.verifyResult();
        expect(result).not.toBeVisible();

      })

      test.only('verify email field when user enter email invalid format',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToTextBox();

        await textboxPage.fillWrongEmail();
        await textboxPage.actionSubmit();
        const email = await textboxPage.verifyWrongEmailField();
        expect(email).toBe('rgb(255, 0, 0)')

      })
})

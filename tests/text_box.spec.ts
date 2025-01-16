import {test,expect} from '@playwright/test';
import {Element} from '../pages/Elements_Page/navigate_to_element';

test.describe('Text Box tests',()=>{
    let elementPage:Element;

    test.beforeEach(async({page})=>{
        await page.goto('/');
        elementPage = new Element(page);
    })

    test('Navigate to text box page',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToTextBox();
    })
})

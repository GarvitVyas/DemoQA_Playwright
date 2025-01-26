import {test,expect} from '@playwright/test';
import { Buttons } from '../pages/Elements_Page/ButtonsPage/buttons_Page';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { data } from '../pages/data/data';

test.describe('@buttons - verify the different buttons',()=>{
    let elementPage:Element;
    let buttonsPage:Buttons;

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
            elementPage = new Element(page);
            buttonsPage = new Buttons(page);
        }catch(err){
            console.info('Issue with before each hook'+err);
            throw err;
        }
    })

    test('@actionDoubleBTN - verify the double click button',async()=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToButtonsPage();
        expect(await buttonsPage.verifyButtonPage()).toContain(data['buttonsPage']);

        expect(await buttonsPage.verifyResult()).toBeFalsy();
        await buttonsPage.clickDoubleBTN();
        expect(await buttonsPage.verifyResult()).toBeTruthy();
        expect(await buttonsPage.verifyDoubleClick()).toContain('double click');
    })

    test('@actionRightBTN - verify the right click button',async()=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToButtonsPage();
        expect(await buttonsPage.verifyButtonPage()).toContain(data['buttonsPage']);

        expect(await buttonsPage.verifyResult()).toBeFalsy();
        await buttonsPage.clickRightBTN();
        expect(await buttonsPage.verifyResult()).toBeTruthy();
        expect(await buttonsPage.verifyRightClick()).toContain('right click');
    })

    test('@actionDynamicBTN - verify the dynamic click button',async()=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToButtonsPage();
        expect(await buttonsPage.verifyButtonPage()).toContain(data['buttonsPage']);

        expect(await buttonsPage.verifyResult()).toBeFalsy();
        await buttonsPage.clickDynamicBTN();
        expect(await buttonsPage.verifyResult()).toBeTruthy();
        expect(await buttonsPage.verifyDynamicClick()).toContain('dynamic click');
    })

    test('@actionAll - verify on actioning all the buttons',async()=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToButtonsPage();
        expect(await buttonsPage.verifyButtonPage()).toContain(data['buttonsPage']);

        expect(await buttonsPage.verifyResult()).toBeFalsy();
        await buttonsPage.clickDoubleBTN();
        await buttonsPage.clickDynamicBTN();
        await buttonsPage.clickRightBTN();
        const result = await buttonsPage.verifyAllClick();
        expect(result[0]).toBe(data['double click text']);
        expect(result[1]).toBe(data['right click text']);
        expect(result[2]).toBe(data['dynamic click test']);
        
    })

})
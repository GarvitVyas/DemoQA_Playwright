import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@dynamicPropeties - test spec for dynamic properties page',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of dynamic properties page');
            throw err;
        }
    })

    test('@dynamicButtons - veirfy the dynamic buttons',async({elementPage,dynamicPropertiesPage})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToDynamicProperties();
        expect(await dynamicPropertiesPage.verifyDynamicPropertiesPage()).toContain(data['dynamic properties']);
        //verify the random id text is visible
        expect(await dynamicPropertiesPage.verifyRandomTextVisible()).toBeTruthy();

        //verify 'visible after 5 sec' cta not visible
        expect(await dynamicPropertiesPage.before5SecVisibleCTA()).not.toBeVisible();
        //verify 'enable after 5 second' cta not enabled
        expect(await dynamicPropertiesPage.enableAfter5SecCTA()).not.toBeEnabled();
        //verify color change cta before color is changed
        const color = await dynamicPropertiesPage.beforeColorChangeCTA();
        expect(await color).toBe(data['white text']);
    })

    test('@afterWaitButtons - verify the dynamic buttons after waiting',async({elementPage,dynamicPropertiesPage})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToDynamicProperties();
        expect(await dynamicPropertiesPage.verifyDynamicPropertiesPage()).toContain(data['dynamic properties']);
        //verify the random id text is visible
        expect(await dynamicPropertiesPage.verifyRandomTextVisible()).toBeTruthy();

        const result = await dynamicPropertiesPage.afterWait();
        expect(await result[0]).toBeTruthy();
        expect(await result[1]).toBeTruthy();
        expect(await result[2]).toBe(data['red text']);
    })

})
import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@browserWindows- tests for browser windows elements',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of browser windows test'+err);
            throw err;
        }
    })

    test('@newTab-verify the new tab functionality',async({alertsPage,browserWindows})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToWindows();
        expect(await browserWindows.verifyBrowserWindowsPage()).toContain(data['browser windows']);

        const newtab = await browserWindows.newTab();
        expect(await newtab[0]).toContain('sample');
        expect(await newtab[1]).toBe('This is a sample page');
    })

})

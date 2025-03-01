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
        expect(await newtab[1]).toBe(data['sample-page']);
    })

    test('@newWindow - verify the new window functionality',async({alertsPage,browserWindows})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToWindows();
        expect(await browserWindows.verifyBrowserWindowsPage()).toContain(data['browser windows']);

        const newwindow = await browserWindows.newWindow();
        expect(await newwindow[0]).toContain('sample');
        expect(await newwindow[1]).toBe(data['sample-page']);
    })

    test('@newWindowMessage - verify the new window message functionality',async({alertsPage,browserWindows})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToWindows();
        expect(await browserWindows.verifyBrowserWindowsPage()).toContain(data['browser windows']);

        const newWindowMessage = await browserWindows.newWindowMessage();
        expect(await newWindowMessage).toBe(data['new window message']);
    })

})

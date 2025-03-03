import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@alerts - verify all alerts',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of alerts!');
            throw err;
        }
    })

    test('@seeAlert - verify the alert after actioning click me cta',async({alertsPage,alert})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);

        await alert.verifyFirstAlert();
        
        
    })

    test('@5secondAlert - verify the alert after actioning 5 seconds cta',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);
        const alertDetails = await alert.verifySecondAlert();
        expect(alertDetails[0]).toBe('This alert appeared after 5 seconds');
        expect(alertDetails[1]).toBe('alert');
    })

})
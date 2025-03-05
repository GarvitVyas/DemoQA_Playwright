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

    test('@confirmationAlert - verify the alert after confirmation',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);
        
        let {msg,type,result}  = await alert.confirmThirdAlert();
         expect(msg).toBe('Do you confirm action?');
         expect(type).toBe('confirm');
         expect(result).toContain('Ok');
    })

    test('@dismissAlert - verify the alert after dismissing',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);
        
        let {msg,type,result}  = await alert.dismisThirdAlert();
         expect(msg).toBe('Do you confirm action?');
         expect(type).toBe('confirm');
         expect(result).toContain('Cancel');
    })

    test('@fourthAlertNoInput - verify the fourth alert, accept the alert without entering value',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);

        let {msg,type,result} = await alert.emptyFourthAlert();
        expect(msg).toBe('Please enter your name');
        expect(type).toBe('prompt');
        expect(result).toBeFalsy();
    })

    test('@fourthAlertDismiss - verify the fourth alert, dismiss the alert without entering value',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);

        let {msg,type,result} = await alert.dismissFourthAlert();
        expect(msg).toBe('Please enter your name');
        expect(type).toBe('prompt');
        expect(result).toBeFalsy();
    })

    test('@fourthAlertInput - verify the fourth alert, accept the alert with entering value',async({alert,alertsPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToAlerts();
        expect(await alert.verifyAlertsPage()).toContain(data['alert page']);

        let {msg,type,result} = await alert.valueFourthAlert('Joe');
        expect(msg).toBe('Please enter your name');
        expect(type).toBe('prompt');
        expect(result).toContain('Joe');
    })

})
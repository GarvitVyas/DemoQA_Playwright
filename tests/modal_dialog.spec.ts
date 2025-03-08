import {test,expect} from '../base';
import {data} from '../pages/data/data';

test.describe('@modalDialogs - verify the modal dialogs functionalities',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of modal dialogs test',err);
        }
    })

    test('@smallModal - verify the small modal',async({alertsPage,modalDialog})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToModalDialogs();
        expect(await modalDialog.verifyModalDialogPage()).toContain(data['modal dialogs']);

        expect(await modalDialog.modalCTAtext('small')).toBe('Small modal');
        await modalDialog.actionModalCTA('small');
        expect(await modalDialog.modalVisibility('small')).toBeTruthy();
        const modalHeading = await modalDialog.returnsHeading('small');
        expect(modalHeading).toBe('Small Modal');
        const message = await modalDialog.returnsMessage('small');
        expect(message).toBe(data['small modal message']);
        await modalDialog.closeModal();
    })

    test('@largeModal - verify the large modal',async({alertsPage,modalDialog})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToModalDialogs();
        expect(await modalDialog.verifyModalDialogPage()).toContain(data['modal dialogs']);

        expect(await modalDialog.modalCTAtext('large')).toBe('Large modal');
        await modalDialog.actionModalCTA('large');
        expect(await modalDialog.modalVisibility('large')).toBeTruthy();
        const modalHeading = await modalDialog.returnsHeading('large');
        expect(modalHeading).toBe('Large Modal');
        const message = await modalDialog.returnsMessage('large');
        expect(message).toBe(data['large modal message']);
        await modalDialog.closeModal();
    })


})
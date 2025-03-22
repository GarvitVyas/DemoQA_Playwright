import {test,expect} from '../base';
import { data } from '../pages/data/data';
test.describe('@autoComplete - verify the auto complete page functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of auto complete page',err);
        }
    })

    test('@firstAutoComplete - verify the first auto complete field',async({widgetsPage,autocompletePage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAutoComplete();
        expect(await autocompletePage.verifyAutoCompletePage()).toContain(data['auto compete']);

        const heading = await autocompletePage.fieldHeadings();
        expect(heading[0]).toBe(data['heading one']);

        await autocompletePage.multipleInputField();
        const values = await autocompletePage.verifyMultipleInputField();
        expect(await values[0].textContent()).toBe('Green');
        expect(await values[1].textContent()).toBe('Red');

        await autocompletePage.clearSelected();
        const new_values = await autocompletePage.verifyMultipleInputField();
        expect(new_values.length).toBe(1);
        expect(await new_values[0].textContent()).toBe('Red');

        await autocompletePage.clearAll();
    })


})
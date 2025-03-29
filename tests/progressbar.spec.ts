import {test,expect} from '../base';
import { data } from '../pages/data/data';
test.describe('@progressBar - verify the progress bar functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('');
        }catch(err){
            console.log('Issue with before each hook of progress bar page',err);
        }
    })

    test('@',async({widgetsPage,progressbarPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToPorgressBar();
        expect(await progressbarPage.verifyProgressBarPage()).toContain(data['progress bar']);
    })

})
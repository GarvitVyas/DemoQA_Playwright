import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@frames - tests for frames',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of frames page',err);
        }
    })

    test('@firstFrame - verify the test mentioned in the frame',async({alertsPage,framesPage})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToFrames();
        expect(await framesPage.verifyFramesPage()).toContain(data['frames page']);

        const frame1Text = await framesPage.switchToFrame1();
        expect(await frame1Text).toBe('This is a sample page');
    })

})
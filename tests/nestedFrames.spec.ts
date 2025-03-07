import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@nestedFrames - verify the nested frames functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with beforeEach hook of nested frames',err);
        }
    })

    test('@parentFrame - verify the parent frame',async({alertsPage,nestedFrames})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToNestedFrames();
        expect(await nestedFrames.verifyNestedFramesPage()).toContain(data['nested frames']);

        const {text,childFrame} = await nestedFrames.parentFrame();
        expect(text).toBe('Parent frame');
        expect(childFrame).toBeTruthy();
    })

    test('@childFrame - verify the child frame',async({alertsPage,nestedFrames})=>{
        await alertsPage.navigateToAlertPage();
        await alertsPage.navigateToNestedFrames();
        expect(await nestedFrames.verifyNestedFramesPage()).toContain(data['nested frames']);

        const childFrame = await nestedFrames.childFrame();
        expect(childFrame).toBe('Child Iframe');
    })



})
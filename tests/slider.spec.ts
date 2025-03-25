import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@slider - verify the slider functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of slider page',err);
        }
    })

    test('@firstSliderTest - verify the slider initial values',async({widgetsPage,sliderPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToSlider();
        expect(await sliderPage.verifySliderPage()).toContain(data['slider page']);
        expect(await sliderPage.sliderValue()).toBe('25');
        expect(await sliderPage.hoverOverSlider()).toBeTruthy();
    })


})
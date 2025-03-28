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

        await sliderPage.moveSlider();
        expect(await sliderPage.sliderValue()).toBe('50');
    })

    test('@firstSliderMoveTo100 - move the slider to 100 and move back to 0',async({widgetsPage,sliderPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToSlider();
        expect(await sliderPage.verifySliderPage()).toContain(data['slider page']);

        await sliderPage.moveSliderFull();
        expect(await sliderPage.sliderValue()).toBe('0');
    })


})
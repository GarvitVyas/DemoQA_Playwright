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

    test('@moveBar - move the bar to specific value 85%',async({widgetsPage,progressbarPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToPorgressBar();
        expect(await progressbarPage.verifyProgressBarPage()).toContain(data['progress bar']);

        await progressbarPage.moveProgress();
        expect(await progressbarPage.barValue()).toBe('85%');
    })

    test('@startStopText - verify the text on button when start and stop',async({widgetsPage,progressbarPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToPorgressBar();
        expect(await progressbarPage.verifyProgressBarPage()).toContain(data['progress bar']);

        const [initial,middle] = await progressbarPage.startStopButtonValidation();
        expect(initial).toBe('Start');
        expect(middle).toBe('Stop');

        expect(await progressbarPage.resetButton()).toBe(true);
    })

    test('@barColor - verify the bar color on start and reset',async({widgetsPage,progressbarPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToPorgressBar();
        expect(await progressbarPage.verifyProgressBarPage()).toContain(data['progress bar']);

        const [initial,final]= await progressbarPage.barCSS();
        expect(initial).toBe('rgb(23, 162, 184)');
        expect(final).toBe('rgb(40, 167, 69)') 
    })

})
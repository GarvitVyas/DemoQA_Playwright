import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@accordian - verify the accordian functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each block of accordian',err);
        }
    })

    test('firstAccordian - verify the first accordian',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        expect(await accordianPage.verifyAccordianText('first')).toBe(data['first accordian heading']);
        const {c1,c2,c3} = await accordianPage.returnState();
        expect(c1).toBe('collapse show');
        expect(c2).toBe('collapse');
        expect(c3).toBe('collapse');
    })

})
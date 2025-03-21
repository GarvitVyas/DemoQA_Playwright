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

    test('firstAccordian - verify the first accordian is open on landing',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        expect(await accordianPage.verifyAccordianText('first')).toBe(data['first accordian heading']);
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian1).toBe('collapse show');
        expect(accordian2).toBe('collapse');
        expect(accordian3).toBe('collapse');
    })

    test('firstAccordian-2 - close the first accordian',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        expect(await accordianPage.verifyAccordianText('first')).toBe(data['first accordian heading']);
        await accordianPage.closeOpenAccordian('first');
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian1).toBe('collapse');
        expect(accordian2).toBe('collapse');
        expect(accordian3).toBe('collapse');
    })

    test('secondAccordian - verify the second accordian is close on landing',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        expect(await accordianPage.verifyAccordianText('second')).toBe(data['second accordian heading']);
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian2).toBe('collapse');
    })

    test('secondAccordian-2 - verify on actioning second accordian closes the first acordian',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        await accordianPage.closeOpenAccordian('second');
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian1).toBe('collapse');
        expect(accordian3).toBe('collapse');
        expect(accordian2).toBe('collapse show');
    })

    test('thirdAccordian - verify the third accordian is closed on landing',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        expect(await accordianPage.verifyAccordianText('third')).toBe(data['third accordian heading']);
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian3).toBe('collapse');
    })

    test('thirdAccordian-2 - verify on actioning third accordian closes the first acordian',async({widgetsPage,accordianPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToAccordian();
        expect(await accordianPage.verifyAccordian()).toContain(data['accordian page']);
        await accordianPage.closeOpenAccordian('third');
        const {accordian1,accordian2,accordian3} = await accordianPage.returnState();
        expect(accordian1).toBe('collapse');
        expect(accordian3).toBe('collapse show');
        expect(accordian2).toBe('collapse');
    })




})
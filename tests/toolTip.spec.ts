import {test,expect} from '../base';
import { data } from '../pages/data/data';

test.describe('@toolTip - verify the tool tips functionality',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.log('Issue with before each hook of tools tip page',err);
        }
    })

    test('@buttontooltip - verify the first tooltip functionality',async({widgetsPage,tooltipPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToToolTip();
        expect(await tooltipPage.verifyToolTipPage()).toContain(data['tool tip page']);

        const message = await tooltipPage.buttonToolTipText();
        expect(await message).toBe('You hovered over the Button');

    })

   test('@inputtooltip - verify the input tool tip functionality',async({widgetsPage,tooltipPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToToolTip();
        expect(await tooltipPage.verifyToolTipPage()).toContain(data['tool tip page']);
        const message2 = await tooltipPage.inputToolTipText();
        expect(await message2).toBe('You hovered over the text field');
   })

   test('@contrarytooltip - verify the contrary tool tip functionality',async({widgetsPage,tooltipPage})=>{
    await widgetsPage.naivigateToWidgetsPage();
    await widgetsPage.navigateToToolTip();
    expect(await tooltipPage.verifyToolTipPage()).toContain(data['tool tip page']);
    const message2 = await tooltipPage.contraryToolTipText();
    expect(await message2).toBe('You hovered over the Contrary');
    })

    test('@geolocationtooltip - verify the geolocation tool tip functionality',async({widgetsPage,tooltipPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToToolTip();
        expect(await tooltipPage.verifyToolTipPage()).toContain(data['tool tip page']);
        const message2 = await tooltipPage.geoToolTipText();
        expect(await message2).toBe('You hovered over the 1.10.32');
    })




})
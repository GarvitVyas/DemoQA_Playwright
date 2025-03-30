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

    test('@tooltip - verify the first tooltip functionality',async({widgetsPage,tooltipPage})=>{
        await widgetsPage.naivigateToWidgetsPage();
        await widgetsPage.navigateToToolTip();
        expect(await tooltipPage.verifyToolTipPage()).toContain(data['tool tip page']);
    })

})
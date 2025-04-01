import {Locator, Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';
class ToolTip{
    
    private page:Page;
    private elementactions:ElementActions;
    private tooltipButton:string;
    private hiddenTooltip:string;
    private tooltipInput:string;
    private contrarytooltip:string;
    private geotooltip:string;
    constructor(page:Page){
        this.page = page;
        this.contrarytooltip='//*[@class="mt-4"]//a[1]';
        this.geotooltip='//*[@class="mt-4"]//a[2]';
        this.tooltipInput='//*[@id="toolTipTextField"]';
        this.elementactions = new ElementActions;
        this.hiddenTooltip='.tooltip-inner'
        this.tooltipButton = '//*[@id="toolTipButton"]';
    }

    async verifyToolTipPage(){
        return await this.page.url();
    }

    async verifyToolTipButton(locator:Locator){
        const button = await locator;
        const flag = await button.isVisible();
        if(flag){
            await button.hover();
            await this.page.locator(this.hiddenTooltip).waitFor({state:'visible'});
            const ariaValue = await this.page.locator(this.hiddenTooltip);
            if(await ariaValue.isVisible()){
                var tooltip = await ariaValue.textContent();
                return tooltip;
            }else{
                throw new Error('tooltip not visible!');
            }
        }
      
    }

    async buttonToolTipText(){
        const button = await this.page.locator(this.tooltipButton);
        return await this.verifyToolTipButton(button);
    }

    async inputToolTipText(){
        const input = await this.page.locator(this.tooltipInput);
        return await this.verifyToolTipButton(input);
    }

    async contraryToolTipText(){
        const contrary = await this.page.locator(this.contrarytooltip);
        return await this.verifyToolTipButton(contrary);
    }

    async geoToolTipText(){
        const geolocation = await this.page.locator(this.geotooltip);
        return await this.verifyToolTipButton(geolocation);
    }



}export{ToolTip}
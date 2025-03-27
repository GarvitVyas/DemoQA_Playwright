import {Page} from '@playwright/test';

class Slider{

    private page:Page;
    private slidervalueField:string;
    private inputrange:string;
    constructor(page:Page){
        this.page = page;
        this.inputrange='//input[@type="range"]'
        this.slidervalueField='//input[@id="sliderValue"]';
    }

    async verifySliderPage():Promise<string>{
        return await this.page.url();
    }

    async sliderValue(){
        return await this.page.locator(this.slidervalueField).getAttribute('value');
    }

    async hoverOverSlider():Promise<boolean>{
        const ele = await this.page.locator(this.inputrange);
        await ele.hover();
        const flag = await this.page.getByText('25').isVisible();
        return flag;
    }

    async moveSlider(){
       try{
        const slider = await this.page.locator(this.inputrange);
        const sliderBox = await slider.boundingBox();
        if(sliderBox){
            const x = sliderBox.x + sliderBox.width/2;
            const y = sliderBox.y;
            await this.page.mouse.move(x,y+sliderBox.height/2);
            await this.page.mouse.down();
            await this.page.mouse.move(x,y);
            await this.page.mouse.up;

        }
       }catch(err){
        console.log('Issue with the provided field value',err);
       }
        
    }


}export{Slider}

/**
 * Scenario 2: Tooltip referenced by aria-describedby
If the tooltip is triggered by the aria-describedby attribute (typically used for accessibility), you can retrieve the ID from the aria-describedby attribute and then grab the tooltip text from the element associated with that ID.

Retrieve the aria-describedby value.

Select the described element using the ID.

Get the tooltip text from the described element.

typescript
Copy
import { test, expect } from '@playwright/test';

test('retrieve tooltip text using aria-describedby', async ({ page }) => {
  await page.goto('https://example.com'); // Replace with your URL
  
  // Select the element with the aria-describedby attribute
  const button = page.locator('#my-button'); // Replace with your button or input selector
  
  // Retrieve the aria-describedby value (the ID of the tooltip)
  const ariaDescribedByValue = await button.getAttribute('aria-describedby');
  console.log('aria-describedby value:', ariaDescribedByValue); // Log the ID of the tooltip
  
  // Locate the element described by aria-describedby
  const tooltip = page.locator(`#${ariaDescribedByValue}`); // The tooltip should have this ID
  
  // Wait for the tooltip to become visible (optional, if it's shown dynamically)
  await tooltip.waitFor({ state: 'visible' });

  // Retrieve the tooltip text
  const tooltipText = await tooltip.textContent();
  console.log('Tooltip text:', tooltipText); // Log the tooltip text

  // Optionally, you can assert the tooltip content
  expect(tooltipText).toBe('This is a tooltip message'); // Replace with the expected text
});
 */
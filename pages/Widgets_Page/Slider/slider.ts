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
        console.log('Issue with the move slider function',err);
       }
    }

    async moveSliderFull(){
        try{
            const slider = await this.page.locator(this.inputrange);
            const sliderBox = await slider.boundingBox();
            if(sliderBox){
                const x = sliderBox.x + sliderBox.width / 2;
                const y = sliderBox.y + sliderBox.height / 2;
                await this.page.mouse.move(x,y); // move the mouse to the slider element, not the slider itself
                await this.page.mouse.down();
                await this.page.mouse.move(sliderBox.x,y);
                await this.page.mouse.up();
            }
        }catch(err){
            console.log('Issue with the move slider to full function',err);
        }
    }


}export{Slider}


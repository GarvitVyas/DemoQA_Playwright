import {test, expect} from '@playwright/test';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { Links } from '../pages/Elements_Page/LinksPage/links_Page';

test.describe('@linksPage - tests to verify links page',()=>{
    let elementPage:Element;
    let linksPage:Links;

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
            elementPage = new Element(page);
            linksPage = new Links(page);
        }catch(err){
            console.info('Issue with before each hook for links test');
            throw err;
        }
    })

    
})
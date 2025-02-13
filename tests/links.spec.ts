import {test, expect} from '@playwright/test';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { Links } from '../pages/Elements_Page/LinksPage/links_Page';
import { data } from '../pages/data/data';
import {config} from '../config';


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

    test('@homeLink - verify the home link opens new tab',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);

        expect(await linksPage.verifyHomeSimpleLink()).toBe('Home');
        expect(await linksPage.actionHomeLink()).toBe(config.baseURL+'/');
    })



    test('@homeDynamicLink - verify the home dynamic link opens new tab',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);

        expect(await linksPage.verifyHomeDynamicLink()).toContain('Home');
        expect(await linksPage.actionHomeDynamicLink()).toBe(config.baseURL+'/');
    })

    test('@createdLink - action link and verify the api response',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);

        const response = await linksPage.createdLink();
        expect(response.status()).toBe(201);
        expect(response.request().method()).toBe('GET');
    })
    
    test('@noContent - action no content link and verify the response',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);
        const response = await linksPage.noContentLink();
        expect(response.status()).toBe(204);
        expect(response.request().method()).toBe('GET');
    })

    test('@moved - action moved link and verify the response',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);
        const response = await linksPage.movedLinkCall();
        expect(response.status()).toBe(301);
        expect(response.request().method()).toBe('GET');
        expect(response.statusText()).toContain('Moved Permanently');
    })

    test('@badRequest - action bad request link and verify the response',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);
        const response = await linksPage.badRequestCall();
        expect(response.status()).toBe(400);
        expect(response.request().method()).toBe('GET');
        expect(response.statusText()).toContain('Bad Request');
    })

    test('@unauthorized - action unauthorized link and verify the response',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToLinksPage();
        expect(await linksPage.verifyLinksPage()).toContain(data['links page']);
        const response = await linksPage.unauthorizedCall();
        expect(response.status()).toBe(401);
        expect(response.request().method()).toBe('GET');
        expect(response.statusText()).toContain('Unauthorized');
    })
})
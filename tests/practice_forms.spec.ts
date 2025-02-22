import {test,expect} from '../base';
import { data } from '../pages/data/data';


test.describe('@PracticeForm - test to verify the practice automation form',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            throw new Error('Issue with before each block of practice form class');
        }
    })

    

})
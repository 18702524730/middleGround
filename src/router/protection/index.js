import {Home} from 'layout/';
import allCase from './allCase.js';

export default {
    path: '/threeDimensionalProtection',
    name: 'threeDimensionalProtection',
    meta:{
        name: '立体保护',
        permission: 'stereo_protect'
    },
    component: Home,
    sort: 3,
    icon: 'inbox',
    redirect: '/threeDimensionalProtection/allCase',
    children:[
        allCase
    ]
}
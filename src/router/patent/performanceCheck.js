import { Content } from 'layout/'
import {Patent} from 'views/'
export default {
    path: 'performanceCheck',
    name: 'performanceCheck',
    meta:{
        name:'绩效核对',
        permission:'pas_hr_achievement_check'
    },
    component:Content,
    children:[
        {
            path: 'wgPatentcheck',
            name: 'wgPatentCheckList',
            meta:{
                name:'外观专利',
                permission:'pas_hr_achievement_check'
            },
            component: Patent.performanceCheck.wgPatentCheck.wgPatentCheckList
        },
        {
            path:'wgPatentcheck/:id/:tp',
            name:'wgPatentCheckDetail',
            meta: {
                name:'案件详情',
                permission:'pas_hr_achievement_check',
            },
            hidden: true,
            component: Patent.performanceCheck.wgPatentCheck.wgPatentCheckDetail
        },
        {
            path: 'syPatentcheck',
            name: 'syPatentCheckList',
            meta:{
                name:'实用新型专利',
                permission:'pas_hr_achievement_check'
            },
            component: Patent.performanceCheck.syPatentCheck.syPatentCheckList
        },
        {
            path:'syPatentcheck/:id/:tp',
            name:'syPatentCheckDetail',
            meta: {
                name:'案件详情',
                permission:'pas_hr_achievement_check',
            },
            hidden: true,
            component: Patent.performanceCheck.syPatentCheck.syPatentCheckDetail
        },
        {
            path: 'inventPatentcheck',
            name: 'inventPatentCheckList',
            meta:{
                name:'发明专利',
                permission:'pas_hr_achievement_check'
            },
            component: Patent.performanceCheck.inventPatentCheck.inventPatentCheckList
        },
        {
            path:'inventPatentcheck/:id/:tp',
            name:'inventPatentCheckDetail',
            meta: {
                name:'案件详情',
                permission:'pas_hr_achievement_check',
            },
            hidden: true,
            component: Patent.performanceCheck.inventPatentCheck.inventPatentCheckDetail
        }
    ]
}
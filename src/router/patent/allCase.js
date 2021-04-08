import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'allCase',
	name: 'allCase',
	meta:{
		name: '全部案件',
		permission: 'pas_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'appearancePatent',
		name: 'appearancePatent',
		meta:{
			name: '外观专利',
			permission: 'pas_all_case'
		},
		icon: 'edit',
		component: Patent.allCase.wgPatent.wgPatentList
	}, {
		path: 'appearancePatent/:id',
		name: 'wgPatentDetail',
		meta:{
			name: '外观专利详情',
			permission: 'pas_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.allCase.wgPatent.wgPatentDetail
	}, {
		path: 'appearancePatent/:state/:type',
		name: 'reviseBasic',
		meta:{
			name: '外观专利详情',
			permission: 'pas_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'syPatent',
		name: 'syPatent',
		meta:{
			name: '实用新型专利',
			permission: 'pas_all_case'
		},
		icon: 'reorder',
		component: Patent.allCase.syPatent.syPatentList
	}, {
		path: 'syPatent/:id',
		name: 'syPatentDetail',
		meta:{
			name: '实用新型专利详情',
			permission: 'pas_all_case'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.syPatent.syPatentDetail
	},{
		path: 'syPatent/:state/:type',
		name: 'syreviseBasic',
		meta:{
			name: '发明专利详情',
			permission: 'pas_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventPatent',
		name: 'inventPatent',
		meta:{
			name: '发明专利',
			permission: 'pas_all_case'
		},
		icon: 'reorder',
		component: Patent.allCase.fmPatent.fmPatentList
	}, {
		path: 'inventPatent/:id',
		name: 'fmPatentDetail',
		meta:{
			name: '发明专利详情',
			permission: 'pas_all_case'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.fmPatent.fmPatentDetail
	},{
		path: 'inventPatent/:state/:type',
		name: 'fmreviseBasic',
		meta:{
			name: '发明专利详情',
			permission: 'pas_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.allCase.wgPatent.reviseBasic
	},]
};

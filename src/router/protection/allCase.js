import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'allCase',
	name: 'allCase',
	meta:{
		name: '全部案件',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'activistList',
		name: 'activistList',
		meta:{
			name: '线上知产维权',
			permission: 'stereo_protect_all_case'
		},
		icon: 'edit',
		component: Protections.allCases.lineActivist.activistList
	}, {
		path: 'activistList/:id',
		name: 'activistDetail',
		meta:{
			name: '线上知产维权详情',
			permission: 'stereo_protect_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Protections.allCases.lineActivist.activistDetail
	}, {
		path: 'activistList/:type/:id',
		name: 'activistAdd',
		meta:{
			name: '线上知产维权添加案件',
			permission: 'stereo_protect_all_case'
		},
		hidden   : true,
		icon: 'reorder',
		component: Protections.allCases.lineActivist.activistAdd
	}]
};

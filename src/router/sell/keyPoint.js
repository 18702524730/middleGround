/**
 * Created by wan on 2018/5/2.
 */


import {Content} from 'layout/';

import {Sell} from 'views/';

export default {
	path: 'keyPoint',
	name: 'keyPoint',
	meta:{
		name: '重点预览',
		permission: 'iprp_mpsteward_key'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/sell/keyPoint/indexList',
	children: [   
		{
			path: 'indexList',
			name: 'indexList',
			meta:{
				name: '重点概览',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: Sell.keyPoint.indexList
		},
		{
			path: 'indexList',
			name: 'indexList',
			meta:{
				name: '重点概览',
				permission: 'iprp_mpsteward_key_mainsurvey'   //主管
			},
			icon: 'reorder',
			component: Sell.keyPoint.indexList
		},
		{
			path: 'companyList',
			name: 'companyList',
			meta:{
				name: '客户企业概况',
				permission: 'iprp_audit_material_menu'
			},
			icon: 'reorder',
			hidden: true,
			component: Sell.keyPoint.companyList
		},
		{
			path: 'similarList',
			name: 'similarList',
			meta:{
				name: '近似商标',
				permission: 'iprp_audit_material_menu'
			},
			icon: 'reorder',
			hidden: true,
			component: Sell.keyPoint.similarList
		},
		{
			path: 'message',
			name: 'message',
			meta:{
				name: '消息总览',
				permission: 'iprp_mpsteward_key_news'
			},
			icon: 'reorder',
			component: Sell.keyPoint.message
		},
		{
			path: 'searchList',
			name: 'searchList',
			meta:{
				name: '搜索记录',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.searchList
		},
		{
			path: 'buyPurpose',
			name: 'buyPurpose',
			meta:{
				name: '商标求购意向',
				permission: 'iprp_mpsteward_key_wantbuy'  //销售员
			},
			icon: 'reorder',
			component: Sell.keyPoint.buyPurpose
		},
		{
			path: 'buyPurpose',
			name: 'buyPurpose',
			meta:{
				name: '商标求购意向',
				permission: 'iprp_mpsteward_key_mainwantbuy'  //主管
			},
			icon: 'reorder',
			component: Sell.keyPoint.buyPurpose
		},
		{
			path: 'employee',
			name: 'employee',
			meta:{
				name: '员工概况',
				permission: 'iprp_mpsteward_key_staff'
			},
			icon: 'reorder',
			component: Sell.keyPoint.employee
		},
	]
};

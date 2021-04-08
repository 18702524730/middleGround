/**
 * Created by wan on 2018/5/2.
 */


import {Content} from 'layout/';

import {Sell} from 'views/';

export default {
	path: 'myCustomer',
	name: 'myCustomer',
	meta:{
		name: '我的客户',
		permission: 'iprp_mpsteward_customer'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/sell/myCustomer/customerList',
	children: [
		{
			path: 'customerList',
			name: 'customerList',
			meta:{
				name: '我的客户',
				permission: 'iprp_mpsteward_customer_mymember'  //销售员
			},
			icon: 'reorder',
			component: Sell.myCustomer.list
		},
		{
			path: 'customerList',
			name: 'customerList',
			meta:{
				name: '我的客户',
				permission: 'iprp_mpsteward_customer_mainmymember'  //主管
			},
			icon: 'reorder',
			component: Sell.myCustomer.list
		},
		{
			path: 'message',
			name: 'message',
			meta:{
				name: '客户转移消息',
				permission: 'iprp_mpsteward_customer_transfer'
			},
			icon: 'reorder',
			component: Sell.myCustomer.message
		}
	]
};

import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'applyMail',
	name: 'applyMail',
	meta:{
		name: '申请费发票邮寄',
		permission: 'pas_official_fee_invoice_express_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailed',
		meta:{
			name: '待邮寄',
			permission: 'pas_official_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.applyMail.unmailed.unmailedList
	}, {
		path: 'unmailed/:id/:type',
		name: 'unmailedDetail',
		meta:{
			name: '申请费发票详情',
			permission: 'pas_official_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.applyMail.unmailed.unmailedDetail
	},{
		path: 'mailed',
		name: 'mailed',
		meta:{
			name: '已邮寄',
			permission: 'pas_official_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.applyMail.mailed.mailedList
	}, {
		path: 'mailed/:id/:type',
		name: 'mailedDetail',
		meta:{
			name: '申请费发票详情',
			permission: 'pas_official_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.applyMail.mailed.mailedDetail
	}]
};

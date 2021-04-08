import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'yearMail',
	name: 'yearMail',
	meta:{
		name: '年费发票邮寄',
		permission: 'pas_year_fee_invoice_express_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'yearunmailed',
		name: 'yearunmailed',
		meta:{
			name: '待邮寄',
			permission: 'pas_year_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.yearFeeMail.unmailed.unmailedList
	}, {
		path: 'yearunmailed/:id/:type',
		name: 'yearunmailedDetail',
		meta:{
			name: '年费发票详情',
			permission: 'pas_year_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.yearFeeMail.unmailed.unmailedDetail
	},{
		path: 'yearmailed',
		name: 'yearmailed',
		meta:{
			name: '已邮寄',
			permission: 'pas_year_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.yearFeeMail.mailed.mailedList
	}, {
		path: 'yearmailed/:id/:type',
		name: 'yearmailedDetail',
		meta:{
			name: '年费发票详情',
			permission: 'pas_year_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.yearFeeMail.mailed.mailedDetail
	}]
};

import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'bdfMail',
	name: 'bdfMail',
	meta:{
		name: '办登费发票邮寄',
		permission: 'pas_board_fee_invoice_express_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'bdfunmailed',
		name: 'bdfunmailed',
		meta:{
			name: '待邮寄',
			permission: 'pas_board_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.bdfMail.unmailed.unmailedList
	}, {
		path: 'bdfunmailed/:id/:type',
		name: 'bdfunmailedDetail',
		meta:{
			name: '办登费发票详情',
			permission: 'pas_board_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.bdfMail.unmailed.unmailedDetail
	},{
		path: 'bdfmailed',
		name: 'bdfmailed',
		meta:{
			name: '已邮寄',
			permission: 'pas_board_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.bdfMail.mailed.mailedList
	}, {
		path: 'bdfmailed/:id/:type',
		name: 'bdfmailedDetail',
		meta:{
			name: '办登费发票详情',
			permission: 'pas_board_fee_invoice_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.bdfMail.mailed.mailedDetail
	}]
};

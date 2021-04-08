import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'applyInvoice',
	name: 'applyInvoice',
	meta:{
		name: '申请费发票',
		permission: 'pas_official_fee_invoice_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailedInvoice',
		meta:{
			name: '待开票',
			permission: 'pas_official_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.applyInvoice.unmailed.unmailedList
	}, {
		path: 'unmailed/:id/:type',
		name: 'unmailedInvoiceDetail',
		meta:{
			name: '申请费发票详情',
			permission: 'pas_official_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.applyInvoice.unmailed.unmailedDetail
	},{
		path: 'mailed',
		name: 'mailedInvoice',
		meta:{
			name: '已开票',
			permission: 'pas_official_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.applyInvoice.mailed.mailedList
	}, {
		path: 'mailed/:id/:type',
		name: 'mailedInvoiceDetail',
		meta:{
			name: '申请费发票详情',
			permission: 'pas_official_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.applyInvoice.mailed.mailedDetail
	}]
};

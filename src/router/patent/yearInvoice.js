import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'yearInvoice',
	name: 'yearInvoice',
	meta:{
		name: '年费发票',
		permission: 'pas_year_fee_invoice_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailedyearInvoice',
		meta:{
			name: '待开票',
			permission: 'pas_year_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.yearInvoice.unmailed.unmailedList
	}, {
		path: 'unmailed/:id/:type',
		name: 'unmailedyearInvoiceDetail',
		meta:{
			name: '年费发票详情',
			permission: 'pas_year_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.yearInvoice.unmailed.unmailedDetail
	},{
		path: 'mailed',
		name: 'mailedyearInvoice',
		meta:{
			name: '已开票',
			permission: 'pas_year_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.yearInvoice.mailed.mailedList
	}, {
		path: 'mailed/:id/:type',
		name: 'mailedyearInvoiceDetail',
		meta:{
			name: '年费发票详情',
			permission: 'pas_year_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.yearInvoice.mailed.mailedDetail
	}]
};

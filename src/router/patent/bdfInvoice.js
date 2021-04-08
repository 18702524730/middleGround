import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'bdfInvoice',
	name: 'bdfInvoice',
	meta:{
		name: '办登费发票',
		permission: 'pas_board_fee_invoice_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailedbdfInvoice',
		meta:{
			name: '待开票',
			permission: 'pas_board_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.bdfInvoice.unmailed.unmailedList
	}, {
		path: 'unmailed/:id/:type',
		name: 'unmailedbdfInvoiceDetail',
		meta:{
			name: '办登费发票详情',
			permission: 'pas_board_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.bdfInvoice.unmailed.unmailedDetail
	},{
		path: 'mailed',
		name: 'mailedbdfInvoice',
		meta:{
			name: '已开票',
			permission: 'pas_board_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.bdfInvoice.mailed.mailedList
	}, {
		path: 'mailed/:id/:type',
		name: 'mailedbdfInvoiceDetail',
		meta:{
			name: '办登费发票详情',
			permission: 'pas_board_fee_invoice_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.bdfInvoice.mailed.mailedDetail
	}]
};

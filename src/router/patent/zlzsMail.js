import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'zlzsMail',
	name: 'zlzsMail',
	meta:{
		name: '专利证书邮寄',
		permission: 'pas_certificate_express_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'zlzsunmailed',
		name: 'zlzsunmailed',
		meta:{
			name: '待邮寄',
			permission: 'pas_certificate_express_manage'
		},
		icon: 'edit',
		component: Patent.zlzsMail.unmailed.unmailedList
	}, {
		path: 'zlzsunmailed/:id/:type',
		name: 'zlzsunmailedDetail',
		meta:{
			name: '专利证书邮寄详情',
			permission: 'pas_certificate_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.zlzsMail.unmailed.unmailedDetail
	},{
		path: 'zlzsmailed',
		name: 'zlzsmailed',
		meta:{
			name: '已邮寄',
			permission: 'pas_certificate_express_manage'
		},
		icon: 'edit',
		component: Patent.zlzsMail.mailed.mailedList
	}, {
		path: 'zlzsmailed/:id/:type',
		name: 'zlzsmailedDetail',
		meta:{
			name: '专利证书邮寄详情',
			permission: 'pas_certificate_express_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Patent.zlzsMail.mailed.mailedDetail
	}]
};

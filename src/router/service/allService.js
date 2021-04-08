import {Content} from 'layout/';

import {Service} from 'views/';

export default {
	path: 'allService',
	name: 'allService',
	meta:{
		name: '全部服务',
		permission: 'iprp_all_service'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'bsOrderList',
		name: 'bsOrderList',
		meta:{
			name: '服务单',
			permission: 'sbfw_gnsb_zs_all_menu'
		},
		icon: 'edit',
		component: Service.allService.bsOrderList
	}, {
		path: 'bsOrderList/:id/:type',
		name: 'bsOrderDetail',
		meta:{
			name: '服务单详情',
			permission: 'iprp_trademark_apply'
		},
		hidden   : true,
		icon: 'reorder',
		component: Service.allService.bsOrderDetail
	}, {
		path: 'workOrderList',
		name: 'workOrderList',
		meta:{
			name: '拾贝网工单',
			permission: 'iprp_work_order_menu'
		},
		icon: 'reorder',
		component: Service.allService.workOrderList
	}, {
		path: 'workOrderList/:id/:type',
		name: 'workOrderDetail',
		meta:{
			name: '工单详情',
			permission: 'iprp_trademark_apply'
		},
		icon: 'reorder',
		hidden   : true,
		component: Service.details.workOrderDetail
	}, {
		path: 'CXBOrderList',
		name: 'CXBOrderList',
		meta:{
			name: '创新保工单',
			// permission: 'iprp_work_order_menu'
			permission: 'iprp_cxb_work_order_menu'
		},
		icon: 'reorder',
		component: Service.CXBService.CXBOrderList
	}, {
		path: 'CXBOrderList/:id/:state',
		name: 'CXBOrderDetail',
		meta:{
			name: '工单详情',
			// permission: 'iprp_trademark_apply'
			permission: 'iprp_cxb_work_order_menu'
		},
		icon: 'reorder',
		hidden   : true,
		component: Service.CXBService.orderDetail
	}, {
		path: 'channelOrderList',
		name: 'channelOrderList',
		meta:{
			name: '渠道工单',
			// permission: 'iprp_work_order_menu'
			permission: 'iprp_mp_channel_work_order'
		},
		icon: 'reorder',
		component: Service.allService.channelOrderList
	}, {
		path: 'channelOrderList/:id/:state',
		name: 'channelOrderDetail',
		meta:{
			name: '工单详情',
			// permission: 'iprp_trademark_apply'
			permission: 'iprp_mp_channel_work_order'
		},
		icon: 'reorder',
		hidden   : true,
		component: Service.allService.channelOrderDetail
	}]
};

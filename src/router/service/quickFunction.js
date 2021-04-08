import {Content} from 'layout/';

import {Service} from 'views/';

export default {
	path: 'quickFunction',
	name: 'quickFunction',
	meta:{
		name: '快捷功能',
		permission: 'iprp_quick_function'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'uploadMandarin',
		name: 'uploadMandarin',
		meta:{
			name: '上传官文(国内商标)',
			permission: 'iprp_auto_upload_official'
		},
		icon: 'edit',
		component: Service.quickFunction.uploadMandarin
	}, {
		path: 'uploadRecord',
		name: 'uploadRecord',
		meta:{
			name: '上传记录',
			permission: 'iprp_auto_upload_record'
		},
		icon: 'reorder',
		component: Service.quickFunction.uploadRecord
	}, {
		path: 'orderDistribute',
		name: 'orderDistribute',
		meta:{
			name: '订单分配',
			permission: 'iprp_order_allocate'
		},
		icon: 'reorder',
		component: Service.quickFunction.orderDistribute
	}, {
		path: 'assignServicerCxb',
		name: 'assignServicerCxb',
		meta:{
			name: '指定服务商(创新保)',
			permission: 'iprp_cxb_designate_servicer'
		},
		icon: 'reorder',
		component: Service.quickFunction.assignServicerCxb
	}, {
		path: 'assignServicer',
		name: 'assignServicer',
		meta:{
			name: '指定服务商(拾贝)',
			permission: 'iprp_designate_servicer'
		},
		icon: 'reorder',
		component: Service.quickFunction.assignServicer
	}, {
		path: 'assignServicer/:id/:code',
		name: 'assignServicerEdit',
		meta:{
			name: '指定服务商(拾贝)',
			permission: 'iprp_designate_servicer'
		},
		icon: 'reorder',
		hidden: true,
		component: Service.quickFunction.assignServicerEdit
	},
	{
		path: 'applyReport',
		name: 'applyReport',
		meta:{
			name: '申请报表(创新保)',
			permission: 'iprp_mp_declare_report'
		},
		icon: 'reorder',
		component: Service.quickFunction.applyReport
	},{
		path: 'serviceStatistics',
		name: 'serviceStatistics',
		meta:{
			name: '服务商统计',
			permission: 'iprp_mp_sp_statistics'
		},
		icon: 'reorder',
		component: Service.quickFunction.statistics
	}]
};

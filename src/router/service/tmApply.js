/**
 * Created by ling on 2017/5/11.
 */


import {Content} from 'layout/';

import {Service} from 'views/';

export default {
	path: 'tmApply',
	name: 'tmApply',
	meta:{
		name: '国内商标申报',
		permission: 'iprp_trademark_apply'
	},
	icon: 'inbox',
	component: Content,
	//redirect: '/service/tmApply/auditList',
	children: [{
		path: 'auditList',
		name: 'auditList',
		meta:{
			name: '审核材料',
			permission: 'iprp_audit_material_menu'
		},
		icon: 'reorder',
		component: Service.tmApply.auditList
	}, {
		path: 'auditList/:id',
		name: 'auditDetail',
		meta:{
			name: '审核材料详情',
			permission: 'iprp_middleground_service_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Service.details.workOrderDetail
	}, {
		path: 'reportList/:id',
		name: 'reportDetail',
		meta:{
			name: '服务单申报详情',
			permission: 'iprp_middleground_service_manage'
		},
		hidden   : true,
		icon: 'reorder',
		component: Service.details.bsOrderDetail
	}, {
		path: 'reportList',
		name: 'submit',
		meta:{
			name: '提交商标局',
			permission: 'sbfw_gnsb_zs_verified_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=2',
		name: 'apply',
		meta:{
			name: '申请回执',
			permission: 'sbfw_gnsb_zs_cl_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=3',
		name: 'acceptNotice',
		meta:{
			name: '受理通知',
			permission: 'sbfw_gnsb_zs_sl_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=4',
		name: 'review',
		meta:{
			name: '实质审查',
			permission: 'sbfw_gnsb_zs_essence_review'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=5',
		name: 'refused',
		meta:{
			name: '驳回复审',
			permission: 'sbfw_gnsb_retrial_review_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=6',
		name: 'announcement',
		meta:{
			name: '初审公告',
			permission: 'sbfw_gnsb_regist_notice_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=7',
		name: 'objectionDefense',
		meta:{
			name: '异议答辩',
			permission: 'sbfw_gnsb_object_defense_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=8',
		name: 'regPublication',
		meta:{
			name: '发放注册证',
			permission: 'sbfw_gnsb_regist_certificate_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=9',
		name: 'provide',
		meta:{
			name: '已发放注册证',
			permission: 'sbfw_gnsb_has_registed_menu'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}, {
		path: 'reportList?menu=10',
		name: 'stop',
		meta:{
			name: '办理终止',
			permission: 'sbfw_gnsb_zs_closed'
		},
		icon: 'edit',
		component: Service.tmApply.reportList
	}]
};

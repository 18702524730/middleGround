import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'appearanceProgress',
	name: 'appearanceProgress',
	meta:{
		name: '外观专利流程',
		permission: 'pas_appearance_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'uploadApply',
		name: 'uploadApply',
		meta:{
			name: '上传申请材料',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'edit',
		component: Patent.wgProgress.uploadApply.uploadApplyList
	}, {
		path: 'uploadApply/:id/:step',
		name: 'uploadApplyDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'uploadApply/:state/:type',
		name: 'uploadApplyRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'uploadNotice',
		name: 'uploadNotice',
		meta:{
			name: '上传受理通知',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.uploadNotice.uploadNoticeList
	},{
		path: 'uploadNotice/:id/:step',
		name: 'uploadNoticeDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'uploadNotice/:state/:type',
		name: 'uploadNoticeRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	}, {
		path: 'applyFee',
		name: 'applyFee',
		meta:{
			name: '申请费待缴',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.applyFee.applyFeeList
	}, {
		path: 'applyFee/:id/:step',
		name: 'applyFeeDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'applyFee/:state/:type',
		name: 'applyFeeRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'firstAudit',
		name: 'firstAudit',
		meta:{
			name: '反馈初审结果',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.firstAudit.firstAuditList
	},{
		path: 'firstAudit/:id/:step',
		name: 'firstAuditDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	}, {
		path: 'firstAudit/:state/:type',
		name: 'firstAuditRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'toBeFilled',
		name: 'toBeFilled',
		meta:{
			name: '补正/审查',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.toBeFilled.toBeFilledList
	}, {
		path: 'toBeFilled/:id/:step',
		name: 'toBeFilledDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'toBeFilled/:state/:type',
		name: 'toBeFilledRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},	{
		path: 'rejected',
		name: 'rejected',
		meta:{
			name: '驳回复审',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.rejected.rejectedList
	},{
		path: 'rejected/:id/:step',
		name: 'rejectedDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'rejected/:state/:type',
		name: 'rejectedRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'bdfPay',
		name: 'bdfPay',
		meta:{
			name: '办登费待缴',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.bdfPay.bdfPayList
	},{
		path: 'bdfPay/:id/:step',
		name: 'bdfPayDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_managey'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'bdfPay/:state/:type',
		name: 'bdfPayRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'yearPay',
		name: 'yearPay',
		meta:{
			name: '年费待缴',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		component: Patent.wgProgress.yearPay.yearPayList
	},{
		path: 'yearPay/:id/:step',
		name: 'yearPayDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.wgProgress.uploadApply.uploadApplyDetail
	},{
		path: 'yearPay/:state/:type',
		name: 'yearPayRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_appearance_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},]
};

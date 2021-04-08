import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'utilityProgress',
	name: 'utilityProgress',
	meta:{
		name: '实用新型流程',
		permission: 'pas_utility_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'uploadApplys',
		name: 'uploadApplys',
		meta:{
			name: '上传申请材料',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'edit',
		component: Patent.syProgress.uploadApply.uploadApplyList
	}, {
		path: 'uploadApplys/:id/:step',
		name: 'uploadApplyDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'uploadApplys/:state/:type',
		name: 'uploadApplyRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'uploadNotices',
		name: 'uploadNotices',
		meta:{
			name: '上传受理通知',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.uploadNotice.uploadNoticeList
	},{
		path: 'uploadNotices/:id/:step',
		name: 'uploadNoticeDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'uploadNotices/:state/:type',
		name: 'uploadNoticeRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	}, {
		path: 'applyFees',
		name: 'applyFees',
		meta:{
			name: '申请费待缴',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.applyFee.applyFeeList
	}, {
		path: 'applyFees/:id/:step',
		name: 'applyFeeDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'applyFees/:state/:type',
		name: 'applyFeeRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'firstAudits',
		name: 'firstAudits',
		meta:{
			name: '反馈初审结果',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.firstAudit.firstAuditList
	},{
		path: 'firstAudits/:id/:step',
		name: 'firstAuditDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	}, {
		path: 'firstAudits/:state/:type',
		name: 'firstAuditRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'toBeFilleds',
		name: 'toBeFilleds',
		meta:{
			name: '补正/审查',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.toBeFilled.toBeFilledList
	}, {
		path: 'toBeFilleds/:id/:step',
		name: 'toBeFilledDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'toBeFilleds/:state/:type',
		name: 'toBeFilledRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},	{
		path: 'rejecteds',
		name: 'rejecteds',
		meta:{
			name: '驳回复审',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.rejected.rejectedList
	},{
		path: 'rejecteds/:id/:step',
		name: 'rejectedDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component:Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'rejecteds/:state/:type',
		name: 'rejectedRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'bdfPays',
		name: 'bdfPays',
		meta:{
			name: '办登费待缴',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.bdfPay.bdfPayList
	},{
		path: 'bdfPays/:id/:step',
		name: 'bdfPayDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_managey'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'bdfPays/:state/:type',
		name: 'bdfPayRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'yearPays',
		name: 'yearPays',
		meta:{
			name: '年费待缴',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		component: Patent.syProgress.yearPay.yearPayList
	},{
		path: 'yearPays/:id/:step',
		name: 'yearPayDetails',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.syProgress.uploadApply.uploadApplyDetail
	},{
		path: 'yearPays/:state/:type',
		name: 'yearPayRevises',
		meta:{
			name: '案件详情',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},]
};

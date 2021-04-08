import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'inventProgress',
	name: 'inventProgress',
	meta:{
		name: '发明专利流程',
		permission: 'pas_invent_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'inventuploadApply',
		name: 'inventuploadApply',
		meta:{
			name: '上传申请材料',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'edit',
		component: Patent.inventProgress.uploadApply.uploadApplyList
	}, {
		path: 'inventuploadApply/:id/:step',
		name: 'inventuploadApplyDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventuploadApply/:state/:type',
		name: 'inventuploadApplyRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventuploadNotice',
		name: 'inventuploadNotice',
		meta:{
			name: '上传受理通知',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.uploadNotice.uploadNoticeList
	},{
		path: 'inventuploadNotice/:id/:step',
		name: 'inventuploadNoticeDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventuploadNotice/:state/:type',
		name: 'inventuploadNoticeRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	}, {
		path: 'inventapplyFee',
		name: 'inventapplyFee',
		meta:{
			name: '申请费待缴',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.applyFee.applyFeeList
	}, {
		path: 'inventapplyFee/:id/:step',
		name: 'inventapplyFeeDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventapplyFee/:state/:type',
		name: 'inventapplyFeeRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventfirstAudit',
		name: 'inventfirstAudit',
		meta:{
			name: '反馈初审结果',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.firstAudit.firstAuditList
	},{
		path: 'inventfirstAudit/:id/:step',
		name: 'inventfirstAuditDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	}, {
		path: 'inventfirstAudit/:state/:type',
		name: 'inventfirstAuditRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventtoBeFilled',
		name: 'inventtoBeFilled',
		meta:{
			name: '补正/审查（初审）',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.toBeFilled.toBeFilledList
	}, {
		path: 'inventtoBeFilled/:id/:step',
		name: 'inventtoBeFilledDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventtoBeFilled/:state/:type',
		name: 'inventtoBeFilledRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},	{
		path: 'inventrejected',
		name: 'inventrejected',
		meta:{
			name: '驳回复审（初审）',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.rejected.rejectedList
	},{
		path: 'inventrejected/:id/:step',
		name: 'inventrejectedDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component:Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventrejected/:state/:type',
		name: 'inventrejectedRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'substantiveReq',
		name: 'substantiveReq',
		meta:{
			name: '上传实审通知',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.substantiveReq.substantiveReqList
	},{
		path: 'substantiveReq/:id/:step',
		name: 'substantiveReqDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	}, {
		path: 'substantiveReq/:state/:type',
		name: 'substantiveReqRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'substantiveAudit',
		name: 'substantiveAudit',
		meta:{
			name: '反馈实审结果',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.substantiveAudit.substantiveAuditList
	},{
		path: 'substantiveAudit/:id/:step',
		name: 'substantiveAuditDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	}, {
		path: 'substantiveAudit/:state/:type',
		name: 'substantiveAuditRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'toBeFilledSub',
		name: 'toBeFilledSub',
		meta:{
			name: '补正/审查（实审）',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.toBeFilledSub.toBeFilledSubList
	}, {
		path: 'toBeFilledSub/:id/:step',
		name: 'toBeFilledSubDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'toBeFilledSub/:state/:type',
		name: 'toBeFilledSubRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},	{
		path: 'rejectedSub',
		name: 'rejectedSub',
		meta:{
			name: '驳回复审（实审）',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.rejectedSub.rejectedSubList
	},{
		path: 'rejectedSub/:id/:step',
		name: 'rejectedSubDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'rejectedSub/:state/:type',
		name: 'rejectedSubRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventbdfPay',
		name: 'inventbdfPay',
		meta:{
			name: '办登费待缴',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.bdfPay.bdfPayList
	},{
		path: 'inventbdfPay/:id/:step',
		name: 'inventbdfPayDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_managey'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventbdfPay/:state/:type',
		name: 'inventbdfPayRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},{
		path: 'inventyearPay',
		name: 'inventyearPay',
		meta:{
			name: '年费待缴',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		component: Patent.inventProgress.yearPay.yearPayList
	},{
		path: 'inventyearPay/:id/:step',
		name: 'inventyearPayDetail',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.inventProgress.uploadApply.uploadApplyDetail
	},{
		path: 'inventyearPay/:state/:type',
		name: 'inventyearPayRevise',
		meta:{
			name: '案件详情',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'reorder',
		hidden   : true,
		component: Patent.allCase.wgPatent.reviseBasic
	},]
};

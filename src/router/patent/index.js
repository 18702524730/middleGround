import {Home} from 'layout/';
// let arr = []
// const cont = require.context('./',false,/\.js$/)
// cont.keys().map(item=>{
// 	if(item=='./index.js') return;
// 	arr = arr.concat(cont(item).default)
// })
import allCase from './allCase.js';
import appearanceProgress from './appearanceProgress.js';
import utilityProgress from './syProgress.js';
import inventProgress from './inventProgress.js';
import applyMailMessage from './applyMail.js';
import bdfMailMessage from './bdfMail.js'
import zlzsMailMessage from './zlzsMail.js'
import yearMailMessage from './yearFeeMail.js'
import applyInvoiceMessage from './applyInvoice.js';
import bdfInvoiceMessage from './bdfInvoice.js';
import yearInvoiceMessage from './yearInvoice.js';
import performanceCheck from './performanceCheck.js'
export default {
	path: '/patent',
	name: 'patent',
	meta:{
		name: '专利业务',
		permission: 'pas_business'
	},
	icon: 'inbox',
	sort: 2,
	component: Home,
	redirect: '/patent/allCase',
	// children: arr
	children:[
		allCase,
		appearanceProgress,
		utilityProgress,
		inventProgress,
		applyInvoiceMessage,
		bdfInvoiceMessage,
		yearInvoiceMessage,
		applyMailMessage,
		bdfMailMessage,
		zlzsMailMessage,
		yearMailMessage,
		performanceCheck
	]
};
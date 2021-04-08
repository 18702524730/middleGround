import {Home,Content} from 'layout/';

import tmApply from './tmApply.js';
import allService from './allService.js';
import quickFunction from './quickFunction.js';

export default {
	path: '/service',
	name: 'service',
	meta:{
		name: '商标业务',
		permission: 'iprp_middleground_service_manage'
	},
	icon: 'inbox',
	sort: 1,
	component: Home,
	redirect: '/service/tmApply',
	children:[allService,tmApply,quickFunction]
};

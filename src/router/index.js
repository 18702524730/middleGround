import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login} from 'views/';

import Service from './service/';
import Sell from './sell/';  //销售管理
import Patent from './patent/';
import Protection from './protection/'
// let arrs = []
// let conts = require.context('./',true,/index\.js$/)
// conts.keys().map(item=>{
// 	if(item=='./index.js') return;
// 	arrs = arrs.concat(conts(item).default)
// })
// arrs.sort((a,b)=>{
// 	return a.sort -b.sort
// })
export default new Router({
	routes: [
		{
			path     : '/',
			name     : 'default',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		{
			path     : '/login',
			name     : 'login',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		Service,
		Patent,
		Protection,
		Sell,
		// ...arrs,
		{
      path: '*',
      hidden: true,
      name: 'other',
      redirect: { path: '/' }
    }
	]
})

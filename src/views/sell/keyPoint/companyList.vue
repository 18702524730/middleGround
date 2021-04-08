<template>
	<div class="company_list">
		<div class="top_box">
			<p class="title">
				<span class="text">客户账号：{{ $route.query.memberPhone || '--' }}</span>
				<span class="text">客户姓名：{{ $route.query.memberName || '--' }}</span>
			</p>
			<el-button class="submit_btn" type="primary" size="small" @click="contrastFn">企业对比</el-button>
		</div>
		<div class="list_box clearfix">
			<div class="item_wrap">
				<div class="item_half">
					<div class="title_line clearfix">
						<span class="title">主体企业{{ myCompanyInfo.subjectNumber }}家，共{{ myCompanyInfo.trademarkNumber }}个商标，已托管{{ myCompanyInfo.depositeNumber }}个商标，{{ myCompanyInfo.newsNumber }}条风险</span>
						<el-button class="button" size="small" @click="reseatFn(1)">重置</el-button>
						<el-button class="button" type="primary" size="small" @click="findStewardSubjectFn(1)">搜索</el-button>
						<el-input
							class="input"
							size="small"
						  placeholder="企业名称"
						  v-model="keyword1"
						  clearable>
						</el-input>
					</div>
					<div class="item_com" v-for="(info, index) in myCompanyList">
						<div class="check_box">
							<el-checkbox v-model="info.checked" class="checkbox" @change="selectCompanyFn(info, index, myCompanyList)"></el-checkbox>
						</div>
						<div class="card">
							<div class="c_top">
								<p class="name" :title="info.applicationName">{{ info.applicationName }}</p>
								<p class="info">企业商标{{ info.trademarkNumber }}个，已托管{{ info.depositeNumber }}个</p>
							</div>
							<div class="core clearfix">
								<p class="tit">核心商标</p>
								<p class="c_item" v-if="info.coreTrademark.length" v-for="item in info.coreTrademark" >
									<img :src="item.tmImg" alt="">
								</p>
								<p class="empaty" v-if="!info.coreTrademark.length" >暂无核心商标</p>
							</div>
							<div class="risk clearfix">
								<p class="tit">风险预警</p>
								<table class="risk_table">
									<thead>
										<tr>
											<th>被异议风险</th>
											<th>被撤三风险</th>
											<th>变更风险</th>
											<th>到期风险</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{{ info.typeClassification2 }}</td>
											<td>{{ info.typeClassification3 }}</td>
											<td>{{ info.typeClassification1 }}</td>
											<td>{{ info.typeClassification4 }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<el-pagination class="page_line" v-if="myCompanyList.length" layout="prev, pager, next" :total="totalSize1" :page-size="pageSize1" :current-page.sync="currentPage1" @current-change="currentChangeFn(1)"></el-pagination>
				</div>
				<div class="item_half">
					<div class="title_line clearfix">
						<span class="title">竞品企业{{ followCompanyInfo.subjectNumber }}家，共{{ followCompanyInfo.trademarkNumber }}个商标，已托管{{ followCompanyInfo.depositeNumber }}个商标，{{ followCompanyInfo.newsNumber }}条情报</span>
						<el-button class="button" size="small" @click="reseatFn(2)">重置</el-button>
						<el-button class="button" type="primary" size="small" @click="findStewardSubjectFn(2)">搜索</el-button>
						<el-input
							class="input"
							size="small"
						  placeholder="企业名称"
						  v-model="keyword2"
						  clearable>
						</el-input>
					</div>
					<div class="item_com" v-for="(info, index) in followCompanyList">
						<div class="check_box">
							<el-checkbox v-model="info.checked" class="checkbox" @change="selectCompanyFn(info, index, followCompanyList)"></el-checkbox>
						</div>
						<div class="card">
							<div class="c_top">
								<p class="name">{{ info.applicationName }}</p>
								<p class="info">企业商标{{ info.trademarkNumber }}个，已托管{{ info.depositeNumber }}个</p>
							</div>
							<div class="core clearfix">
								<p class="tit">核心商标</p>
								<p class="c_item" v-if="info.coreTrademark.length" v-for="item in info.coreTrademark" >
									<img :src="item.tmImg" alt="">
								</p>
								<p class="empaty" v-if="!info.coreTrademark.length" >暂无核心商标</p>
							</div>
							<div class="risk clearfix">
								<p class="tit">情报中心</p>
								<table class="risk_table">
									<thead>
										<tr>
											<th>可异议情报</th>
											<th>可撤三情报</th>
											<th>未续展注销情报</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{{ info.typeClassification1 }}</td>
											<td>{{ info.typeClassification2 }}</td>
											<td>{{ info.typeClassification3 }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<el-pagination class="page_line" v-if="followCompanyList.length" layout="prev, pager, next" :total="totalSize2" :page-size="pageSize2" :current-page.sync="currentPage2" @current-change="currentChangeFn(2)"></el-pagination>
				</div>
			</div>
		</div>

		<el-dialog
		  title="企业对比"
		  :visible.sync="companyVisible"
		  size="tiny"
		  custom-class="company_diloge" >
		  <table class="c_table">
		  	<thead>
		  		<tr>
		  			<th width=120>公司名称</th>
		  			<th v-for="info in contractList">{{ info.entname }}</th>
		  		</tr>
		  	</thead>
		  	<tbody>
		  		<tr>
		  			<td>成立日期</td>
		  			<td v-for="info in contractList">{{ info.esdate }}</td>
		  		</tr>
		  		<tr>
		  			<td>注册资金</td>
		  			<td v-for="info in contractList">{{ info.regcap }} 万元</td>
		  		</tr>
		  		<tr>
		  			<td>企业商标</td>
		  			<td v-for="info in contractList">{{ info.trademarkNumber }}</td>
		  		</tr>
		  		<tr>
		  			<td>所属行业</td>
		  			<td v-for="info in contractList">{{ info.industryphyname }}</td>
		  		</tr>
		  		<tr>
		  			<td>核心商标</td>
		  			<td class="core" v-for="info in contractList">
							<p class="c_item" v-if="info.coreTrademark.length" v-for="item in info.coreTrademark" >
								<img :src="item.tmImg" alt="">
							</p>
							<p class="empaty" v-if="!info.coreTrademark.length" >暂无核心商标</p>
		  			</td>
		  		</tr>
		  	</tbody>
		  </table>
		</el-dialog>

  </div>
</template>
<script>
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import { gbs } from 'config/settings.js';
import Filters from 'utils/filters/filters.js';
import {store} from 'utils/';
import intClsData from 'apis/intClsData.js';
import CONFIG_ from 'config/hostConfig.js';

const sellUrl = CONFIG_.rootUrl;
const findStewardSubject = sellUrl + '/api/findStewardSubjectByMemberId';  //查询客户企业
const contrastStewardSubject = sellUrl + '/api/contrastStewardSubject';  //查询对比企业
const statisticsByMmeberId = sellUrl + '/api/statisticsByMmeberId';  //查询概述导航栏


export default {
	data() {
	  return {
	  	checked: false,
	  	companyVisible: false,  //企业对比消息弹窗
	  	userInfo: store.get('userinfo'),
	  	keyword1: '',  //企业名称
	  	keyword2: '',  //企业名称
	  	myCompanyList: [],  //我的企业列表
	  	followCompanyList: [],  //关注企业列表
	  	currentPage1: 1,
	  	pageSize1: 4,
	  	totalSize1: 1,
	  	currentPage2: 1,
	  	pageSize2: 4,
	  	totalSize2: 1,
	  	selectList: [],  //选择用来对比的企业ID，最多4个
	  	contractList: [],  //对比企业列表
	  	myCompanyInfo: {},  //我的企业信息
	  	followCompanyInfo: {},  //关注企业信息
	  }
	},
	methods: {
		// 查询概述导航栏
		statisticsByMmeberIdFn (type) {
			let params = {
				memberId: this.$route.query.memberId,
				applicationType: type
			}
			if (type == 1) {
				params.newsType = 2;
			}
			else if (type == 2) {
				params.newsType = 3;
			}
			this.$http.get(statisticsByMmeberId, {params: params})
			.then( resp => {
				if (type == 1) {
					this.myCompanyInfo = resp.data;
				}
				else if (type == 2) {
					this.followCompanyInfo = resp.data;
				}
			})
		},
		// 企业对比
		contrastFn () {
			if (this.selectList.length < 2) {
				this.$alert('您至多可以同时选择4家企业进行对比', '请至少选择2家企业进行对比', {
          confirmButtonText: '知道了',
        });
			}
			else if (this.selectList.length > 4) {
				this.$alert('您可以取消选择部分企业', '您至多可以同时选择4家企业进行对比', {
          confirmButtonText: '知道了',
        });
			}
			else{
				this.getContrastFn(); //查询对比企业列表
				this.companyVisible = true;
			}
		},
		// 查询对比企业列表
		getContrastFn () {
			let params = {
				subjectList: this.selectList.join(',')
			}
			this.$http.get(contrastStewardSubject, {params: params})
			.then( (resp) => {
				this.contractList = resp.data.elements;
			})
		},
		//  选择独臂企业
		selectCompanyFn (info, index, list) {
			Vue.set(list, index, info)
			if (info.checked) {
				this.selectList.push(info.id);
			}
			else{
				let index_ = this.selectList.indexOf(info.id);
				this.selectList.splice(index_, 1);
			}
		},
		// 查询客户企业
		findStewardSubjectFn (type) {
			let params = {
				applicationType: type,
				memberId: this.$route.query.memberId
			}
			if (type == 1) {  //我的企业
				params.applicationName = this.keyword1;
				params.pg_index = this.currentPage1;
				params.pg_count = this.pageSize1;
			}
			else if (type == 2) {  //关注企业
				params.applicationName = this.keyword2;
				params.pg_index = this.currentPage2;
				params.pg_count = this.pageSize2;
			}
			this.$http.get(findStewardSubject, {params: params})
			.then( (resp) => {
				if (type == 1) {
					this.myCompanyList = resp.data.elements;
					this.totalSize1 = resp.data.total_elements;
					this.myCompanyList.forEach( (item) => {
						item.checked = false;
						this.selectList.forEach( (info) => {
							if (item.id == info) {
								item.checked = true;
							}
						})
					})
				}
				else if (type == 2){
					this.followCompanyList = resp.data.elements;
					this.totalSize2 = resp.data.total_elements;
					console.log(this.selectList)
					this.followCompanyList.forEach( (item) => {
						item.checked = false;
						this.selectList.forEach( (info) => {
							if (item.id == info) {
								item.checked = true;
							}
						})
					})
				}
			})
		},
		currentChangeFn (type) {
			this.findStewardSubjectFn(type);
		},
		// 重置
		reseatFn (type) {
			if (type == 1) {
				this.keyword1 = '';
			}
			else if (type == 2) {
				this.keyword2 = '';
			}
			this.findStewardSubjectFn(type);
		}
	},
	mounted() {
		this.findStewardSubjectFn(1);  //默认查询我的企业列表
		this.findStewardSubjectFn(2);  //默认查询关注企业列表
		this.statisticsByMmeberIdFn(1);  //查询概述导航栏
		this.statisticsByMmeberIdFn(2);  //查询概述导航栏
	},
	filters: {

	},
}
</script>
<style lang='less'>
	.company_list {
		padding-left:10px;
		.top_box {
			width:100%; height: 30px; line-height: 30px; margin-bottom: 10px;
			.title {
				float: left; 
				.text {font-size:14px; color: #333; margin-right: 50px;}
			}
			.submit_btn { float: right; }
		}
		.list_box {
			width: 100%; border: 1px solid #eee; overflow-x: scroll;
			.item_wrap {
				width: 1660px;
				.item_half {
					width:50%; height: 744px; float: left; box-sizing:border-box; display: inline-block; padding: 0 20px 40px 20px; margin-top: 20px; border-right: 1px dashed #eee; margin-bottom: 20px; position:relative; 
					.title_line {
						width: 100%; height: 30px; line-height: 30px; padding-right:40px;
						.title {font-size:14px; color:#333; float: left;}
						.button {float: right; margin-left: 10px;}
						.input {width: 160px; height: 30px; float: right;}
					}
					.item_com {
						width: 50%; box-sizing: border-box; float: left; color: #333; margin-bottom: 10px; margin-top: 20px;
						.check_box {
							width: 35px; height: 307px; line-height: 307px; float: left; text-align: left;
							.checkbox {}
						}
						.card {
							width: 330px; height: 307px; box-sizing: border-box; border:1px solid #eee; float: left;
							.c_top {
								width:100%; height: 87px; background: #F8F8F8; padding-top: 20px; margin-bottom: 20px; 
								.name {font-size: 16px; color: #333; width: 100%; text-align: center; white-space: nowrap; overflow: hidden; text-overflow:ellipsis;}
								.info {font-size: 13px; color: #479CFF; width: 100%; text-align: center; margin-top: 5px;}
							}
							.core {
								padding:0 18px; margin-bottom: 22px;
								.tit {font-size: 12px; text-align: left; margin-bottom: 8px;}
								.c_item {
									width: 50px; height: 50px; line-height: 50px; box-sizing: border-box; float: left; margin-right: 10px; border:1px solid #eee; text-align: center; overflow: hidden;
									img {width:100%; height: 100%;}
								}
								.c_item:last-child {margin-right: 0;}
								.empaty {line-height: 48px; color: #999;}
							}
							.risk {
								padding:0 18px;
								.tit {font-size: 12px; text-align: left; margin-bottom: 8px;}
								.risk_table {
									border: 1px solid #eee; width: 290px;
									th {border-bottom: 1px solid #eee;}
									th, td {
										height: 28px; line-height: 28px; color: #666; padding-left: 10px; text-align: left;
									}
								}
							}
						}
					}
					.page_line {width:100%; float: left; text-align: center; margin-top: 10px; position:absolute; bottom:0;}
				}
			}
			
		}
	}
	.company_diloge {
		width: 900px;
		.el-dialog__header {
			.el-dialog__title {font-size: 14px;}
			.el-dialog__headerbtn {font-size: 12px;}
		}
		.el-dialog__body {
			padding: 10px 20px 24px 20px;
			.c_table {
				width: 840px; border: 1px solid #eee;
				th, td {
					height: 34px; line-height: 34px; text-align: left; padding-left: 16px; color: #333; border-bottom: 1px solid #eee;
				}
				td.core {
					height: auto; line-height: 1.5; width: 180px; padding-top: 20px; padding-bottom: 10px;
					.c_item {
						width: 50px; height: 50px; font-size: 12px; line-height: 50px; box-sizing: border-box; float: left; margin-right: 10px; margin-bottom: 10px; border:1px solid #eee; text-align: center; overflow: hidden;
						img {width:100%; height: 100%;}
					}
					.empaty {line-height: 48px; color: #999;}
				}
			}
		}
	}
</style>


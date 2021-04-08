<template>
	<div class="commonListAll myServiceOrder">
		<div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="待服务" name="toService"></el-tab-pane>
				<el-tab-pane label="服务中" name="servicing"></el-tab-pane>
				<el-tab-pane label="服务完成" name="serviceComplete"></el-tab-pane>
				<el-tab-pane label="服务关闭" name="serviceClose"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.bs_order_sn" placeholder="服务单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.truename" placeholder="客户姓名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.phone" placeholder="注册手机号"></el-input></div>
			<div class="form_control">
				<el-select v-model="dataObj.payment_state" clearable placeholder="支付状态">
					<el-option
						v-for="item in payStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="finished_time"
					type="daterange"
					align="right"
					placeholder="下单时间开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="payment_time"
					type="daterange"
					align="right"
					placeholder="支付时间开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.fir_id" clearable placeholder="请选择商品大类" @change="bs_type_change(1, typeobj.fir_id)">
					<el-option
						v-for="item in firTypeData"
						:key="item.bs_class_id"
						:label="item.name"
						:value="item.bs_class_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.sec_id" :disabled="!secTypeData.length" clearable placeholder="请选择商品类别" @change="bs_type_change(2, typeobj.sec_id)">
					<el-option
						v-for="item in secTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.thi_id" :disabled="!thiTypeData.length" clearable placeholder="请选择商品名称" @change="bs_type_change(3, typeobj.thi_id)">
					<el-option
						v-for="item in thiTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.fou_id" :disabled="!fouTypeData.length" clearable placeholder="请选择办理状态" @change="bs_type_change(4)">
					<el-option
						v-for="item in fouTypeData"
						:key="item.bs_feedback_id "
						:label="item.name"
						:value="item.bs_feedback_id ">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.sp_id" clearable placeholder="请选择服务商" @change="spChange(dataObj.sp_id)">
					<el-option
						 v-for="(item, index) in allSpData" :label="item.name" :value="item.sp_id " :key="item.sp_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.operator_id" clearable placeholder="请选择代理顾问"> <!-- :disabled="!allOperatorData.length" -->
					<el-option label="未分配" value="-1"></el-option>
					<el-option
						 v-for="(item, index) in allOperatorData" :label="item.name" :value="item.operator_id " :key="item.operator_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
		</div>
		<div class="result">
			<!-- <div class="table_handle">
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batch" @click="batch">接单</div>|<div class="table_handle_btn infoSubmit" @click="infoSubmit">办理</div>|<div class="table_handle_btn batchDistribute" @click="getOperators" v-if="distributeIsAllowed">分配</div>
			</div> -->
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="50">序号</th>
						<th style="padding-left: 0">服务单号</th>
						<th class="minWidth">客户姓名</th>
						<th>注册手机号</th>
						<th class="minWidth">服务名称</th>
						<th class="minWidth">服务商名称</th>
						<th class="minWidth">代理顾问</th>
						<th>下单时间</th>
						<th class="minWidth">支付状态</th>
						<th class="minWidth">服务状态</th>
						<th class="minWidth">办理状态</th>
						<th width="60" style="padding-right: 17px;text-align: right;">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="alignc">{{item.number}}</td>
						<td style="padding-left: 0">{{item.order_sn}}</td>
						<td>{{item.buyer_name}}</td>
						<td>{{item.buyer_mobile}}</td>
						<td>{{item.bs_name}}</td>
						<td>{{item.sp_name}}</td>
						<td>{{item.operator_name || '未分配'}}</td>
						<td>{{item.create_time|dateFormat}}</td>
						<td :class="{pay:true, nopay: item.payment_state === 0}">{{item.payment_state === 0 ? '未支付' : '已支付'}}</td>
						<td>{{item.order_service_state|orderStatus}}</td>
						<td>{{item.order_feedback_state}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="view(item)">查看</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="12" class="norecord">
							<div class="empty_ic"><span>暂无信息</span></div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="my_loading" v-show="loading" v-loading="loading">
			</div>
			<div class="tb_pagination" v-if="!loading && dataList.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="pg_index"
					:page-size="pg_count"
					layout="total, prev, pager, next"
					:total="total" class="fr">
				</el-pagination>
			</div>
		</div>
		<!-- <el-dialog title="分配" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog">
			<div class="title_in distribute_in">
				<h5>请选择代理顾问：</h5>
				<div class="dialog_con_box" v-loading="distributeLoading">
					<el-radio-group v-model="operator_id">
						<el-radio class="radio" v-for="(item, index) in operatorData" :label="item.operator_id" :key="item.operator_id">{{item.trueName}}</el-radio>
					</el-radio-group>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible = false">取消</a><a href="" class="button yes" @click.prevent="distribute">确定</a></p>
			</div>
		</el-dialog>
		<el-dialog title="添加备注" :visible.sync="dialogVisible" size="tiny" class="memoDialog">
			<div class="memo_in">
				<h5>备注：</h5>
				<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const bsOrderListUrl = './api/findBsOrdersList';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const allOperatorUrl = './api/admins';
	const allSpUrl = './api/findAllSp'
	const payStatusOptions = [
		{
			value: '0',
			label: '未支付'
		}, {
			value: '1',
			label: '已支付'
		}
	];
	const typeobj = {//商品筛选
		fir_id:'',
		sec_id:'',
		thi_id:'',
		fou_id:'',
	};
	const dataObj = {//条件数据
		bs_order_sn:'',
		truename:'',
		phone: '',
		payment_state:'',
		operator_id:'',
		sp_id:''
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'order-list',
		data() {
			return {
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				activeName:'all',
				typeobj: Object.assign({}, typeobj), //商品分类联动对象
				firTypeData:[],
				secTypeData:[],
				thiTypeData: [],
				fouTypeData:[],
				dataObj: Object.assign({}, dataObj), //除时间和商品分类外的筛选条件
				order_state:'',
				order_tasking_state:'',
				order_service_state:'',
				payment_time: '',
				finished_time:'',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				payStatusOptions: payStatusOptions,
				dataList:[],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 10,
				total:0,
				operator_id:'',//代理顾问id
				operatorData: [],
				allSpData:[],
				allOperatorData:[],
				loading: false,
				userInfo:{},
			}
		},
		mounted() {
			this.userInfo = store.get('userinfo');
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			this.recoverQueryData()
			this.getAllSpData();
			this.getProductType();
			this.search();
			this.formatTabName();
		},
		methods: {
			spChange(id){
				if (id) {
					this.allOperatorData = [];
					this.dataObj.operator_id = '';
					this.getAllOperatorData(id);
				}
			},
			getAllSpData(){
				this.$http.get(allSpUrl)
				.then((resp) => {
					var data = resp.data;
					this.allSpData = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getAllOperatorData(id){
				this.$http.get(allOperatorUrl+'?sp_id='+id)
				.then((resp) => {
					var data = resp.data;
					this.allOperatorData = data.elements;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			//恢复路由上的查询参数
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				var typeobj = this.typeobj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				for (var m in typeobj){
					if (typeobj.hasOwnProperty(m)) {
						typeobj[m] = queryObj[m] ? queryObj[m] - 0 : '';
					}
				}
				this.finished_time = queryObj.finished_start_time && [new Date(queryObj.finished_start_time-0), new Date(queryObj.finished_end_time-86390000)];
				this.payment_time = queryObj.payment_start_time && [new Date(queryObj.payment_start_time-0), new Date(queryObj.payment_end_time-86390000)];

				this.order_service_state = queryObj.order_service_state;
				this.order_state = queryObj.order_state;
				this.order_tasking_state = queryObj.order_tasking_state;

				this.pg_index = queryObj.pg_index;
			},
			//查询条件整合
			search(extra){
				var ret = {}
				if (this.finished_time) {
					ret.finished_start_time = this.finished_time[0] ? new Date(this.finished_time[0]).getTime() : null;
					ret.finished_end_time = this.finished_time[1] ? new Date(this.finished_time[1]).getTime() + 86390000 : null;
				}
				if (this.payment_time) {
					ret.payment_start_time = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
					ret.payment_end_time = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
				}
				ret.bs_calss_id = this.typeobj.fou_id || this.typeobj.thi_id || this.typeobj.sec_id || this.typeobj.fir_id
				ret.bs_calss_type = this.typeobj.fou_id ? 4 : this.typeobj.thi_id ? 3 : this.typeobj.sec_id ? 2 : this.typeobj.fir_id ? 1 : ''
				ret.order_service_state = this.order_service_state;
				ret.order_state = this.order_state;
				ret.order_tasking_state = this.order_tasking_state;

				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.typeobj = Object.assign({}, typeobj);
				this.payment_time = '';
				this.finished_time = '';
				this.secTypeData = [];
				this.thiTypeData = [];
				this.fouTypeData = [];
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			formatTabName(){
				var queryObj = this.queryObj = this.$route.query;
				this.order_service_state = queryObj.order_service_state;
				var ret = 'all';
				if(this.order_service_state == '1'){
					ret = 'toService';
				}else if(this.order_service_state == '2'){
					ret = 'servicing';
				}else if(this.order_service_state == '3'){
					ret = 'serviceComplete';
				}else if(this.order_service_state == '4'){
					ret = 'serviceClose';
				}
				this.activeName = ret;
			},
			tabClick(tab, event) {
				this.order_service_state = '';
				if(tab.name == 'toService'){
					this.order_service_state = 1;
				}else if(tab.name == 'servicing'){
					this.order_service_state = 2;
				}else if(tab.name == 'serviceComplete'){
					this.order_service_state = 3;
				}else if(tab.name == 'serviceClose'){
					this.order_service_state = 4;
				}
				this.search(true);
			},
			//查询数据
			getOrderList(paramsData){
				paramsData = paramsData || {};
				this.loading = true;
				this.$http.get(bsOrderListUrl, {params: paramsData})
				.then((resp) => {
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					this.dataList = dataList;
					this.pg_index = data.pageNo || 1;
					this.total = data.total_elements;
					this.$router.replace({query: Object.assign({}, paramsData, this.typeobj)});
					this.notFirst = true;
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			view(item){
				//work_order_type: 0 默认; 1 创新保; 2 国内商标自助注册
				this.$router.push({name: 'bsOrderDetail', params: {id: item.order_id,type:item.work_order_type || 0}})
			},
			getselectedItemsPropertyByName(name){
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
			},
			//商品筛选切换
			bs_type_change (type, id, callback){
				//用于判定是否第一次用于记忆query参数
				var notFirst = this.notFirst;
				if (id) {
					if (type == 3) {
						this.$http.get(serviceStatusUrl, {
							params: {
								bsId: id
							}
						})
						.then((resp) => {
							var data = resp.data;
							this.fouTypeData = data.data;
							if (callback) {
								callback();
							}else{
								this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}else{
						this.$http.get(productUrl, {
							params: {
								type:type,
								parent_id: id
							}
						})
						.then((resp) => {
							var data = resp.data;
							if (type == 1) {
								this['secTypeData'] = data;
								if (callback) {
									callback();
								}else{

									this.typeobj.sec_id = notFirst ? '' : this.typeobj.sec_id || '';
									this.typeobj.thi_id = notFirst ? '' : this.typeobj.thi_id || '';
									this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
									if (!this.typeobj.thi_id || notFirst) {
										this['thiTypeData']= [];
									}
									if (!this.typeobj.fou_id || notFirst) {
										this['fouTypeData']= [];
									}
								}
							}else if(type == 2){
								this['thiTypeData'] = data;
								if (callback) {
									callback();
								}else{
									this.typeobj.thi_id = notFirst ? '' : this.typeobj.thi_id || '';
									this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
									if (!this.typeobj.fou_id || notFirst) {
										this['fouTypeData']= [];
									}
								}
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}
				}
			},

			//获取商品一级分类
			getProductType(){
				this.$http.get(businessesClassesUrl, {params: {bs_parent_id: 0}})
				.then((resp) => {
					var data = resp.data;
					this.firTypeData = data.elements;
					//this.typeobj.fir_id = this.queryObj.fir_id-0 || '';
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
			},

			inArrayOf(arr, sortItem, sortName){
				var ret = -1;
				arr.forEach((item, i) => {
					if (item[sortName] == sortItem[sortName]) {
						ret = i;
						return false;
					}
				});
				return ret;
			},
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStatusformat: Filters.orderStatusformat,
			payStatusformat: Filters.payStatusformat,
			priceformat:Filters.priceformat,
			titleLengthFormat:Filters.titleLengthFormat,
			orderStatus:Filters.orderStatus,
		},
		watch:{
			/*$route(to, from) {
				console.log(3)
				if (to.query.selfChange) {
					return;
				}
				this.formatTabName();
				this.recoverQueryData()
				this.search();
			}*/
		}
	}
</script>
<style lang='less'>
.commonListAll{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow: hidden;padding:0 10px 20px 10px;margin-top: -10px;
	.commonListHead{
		position: relative;
		height: 50px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 0;}
		.el-tabs__item{padding: 0 20px;height: 50px;line-height: 50px;}
	}
	.condition{
		padding-left: 0;padding-top: 15px;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{height: 30px!important;border-radius:2px;font-size:13px;}
		}
		.data_picker{
			width: 220px;
			.el-date-editor--daterange.el-input{
				width: 220px;
			}
		}
		.form_submit{
			float: left;
			button{float: left;width: 88px;height: 30px;line-height: 30px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
			.submit{}
			.reset{background-color: #fff;color:#479CFF;}
			.submit:hover{border-color: #408CE6;background-color: #408CE6;}
			.reset:hover{border-color: #408CE6;color: #408CE6;}
		}
	}
	.result{
		padding: 10px 0 0 0;
		.table_handle{
			height: 50px;background: #F9F9F9;border: 1px solid #DFE2E5;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#DFE2E5;line-height: 20px;vertical-align: top;
			.all{
				margin-left: 20px;height: 20px;display: inline-block;
				.el-checkbox{height: 20px;vertical-align: top;}
			}
			.table_handle_btn{margin-left: 20px;margin-right: 20px;font-size: 14px;color:#479CFF;display: inline-block;display: inline-block;cursor: pointer;}
			.batch{}
		}
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.minWidth{min-width: 60px;}
					th.alignc{text-align: center;}
					th.alignr{text-align: right;}
					th.paddingR{padding-right: 10px;}
					th.paddingL{padding-left: 10px;}
					th.minWidth.paddingR{min-width: 70px;}
					th.minWidth.paddingL{min-width: 70px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;
						.el-checkbox{position: relative;top: -1px;}
					}
					td.check_wrap{padding-left: 20px;padding-right: 20px;width: 16px;}
					td.minWidth{min-width: 60px;}
					td.alignc{text-align: center;}
					td.alignr{text-align: right;}
					td.paddingR{padding-right: 10px;}
					td.paddingL{padding-left: 10px;}
					td.action{
						a{color: #479CFF;}
						a:hover{text-decoration: none;color: #408CE6;}
					}
					td.pay{color: #36AF47;}
					td.nopay{color: #F64744;}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
		.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0;}
		}
	}

	.distributeDialog{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio-group{line-height: 18px;}
					.el-radio{width: 96px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}

	.memoDialog{
		.el-dialog{
			width: 500px;height: 256px;
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{font-size: 14px;}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.el-textarea{margin-top: 10px;}
			}
		}
	}

}
.dialog_con_box .circular{width: 30px;height: 30px;}
</style>

<template>
	<div class="commonListAll uploadRecordList">
		<!-- <div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="待服务" name="toService"></el-tab-pane>
				<el-tab-pane label="服务中" name="servicing"></el-tab-pane>
				<el-tab-pane label="服务完成" name="serviceComplete"></el-tab-pane>
				<el-tab-pane label="服务关闭" name="serviceClose"></el-tab-pane>
			</el-tabs>
		</div> -->
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.orderSn" placeholder="服务单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.acceptMaterials" placeholder="申请号"></el-input></div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="createTime"
					type="daterange"
					align="right"
					placeholder="操作时间开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.fileType" clearable placeholder="选择官文类型">
					<el-option
						v-for="item in fileTypesOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.operatorName" clearable placeholder="请选择操作人"> <!-- :disabled="!allOperatorData.length" -->
					<el-option
						 v-for="(item, index) in allOperatorData" :label="item.operatorName" :value="item.operatorName " :key="item.operatorName">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
		</div>
		<div class="result">
			<div class="table_handle">
				<div class="table_handle_btn batch" @click="getRecordList">下载历史上传记录</div>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="50">序号</th>
						<th style="padding-left: 0">操作时间</th>
						<th style="padding-left: 0">官文类型</th>
						<th class="minWidth">操作人</th>
						<th>服务单号</th>
						<th class="minWidth">申请号</th>
						<th class="minWidth">服务状态</th>
						<th class="minWidth">办理状态</th>
						<th class="alignc action">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="alignc">{{item.number}}</td>
						<td>{{item.createTime|dateFormat}}</td>
						<td>{{item.fileType}}</td>
						<td>{{item.operatorName}}</td>
						<td style="padding-left: 0">{{item.orderSn}}</td>
						<td style="padding-left: 0">{{item.acceptMaterials}}</td>
						<td>{{item.serviceState|orderStatus}}</td>
						<td>{{item.feedbackName}}</td>
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

		<el-dialog title="历史上传记录" :visible.sync="recordVisible" :modal-append-to-body="true" top="50%" class="distributeDialog" :close-on-click-modal="false">
			<div class="title_in distribute_in" v-loading="recordLoading">
				<table class="record_table">
					<thead>
						<tr>
							<th>上传编号</th>
							<th>时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in historyListData">
							<td>{{item.uploadNumber}}</td>
							<td>{{item.createTime|dateFormat}}</td>
							<td><a :href="item.excelUrl">下载</a></td>
						</tr>
					</tbody>
				</table>
				<div class="tb_pagination">
					<el-pagination
						@current-change="recordCurrentChange"
						:current-page.sync="recordPage"
						:page-size="pg_count"
						layout="total, prev, pager, next"
						:total="recordTotal">
					</el-pagination>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const listUrl = './api/findAutoUploadRecord';
	const historyListUrl = './api/findAutoUploadHistory';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const allOperatorUrl = './api/findAutoUploadOperator';
	const allSpUrl = './api/findAllSp'
	const fileTypesOptions = [
		{
			value: '1',
			label: '申请受理通知书'
		}, {
			value: '2',
			label: '初审公告通知书'
		}, {
			value: '3',
			label: '申请号回执单'
		}, {
			value: '4',
			label: '商标驳回通知书'
		}, {
			value: '5',
			label: '商标部分驳回通知书'
		}, {
			value: '6',
			label: '商标注册证'
		}
	];

	const dataObj = {//条件数据
		orderSn:'',
		acceptMaterials:'',
		fileType: '',
		operatorName:'',
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'record-list',
		data() {
			return {
				recordLoading: false,
				historyListData:[],
				fileTypesOptions:fileTypesOptions,
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				dataObj: Object.assign({}, dataObj), //除时间和商品分类外的筛选条件
				createTime: '',
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
				dataList:[],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				allOperatorData:[],
				loading: false,
				userInfo:{},

				recordPage: 1,
				recordCount: 15,
				recordTotal:0,
				recordVisible: false
			}
		},
		mounted() {
			this.userInfo = store.get('userinfo');
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			this.recoverQueryData()
			//this.getAllSpData();
			this.getAllOperatorData();
			this.search();
		},
		methods: {
			getRecordList(){
				this.recordVisible = true;
				this.getHistoryList();
			},
			getHistoryList(){
				if (this.recordLoading) {
					return;
				}
				this.recordLoading = true;
				this.$http.post(historyListUrl, {
					pg_index: this.recordPage,
					pg_count: this.recordCount
				})
				.then((resp) => {
					this.recordLoading = false;
					var data = resp.data;
					this.historyListData = data.elements;
					this.recordPage = data.page || 1;
					this.recordTotal = data.total_elements;
				})
				.catch((err) => {
					this.recordLoading = false;
					console.log(err);
				});
			},
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
			getAllOperatorData(){
				this.$http.get(allOperatorUrl)
				.then((resp) => {
					var data = resp.data;
					this.allOperatorData = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			//恢复路由上的查询参数
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				this.createTime = queryObj.createTimeStart && [new Date(queryObj.createTimeStart-0), new Date(queryObj.createTimeEnd-86390000)];
				this.pg_index = queryObj.pg_index;
			},
			//查询条件整合
			search(extra){
				var ret = {}
				if (this.createTime) {
					ret.createTimeStart = this.createTime[0] ? new Date(this.createTime[0]).getTime() : null;
					ret.createTimeEnd = this.createTime[1] ? new Date(this.createTime[1]).getTime() + 86390000 : null;
				}
				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getList(data);
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.createTime = '';
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			recordCurrentChange(val) {
				this.recordPage = val;
				this.getHistoryList();
			},
			//查询数据
			getList(paramsData){
				paramsData = paramsData || {};
				this.loading = true;
				this.$http.post(listUrl, paramsData)
				.then((resp) => {
					this.loading = false;
					var data = resp.data;
					if (!data) {
						this.$message.error('数据异常！');
						return;
					}
					var dataList = data.elements;
					this.dataList = dataList;
					this.pg_index = data.page || 1;
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
				this.$router.push({name: 'reportDetail', params: {id: item.orderSn}, query: {menu: item.menu}});
			},
			getselectedItemsPropertyByName(name){
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
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
		}
	}
</script>
<style lang='less'>
	.uploadRecordList{
		.distributeDialog{
			.el-dialog{
				width: 500px!important;
				.distribute_in{
					.record_table{
						width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;border-collapse: collapse;
						thead{
							height: 40px;overflow:hidden;border: 1px solid #DFE2E5;
							tr{
								height: 40px;overflow:hidden;
								th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 10px;}
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
								height: 40px;border: 1px solid #DFE2E5;background-color: #fff;
								td{
									min-height: 40px;font-size: 13px;color: #556677;padding:5px 10px;
								}
							}
						}
					}
					.tb_pagination{padding-top:10px;}
				}
			}
		}
	}
</style>

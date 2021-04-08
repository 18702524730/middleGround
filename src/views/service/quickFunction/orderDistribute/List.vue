<template>
	<div class="orderDistribute">
		<div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="未分配" name="0"></el-tab-pane>
				<el-tab-pane label="已分配" name="1"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<!-- <div class="form_control">
				<el-select v-model="dataObj.isDistribute" clearable placeholder="分配状态">
					<el-option
						v-for="item in distributeStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div> -->
			<div class="form_control"><el-input v-model="dataObj.workOrderSn" placeholder="订单号"></el-input></div>
			<div class="form_control" style="width: 200px;">
				<el-select v-model="dataObj.spName" filterable clearable placeholder="请选择服务商">
			    <el-option
			      v-for="(item, index) in allSpData"
			      :key="item.sp_id"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.cxbWorkOrderCategory" clearable placeholder="请选择类别">
					<el-option label="商标" value="1"></el-option>
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
						<!-- <th class="alignc" width="50">序号</th> -->
						<th style="padding-left: 30px">单号</th>
						<th class="minWidth">类别</th>
						<th>申请时间</th>
						<th class="minWidth">服务商</th>
						<th class="minWidth">分配时间</th>
						<th class="alignc action">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<!-- <td class="alignc">{{item.number}}</td> -->
						<td style="padding-left: 30px" ><a @click.prevent="goOrderFn(item)">{{item.workOrderSn}}</a></td>
						<td>{{item.cxbWorkOrderCategory == 1 ? '商标' : '--'}}</td>
						<td>{{item.createTime|dateFormat}}</td>
						<td>{{item.spName}}</td>
						<td>{{item.distributeSpTime|dateFormat}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="distribute(item)" v-if="!item.isDistribute">分配</a>
							<a href="#" class="view" @click.prevent="reback(item)" v-if="item.isDistribute">回收</a>
							<a href="#" class="view" @click.prevent="distribute(item)" v-if="item.isDistribute">重新分配</a>
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
		<el-dialog title="分配服务商" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog" :close-on-click-modal="false">
			<div class="title_in distribute_in">
				<h5>请选择创新保服务商：</h5>
				<div class="dialog_con_box" v-loading="distributeLoading">
					<el-select v-model="sp_id" filterable clearable placeholder="请选择">
				    <el-option
				      v-for="(item, index) in allSpData"
				      :key="item.sp_id"
				      :label="item.name"
				      :value="item.sp_id">
				    </el-option>
				  </el-select>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible = false">取消</a><a href="" class="button yes" @click.prevent="confirm">确定</a></p>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const bsOrderListUrl = './api/findCxbWorkOrderDistributeList';
	const rebackUrl = './api/cxbWorkOrderRebackService';
	const allSpUrl = './api/findAllCxbServiceProvider';
	const distributeUrl = './api/rebuildCxbServiceProvider';

	const distributeStatusOptions = [
		{
			value: '0',
			label: '未分配'
		}, {
			value: '1',
			label: '已分配'
		}
	];

	const dataObj = {//条件数据
		workOrderSn:'',
		isDistribute:'',
		spName: '',
		cxbWorkOrderCategory:'',
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'order-list',
		data() {
			return {
				isClicked: false,
				curItem: {},
				sp_id:'',
				distributeVisible:false,
				distributeLoading: false,
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				activeName:'0',
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
				distributeStatusOptions: distributeStatusOptions,
				dataList:[],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 15,
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
			this.dataObj.isDistribute = 0;
			this.search(true);
		},
		methods: {
			// 去工单详情页
			goOrderFn (item) {
				this.$router.push({name: 'CXBOrderDetail', params: {id: item.workOrderSn,state:item.throughState}})
			},
			tabClick(tab, event) {
				this.dataObj.isDistribute = tab.name;
				this.search(true);
			},
			confirm(){
				if (!this.sp_id) {
					this.$message.error('请选择服务商');
					return;
				}
				if (this.isClicked) {
					return;
				}
				this.isClicked = true;
				this.$http.get(distributeUrl, {
					params: {
						spId: this.sp_id,
						workOrderSn: this.curItem.workOrderSn
					}
				})
				.then((resp) => {
					this.isClicked = false;
					this.sp_id = '';
					this.$message({
            type: 'success',
            message: '分配成功!'
          });
          this.distributeVisible = false;
          this.search();
				})
				.catch((err) => {
					this.isClicked = false;
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
			//恢复路由上的查询参数
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}

				this.pg_index = queryObj.pg_index;
			},
			//查询条件整合
			search(extra){
				var ret = {}
				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
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
					this.$router.replace({query: Object.assign({}, paramsData)});
					this.notFirst = true;
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			reback(item){
				this.$confirm('确定回收该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'mini_dialog'
        }).then(() => {
        	this.$http.get(rebackUrl, {params: {workOrderSn: item.workOrderSn}})
					.then((resp) => {
						this.$message({
	            type: 'success',
	            message: '回收成功!'
	          });
	          this.search();
					})
					.catch((err) => {
						console.log(err);
					});
        }).catch(() => {
        });
			},
			distribute(item){
				this.curItem = item;
				this.distributeVisible = true;
				//this.$router.push({name: 'bsOrderDetail', params: {id: item.order_id,type:0}})
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
.orderDistribute{
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
		/* .table_handle{
			height: 50px;background: #F9F9F9;border: 1px solid #DFE2E5;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#DFE2E5;line-height: 20px;vertical-align: top;
			.all{
				margin-left: 20px;height: 20px;display: inline-block;
				.el-checkbox{height: 20px;vertical-align: top;}
			}
			.table_handle_btn{margin-left: 20px;margin-right: 20px;padding-left:24px;font-size: 14px;color:#479CFF;display: inline-block;background: transparent url(~assets/img/myServiceOrder/batch.png) 0 center no-repeat;display: inline-block;cursor: pointer;}
			.batch{background-image: url(~assets/img/myServiceOrder/batch.png);}
			.infoSubmit{background-image: url(~assets/img/myServiceOrder/infoSubmit.png);}
		} */
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
			width: 420px;height: 180px;transform:translate(-50%,-50%);overflow: hidden;
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-input{width: 302px;margin-bottom: 10px;}
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

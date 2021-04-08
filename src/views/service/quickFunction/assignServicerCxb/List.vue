<template>
	<div class="commonListAll assignServicerCxb">
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.applyName" placeholder="申请人"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.applyMarkNum" placeholder="证件号"></el-input></div>
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
						<th class="minWidth maxWidth" width="300">申请人</th>
						<th class="minWidth">申请类型</th>
						<th style="padding-left: 0">证件号</th>
						<th class="minWidth">指定服务商</th>
						<th class="alignc action" width="120">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="alignc">{{item.seqNo}}</td>
						<td class="minWidth maxWidth" style="padding-left: 0">{{item.applyName}}</td>
						<td>{{item.applyType|subjectTypeCxbFormat}}</td>
						<td>{{item.applyMarkNum}}</td>
						<td>{{item.spName}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="distribute(item)">修改指定服务商</a>
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
	const listUrl = './api/findCxbCockleApplicant';
	const allSpUrl = './api/findAllCxbServiceProvider';
	const distributeUrl = './api/updateCxbCockleApplicant';

	const dataObj = {//条件数据
		applyName:'',
		applyMarkNum:'',
		spName: '',
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'order-list',
		data() {
			return {
				curItem:{},
				isClicked: false,
				sp_id:'',
				distributeVisible:false,
				distributeLoading: false,
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				dataObj: Object.assign({}, dataObj), //除时间和商品分类外的筛选条件
				dataList:[],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				allSpData:[],
				loading: false,
				userInfo:{},
			}
		},
		mounted() {
			this.userInfo = store.get('userinfo');
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			this.recoverQueryData()
			this.getAllSpData();
			this.search();
		},
		methods: {
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
						id: this.curItem.id
					}
				})
				.then((resp) => {
					this.isClicked = false;
					this.sp_id = '';
					this.$message({
            type: 'success',
            message: '修改成功!'
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
				this.$http.get(listUrl, {params: paramsData})
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
			distribute(item){
				this.distributeVisible = true;
				this.curItem = item;
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
			subjectTypeCxbFormat: Filters.subjectTypeCxbFormat,
			priceformat:Filters.priceformat,
			titleLengthFormat:Filters.titleLengthFormat,
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
.assignServicerCxb{
	.result{
		.result_type{
			thead{
				tr{
				}
			}
			tbody{
				tr{
					td.action{
						width: 140px;
						a{color: #479CFF;}
						a:hover{text-decoration: none;color: #408CE6;}
					}
					td.maxWidth{max-width: 300px;word-break: break-all;}
				}
			}
			tfoot{

			}
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
}
</style>

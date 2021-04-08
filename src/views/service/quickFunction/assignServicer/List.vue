<template>
	<div class="commonListAll assignServicerList">
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.code" placeholder="用户编码"></el-input></div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<!-- <button class="reset" @click="reset()">重置</button> -->
			</div>
		</div>
		<div class="result">
			<!-- <div class="table_handle">
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batch" @click="batch">接单</div>|<div class="table_handle_btn infoSubmit" @click="infoSubmit">办理</div>|<div class="table_handle_btn batchDistribute" @click="getOperators" v-if="distributeIsAllowed">分配</div>
			</div> -->
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="60">序号</th>
						<th class="alignc">用户编码</th>
						<th class="alignc">已指定服务</th>
						<th class="alignc action" width="200">创建时间</th>
						<th class="alignc action">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="alignc">{{item.number}}</td>
						<td class="alignc">{{item.apply_code}}</td>
						<td class="alignc">{{item.designation_sp_count}}</td>
						<td class="alignc action">{{item.create_time|dateFormat}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="edit(item)">编辑</a>
							<a href="#" class="ml10 view" @click.prevent="appoint(item)">指定服务商</a>
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

		<el-dialog title="编辑" :visible.sync="editVisible" :modal-append-to-body="true" top="50%" class="distributeDialog" :close-on-click-modal="false">
			<div class="title_in distribute_in">
				<h5>用户编码：</h5>
				<div class="dialog_con_box">
					<el-input v-model="code" placeholder="请输入用户编码"></el-input>
				</div>
				<p><a href="" class="button no" @click.prevent="editVisible = false">取消</a><a href="" class="button yes" @click.prevent="confirm">确定</a></p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const listUrl = './api/members/assign/service';

	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';


	const allOperatorUrl = './api/admins';
	const allSpUrl = './api/findAllSp'

	const dataObj = {//条件数据
		code:'',
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'order-list',
		data() {
			return {
				code:'',
				editVisible:false,
				isClicked: false,
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				dataObj: Object.assign({}, dataObj), //除时间和商品分类外的筛选条件
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
			this.search();
		},
		methods: {
			edit(item){
				this.editVisible = true;
				this.curItem = item;
				this.code = item.apply_code;
			},
			confirm(){
				if (!this.code) {
					this.$message.error('用户编码不能为空');
					return;
				}
				if (this.isClicked) {
					return;
				}
				this.isClicked = true;
				var data = Object.assign({}, this.curItem);
				data.apply_code = this.code;
				this.$http.put(listUrl + '/' + this.curItem.designation_id, data)
				.then((resp) => {
					this.isClicked = false;
					var data = resp.data;
					this.editVisible = false;
					this.$message.success('编辑成功');
					this.search();
				})
				.catch((err) => {
					this.isClicked = false;
					var data = err.response.data;
					this.$message.error(data.msg);
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
				this.getList(data);
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			//查询数据
			getList(paramsData){
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
			appoint(item){
				this.$router.push({name: 'assignServicerEdit', params: {
					id: item.designation_id,
					code: item.apply_code
				}})
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
.assignServicerList{
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
					.el-input{width: 380px;margin-bottom: 10px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}
}
</style>

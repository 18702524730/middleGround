<template>
	<div class="reportCommonList clientServiceOrder">
		<!-- <div class="commonListHead clientServiceOrderHead">
					<el-tabs v-model="activeName" @tab-click="tabClick">
						<el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
					</el-tabs>
				</div> -->
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.orderSn" placeholder="服务单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.trademarkName" placeholder="商标名称"></el-input></div>
			<div class="form_control">
				<el-select clearable v-model="dataObj.intCls" placeholder="请选择商标分类">
					<el-option
						v-for="item in intClsData"
						:key="item.id"
						:label="(item.id < 10 ? '0' + item.id : item.id) + '.'+ item.goodsname"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select clearable v-model="dataObj.spId" placeholder="请选择服务商">
					<el-option
						v-for="item in spIdOptions"
						:key="item.sp_id"
						:label="item.name"
						:value="item.sp_id+''">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select clearable v-model="dataObj.entrustedUnit" placeholder="请选择被委托单位">
					<el-option
						v-for="item in entrustedUnitOptions"
						:key="item.entrustedUnitShort"
						:label="item.entrustedUnitShort"
						:value="item.entrustedUnit">
					</el-option>
				</el-select>
			</div>
			<div class="form_control"><el-input v-model="dataObj.memberName" placeholder="用户姓名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="注册手机号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.trademarkSubjectName" placeholder="申报主体"></el-input></div>
			<div class="form_control">
				<el-select clearable v-model="dataObj.bsId" placeholder="请选择商品名称">
					<el-option :value="1" label="国内商标注册申请"></el-option>
					<el-option :value="111" label="国内商标自助注册"></el-option>
					<el-option :value="109" label="创新保国内商标"></el-option>
				</el-select>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="declarationTime"
					type="daterange"
					align="right"
					placeholder="办理时间开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<!-- <div class="form_control" v-if="menu==3">
				<el-select clearable v-model="dataObj.declarationStatus" placeholder="请选择办理状态">
					<el-option
						v-for="item in declarationStatusOptions"
						v-if="item.bs_feedback_id==625||item.bs_feedback_id==619"
						:key="item.name"
						:label="item.name"
						:value="item.name">
					</el-option>
				</el-select>
			</div> -->
			<div class="form_control" v-if="menu==10">
				<el-select clearable v-model="dataObj.closedType" placeholder="办理状态">
					<el-option
						v-for="item in closedTypeOptions"
						:key="item.name"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
		</div>
		<div class="result">
			<div class="table_handle">
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batch" @click="batch">批量下载附件</div>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th width="30"></th>
						<th class="alignc" width="50">序号</th>
						<th width="130">服务单号</th>
						<th class="minWidth">商标名称</th>
						<th width="100">商标分类</th>
						<th>图样</th>
						<th class="minWidth">服务商名称</th>
						<th class="minWidth maxWidth">被委托单位</th>
						<th class="alignc minWidth" style="padding:0 10px;">小项数</th>
						<th class="alignc minWidth">办理时间</th>
						<th width="100">办理状态</th>
						<th class="alignc" width="105">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="alignc"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
						<td class="alignc">{{item.number}}</td>
						<td>{{item.orderSn}}</td>
						<td><span class="subjectName" :title="item.trademarkName">{{item.trademarkName|titleLengthFormat(20)}}</span></td>
						<td>{{getTmInfo(item.intCls)}}</td>
						<td><img v-if="item.blackWhitePicUrl" :src="item.blackWhitePicUrl" width="48" height="48"><img v-if="item.specifyPicUrl" :src="item.specifyPicUrl" width="48" height="48"></td>
						<td>{{item.spName}}</td>
						<td class="minWidth maxWidth">{{item.entrustedUnitShort}}</td>
						<td class="alignc" style="padding:0 10px;">{{item.minNumber}}</td>
						<td class="alignc">{{item.declarationDate|dateFormat}}</td>
						<td>{{item.declarationStatus}}</td>
						<td class="action">
							<a href="" class="view" @click.prevent="view(item.orderSn)">查看</a>
							<a href="" class="view" @click.prevent="download(item.orderSn)">下载附件</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="13" class="norecord">
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
	</div>
</template>

<script>
	import qs from 'qs'
	import $ from 'jquery'
	import Filters from 'utils/filters/'
	import intClsData from 'utils/intClsData.js'
	import VueCookie from 'vue-cookie'
	const workOrderListUrl = './api/findTrademarkList';
	const detailUrl = './api/findWorkOrderDetail';
	const spListUrl = './api/findAllSp';
	const entrustedUnitListUrl = './api/findAllentrustedUnit';
	const attachmentsUrl = CONFIG.rootUrl + '/api/attachments';
	const declarationStatusListUrl = './api/getTmFeedbackList';
	const closedType = [
		{
			value: '625',
			name: '625',
			label: '不予受理'
		}, {
			value: '638',
			name: '638',
			label: '驳回复审不通过'
		}, {
			value: '639',
			name: '639',
			label: '不参与驳回复审'
		}, {
			value: '641',
			name: '641',
			label: '异议答辩失败'
		}, {
			value: '642',
			name: '642',
			label: '不参与异议答辩'
		}, {
			value: '222',
			name: '222',
			label: '服务单关闭'
		}, {
			value: '643',
			name: '643',
			label: '审核不通过'
		}
	];

	const dataObj = {//条件数据
		bsId:'',
		regInfo:'',
		declarationStatus:'',
		memberName: '',
		memberPhone:'',
		trademarkSubjectName:'',
		spId:'',
		entrustedUnit:'',
		orderSn:'',
		trademarkName:'',
		intCls:'',
		closedType:''
	};

	export default {
		name: 'work-order-list',
		data() {
			return {
				intClsData: intClsData.cateIdData,
				spIdOptions:[],
				entrustedUnitOptions:[],
				queryObj: {},
				activeName:'all',
				dataObj: Object.assign({}, dataObj),
				handleEnd: '',
				menu:'1',
				selectedItems:[],
				checkAll:false,
				isIndeterminate:false,

				declarationTime: '',
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
				declarationStatusOptions: [],
				closedTypeOptions:closedType,
				dataList:[],
				currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				dialogVisible:false,
				allotVisible: false,
				content:'', //备注
				loading: false
			}
		},
		mounted() {
			this.getEntrustedUnitList();
			this.getSpList();
			this.getDeclarationStatusList();
			this.recoverQueryData();
			this.search();
		},
		methods: {
			getTmInfo(item){
				if(item){
					var str = (item < 10 ? '0' + item : item) + '.' + this.intClsData[item-1]['goodsname'];
					return str;
				}else{
					var str = '--';
					return str;
				}
			},
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				dataObj['intCls'] = queryObj['intCls'] ? queryObj['intCls']-0 : '';
				dataObj['bsId'] = queryObj['bsId'] ? queryObj['bsId']-0 : '';
				this.declarationTime = queryObj.declarationTimeStart && [new Date(queryObj.declarationTimeStart-0), new Date(queryObj.declarationTimeEnd-86390000)];

				this.menu = queryObj.menu || '1';
				this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
			},
			search(extra){
				var ret = {}
				if (this.declarationTime && this.declarationTime[0]) {
					ret.declarationTimeStart = new Date(this.declarationTime[0]).getTime();
					ret.declarationTimeEnd = new Date(this.declarationTime[1]).getTime() + 86390000;
				}else{
					ret.declarationTimeStart = null;
					ret.declarationTimeEnd = null;
				}

				ret.menu = this.menu || '1';

				this.dataObj.menu = ret.menu;

				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				// this.$router.replace({query: Object.assign({}, data)});
				// this.getOrderList(data);
				//console.log(data)
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, {selfChange: 1})});
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.declarationTime = '';
			},
			checkIsAllSelected(){
				var dataList = this.dataList;
				var temp = 0;
				dataList.forEach((item, i) => {
					if (item.checked) {
						temp += 1;
					}
				});
				return temp === dataList.length
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
			handleCheckChange(item){
				var arr = this.selectedItems;
				var idx = this.inArrayOf(arr, item, 'orderSn');
				if (idx != -1) {
					arr.splice(idx, 1);
				}else{
					arr.push(item);
				}
				if (!item.checked) {
					this.isIndeterminate = true;
				}else if(this.checkIsAllSelected()){
					this.isIndeterminate = false;
				}
			},
			handleAllCheckChange(){
				this.isIndeterminate = false;
				var self = this;
				var arr = this.selectedItems;
				var dataList = this.dataList;
				//处理选中的数据
				dataList.forEach((item, i) => {
					var idx = self.inArrayOf(arr, item, 'orderSn');
					if (self.checkAll) {
						item.checked = true;
						if (idx == -1) {
							arr.push(item);
						}
					}else{
						item.checked = false;
						if (idx != -1) {
							arr.splice(idx, 1);
						}
					}
				});
			},
			download(orderSnList){
				var access_token = VueCookie.get('token');
				location.href = attachmentsUrl + '?orderSnList=' + orderSnList + '&access_token=' + access_token;
			},
			//批量下载
			batch(){
				if (!this.selectedItems.length) {
					this.$message('请选择服务单');
					return;
				}
				var getOrderSnList = (arr) => {
					var temp = [];
					arr.forEach((item, idx) => {
						temp.push(item.orderSn)
					});
					return temp.join();
				}
				this.download(getOrderSnList(this.selectedItems));
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			getDeclarationStatusList(data){
				this.$http.get(declarationStatusListUrl)
				.then((resp) => {
					var data = resp.data;
					if (data.code == 0) {
						this.declarationStatusOptions = data.data;
					}
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getSpList(data){
				this.$http.get(spListUrl)
				.then((resp) => {
					var data = resp.data;
					this.spIdOptions = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getEntrustedUnitList(data){
				this.$http.get(entrustedUnitListUrl)
				.then((resp) => {
					var data = resp.data;
					this.entrustedUnitOptions = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.get(workOrderListUrl, {params: data})
				.then((resp) => {
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'orderSn');
						item.checked = idx != -1;
					});
					this.dataList = dataList;
					this.total = data.total_elements;
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			view(orderSn){
				var menu = this.menu;
				var query = {
					menu: menu
				}
				if (menu == 1) {
					query = {};
				}
				this.$router.push({name: 'reportDetail', params: {id: orderSn}, query: query })
			},
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStatusformat: Filters.orderStatusformat,
			payStatusformat: Filters.payStatusformat,
			priceformat:Filters.priceformat,
			titleLengthFormat:Filters.titleLengthFormat
		},
		watch:{
			$route(to, from) {
				if (to.query.selfChange) {
					return;
				}
				this.dataList=[];
				this.recoverQueryData()
				this.search();
			}
		}
	}
</script>
<style lang='less'>
.reportCommonList{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow: hidden;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
	.condition{
		padding-left: 10px;padding-top: 5px;
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
			button{float: left;width: 88px;height: 30px;line-height: 28px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
			.submit{}
			.reset{background-color: #fff;color:#479CFF;}
		}
	}
	.result{
		padding: 10px 10px 0 10px;
		.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
		.el-checkbox__inner::after{left: 4px;top: 0;}
		.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36AF47;border-color: #36AF47;}
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
						.el-checkbox{position: relative;top: -2px;}
					}
					td.minWidth{min-width: 60px;}
					td.alignc{text-align: center;}
					td.alignr{text-align: right;}
					td.paddingR{padding-right: 10px;}
					td.paddingL{padding-left: 10px;}
					td.action{
						a{color: #479CFF;}
					}
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
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{
				font-size: 14px;
				.el-dialog__close{font-size: 12px;}
			}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio{width: 92px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
			}
			.dialog-footer{
				.el-button{width: 88px;height: 30px;padding:8px 15px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height: 14px; }
				.el-button--primary{background: #479CFF;border-radius: 2px;color: #fff;}
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
.clientServiceOrder{
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;}
				}
			}
		}
	}
}
</style>

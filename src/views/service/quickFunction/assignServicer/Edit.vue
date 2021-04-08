<template>
	<div class="commonListAll assignServicerEdit">
		<div class="result">
			<div class="condition_top">
				<label>用户编码：</label>
				<div class="form_control" style="font-size: 14px;width: 130px;">
					{{code}}
			  </div>
				<label>渠道：</label>
				<div class="form_control">

					<el-select v-model="dataObj.channel" placeholder="请选择" @change="channelChange">
				    <el-option
				      v-for="item in channelsData"
				      :key="item.channel_id"
				      :label="item.name"
				      :value="item.channel_id">
				    </el-option>
				  </el-select>
			  </div>

				<label>服务分类：</label>
			  <div class="form_control">
					<el-select v-model="typeobj.fir_id" clearable placeholder="请选择服务分类" @change="typeChange({type: 1, id: typeobj.fir_id})">
						<el-option
							v-for="item in firTypeData"
							:key="item.bs_class_id"
							:label="item.name"
							:value="item.bs_class_id">
						</el-option>
					</el-select>
				</div>
				<div class="form_control" v-if="secTypeData.length">
					<el-select v-model="typeobj.sec_id" clearable placeholder="请选择商品类别" @change="typeChange({type: 2, id: typeobj.sec_id})">
						<el-option
							v-for="item in secTypeData"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
				<button class="allservice" @click="reset">全部服务</button>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="100">渠道</th>
						<th class="alignc minWidth" width="300">服务分类</th>
						<th style="padding-left: 0" width="200">服务</th>
						<th style="padding-left: 0" width="200">服务商</th>
						<th class="alignc action">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in businessesData" v-show="!loading && businessesData.length">
						<td class="alignc">{{item.channel_name}}</td>
						<td class="alignc">{{item.bs_class_name}}</td>
						<td style="padding-left: 0">{{item.name}}</td>
						<td style="padding-left: 0">{{item.sp_name}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="appoint(item)">指定</a>
							<a v-if="item.sp_name" href="#" class="ml10 view" @click.prevent="cancelAppoint(item)">取消指定</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !businessesData.length">
						<td colspan="12" class="norecord">
							<div class="empty_ic"><span>暂无信息</span></div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="my_loading" v-show="loading" v-loading="loading">
			</div>
			<div class="tb_pagination" v-if="!loading && businessesData.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="pg_index"
					:page-size="pg_count"
					layout="total, prev, pager, next"
					:total="total" class="fr">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="指定服务商" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog" :close-on-click-modal="false">
			<div class="title_in distribute_in">
				<!-- <h5>请选择或搜索服务商：</h5> -->
				<div class="dialog_con_box">
					<el-select v-model="sp_id" filterable clearable placeholder="请选择或搜索服务商">
				    <el-option
				      v-for="(item, index) in allSpData"
				      :key="item.sp_id"
				      :label="item.name"
				      :value="item.sp_id">
				    </el-option>
				  </el-select>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible=false">取消</a><a href="" class="button yes" @click.prevent="confirm">确定</a></p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const channelUrl = './api/channels/all';

	//const bsOrderListUrl = './api/findBsOrdersList';
	const businessesClassesUrl = './api/businesses_classes';//获取服务分类
	const productUrl = './api/product'; //获取服务分类下的商品分类
	const businessUrl = './api/common/businesses'; //获取对应渠道的服务
	const assignServiceUrl = './api/members/assign/@id/service'; //获取已指定的服务商列表

	const appointUrl = './api/members/assign/service/@id';
	const cancelAppointUrl = './api/members/assign/service';
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
		channel:'',
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	export default {
		name: 'order-list',
		data() {
			return {
				curItem: {},
				bs_class_id: '',
				channel_name:'', //渠道名称
				code: '', //用户编码
				sp_id:'', //选择的服务商id
				isClicked: false,
				distributeVisible:false,
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
				businessesData:[],
				assignServiceListData: [],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				operator_id:'',//代理顾问id
				operatorData: [],
				allSpData:[],
				channelsData:[],
				allOperatorData:[],
				loading: true,
				userInfo:{},
			}
		},
		mounted() {
			this.userInfo = store.get('userinfo');
			this.code = this.$route.params.code;
			this.id = this.$route.params.id;
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			this.recoverQueryData()
			this.getAllSpData();
			this.getChannels();
			this.search();
			this.getProductType();
		},
		methods: {
			channelChange(v){
				this.channelsData.some((item) => {
					if (item.channel_id == v) {
						this.channel_name = item.name;
						return true;
					}
				});
				this.getAssignServiceList();
				console.log(v)
				console.log(this.channel_name)
			},
			getAssignServiceList(){
				this.$http.get(assignServiceUrl.replace('@id', this.id))
				.then((resp) => {
					var data = resp.data;
					this.assignServiceListData = data;
					this.assembleData();
				})
				.catch((err) => {
					console.log(err);
				});
			},
			assembleData(){
				console.log('this.businessesData.length:',this.businessesData.length);
				this.businessesData.forEach((item, idx) => {
					item.channel_name = this.channel_name;
		  		item.channel_id = this.dataObj.channel;
		  		item.sp_name = '';
					this.assignServiceListData.some((it, index) => {
						if (it.bs_id == item.bs_id && it.channel_id == item.channel_id) {
							item.sp_name = it.name;
							item.member_sp_id = it.member_sp_id;
							return true;
						}
					});
				});
			},
			edit(){
				this.editVisible = true;
			},
			cancelAppoint(item){
				if (this.isClicked) {
					return;
				}
				this.isClicked = true;
				this.$http.delete(cancelAppointUrl, {
					params: {
						member_sp_id: item.member_sp_id,
					}
				})
				.then((resp) => {
					this.isClicked = false;
					this.$message({
            type: 'success',
            message: '取消成功!'
          });
          this.getAssignServiceList();
				})
				.catch((err) => {
					this.isClicked = false;
					console.log(err);
				});
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
				this.$http.post(appointUrl.replace('@id', this.id), {
					spId: this.sp_id,
					bsId: this.curItem.bs_id,
					channelId: this.curItem.channel_id,
					designation_id:this.id,
				})
				.then((resp) => {
					this.isClicked = false;
					this.sp_id = '';
					this.$message({
            type: 'success',
            message: '指定成功!'
          });
          this.distributeVisible = false;
          this.getAssignServiceList();
				})
				.catch((err) => {
					this.isClicked = false;
					console.log(err);
				});
			},
			getChannels(){
				this.$http.get(channelUrl, {
					params: {
						pg_count:999,
						pg_index:1
					}
				})
				.then((resp) => {
					var data = resp.data;
					this.channelsData = data.elements;
					this.dataObj.channel = data.elements && data.elements.length && data.elements[0].channel_id;
				})
				.catch((err) => {
					console.log(err);
				});
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
				this.pg_index = queryObj.pg_index;
			},
			//查询条件整合
			search(extra){
				var ret = {}
				ret.id = this.typeobj.sec_id ? this.typeobj.sec_id : this.typeobj.fir_id ? this.typeobj.fir_id : 0
				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				this.getBusiness(ret);
			},
			reset(){
				this.pg_index = 1;
				this.typeobj = Object.assign({}, typeobj);
				this.secTypeData = [];
				this.bs_class_id = 0;
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			appoint(item){
				this.distributeVisible = true;
				this.curItem = item;
			},
			/*cancelAppoint(item){
				this.$confirm('确定取消指定么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'mini_dialog'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
        }).catch(() => {
        });
			},*/
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

			getBusiness(obj){
				this.loading = true;
			  this.$http.get(businessUrl, {
					params: {
						pg_index: obj.pg_index || 1,
						pg_count: obj.pg_count || 15,
						bs_class_id: obj.id ? obj.id : null
					}
				}).then((resp) => {
					this.loading = false;
					var data = resp.data;
					var list = data.elements || [];
					list.forEach((item) => {
						item.channel_name = this.channel_name;
			  		item.channel_id = this.dataObj.channel;
			  		item.sp_name = '';
					});
					this.businessesData = list;
			  	this.total = data.total_elements;
				}).catch((err) => {
					this.loading = false;
				});
			},

			typeChange(obj){
				if (obj.id === '') {return;}
				this.$http.get(productUrl, {
					params: {
						type: obj.type,
						parent_id: obj.id
					}
				}).then((resp) => {
			  	if (obj.type == 1) {
						this['secTypeData'] = resp.data;
						this.typeobj.sec_id = '';
					}
					this.bs_class_id = this.typeobj.sec_id ? this.typeobj.sec_id : this.typeobj.fir_id ? this.typeobj.fir_id : 0;
					console.log('this.bs_class_id:',this.bs_class_id)
			  }).catch((err) => {});
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
			bs_class_id(){
				this.getBusiness({
					id: this.bs_class_id
				})
			},
			businessesData(){
				this.getAssignServiceList();
			},
			'typeobj.fir_id': function(){
				var self = this;
				if (!self.typeobj.fir_id) {
					self['secTypeData'] = [];
					self.typeobj.sec_id = '';
				}
			}
		}
	}
</script>
<style lang='less'>
.assignServicerEdit{
	.result{
		padding: 0;
		.condition_top{
			label{float: left;height: 30px;line-height: 30px;color:#666;font-size: 14px;}
			padding-left: 0;padding-top: 15px;
			.form_control{
				float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;line-height: 30px;color:#666;
				.el-input__inner{height: 30px!important;border-radius:2px;font-size:13px;}
			}
			button{float: left;width: 88px;height: 30px;line-height: 30px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
				.submit{}
				.reset{background-color: #fff;color:#479CFF;}
				button:hover{border-color: #408CE6;background-color: #408CE6;}
				.reset:hover{border-color: #408CE6;color: #408CE6;}
		}
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
			width: 342px;height: 160px;transform:translate(-50%,-50%);overflow: hidden;
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
.mini_dialog{width: 350px;}
</style>

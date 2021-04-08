<template>
  <div class="cxbCommonList clientServiceOrder">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
	  <div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="dataObj.workOrderSn" placeholder="工单号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.trademarkName" placeholder="商标名称"></el-input></div>
	    <div class="form_control">
		  	<el-select clearable v-model="dataObj.throughState" placeholder="请选择反馈状态">
			    <el-option
			      v-for="item in feedbackStatusOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control">
		  	<el-select clearable v-model="dataObj.cxbStatus" placeholder="请选择工单状态">
			    <el-option
			      v-for="item in serviceStatusOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
	  	<div class="form_control"><el-input v-model="dataObj.taskId" placeholder="任务号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.serviceId" placeholder="服务号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.applyName" placeholder="申请人"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.contactName" placeholder="联系人"></el-input></div>
	  	<!-- <div class="form_control"><el-input v-model="dataObj.trademarkSubjectName" placeholder="申报主体"></el-input></div> -->

			<div class="form_control data_picker">
				<el-date-picker
		      v-model="confirmTime"
		      type="daterange"
		      align="right"
		      placeholder="申请起止时间开始 - 结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
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
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th>单号</th>
          	<!-- <th>注册信息</th> -->
          	<th>商标图案</th>
          	<th class="minWidth" width="140">商标名称</th>
          	<th class="minWidth">联系人</th>
            <th class="alignc" width="140">申请时间</th>
          	<th class="minWidth">费用</th>
          	<th class="minWidth">材料评审</th>
          	<th class="minWidth">工单状态</th>
          	<th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td>{{item.workOrderSn}}</td>
            <td>
            	<img v-if="item.specifyPicUrl" :src="item.specifyPicUrl" width="48" height="48">
            	<img v-else :src="item.blackWhitePicUrl" width="48" height="48">
            </td>
            <td><span class="regInfo" :title="item.trademarkName">{{item.trademarkName|titleLengthFormat(12)}}</span></td>
            <td>{{item.contactName}}</td>
            <td class="alignc">{{item.createTime|dateFormat}}</td>
            <td class="alignc">{{item.orderAmount}}</td>
            <td class="maxWidth">{{throughStateName(item.throughState)}}</td>
            <td>{{matchStatusName(item.cxbStatus)}}</td>
            <td class="action">
            	<a v-if="item.operState == 1" class="view" @click.prevent="view(item)">查看客户订单资料</a>
            	<a v-if="item.operState == 2" class="view" @click.prevent="view(item)">查看材料评审资料</a>
            	<a v-if="item.operState == 3" class="view" @click.prevent="view(item)">查看商标申报资料</a>
            	<p v-if="(item.operState != 1 && item.operState != 2 && item.operState != 3) || !item.operState" class="view">--</p>
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
	import Filters from 'utils/filters/'
	const workOrderListUrl = './api/findCxbWorkOrderList';
	const spListUrl = './api/findAllSp';
	const entrustedUnitListUrl = './api/findAllentrustedUnit';
	const serviceStatusOptions = [
		{
		  value: '1',
		  name: '1',
		  label: '待材料评审'
		}, {
		  value: '2',
		  name: '2',
		  label: '评审不通过'
		}, {
		  value: '3',
		  name: '3',
		  label: '已评审待确认'
		}, {
		  value: '4',
		  name: '4',
		  label: '已确认待上报'
		}, {
		  value: '5',
		  name: '5',
		  label: '已上报待审核'
		}, {
		  value: '6',
		  name: '6',
		  label: '申报中'
		}, {
		  value: '7',
		  name: '7',
		  label: '审核不通过'
		}, {
		  value: '8',
		  name: '8',
		  label: '申报结束'
		}
	];
	const feedbackStatusOptions = [
		{
		  value: '1',
		  name: '1',
		  label: '待反馈'
		}, {
		  value: '2',
		  name: '2',
		  label: '反馈通过'
		}, {
		  value: '3',
		  name: '3',
		  label: '反馈不通过'
		}
	];

	const dataObj = {//条件数据
		workOrderSn:'',
		trademarkName:'',
		throughState: '',
		cxbStatus:'',
		taskId:'',
		serviceId:'',
		applyName:'',
		contactName:'',
		spId:'',
	};

  export default {
    name: 'work-order-list',
    data() {
      return {
      	feedbackStatusOptions:feedbackStatusOptions,
      	spIdOptions:[],
      	entrustedUnitOptions:[],
      	queryObj: {},
      	activeName:'all',
      	dataObj: Object.assign({}, dataObj),

      	status:'',
      	order_tasking_state:'',

      	confirmTime: '',
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
      	serviceStatusOptions: serviceStatusOptions,
	      dataList:[],
	      currentPage: 1,
	      pg_index: 1,
	      pg_count: 10,
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
    	this.recoverQueryData();
    	this.search();
    },
    methods: {
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
	    			dataObj[n] = queryObj[n];
	    		}
    		}
    		this.confirmTime = queryObj.applyTimeStart && [new Date(queryObj.applyTimeStart-0), new Date(queryObj.applyTimeEnd-86390000)];

    		this.status = queryObj.status;
    		this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.confirmTime) {
	    		ret.applyTimeStart = new Date(this.confirmTime[0]).getTime();
	    		ret.applyTimeEnd = new Date(this.confirmTime[1]).getTime() + 86390000;
    		}

    		//ret.status = this.status;

    		ret.pg_index = extra ? 1 : this.pg_index;
    		ret.pg_count = this.pg_count;
    		var data = Object.assign({}, this.dataObj, ret);
    		//console.log(data)
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
    		//console.log(this.$route.query)
    	},
    	reset(){
    		this.dataObj = Object.assign({}, dataObj);
    		this.confirmTime = '';
    	},
    	handleCurrentChange(val) {
    		this.pg_index = val;
    		this.search();
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
      	data.mpStatus = '0';
      	this.loading = true;
      	this.$http.get(workOrderListUrl, {params: data})
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		var dataList = data.elements;
      		/*dataList.forEach((item, i) => {
      			var arr = this.selectedItems;
      			var idx = this.inArrayOf(arr, item, 'order_sn');
      			item.checked = idx != -1;
      		});*/
      		this.dataList = dataList;
      		this.total = data.total_elements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
      },
      view(item){
      	this.$router.push({name: 'CXBOrderDetail', params: {id: item.workOrderSn,state:item.throughState}})
      },
      matchStatusName(status){
      	var ret = '--'
      	serviceStatusOptions.forEach((item, i) => {
      		if (item.value == status) {
      			ret = item.label;
      			return false;
      		}
      	});
      	return ret;
      },
      throughStateName(status){
      	var ret = ''
      	feedbackStatusOptions.forEach((item, i) => {
      		if (item.value == status) {
      			ret = item.label;
      			return false;
      		}
      	});
      	return ret;
      }
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      payStatusformat: Filters.payStatusformat,
      titleLengthFormat:Filters.titleLengthFormat
    },
    watch:{
	  }
  }
</script>
<style lang='less'>
.cxbCommonList{width: 100%;overflow: hidden;padding-bottom: 20px;
	.condition{
		padding-left: 10px;padding-top: 5px;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{height: 30px;}
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
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.alignc{text-align: center;}
					th.minWidth{min-width: 60px;}
					th.maxWidth{max-width: 200px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;word-break:break-all;
						.el-checkbox{position: relative;top: -1px;}
						.regInfo{display: inline-block;min-width: 100px;max-width: 150px;word-break: break-all;}
					}
					td.alignc{text-align: center;}
					td.maxWidth{max-width: 200px;}
					td.action{
						min-width: 60px;
						a{color: #479CFF;margin: 0 auto;width:110px;text-align: center;display:block;cursor: pointer;text-decoration:none;}
						p{text-align:center;color:#999;}
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

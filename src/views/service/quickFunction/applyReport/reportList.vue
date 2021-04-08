<template>
  <div class="workCommonList clientServiceOrder">

	  <div class="condition clearfix">
			<div class="form_control data_picker">
				<el-date-picker
		      v-model="confirmTime"
		      type="date"
		      align="right"
		      placeholder="日期选择"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">查询</button>
				<button class="submit" @click="downloadFn">导出</button>
			</div>
	  </div>

	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th width="60">序号</th>
          	<th>提交日期</th>
          	<th>订单号</th>
            <th class="minWidth">服务单号</th>
            <th class="alignc" width="100">商标名称</th>
            <th class="alignc" width="100">联系人</th>
            <th class="minWidth" width="100">联系号码</th>
            <th class="minWidth">申请人</th>
            <th class="minWidth">通过率</th>
            <th class="minWidth alignc">服务商名称</th>
            <!-- <th class="minWidth alignc">办理人员</th> -->
            <th class="alignc">申报类别</th>
            <th class="alignc">加项</th>
            <th class="alignc">官费</th>
            <th class="alignc">服务费</th>
            <th class="alignc">总金额</th>
            <th class="alignc">收款日期</th>
            <th class="alignc">申报日期</th>
            <th class="alignc">申报员</th>
            <th class="alignc">申请号</th>
            <th class="minWidth alignc">申请回执时间</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td width="60">{{ item.number }}</td>
          	<td>{{ item.submitTime | FormatTime }}</td>
          	<td >{{ item.orderFictitiousSn }}</td>
            <td class="minWidth">{{ item.orderSn }}</td>
            <td class="alignc" width="100">{{ item.trademarkName }}</td>
            <td class="alignc" width="100">{{ item.contactName }}</td>
            <td class="minWidth" width="100">{{ item.contactPhone || '--' }}</td>
            <td class="minWidth">{{ item.applyName }}</td>
            <td class="minWidth">{{ item.registerPassRate }}</td>
            <td class="minWidth alignc">{{ item.spName }}</td>
<!--             <td class="minWidth alignc">{{ item.operatorId }}</td> -->
            <td class="alignc">{{ item.classId }}</td>
            <td class="alignc">{{ item.minNumber }}</td>
            <td class="alignc">{{ item.minNumber -10 < 0 ? 300 : 300 + (item.minNumber -10)*30 }}</td>
            <td class="alignc">399</td>
            <td class="alignc">{{ item.minNumber -10 < 0 ? 699 : 699 + (item.minNumber -10)*30 }}</td>
            <td class="alignc">{{ item.payTime | FormatTime }}</td>
            <td class="alignc">{{ item.declarationTime | FormatTime }}</td>
            <td class="alignc">{{ item.declarationName }}</td>
            <td class="alignc">{{ item.acceptMaterials }}</td>
            <td class="minWidth alignc">{{ item.receiptTime | FormatTime}}</td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="21" class="norecord">
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
	const declareReportUrl = './api/findDeclareReport';
	const spListUrl = './api/findAllSp';
	const entrustedUnitListUrl = './api/findAllentrustedUnit';
	const downDeclareReportUrl = './api/downDeclareReport';
	const serviceStatusOptions = [
		{
		  value: '0',
		  name: '0',
		  label: '待提交'
		}, {
		  value: '1',
		  name: '1',
		  label: '已提交待确认'
		}, {
		  value: '2',
		  name: '2',
		  label: '已确认待付款'
		}, {
		  value: '3',
		  name: '3',
		  label: '待审核'
		}, {
		  value: '4',
		  name: '4',
		  label: '审核通过'
		}, {
		  value: '5',
		  name: '5',
		  label: '审核不通过'
		}
	];

	const dataObj = {//条件数据
		regInfo:'',
		status:'',
		memberName: '',
		memberPhone:'',
		trademarkSubjectName:'',
		spId:'',
		entrustedUnit:'',
	};

  export default {
    name: 'work-order-list',
    data() {
      return {
      	spIdOptions:[],
      	entrustedUnitOptions:[],
      	queryObj: {},
      	activeName:'all',
      	dataObj: Object.assign({}, dataObj),

      	status:'',
      	order_tasking_state:'',

      	confirmTime: '',
				pickerOptions: {

        },
      	serviceStatusOptions: serviceStatusOptions,
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
    	this.recoverQueryData();
    	this.search();
    },
    methods: {
    	// 到处申请报表
    	downloadFn () {
    		let time = new Date(this.confirmTime).getTime() || '';
    		let url_ = location.protocol + '//' + location.host +'/iprp_middleground/api/downDeclareReport?time=' + time + '&pg_index=' + this.pg_index + '&pg_count=' + this.pg_count;
				window.open(url_);
    	},
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
	    			dataObj[n] = queryObj[n];
	    		}
    		}
    		this.confirmTime = queryObj.confirmTimeStart && [new Date(queryObj.confirmTimeStart-0), new Date(queryObj.confirmTimeEnd-86390000)];

    		this.status = queryObj.status;
    		this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		ret.time = new Date(this.confirmTime).getTime() || '';
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
      	this.loading = true;
      	this.$http.get(declareReportUrl, {params: data})
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
      	this.$router.push({name: 'workOrderDetail', params: {id: item.workOrderId}})
      },
      matchStatusName(status){
      	var ret = ''
      	serviceStatusOptions.forEach((item, i) => {
      		if (item.value == status) {
      			ret = item.label;
      			return false;
      		}
      	});
      	return ret;
      }
    },
    filters: {
    	FormatTime: Filters.formatDate.FormatTime,
      dateFormat: Filters.formatDate.dateFormat,
      orderStatusformat: Filters.orderStatusformat,
      payStatusformat: Filters.payStatusformat,
      priceformat:Filters.priceformat,
      titleLengthFormat:Filters.titleLengthFormat
    },
    watch:{
    	/*$route(to, from) {
    		if (to.query.selfChange) {
    			return;
    		}
	    	this.recoverQueryData()
    		this.search();
      }*/
	  }
  }
</script>
<style lang='less'>
.workCommonList{
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
						a{color: #479CFF;margin-right: 7px}
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

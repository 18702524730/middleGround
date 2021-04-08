<template>
  <div class="workCommonList clientServiceOrder">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
        
	  <div class="condition clearfix">
	  	<!-- <div class="form_control"><el-input v-model="dataObj.contractNo" placeholder="合同号"></el-input></div> -->
		<div class="form_control"><el-input v-model="dataObj.applicant" placeholder="申请人"></el-input></div>
		<div class="form_control"><el-input v-model="dataObj.applicatNumber" placeholder="申请号"></el-input></div>
		<div class="form_control data_picker">
				<el-date-picker
					v-model="applytime"
					type="daterange"
					align="right"
					placeholder="申请日开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
	  	<div class="form_control"><el-input v-model="dataObj.patentName" placeholder="专利名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.businessManager" placeholder="业务员"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.agent" placeholder="代理人"></el-input></div>
		<div style="float:left;">
		  <div style="float:left;line-height:30px;padding-right:5px;">缴费时间</div>
		  <div class="form_controls">
			  <el-date-picker type="month" placeholder="年月" v-model="yearmonth"></el-date-picker>
		  </div>
		  <!-- <div class="form_control">
			  <el-select v-model="yearvalue" placeholder="请选择">
				<el-option
				v-for="item in yearoptions"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
		  </div>
		  <div class="form_control">
			  <el-select v-model="monthvalue" placeholder="请选择">
				<el-option
				v-for="items in monthoptions"
				:key="items.value"
				:label="items.label"
				:value="items.value">
				</el-option>
			</el-select>
		  </div> -->
		</div>
		<div class="form_submit">
			<button class="submit" @click="search(true)">搜索</button>
			<button class="reset" @click="reset">重置</button>
		</div>
	  </div>
	<div class="totalFee">
		<span>服务费总计：</span><span>{{serviceFeeTotal|priceFormat}}</span>
		<span class="ml20">办登费服务费总计：</span><span>{{boardServiceFeeTotal|priceFormat}}</span>
		<span class="ml20">年费服务费总计：</span><span>{{yearServiceFeeTotal|priceFormat}}</span>
	</div>
	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th class="minWidth">序号</th>
			<th class="minWidth alignc">操作</th>
          	<th class="smWidth">订单号(案号)</th>
			<th class="smWidth">合同号</th>
			<th class="smWidth">申请人</th>
            <th class="smWidth">专利名称</th>
            <th class="minWidth">案件当前状态</th>
            <th class="minWidth">服务商</th>
            <th class="minWidth">业务员</th>
            <th class="minWidth maxWidth">代理人</th>
            <th class="smWidth">此单金额（元）</th>
            <th class="smWidth">合同金额（元）</th>
			<th class="minWidth">官费（元）</th>
			<th class="minWidth">服务费（元）</th>
			<th class="smWidth">首次收款日期</th>
			<th class="smWidth">首次收款金额（元）</th>
			<th class="smWidth">二次收款日期</th>
			<th class="smWidth">二次收款金额（元）</th>
			<th class="smWidth">递交机构</th>
			<th class="smWidth">提交日期</th>
			<th class="minWidth">申报员</th>
			<th class="smWidth">申请号</th>
			<th class="smWidth">申请日</th>
			<th class="smWidth">缴纳申请费日期</th>
			<th class="smWidth">缴纳申请费金额</th>
            <th class="minWidth">制单</th>
			<th class="minWidth">发票类型</th>
			<th class="smWidth">发票抬头</th>
			<th class="smWidth">申请费官费号</th>
            <th class="smWidth">申请费服务费票号</th>
			<th class="smWidth">开票时间</th>
			<th class="smWidth">官方黄票号</th>
			<th class="smWidth">办登费收款金额（元）</th>
			<th class="smWidth">办登费服务费（元）</th>
			<th class="smWidth">办登费收款日期</th>
			<th class="minWidth">制单</th>
			<th class="smWidth">缴费金额（元）</th>
			<th class="smWidth">办登费缴费时间</th>
			<th class="smWidth">官方黄票号</th>
			<th class="smWidth">办登费官费号</th>
            <th class="smWidth">办登费服务费票号</th>
			<th class="smWidth">开票时间</th>
			<th class="minWidth">第几年度年费</th>
			<th class="minWidth">年费缴纳方式</th>
            <th class="smWidth">年费收款金额（元）</th>
			<th class="smWidth">年费服务费（元）</th>
			<th class="smWidth">年费收款时间</th>
			<th class="minWidth">制单</th>
			<th class="smWidth">缴费时间</th>
            <th class="smWidth">缴费金额（元）</th>
			<th class="smWidth">官方黄票号</th>
			<th class="smWidth">年费官票号</th>
			<th class="smWidth">年费服务费票号</th>
            <th class="smWidth">开票时间</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td>{{item.seqNo}}</td>
			<td class="action">
            	<a href="" class="view" @click.prevent="view(item)">详情</a>
            </td>
            <td><span class="regInfo">{{item.caseNo}}</span></td>
            <td>{{item.contractNo}}</td>
			<td>{{item.applicant}}</td>
            <td>{{item.patentName}}</td>
            <td>{{item.caseCurrentState}}</td>
            <td>{{item.serviceProvider}}</td>
            <td class="maxWidth">{{item.businessManager}}</td>
            <td>{{item.agent}}</td>
            <td>{{item.amount|priceFormat}}</td>
            <td>{{item.contractAmount|priceFormat}}</td>
            <td>{{item.officialFee|priceFormat}}</td>
            <td>{{item.serviceFee|priceFormat}}</td>
            <td>{{item.firstCollectMoneyTime|dateFormat}}</td>
			<td>{{item.firstCollectMoneyAmount|priceFormat}}</td>
			<td>{{item.secondCollectMoneyTime|dateFormat}}</td>
			<td>{{item.secondCollectMoneyAmount|priceFormat}}</td>
			<td>{{item.submitOrg}}</td>
			<td>{{item.submitTime|dateFormat}}</td>
			<td>{{item.declarator}}</td>
			<td>{{item.applicatNumber}}</td>
			<td>{{item.applicatTime|dateFormat}}</td>
			<td>{{item.turnInApplicatFeeTime|dateFormat}}</td>
			<td>{{item.turnInApplicatFee|priceFormat}}</td>
			<td>{{item.maker}}</td>
			<td>{{item.invoiceType|patentInvoiceTypeFormat}}</td>
			<td>{{item.invoiceTitle}}</td>
			<td>{{item.applicatOfficialTicketNumber}}</td>
			<td>{{item.applicatServiceTicketNumber}}</td>
			<td>{{item.applicatInvoiceTime|dateFormat}}</td>
			<td>{{item.officialYellowTicketNumber}}</td>
			<td>{{item.boardFeeReceiveAmount|priceFormat}}</td>
			<td>{{item.boardServiceFee|priceFormat}}</td>
			<td>{{item.boardFeeReceiveTime|dateFormat}}</td>
			<td>{{item.boardMaker}}</td>
			<td>{{item.boardTurnInAmount|priceFormat}}</td>
			<td>{{item.boardFeeTurnInTime|dateFormat}}</td>
			<td>{{item.boardOfficialYellowTicketNumber}}</td>
			<td>{{item.boardOfficialTicketNumber}}</td>
			<td>{{item.boardServiceTicketNumber}}</td>
			<td>{{item.boardInvoiceTime|dateFormat}}</td>
			<td>{{item.whichYear}}</td>
			<td>{{item.yearFeeTurnInType|yearFeeTurnInTypeFormat}}</td>
			<td>{{item.yearFeeReceiveAmount|priceFormat}}</td>
			<td>{{item.yearServiceFee|priceFormat}}</td>
			<td>{{item.yearFeeReceiveTime|dateFormat}}</td>
			<td>{{item.yearMaker}}</td>
			<td>{{item.yearTurnInTime|dateFormat}}</td>
			<td>{{item.yearTurnInAmount|priceFormat}}</td>
			<td>{{item.yearOfficialYellowTicketNumber}}</td>
			<td>{{item.yearOfficialTicketNumber}}</td>
			<td>{{item.yearServiceTicketNumber}}</td>
			<td>{{item.yearInvoiceTime|dateFormat}}</td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="54" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <div class="my_loading" v-show="loading" v-loading="loading">
	    </div>
	    
	  </div>
	  <div class="tb_pagination" v-if="!loading && dataList.length">
	    	<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="pgIndex"
		      :page-size="pgCount"
		      layout="total, prev, pager, next"
		      :total="total" class="fr">
		    </el-pagination>
	    </div>
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	const findListUrl = './api/findCaseList4PerformanceForm';
	const findTotalUrl ='./api/findStaticForPer'
	const dataObj = {//条件数据
		// contractNo:null,
		patentName:null,
		businessManager: null,
		agent:null,
		applicant:null,
		applicatNumber:null,

	};
const monthoptions = [
		{
		  value: '01',
		  name: '0',
		  label: '1月'
		}, {
		  value: '02',
		  name: '1',
		  label: '2月'
		}, {
		  value: '03',
		  name: '2',
		  label: '3月'
		}, {
		  value: '04',
		  name: '3',
		  label: '4月'
		}, {
		  value: '05',
		  name: '4',
		  label: '5月'
		}, {
		  value: '06',
		  name: '5',
		  label: '6月'
		}, {
		  value: '07',
		  name: '6',
		  label: '7月'
		}, {
		  value: '08',
		  name: '7',
		  label: '8月'
		}, {
		  value: '09',
		  name: '8',
		  label: '9月'
		}, {
		  value: '10',
		  name: '9',
		  label: '10月'
		}, {
		  value: '11',
		  name: '10',
		  label: '11月'
		}, {
		  value: '12',
		  name: '11',
		  label: '12月'
		}
	]
  export default {
    data() {
      return {
      	queryObj: {},
		activeName:'all',
		turnInFeeTime:"",
		monthoptions: monthoptions,
		yearoptions: [],
      	dataObj: Object.assign({}, dataObj),
		dataList:[],
		currentPage: 1,
		pgIndex: 1,
		pgCount: 15,
		total:0,
		yearmonth:'',
		yearvalue:'',
		monthvalue:'',
		serviceFeeTotal:0,
		boardServiceFeeTotal:0,
		yearServiceFeeTotal:0,
		loading: false,
		applytime: [],
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
      }
    },
    mounted() {
		// this.getYear()
    	this.recoverQueryData();
		this.search(true);
    },
    methods: {
		// getYear(){
		// 	let y = new Date().getFullYear();
		// 	let m = new Date().getMonth()+1;
		// 	// this.yearvalue = y;
		// 	for(let j=0;j<this.monthoptions.length;j++){
		// 		if(this.monthoptions[j]['label'] == m+'月'){
		// 			// this.monthvalue = this.monthoptions[j]['value'];
		// 			break;
		// 		}
		// 	}
		// 	let s = 2015;
		// 	let r =[]
		// 	for(let i = s;i<=y;i++){
		// 		r.unshift({
		// 			value: i,
		// 			name:i,
		// 			label: i +'年'
		// 		})
		// 	}
		// 	this.yearoptions = r
		// },
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
	    			dataObj[n] = queryObj[n];
	    		}
			}
			if(this.queryObj.turnInFeeTime){
				let arr = this.queryObj.turnInFeeTime.split('-')
				let year = arr[0]
				let month = arr[1] -1
				this.yearmonth = new Date().setFullYear(year,month)
			}
			this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
			this.applytime = queryObj.applicatTimeStart && [new Date(queryObj.applicatTimeStart-0), new Date(queryObj.applicatTimeEnd-86390000)];
		  },
    	search(extra){
			var ret = {}
			if (this.applytime) {
				ret.applicatTimeStart = this.applytime[0] ? new Date(this.applytime[0]).getTime() : null;
				ret.applicatTimeEnd = this.applytime[1] ? new Date(this.applytime[1]).getTime() + 86390000 : null;
			}
			if(this.yearmonth){
				let dates = new Date(this.yearmonth)
				ret.turnInFeeTime = dates.getFullYear()+'-'+(dates.getMonth()+1)
			}
			ret.patentType = '1';
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
    		var data = Object.assign({}, this.dataObj, ret);
    		//console.log(data)
			this.getOrderList(data);
			if(extra){
				this.getall(data)
			}
    		this.$router.replace({query: Object.assign({}, data)});
    		//console.log(this.$route.query)
    	},
    	reset(){
			this.dataObj = Object.assign({}, dataObj);
			this.applytime= []
			this.yearmonth =''
			this.search(true)
    	},
    	handleCurrentChange(val) {
    		this.pgIndex = val;
    		this.search();
      },
		getall(da){
			let sdatas = da||{}
			this.$http.get(findTotalUrl, {params: sdatas})
			.then((resp) => {
				// this.loading = false;
				var data = resp.data;
				this.serviceFeeTotal=data.serviceFeeTotal
				this.boardServiceFeeTotal=data.boardServiceFeeTotal
				this.yearServiceFeeTotal=data.yearServiceFeeTotal
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
		},
      getOrderList(data){
      	data = data || {};
      	this.loading = true;
      	this.$http.get(findListUrl, {params: data})
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		var dataList = data.elements;
      		this.dataList = dataList;
			this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
      },
      view(item){
      	this.$router.push({name: 'wgPatentCheckDetail', params: {id: item.caseSysNo,tp:1}})
      },
     
    },
    filters: {
      patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
	  monitorStateFormat: Filters.monitorStateFormat,
	  yearFeeTurnInTypeFormat: Filters.yearFeeTurnInTypeFormat
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

.totalFee{
	padding-top: 20px;
	padding-right: 20px;
	text-align: right;
	color: #e60808;
	font-size: 14px;
}
</style>

<template>
  <div class="workCommonLists clientServiceOrder">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
        
	  <div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="dataObj.contractNo" placeholder="合同号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.patentName" placeholder="专利名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.applicant" placeholder="申请人"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.contacter" placeholder="联系人"></el-input></div>
		  <div class="form_control"><el-input v-model="dataObj.applicatNumber" placeholder="申请号"></el-input></div>
		<div class="form_submit">
			<button class="submit" @click="search(true)">搜索</button>
			<button class="reset" @click="reset">重置</button>
		</div>
	  </div>
        <div style="position:relative;padding-left:10px;padding-top:10px;">
			<el-button type='primary' @click="toaddrecord">添加案件</el-button>
			<el-button type='primary' @click.stop="showtransfer">字段显示</el-button>
			<span v-if="isexport" class="eachexportbtn" @click="exportlist">导出</span>
			<div v-show="showtrans" style="position:absolute; left:10px; top: 50px;background-color:#fff;z-index:999;" @click.stop>
				<el-transfer v-model="ziduan" :data="ziduandata" :titles="transtitle" @change="setlist"></el-transfer>
			</div>
		</div>
	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th class="minWidth">序号</th>
			<th class="smWidth alignc">操作</th>
          	<th v-show="ziduan.indexOf(0)>-1" class="smWidth">订单号（案号）</th>
			<th class="smWidth" v-show="ziduan.indexOf(1)>-1">申请人</th>
            <th class="smWidth" v-show="ziduan.indexOf(2)>-1">专利名称</th>
            <th class="smWidth" v-show="ziduan.indexOf(3)>-1">申请号</th>
          	<th class="smWidth" v-show="ziduan.indexOf(4)>-1">申请日</th>
            <th class="minWidth" v-show="ziduan.indexOf(5)>-1">案件当前状态</th>
            <th class="minWidth" v-show="ziduan.indexOf(6)>-1">业务员</th>
            <th class="minWidth" v-show="ziduan.indexOf(7)>-1">代理人</th>
            <th class="smWidth" v-show="ziduan.indexOf(8)>-1">递交机构</th>
            <th class="smWidth" v-show="ziduan.indexOf(9)>-1">备注</th>
			<th class="smWidth" v-show="ziduan.indexOf(10)>-1">合同号</th>
			<th class="minWidth" v-show="ziduan.indexOf(11)>-1">是否费减</th>
			<th class="minWidth" v-show="ziduan.indexOf(12)>-1">官费（元）</th>
			<th class="minWidth" v-show="ziduan.indexOf(13)>-1">服务费（元）</th>
			<th class="minWidth" v-show="ziduan.indexOf(14)>-1">此单金额（元）</th>
			<th class="minWidth" v-show="ziduan.indexOf(15)>-1">合同金额（元）</th>
			<th class="smWidth" v-show="ziduan.indexOf(16)>-1">缴纳申请费金额（元）</th>
			<th class="smWidth" v-show="ziduan.indexOf(17)>-1">缴纳申请费日期</th>
			<th class="smWidth" v-show="ziduan.indexOf(18)>-1">办登费收款金额（元）</th>
			<th class="minWidth" v-show="ziduan.indexOf(19)>-1">缴纳金额（元）</th>
			<th class="smWidth" v-show="ziduan.indexOf(20)>-1">办登费缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(21)>-1">收证日期</th>
			<th class="smWidth" v-show="ziduan.indexOf(22)>-1">第2年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(23)>-1">第2年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(24)>-1">第2年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(25)>-1">第3年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(26)>-1">第3年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(27)>-1">第3年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(28)>-1">第4年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(29)>-1">第4年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(30)>-1">第4年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(31)>-1">第5年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(32)>-1">第5年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(33)>-1">第5年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(34)>-1">第6年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(35)>-1">第6年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(36)>-1">第6年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(37)>-1">第7年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(38)>-1">第7年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(39)>-1">第7年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(40)>-1">第8年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(41)>-1">第8年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(42)>-1">第8年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(43)>-1">第9年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(44)>-1">第9年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(45)>-1">第9年缴费金额</th>
			<th class="smWidth" v-show="ziduan.indexOf(46)>-1">第10年年费收款金额（元）</th>
            <th class="smWidth" v-show="ziduan.indexOf(47)>-1">第10年缴费时间</th>
			<th class="smWidth" v-show="ziduan.indexOf(48)>-1">第10年缴费金额</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td>{{item.seqNo}}</td>
			<td class="action">
            	<a href="" class="view" @click.prevent="view(item)">详情</a>
                <a href="" class="view" @click.prevent="delCase(item)">删除</a>
            </td>
            <td v-show="ziduan.indexOf(0)>-1">{{item.caseNo}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.applicant}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.patentName}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.applicatNumber}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.applicatTime | dateFormat}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.caseCurrentState}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.businessManager}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.agent}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.submitOrg}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.remark}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.contractNo}}</td>
            <td class="alignc" v-show="ziduan.indexOf(11)>-1">{{item.feeDeduct|feeDeductFormat}}</td>
			<td v-show="ziduan.indexOf(12)>-1">{{item.officialFee | priceformat}}</td>
			<td v-show="ziduan.indexOf(13)>-1">{{item.serviceFee | priceformat}}</td>
			<td v-show="ziduan.indexOf(14)>-1">{{item.amount | priceformat}}</td>
			<td v-show="ziduan.indexOf(15)>-1">{{item.contractAmount |priceformat}}</td>
			<td v-show="ziduan.indexOf(16)>-1">{{item.turnInApplicatFee |priceformat}}</td>
			<td v-show="ziduan.indexOf(17)>-1">{{item.turnInApplicatFeeTime|dateFormat}}</td>
			<td v-show="ziduan.indexOf(18)>-1">{{item.boardFeeReceiveAmount |priceformat}}</td>
			<td v-show="ziduan.indexOf(19)>-1">{{item.turnInAmount}}</td>
			<td v-show="ziduan.indexOf(20)>-1">{{item.boardFeeTurnInTime | dateFormat}}</td>
			<td v-show="ziduan.indexOf(21)>-1" >{{item.receiveCertificateTime | dateFormat}}</td>
			<td v-show="ziduan.indexOf(22)>-1">{{item.yearFeeReceiveAmount2 |priceformat}}</td>
			<td v-show="ziduan.indexOf(23)>-1">{{item.turnInTime2 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(24)>-1">{{item.turnInAmount2 |priceformat}}</td>
			<td v-show="ziduan.indexOf(25)>-1">{{item.yearFeeReceiveAmount3 |priceformat}}</td>
			<td v-show="ziduan.indexOf(26)>-1">{{item.turnInTime3 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(27)>-1">{{item.turnInAmount3 |priceformat}}</td>
			<td v-show="ziduan.indexOf(28)>-1">{{item.yearFeeReceiveAmount4 |priceformat}}</td>
			<td v-show="ziduan.indexOf(29)>-1">{{item.turnInTime4 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(30)>-1">{{item.turnInAmount4 |priceformat}}</td>
			<td v-show="ziduan.indexOf(31)>-1">{{item.yearFeeReceiveAmount5 |priceformat}}</td>
			<td v-show="ziduan.indexOf(32)>-1">{{item.turnInTime5 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(33)>-1">{{item.turnInAmount5 |priceformat}}</td>
			<td v-show="ziduan.indexOf(34)>-1">{{item.yearFeeReceiveAmount6 |priceformat}}</td>
			<td v-show="ziduan.indexOf(35)>-1">{{item.turnInTime6 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(36)>-1">{{item.turnInAmount6 |priceformat}}</td>
			<td v-show="ziduan.indexOf(37)>-1">{{item.yearFeeReceiveAmount7 |priceformat}}</td>
			<td v-show="ziduan.indexOf(38)>-1">{{item.turnInTime7 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(39)>-1">{{item.turnInAmount7 |priceformat}}</td>
			<td v-show="ziduan.indexOf(40)>-1">{{item.yearFeeReceiveAmount8 |priceformat}}</td>
			<td v-show="ziduan.indexOf(41)>-1">{{item.turnInTime8 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(42)>-1">{{item.turnInAmount8 |priceformat}}</td>
			<td v-show="ziduan.indexOf(43)>-1">{{item.yearFeeReceiveAmount9 |priceformat}}</td>
			<td v-show="ziduan.indexOf(44)>-1">{{item.turnInTime9 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(45)>-1">{{item.turnInAmount9 |priceformat}}</td>
			<td v-show="ziduan.indexOf(46)>-1">{{item.yearFeeReceiveAmount10 |priceformat}}</td>
			<td v-show="ziduan.indexOf(47)>-1">{{item.turnInTime10 |dateFormat}}</td>
			<td v-show="ziduan.indexOf(48)>-1">{{item.turnInAmount10 |priceformat}}</td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="29" class="norecord">
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
	import $ from 'jquery';
	import VueCookie from 'vue-cookie'
	import { store } from "utils/";
	import Filters from 'utils/filters/'
	const findCaseListUrl = './api/findCaseList';
	const delCaseUrl ='./api/delCase/{caseSysNo}'
	const dataObj = {//条件数据
		contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber:null
	};
const ziduandata =[
	{key:0,label:'订单号（案号）'},
	{key:1,label:'申请人'},
	{key:2,label:'专利名称'},
	{key:3,label:'申请号'},
	{key:4,label:'申请日'},
	{key:5,label:'案件当前状态'},
	{key:6,label:'业务员'},
	{key:7,label:'代理人'},
	{key:8,label:'递交机构'},
	{key:9,label:'备注'},
	{key:10,label:'合同号'},
	{key:11,label:'是否费减'},
	{key:12,label:'官费（元）'},
	{key:13,label:'服务费（元）'},
	{key:14,label:'此单金额（元）'},
	{key:15,label:'合同金额（元）'},
	{key:16,label:'缴纳申请费金额（元）'},
	{key:17,label:'缴纳申请费日期'},
	{key:18,label:'办登费收款金额（元）'},
	{key:19,label:'缴纳金额（元）'},
	{key:20,label:'办登费缴费时间'},
	{key:21,label:'收证日期'},
	{key:22,label:'第2年年费收款金额（元）'},
	{key:23,label:'第2年缴费时间'},
	{key:24,label:'第2年缴费金额（元）'},
	{key:25,label:'第3年年费收款金额（元）'},
	{key:26,label:'第3年缴费时间'},
	{key:27,label:'第3年缴费金额（元）'},
	{key:28,label:'第4年年费收款金额（元）'},
	{key:29,label:'第4年缴费时间'},
	{key:30,label:'第4年缴费金额（元）'},
	{key:31,label:'第5年年费收款金额（元）'},
	{key:32,label:'第5年缴费时间'},
	{key:33,label:'第5年缴费金额（元）'},
	{key:34,label:'第6年年费收款金额（元）'},
	{key:35,label:'第6年缴费时间'},
	{key:36,label:'第6年缴费金额（元）'},
	{key:37,label:'第7年年费收款金额（元）'},
	{key:38,label:'第7年缴费时间'},
	{key:39,label:'第7年缴费金额（元）'},
	{key:40,label:'第8年年费收款金额（元）'},
	{key:41,label:'第8年缴费时间'},
	{key:42,label:'第8年缴费金额（元）'},
	{key:43,label:'第9年年费收款金额（元）'},
	{key:44,label:'第9年缴费时间'},
	{key:45,label:'第9年缴费金额（元）'},
	{key:46,label:'第10年年费收款金额（元）'},
	{key:47,label:'第10年缴费时间'},
	{key:48,label:'第10年缴费金额（元）'},
]
  export default {
    data() {
      return {
		  ziduandata:ziduandata,
		  transtitle:['未显示','已显示'],
		  ziduan:[0,1,2,3,4,5,6,7,8,9],
		  showtrans: false,
			token:'',
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),
		rootUrl: CONFIG.rootUrl,
	      dataList:[],
	      currentPage: 1,
	      pgIndex: 1,
	      pgCount: 15,
	      total:0,


	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
	      loading: false
      }
    },
    mounted() {
    	this.recoverQueryData();
		this.search();
		let getlist = store.get('userdefaultlisti')||this.ziduan;
		this.ziduan = getlist;
		let that = this;
		let el = document.body||document.documentElement;
		el.onclick = function(){
			that.showtrans = false
		}
	},
	computed:{
		isexport(){
			let arr = store.get('permission')
			return arr.indexOf('pas_invent_case_export')>-1
		}
	},
    methods: {
		exportlist(){
			let datas = {
				pgIndex: this.pgIndex,
				pgCount: this.pgCount,
				patentType: 2
			}
			let ret = Object.assign({},this.dataObj,datas)
			window.open(this.rootUrl+'/api/exportCaseList?'+$.param(ret)+'&token='+this.token)
		},
		setlist(){
			store.set('userdefaultlisti',this.ziduan)
		},
		showtransfer(){
			this.showtrans = !this.showtrans;
		},
		toaddrecord(){
			this.$router.push({
				name: "fmreviseBasic",
				params: { state: 0,type: 2 }
			});
		},
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
	    			dataObj[n] = queryObj[n];
	    		}
    		}
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
    		var data = Object.assign({}, this.dataObj, ret);
    		//console.log(data)
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
    		//console.log(this.$route.query)
    	},
    	reset(){
			this.dataObj = Object.assign({}, dataObj);
			this.search()
    	},
    	handleCurrentChange(val) {
    		this.pgIndex = val;
    		this.search();
      },
     
      getOrderList(data){
      	data = data || {};
      	data.patentType = '2';
      	this.loading = true;
      	this.$http.get(findCaseListUrl, {params: data})
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
      		this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
	  },
	  delCase(item){
		  this.$confirm('您确定要删除吗？','提示',{
			  confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
		  }).then(res=>{
			    this.$http.delete(delCaseUrl.replace("{caseSysNo}",item.caseSysNo)).then(res=>{
					this.search();
					this.$message.success('操作成功')
		  		}).catch(err=>{
					this.$message.error(err.response.data.msg)
				})
		  })
		
	  },
      view(item){
      	this.$router.push({name: 'fmPatentDetail', params: {id: item.caseSysNo}})
      },
      
    },
    filters: {
	  patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceformat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
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
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
	.el-transfer-panel__body{
		height: 282px;
	}
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
                    th.comWidth{min-width: 140px;}
                    th.smWidth{min-width: 100px;}
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

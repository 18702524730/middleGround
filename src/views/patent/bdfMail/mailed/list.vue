<template>
  <div class="workCommonList clientServiceOrder">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
        
	  <div class="condition clearfix">
	  	<!-- <div class="form_control"><el-input v-model="dataObj.contractNo" placeholder="合同号"></el-input></div> -->
	  	<div class="form_control"><el-input v-model="dataObj.patentName" placeholder="专利名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.applicant" placeholder="申请人"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.contacter" placeholder="联系人"></el-input></div>
		  <div class="form_control"><el-input v-model="dataObj.applicatNumber" placeholder="申请号"></el-input></div>
		<div class="form_submit">
			<button class="submit" @click="search(true)">搜索</button>
			<button class="reset" @click="reset">重置</button>
		</div>
	  </div>
        
	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th class="minWidth">序号</th>
			<th class="minWidth alignc">操作</th>
			<th class="smWidth">申请号</th>
            <th class="smWidth">专利名称</th>
			<th class="minWidth">专利类型</th>
			<th class="minWidth">业务员</th>
            <th class="minWidth">联系人</th>
            <th class="smWidth">手机号</th>
            <th class="minWidth">发票类型</th>
			<th class="minWidth">寄送方式</th>
			<th class="smWidth">办登费官费号</th>
			<th class="smWidth">办登费服务费票号</th>
			<th class="smWidth">开票时间</th>
			<th class="smWidth">备注</th>
			<th class="minWidth">（票）收件人</th>
            <th class="smWidth">（票）收件电话</th>
            <th class="smWidth">（票）收件地址</th>
			<th class="smWidth">快递单号</th>
			<th class="smWidth">邮寄日期</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td>{{item.seqNo}}</td>
			<td class="action">
            	<a href="" class="view" @click.prevent="view(item)">详情</a>
            </td>
            <td>{{item.applicatNumber}}</td>
            <td>{{item.patentName}}</td>
			<td>{{item.patentType|patentTypeFormat}}</td>
            <td>{{item.businessManager}}</td>
            <td>{{item.contacter}}</td>
            <td>{{item.phone}}</td>
			<td>{{item.invoiceForm|paperFormat}}</td>
            <td>{{item.sendType|sendTypeFormat}}</td>
            <td>{{item.officialTicketNumber}}</td>
            <td >{{item.serviceTicketNumber}}</td>
			<td>{{item.invoiceTime|dateFormat}}</td>
			<td>{{item.remarks}}</td> 
			<td>{{item.addressee}}</td>
            <td>{{item.telephone}}</td>
            <td >{{item.address}}</td>
			<td>{{item.expressNo}}</td>
			<td>{{item.expressTime|dateFormat}}</td> 
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="19" class="norecord">
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
	const workOrderListUrl = './api/findPasInvoiceList4BoardMailed';
	
	const dataObj = {//条件数据
		// contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber:null
	};

  export default {
    data() {
      return {
      	spIdOptions:[],
      	entrustedUnitOptions:[],
      	queryObj: {},
      	activeName:'all',
      	dataObj: Object.assign({}, dataObj),

      	
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
      		this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
      },
      view(item){
      	this.$router.push({name: 'bdfmailedDetail', params: {id: item.caseSysNo,type:2}})
      },
      
    },
    filters: {
      patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
	  paperFormat:Filters.paperFormat,
	  sendTypeFormat: Filters.sendTypeFormat,
	  patentTypeFormat:Filters.patentTypeFormat,
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



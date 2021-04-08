<template>
  <div class="myList">
  <!-- 详情部分头部 -->
  <div v-if="type >= 1 && status >= 1 && memberId" class="customer_details mb10">
		<div class="tit_table clearfix">
			<p class="fl" :class="{'txt_color' : type == 1 || type == 2}" @click="toChangePage(1)">客户企业</p>
			<p class="fl ml20" :class="{'txt_color' : (type == 3 && status == 1)}" @click="toChangePage(6)">消息总览</p>
			<p class="fl ml20" :class="{'txt_color' : (type == 3 && status == 2)}" @click="toChangePage(7)">求购商标</p>
			<p class="fl ml20" :class="{'txt_color' : (type == 3 && status == 3)}" @click="toChangePage(8)">搜索记录</p>
		</div>
	</div>
  <!-- 客户列表 -->
  <client-list v-if="type == 1 && status === 0"></client-list>
  <!-- 客户详情-客户企业 -->
  <template v-if="type == 1 && status == 1">
  	<!-- 主体，即我的企业 -->
  	<main-goods-list v-if="enterType == 1" :enterStatus="true"></main-goods-list>
  	<center-detaild v-if="enterType == 2" :enterStatus="true"></center-detaild>
  	<tra-detail v-if="enterType == 3" :enterStatus="true"></tra-detail>
		<!-- 竞品，即关注企业 -->
  	<main-goods-list v-if="focusType == 1" :enterStatus="false"></main-goods-list>
  	<center-detaild v-if="focusType == 2" :enterStatus="false"></center-detaild>
  	<tra-detail v-if="focusType == 3" :enterStatus="false"></tra-detail>
  </template>
  <!-- 客户详情-消息总览 -->
  <template v-if="type == 3 && status == 1">
  	<!-- 主体 -->
  	<message :type="true"></message>
  	<!-- 竞品 -->
  	<message :type="false"></message>
  </template>
  <!-- 客户详情-求购商标 -->
  <shop-trademark v-if="type == 3 && status == 2"></shop-trademark>
  <!-- 客户详情-搜索记录 -->
  <record v-if="type == 3 && status == 3"></record>
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import clientList from './company/clientList.vue'//首页列表
	import mainGoodsList from './company/mainGoodsList.vue'//详情列表
	import centerDetaild from './company/centerDetaild.vue'//企业详情
	import traDetail from './company/trademarkDetails.vue'//商标详情
	import message from './company/message.vue'//消息总览
	import shopTrademark from './company/shopTrademark.vue'//求购商标
	import record from './company/record.vue'//搜索记录
	const workOrderListUrl = './api/findWorkOrdersList';
	
	const entrustedUnitListUrl = './api/findAllentrustedUnit';
	const companySize = [
		{
			id:1,
			name:'3000万以下（年销售额）'
		},
		{
			id:2,
			name:'3000万-5000万（年销售额）'
		},
		{
			id:3,
			name:'5000万-1亿（年销售额）'
		},
		{
			id:4,
			name:'1亿-2亿（年销售额）'
		},
		{
			id:5,
			name:'2亿到5亿（年销售额）'
		},
		{
			id:6,
			name:'5亿以上（年销售额）'
		}
	]

  export default {
  	components: {
  		clientList,
  		mainGoodsList,
  		centerDetaild,traDetail,message,shopTrademark,record
  	},
    name: 'work-order-list',
    data() {
      return {
      	titName:'',
      	type:0,//页面类别
      	status:0,//详情页类别
      	dialogEditor:false,
      	dialogDetail:false,
      	dialogWarning:false,
      	mobile:{},//移回公海
      	editor:{},//编辑企业
      	note:{},//编辑备注
      	editorInfo:{},
      	dialogState:false,
      	companySize:companySize,//企业规模
      	enterType:1,
      	focusType:1,
	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
	      loading: false,
	      memberId:''
      }
    },
    mounted() {
    	let route = this.$route;
    	let type = route.query.type;
	    this.memberId = route.query.id;
	    this.type = type ? type : 1;
	    this.status = route.query.status ? route.query.status : 0;
    	this.enterType = route.query.enterType;
	    this.focusType = route.query.focusType;
    	this.search();
    },
    methods: {//筛选信息不保存在地址栏，地址栏值保存页面是列表还是详情
    	toChangePage(index){//1->客户列表 2->客户详情 3->企业信息 4->旗下商标 5->商标详情 6->消息总览 7->求购商标 8->搜索记录
    		if(index == 1){
    			this.$router.push({query: {type:1,status:0,focusType:1,enterType:1,id:this.$route.query.id}})
    		}else if(index == 6){
    			this.$router.push({query: {type:3,status:1,id:this.$route.query.id}})
    		}else if(index == 7){
    			this.$router.push({query: {type:3,status:2,id:this.$route.query.id}})
    		}else if(index == 8){
    			this.$router.push({query: {type:3,status:3,id:this.$route.query.id}})
    		}
    	},
    	warn(index){
    		if(index == 1){
    			this.titName = '风险预警'
    		}else if(index == 2){
    			this.titName = '重要情报'
    		}
    		this.dialogWarning = true;
    	},
    	submitForm(){
    		console.log(this.editorInfo)
		  },
    	search(extra){
    		console.log(this.dataObj)
    	},
    	reset(){
    	},
    	handleCurrentChange(val) {
      }
    },
    filters: {
    },
    watch:{
    	$route(to, from) {
    		let route = this.$route;
	    	let type = route.query.type;
	    	this.type = type ? type : 1;
	    	this.status = route.query.status ? route.query.status : 0;
	    	this.memberId = route.query.id;
	    	console.log(route.query,111111111111)
	    	this.enterType = route.query.enterType;
	    	this.focusType = route.query.focusType;
    	}
	  }
  }
</script>
<style lang='less'>
.myList{
	padding-left: 10px;
	.txt_color{color:#3db1fa;}
	width: 100%;overflow: hidden;padding-bottom: 20px;
	.nowrap{width:80px;}
	.border_r{border-right: 1px solid #DFE2E5;}
	.condition{
		padding-left: 10px;padding-top: 5px;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
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
			.submit{line-height: 1;}
			.reset{background-color: #fff;color:#479CFF;line-height: 1;}
		}
	}
	.result{
		padding: 10px 10px 10px 10px;
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
						a{color:#3db1fa;}
					}
					td.alignc{text-align: center;}
					td.maxWidth{max-width: 200px;}
					td.action{
						min-width: 60px;
						a{color: #479CFF;display:block;cursor: pointer;}
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
		}
		.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0;}
		}
	}
	
	.detail_dialog,.warn_dialog{
		img{width:90px;height:90px;border:1px solid #eee;}
		.detail_top{
			>p{color:red;}
			.detail_right{
				div{
					span{font-size:13px;display:inline-block;line-height:18px;}
					.name{color:#666;width:53px;}
					.txt{color:#333}
					.host{background-color:#EEF8FF;border-radius:3px;height:24px;line-height:24px;color:#3db1fa;font-size:12px;padding:0 11px;}
				}
			}
			button{width:126px;height:30px;text-align:center;line-height:30px;background-color:#479cff;color:#fff;font-size:14px;border-radius: 2px;}
		}
		.result{padding:0;
			.result_type{
				tbody{
					tr{
						td.c-3{color:#333;}
						td{padding-left:10px;font-size: 12px;color:#666;
							p{font-size:12px;
								a{color:#3db1fa;text-decoration: none}
							}
						}
					}
				}
			}
		}
	}
	.distributeDialog{
		.move{position: absolute;left:320px;top:0;}
		.el-input__inner{width:300px;border-radius:3px;position: relative;}
		.el-textarea__inner{width:500px;border-radius:3px;height:100px;}
		.el-dialog--small{width:680px;}
	}
	.mobile_dialog{
		p{font-size:18px;text-align:center;}
	}
	.editor_dialog ,.mobile_dialog{
		.el-form button{margin: 0 auto;background-color:#3db1fa;color:#fff;padding:5px 40px;border-radius:2px;display:block;}
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
.record .form_control .el-input__inner{height:30px !important;}
}
.detail_dialog{width:950px;
	.el-dialog__body{padding-top:0;}
}
.el-input__inner{height:30px;}
</style>

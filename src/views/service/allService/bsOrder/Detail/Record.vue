<template>
	<div class="recordList">
		<div class="service_table">
			<p>当前服务状态：{{detailData.order_feedback_state ? detailData.order_feedback_state : '--'}}</p>
			<ul class="table_tit clearfix">
				<li class="fl tb01" style="padding-left:20px;">操作时间</li>
				<li class="fl tb02">操作前状态</li>
				<li class="fl tb03">操作后状态</li>
				<li class="fl tb04">操作人</li>
				<li class="fl tb05">备注</li>
			</ul>
			<template v-if="detailData.feedbacks && detailData.feedbacks.length">
				<ul class="table_list clearfix" v-for="serviceInfo in detailData.feedbacks">
					<li class="fl tb01" style="padding-left:20px;"><p>{{serviceInfo.operating_time | dateFormat}}</p></li>
					<li class="fl tb02"><p>{{serviceInfo.operating_satrt_state || '--'}}</p></li>
					<li class="fl tb03"><p>{{serviceInfo.operating_end_state || '--'}}</p></li>
					<li class="fl tb04"><p>{{serviceInfo.operator || '--'}}</p></li>
					<li class="fl tb05"><p>{{serviceInfo.memo || '--'}}</p></li>
				</ul>
			</template>
			<ul class="table_list clearfix" v-else>
				<li class="fl tb01" style="padding-left:20px;"><p>暂无记录</p></li>
				<li class="fl tb02"><p></p></li>
				<li class="fl tb03"><p></p></li>
				<li class="fl tb04"><p></p></li>
				<li class="fl tb05"><p></p></li>
			</ul>
		</div>
		<p class="service_btn mt20" @click="serviceType" v-if="detailData.stage && detailData.stage>0 && detailData.stage<90 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1">设置服务状态</p>
		<!-- 服务状态 -->
		<el-dialog title="设置服务状态"
		  :visible.sync="dialogState" class="state_preview" :modal-append-to-body="true">
		  <template>
		  	<span class="state_radio">请选择服务状态：</span>
		  	<el-radio-group v-model="radio">
			    <el-radio class="ml15" v-for="item in radioState" :key="item.code" :label="item.code">{{item.name}}</el-radio>
			  </el-radio-group>
			</template>
			<p class="mt10 mb10">备注：</p>
			<el-input class="service_note"
			  type="textarea"
			  :rows="5"
			  v-model="textarea" :maxlength="100">
			</el-input>
			<span class="service_limit">{{textarea.length}}-100字</span>
			<div class="set_btn clearfix mt15">
				<p class="right_btn fr" @click="setState">确认</p>
				<p class="left_btn fr mr10" @click="dialogState = false">取消</p>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	import qs from 'qs'
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
  const rootUrl = CONFIG.rootUrl;
  const adminUrl = CONFIG.adminUrl;
	export default {
  	components: {
    },
    props:['order_id', 'detailData'],
    data() {
      return {
      	localStore: store,
        rootUrl:rootUrl,
        radio:'',
        textarea:'',
        dialogState:false,
      	loading:false,
      	radioState:[],
      }
    },
    methods: {
    	// 设置服务状态
      setState(){
      	var self = this;
      	self.$http.get(adminUrl + '/api/setOrderFeedback', {
      		params:{
	      		order_sn: this.detailData.order_sn,
	      		code:self.radio,
	      		memo:self.textarea,
	      	}
      	}).then((resp) => {
      		self.dialogState = false;
	        self.loading = false;
	        self.$emit('complete');
	    	}).catch((error) => {
	    		self.dialogState = false;
	        self.loading = false;
	        this.$message({
	          message: error.msg,
	          type: 'warning'
	        });
	      });
      },
    	//订单下的服务状态
      serviceType(){
      	var self = this;
      	this.radio = '';
      	this.$http.get(adminUrl + '/api/getOrderFeedbackList?order_id='+this.order_id)
      	.then((resp) => {
      		self.dialogState = true;
      		if(resp.data.data){
      			self.radioState = resp.data.data;
      		}else{
      			self.$message({
		          message: resp.data.msg,
		          type: 'warning'
		        });
      		}

	    	}).catch((error) => {
	    		this.$message({
	          message: '系统繁忙，请稍后再试',
	          type: 'warning'
	        });
	        console.log(error);
	      });
      }
    },
    mounted() {
    	var self = this;
    	self.loading = true;
    },
    filters: {
    	format:	Filters.formatDate.dateFormat,
    	dateFormat:Filters.formatDate.dateFormat,
    }
  }
</script>
<style lang='less'>
.recordList{
	background-color:#fff;padding:20px;border:1px solid #dfe2e5;border-top: 0;
	.service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
	.service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;font-size: 13px;color: #479CFF;cursor:pointer;}
	.service_table{margin-top: 10px;
		>p{font-size: 13px;color: #556677;margin-bottom:10px;}
		.tb01{width:24%;}
		.tb02{width:22%;}
		.tb03{width:18%;}
		.tb04{width:14%;}
		.tb05{width:22%;}
		ul{
			li{text-align:left;line-height: 40px;height: 40px;}
		}
		.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
			li{font-size: 13px;color: #223344;}
		}
		.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;
			li{border-bottom:1px solid #DFE2E5;
				p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;}
			}
		}
	}
	// 弹框样式
	.state_preview{
		.el-dialog__title{font-size: 14px;color: #223344;font-weight: normal;}
		.el-dialog__body{padding-top:10px;}
		.el-dialog{width:500px;}
		.radio,.state_radio,p{font-size: 14px;color: #556677;}
		.el-dialog__body{
			.el-radio-group{margin-left: -15px;}
		}
		.set_btn{
			p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
			.right_btn{background: #479CFF;color:#fff;}
			.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
		}
		.service_limit{position: absolute;bottom:85px;right: 30px;font-size: 14px;color: #A8AFB5;}
		.el-radio__label{color:#556677;}
		.el-textarea__inner{border-color:#DFE2E5;border-radius:2px;}
	}
}
</style>

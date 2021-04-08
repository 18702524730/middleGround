<template>
	<div class="service_detail commonWidth">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本资料</li>
				<li class="fl ml5 mr5" :class="{'sele_border':status == 2}" @click="status=2" v-if="(infoState=='sbfw_gnsb_zs' && order != 1) || (infoState=='sbfw_gnsb_zsjc' && order != 1) || (infoState=='sbfw_gnsb_zsdb' && order != 1)">办理记录</li>
				<li class="fl ml5 mr5" :class="{'sele_border':status == 2}" @click="status=2" v-else>服务记录</li>
				<li class="fl" :class="{'sele_border':status == 3}" @click="status=3">备注</li>
			</ul>
		</div>
		<div class="service_detail_con">
			<!-- :detailData = "stateData" -->
			<single-basic :order_id="order_id" v-if="status == 1"></single-basic>
			<!-- 办理记录 -->
			<single-state :order_id="order_id" :order_sn="detailData.order_sn" :detailData="detailData" :registration="registration" v-if="(infoState=='sbfw_gnsb_zs' || infoState=='sbfw_gnsb_zsjc' || infoState=='sbfw_gnsb_zsdb' || infoState=='sbfw_gnsb_zzzc') && order != 1 && status == 2"></single-state>
			<!-- 服务记录 -->
			<single-record :order_id="order_id" :detailData="detailData" @complete="infoDetail" v-if="(infoState!='sbfw_gnsb_zs' && infoState!='sbfw_gnsb_zsjc' && infoState!='sbfw_gnsb_zsdb' && infoState!='sbfw_gnsb_zzzc' && status == 2) || (infoState=='sbfw_gnsb_zs' && order == 1 && status == 2)"></single-record>
			<single-note :order_id="order_id" :detailData="detailData" v-if="status == 3"></single-note>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import SingleBasic from './Basic.vue'
import SingleNote from './Note.vue'
import SingleState from './State.vue'
import SingleRecord from './Record.vue'
const detailUrl = './api/findBsOrderDetailById';
	export default {
  	components: {
      SingleBasic,
      SingleNote,
      SingleState,
      SingleRecord
    },
    data() {
      return {
      	registration:'',
      	order_id: '',
				status:1,
				detailData:{},
				state_data:{},
				infoState:'',
				order:''
      }
    },
    methods: {
    	infoDetail(){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?order_id=' + this.order_id)
	    	.then((resp) => {
	    		self.detailData = resp.data;
	    		self.registration = resp.data.acceptMaterials;
	    		self.infoState = resp.data.order_bs_code;
	    		self.order = resp.data.order_is_history;
	    	}).catch((error) => {
	        console.log(error);
	      });
	    }
    },
    created() {
    	this.order_id = this.$route.params.id;
    	this.infoDetail();
    	// this.status = this.$router.query.status;
    }
  }
</script>
<style lang='less'>
	.service_detail{background-color: #fff;position: relative;width: 100%;
		.service_detail_tab{
			position: relative;box-sizing: content-box;width: 100%;
			ul{border-bottom:1px solid #dfe2e5;height:40px;
				li{height:40px;text-align: center;font-size:14px;color:#556677;cursor:pointer;padding:13px 12px 0;line-height: 100%;}
				.sele_border{box-sizing:border-box;background-color:#fff;border:1px solid #DFE2E5;border-bottom: 1px solid #fff;}
			}
		}
		.service_detail_con{}
	}
</style>

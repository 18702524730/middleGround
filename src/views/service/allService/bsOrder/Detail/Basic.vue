<template>
	<div class="basic_dateil" v-loading="loading">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">服务单号</p>
							<p class="txt">{{detailData.order_sn}}</p>
						</li>
						<li>
							<p class="tit">办理状态</p>
							<p class="txt">{{detailData.order_feedback_state}}</p>
						</li>
						<li>
							<p class="tit">金额</p>
							<p class="txt">{{detailData.payment_amount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt" :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">{{detailData.payment_state | payStatusformat}}</p>
						</li>
						<li v-if="type">
							<p class="tit">支付方式</p>
							<p class="txt">{{detailData.payment_name}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.payment_time | dateFormat}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">服务分类</p>
							<p class="txt">{{detailData.bs_class_name}}</p>
						</li>
						<li v-if="detailData.order_service_state">
							<p class="tit">服务状态</p>
							<p class="txt">{{detailData.order_service_state | orderStatus}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.bs_name}}</p>
						</li>
						<li>
							<p class="tit">售后状态</p>
							<p class="txt">{{detailData.refund_state | refundState}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.create_time | dateFormat}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li v-if="detailData.memberDTO">
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberDTO.nickname || '--'}}</p>
						</li>
						<li v-if="detailData.memberDTO">
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberDTO.truename || '--'}}</p>
						</li>
						<li v-if="detailData.memberDTO">
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberDTO.sex | sex}}</p>
						</li>
						<li v-if="detailData.memberDTO">
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.memberDTO.phone || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li v-if="detailData.memberDTO">
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberDTO.industryName || '--'}}</p>
						</li v-if="detailData.memberDTO">
						<li v-if="detailData.memberDTO">
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberDTO.member_qq || '--'}}</p>
						</li>
						<li v-if="detailData.memberDTO">
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberDTO.member_wechat || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData.memberApplySubject">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.memberApplySubject.applyName || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType!=4">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeNumber}}</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl" v-if="usinessLicense[0] && detailData.memberApplySubject.applyType!=2" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p :title="detailData.memberApplySubject.applyType | licenseName">{{detailData.memberApplySubject.applyType | licenseName}}</p>
						</div>
		        <div class="fl ml20" @click="certificatePreview(cardImg)">
		          <img :src="cardImg[0]" alt="">
		          <p :title="detailData.memberApplySubject.applyType | fileName">{{detailData.memberApplySubject.applyType | fileName}}</p>
		        </div>
					</div>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.invoice !== undefined">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="detailData.invoice === null || (detailData.invoice && !detailData.invoice.invoiceType)">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<ul class="fl category_left" v-if="detailData.invoice && detailData.invoice.invoiceType">
						<li>
							<p class="tit">发票类型</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">发票抬头</p>
							<p class="txt">{{detailData.invoice.invoiceTitle || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2">
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoice.invoiceCode || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.invoice.registPhone || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice.accountBank || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">银行账号</p>
							<p class="txt">{{detailData.invoice.accountNumber || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData && detailData.order_bs_code=='sbfw_gnsb_zs' && order_is_history != 1">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.tradeMarkName || '--'}}</p>
						</li>
						<li>
							<p class="tit">商标分类</p>
							<p class="txt">{{getTmInfo(detailData.intCls)}}</p>
						</li>
						<li>
							<p class="tit">小项类目</p>
							<p class="txt">{{detailData.group || '--'}}</p>
						</li>
						<li>
							<p class="tit">在先近似商标</p>
							<p class="txt">{{detailData.similarTrademark || '--'}}</p>
						</li>
						<li>
							<p class="tit">注册通过率</p>
							<p class="txt" v-if="detailData.registerPassRate">{{detailData.registerPassRate}}%</p>
							<p class="txt" v-else>--</p>
						</li>
						<!-- <li>
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice && detailData.invoice.accountBank || '--'}}</p>
						</li> -->
						<li>
							<p class="tit">风险说明及注册建议</p>
							<p class="txt">{{detailData.riskDescRegisterAdvice || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30 mb20" v-if="powerAttorney[0]" @click="certificatePreview(powerAttorney)">
	            <img :src="powerAttorney[0]" alt="">
	            <p title="委托书">委托书</p>
						</div>
						<div class="fl mr30 mb20" v-if="detailData.specify_pic_url" @click="preview(detailData.specify_pic_url)">
							<img :src="detailData.specify_pic_url" alt="">
							<p title="指定色">指定色</p>
						</div>
						<div class="fl mb20" v-if="detailData.black_white_pic_url" @click="preview(detailData.black_white_pic_url)">
							<img :src="detailData.black_white_pic_url" alt="">
							<p title="黑白色">黑白色</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 国内商标注册申请和国内商标自助注册 才有支付信息 -->
			<div class="pay_inform" v-if="detailData && (detailData.order_bs_code=='sbfw_gnsb_zs' || detailData.order_bs_code=='sbfw_gnsb_zzzc') && order_is_history != 1 && type!=1">
				<p>支付信息</p>
				<div>
					<ul class="clearfix">
						<li class="fl clearfix">
							<p class="fl">服务总价</p>
							<p class="pay_right fl">{{detailData.baseAmount + detailData.itemPrice | priceformat}}</p>
						</li>
						<li class="fl clearfix">
							<p class="fl">基础服务费</p>
							<p class="pay_right fl">{{detailData.baseAmount | priceformat}}<span :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">（{{detailData.payment_state | payStatusformat}}）</span></p>
						</li>
						<li class="fl clearfix">
							<p class="fl">补小项费用</p>
							<p class="pay_right fl" v-if="detailData.order_bs_code=='sbfw_gnsb_zzzc'">{{detailData.itemPrice | priceformat}}<span class="topay" v-if="detailData.itemPrice > 0">（{{detailData.payment_state | payStatusformat}}）</span></p>
							<p class="pay_right fl" v-else>{{detailData.itemPrice | priceformat}}<span class="topay" v-if="detailData.itemPrice > 0">（{{detailData.itemState | payStatusformat}}）</span></p>
						</li>
						<li class="fl clearfix" v-if="detailData.taxAmount" style="margin-right: 0;">
							<p class="fl">税费</p>
							<p class="pay_right fl">{{detailData.taxAmount | priceformat}}<span class="topay" v-if="detailData.taxAmount > 0">（{{detailData.itemState | payStatusformat}}）</span></p>
						</li>
					</ul>
				</div>
			</div>

			<!-- 代理顾问分配记录 -->
			<div class="note_table mt20" v-if="detailData.agentDistributeRecords">
			 	<p>代理顾问分配记录</p>
				<div class="note_list clearfix">
					<p class="td_1 fl">代理顾问</p>
					<p class="td_2 fl">分配时间</p>
				</div>
				<div class="note_tab clearfix" v-for="agentItem in detailData.agentDistributeRecords" v-if="detailData.agentDistributeRecords">
					<p class="td_1 fl">{{agentItem.operatorName || '--'}}</p>
					<p class="td_2 fl">{{agentItem.agentDistributeTime | dateFormat}}</p>
				</div>
				<div class="note_null" v-if="!detailData.agentDistributeRecords">
					<img src="~assets/img/nulldata.png" alt="">
					<span>暂无信息</span>
				</div>
			</div>

			<!-- 服务商信息 -->
			<div class="service_list servicerInfo" v-if="detailData.serviceProvider && type!=1">
				<p>{{detailData.order_from==4?'合伙人':'服务商'}}信息</p>
				<div class="detail_list">
					<ul class="mt5 clearfix">
						<li class="clearfix mb5">
							<p class="state_name fl">{{detailData.order_from==4?'合伙人':'服务商'}}名称</p>
							<p class="state_txt fl setServicer">{{detailData.order_from==4?detailData.jobPartnerName:detailData.serviceProvider.sp_name}}<a v-if="localStore.get('permission').indexOf('sbfw_gnsb_zs_all_rebute_sp') !== -1 && detailData.order_bs_code != 'sbfw_gnsb_zsjc' && detailData.order_bs_code != 'sbfw_gnsb_zsdb'" href="#" @click.prevent="setServicer">设置{{detailData.order_from==4?'合伙人':'服务商'}}</a></p>
							<div class="idcode">
								<p class="state_name fl">{{detailData.order_from==4?'合伙人店铺':'服务商识别码'}}</p>
								<p class="state_txt fl setServicer">{{detailData.order_from==4?detailData.jobPartnerStore:detailData.serviceProvider.idCode}}</p>
							</div>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl">{{detailData.order_from==4?'合伙人':'服务商'}}账号</p>
							<p class="state_txt fl">{{detailData.order_from==4?detailData.jobPartnerPhone:detailData.serviceProvider.sp_account}}</p>
						</li>
					</ul>
				</div>
				<div class="service_table">
					<ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;">操作时间</li>
	          <li class="fl tb02">操作前服务商</li>
	          <li class="fl tb03">操作后服务商</li>
	          <li class="fl tb04">操作人</li>
	          <li class="fl tb05">备注</li>
	        </ul>
	        <ul class="table_list clearfix" v-if="detailData.spFeedbackDTOList && !detailData.spFeedbackDTOList.length">
	          <li class="fl tb01" style="padding-left:20px;"><p>暂无记录</p></li>
	          <li class="fl tb02"><p></p></li>
	          <li class="fl tb03"><p></p></li>
	          <li class="fl tb04"><p></p></li>
	          <li class="fl tb05"><p></p></li>
	        </ul>
	        <template v-else>
		        <ul class="table_list clearfix" v-for="data in detailData.spFeedbackDTOList">
		          <li class="fl tb01" style="padding-left:20px;"><p>{{data.operating_time | dateFormat}}</p></li>
		          <li class="fl tb02"><p>{{data.operating_start_sp}}</p></li>
		          <li class="fl tb03"><p>{{data.operating_end_sp}}</p></li>
		          <li class="fl tb04"><p>{{data.operator}}</p></li>
		          <li class="fl tb05"><p>{{data.memo}}</p></li>
		        </ul>
	        </template>
        </div>
			</div>

			<!-- 售后信息 -->
			<div class="service_list afterSaleInfo" v-if="detailData.refunds && type!=1">
				<p>售后信息</p>
				<div class="detail_list">
					<ul class="mt5 clearfix">
						<li class="clearfix mb10">
							<p class="state_name fl">当前售后状态</p>
							<p class="state_txt fl setServicer">{{detailData.refund_state_description ? detailData.refund_state_description : '--'}}</p>
						</li>
					</ul>
				</div>
				<div class="service_table">
					<ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;">操作时间</li>
	          <li class="fl tb02">操作</li>
	          <li class="fl tb03">操作后状态</li>
	          <li class="fl tb04">金额</li>
	          <li class="fl tb05">操作人</li>
	          <li class="fl tb06">退款原因</li>
	          <li class="fl tb07">备注</li>
	        </ul>
	        <ul class="table_list clearfix" v-if="detailData.refunds && !detailData.refunds.length">
	          <li class="fl tb01" style="padding-left:20px;"><p>暂无记录</p></li>
	          <li class="fl tb02"><p></p></li>
	          <li class="fl tb03"><p></p></li>
	          <li class="fl tb04"><p></p></li>
	          <li class="fl tb05"><p></p></li>
	          <li class="fl tb06"><p></p></li>
	          <li class="fl tb07"><p></p></li>
	        </ul>
	        <template v-else>
		        <ul class="table_list clearfix" v-for="data in detailData.refunds">
		          <li class="fl tb01" style="padding-left:20px;"><p>{{data.operating_time | dateFormat}}</p></li>
		          <li class="fl tb02"><p>{{data.operating_state_description}}</p></li>
		          <li class="fl tb03"><p>{{data.operating_end_state_description}}</p></li>
		          <li class="fl tb04"><p>{{data.refund_amount}}</p></li>
		          <li class="fl tb05"><p>{{data.operator}}</p></li>
		          <li class="fl tb06"><p :title="data.refund_reason_type_name">{{data.refund_reason_type_name}}</p></li>
		          <li class="fl tb07"><p :title="data.refund_message">{{data.refund_return_message}}</p></li>
		        </ul>
	        </template>
        </div>
			</div>

			<div class="detail_null" v-if="!detailData">
				<div>
					<img src="~assets/img/nulldata.png" alt="">
					<span class="ml5">系统繁忙，请稍后再试</span>
				</div>
			</div>
		</div>

		<!-- 更换服务商 -->
		<el-dialog :title="detailData.order_from==4?'更换作业合伙人':'更换服务商'"	:visible.sync="setServicerVisible" class="setServicerDialog" :modal-append-to-body="true">
			<el-form ref="setServicerData" :model="setServicerData" :rules="setServicerRules" :inline="false" auto-complete="off" label-width="170px">
				<el-form-item :label="detailData.order_from==4?'请选择作业合伙人':'请选择服务商'" prop="sp_id">
					<el-select clearable v-model="setServicerData.sp_id" :placeholder="detailData.order_from==4?'请选择作业合伙人':'请选择服务商'" style="width: 480px;">
						<el-option
							v-for="item in spIdOptions"
							:key="item.sp_id"
							:label="item.name"
							:value="item.sp_id+''">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请填写备注备注" prop="memo">
					<el-input class="service_note" type="textarea" :rows="5" v-model="setServicerData.memo" :maxlength="200" style="width: 480px;"></el-input><p class="service_limit" style="text-align:right;position: absolute;bottom: 0;right: 5px;height: 20px;line-height: 20px;font-size: 13px;">{{setServicerData.memo && setServicerData.memo.length || 0}}-200字</p>
				</el-form-item>
				<el-form-item label="" prop="is_contact">
					<el-checkbox v-model="setServicerData.is_contact">确认已与服务商联系</el-checkbox>
				</el-form-item>

				<div class="set_btn clearfix">
					<span class="left_btn" @click="setServicerVisible=false">取消</span>
					<span class="right_btn" :class="{disabled: !setServicerData.is_contact}" @click="servicerConfirm('setServicerData')">确认</span>
				</div>
			</el-form>
		</el-dialog>

		<!-- 图片预览 -->
		<el-dialog
		  :visible.sync="dialogVisible"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		  <img :src="imgsrc" alt="">
		</el-dialog>

		<!-- 证书预览 -->
		<el-dialog
		  :visible.sync="dialogImg"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		   <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
		    <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
		      <img :src="item" alt="">
		    </el-carousel-item>
		  </el-carousel>
		</el-dialog>

		<!-- 服务状态 -->
		<el-dialog title="设置服务状态"
		  :visible.sync="dialogState" class="state_preview" :modal-append-to-body="true">
		  <template>
		  	<span class="state_radio">请选择服务状态：</span>
		  	<el-radio-group v-model="radio">
			    <el-radio class="mt15 ml15" v-for="item in radioState" :key="item" :label="item.code">{{item.name}}</el-radio>
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
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const detailUrl = './api/findBsOrderDetailById';
  const stateUrl = './api/setOrderFeedback';
  const pdfUrl = './api/preview';
  const spListUrl = './api/findAllSp';
  const spPartnerListUrl = './api/findAllPartner';

	const allotSpUrl = CONFIG.adminUrl + '/api/orders/{order_id}'
	const allotPartnerSpUrl = CONFIG.adminUrl + '/api/resetPartner/{order_id}'

	export default {
		//props:['detailData'],
  	components: {
    },
    props:['order_id'],
    data() {
      return {
      	type:'', //type: 0 默认; 1 创新保; 2 国内商标自助注册
      	localStore: store,
      	setServicerVisible: false,
				spIdOptions:[],
				setServicerData:{
					sp_id:'',
					is_rebuild_sp:1, //sp_id为空时，为1，表示回收。 sp_id有值时，为2，表示更换
					memo:'',
					is_contact:false,
					order_id:''
				},
				setServicerRules:{
					sp_id:[
						//{ required: true, message: '请选择更换的服务商', trigger: 'blur' }
					],
					is_contact: [
						{ type:'boolean', required: true, message: '请确认已与服务商联系', trigger: 'change' }
					],
					memo: [
						{ required: true, message: '请填写备注', trigger: 'blur' }
					]
				},
      	// 备注
      	textarea:'',
      	// 预览部分
      	dialogState:false,
      	dialogVisible:false,
      	dialogImg:false,
      	imgsrc:'',
      	detailData:{},
      	// 营业执照
		    usinessLicense:[],
		    // 委托书
		    powerAttorney:[],
		    //身份证
        cardImg:[],
        loading:false,
        // 证书图片地址集合
        proxyImg:{},
        // 服务状态
        radioState:{},
        radio:'',
        // 大类过滤
        cateIdData: intClsData.cateIdData,
        // 老旧数据判定
        order_is_history:''
      }
    },
    methods: {
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
			getPartnerSpList(){
				this.$http.get(spPartnerListUrl+'?bsCode='+this.detailData.order_bs_code)
				.then((resp) => {
					var data = resp.data;
					this.spIdOptions = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			setServicer(){
				this.setServicerVisible = true;
				if(this.detailData.order_from == 4){
					this.getPartnerSpList();
				}else{
					this.getSpList();
				}
				console.log(this.detailData.order_from)
				this.setServicerData = {};
				this.$refs['setServicerData'].resetFields();
			},
			servicerConfirm(name){
				this.setServicerData.order_id = this.order_id;

				var data = Object.assign({}, this.setServicerData);
				data.is_contact = data.is_contact ? 1 : 0;
				data.is_rebuild_sp = data.sp_id ? 2 : 1;

				this.$refs[name].validate((valid) => {
					if (valid) {
						if(this.detailData.order_from == 4){//合伙人
							this.$http.put(allotPartnerSpUrl.replace('{order_id}', this.setServicerData.order_id), data)
					    .then((resp) => {
					    	this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.infoDetail();
					      this.setServicerVisible = false;
					    })
					    .catch((err) => {
					      this.$message({
					        message: err.response.data.msg,
					        type: 'warning'
					      });
					    });
						}else{//服务商
							this.$http.put(allotSpUrl.replace('{order_id}', this.setServicerData.order_id), data)
					    .then((resp) => {
					    	this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.infoDetail();
					      this.setServicerVisible = false;
					    })
					    .catch((err) => {
					      this.$message({
					        message: err.response.data.msg,
					        type: 'warning'
					      });
					    });
						}

				  }
				})
			},
    	// 大类过滤
    	getTmInfo(item){
    		if(item){
    			var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
        	return str;
    		}else{
    			var str = '--';
    			return str;
    		}
      },
      // 初始化
    	infoDetail(){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?order_id=' + this.order_id)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		self.order_is_history = resp.data.order_is_history;
	    		if(self.detailData.memberApplySubject.standby1){
	    		 	self.$http.get('./api/preview?pdf_url='+self.detailData.memberApplySubject.standby1)
		        .then((response) => {
		          self.cardImg = response.data.urls;
		        })
		        .catch((error) => {
		          console.log(error)
		        });
	    		}
	    		// 营业执照
		      if(self.detailData.memberApplySubject.standby2){
		  			self.$http.get('./api/preview?pdf_url='+self.detailData.memberApplySubject.standby2)
				    .then((response) => {
				      self.usinessLicense = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      };
		      // 委托书
		      if(self.detailData.proxy_url){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.proxy_url)
				    .then((response) => {
				      self.powerAttorney = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }
	    	}).catch((error) => {
	        self.loading = false;
	        console.log(error);
	      });
	    },
		  // 状态部分pdf查看
		  certificatePreview(url){
		    this.proxyImg = url;
		    this.dialogImg = true;
		  },
		  // 预览
      preview(src){
      	this.imgsrc = src;
      	this.dialogVisible = true;
      },
      // 设置服务状态
      setState(){
      	var self = this;
      	self.$http.post(stateUrl,qs.stringify({
      		code:self.radio,
      		memo:self.textarea,
      		order_id:self.order_id
      	})).then((resp) => {
      		self.dialogState = false;
	        self.loading = false;
	        self.infoDetail();
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
      	this.$http.get('./api/findOrderFeedback?order_id='+this.order_id)
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
    	this.type = this.$route.params.type;
    	this.infoDetail();
    	console.log(this.$route.params)
    	// this.status = this.$router.query.status;
    },
    filters: {
      orderStatusformat: Filters.orderStatusformat,
      orderStatus: Filters.orderStatus,
      sex: Filters.sex,
      priceformat: Filters.priceformat,
      formatApplySbj: Filters.subjectTypeFormat,
      payStatusformat:Filters.payStatusformat,
      refundState:Filters.refundState,
      dateFormat:Filters.formatDate.dateFormat,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
      fileName: Filters.fileName,
      licenseName: Filters.licenseName,
      downFileName: Filters.downFileName,
    }
  }
</script>
<style lang='less'>
	.basic_dateil{background-color:#fff;padding:0px 20px 20px;min-height: 500px;border-top:0;position: relative;border:1px solid #dfe2e5;border-top: 0;
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:60%;}
				ul{width:50%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						p.nopay{color:#F64744}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;word-break:break-all;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:40%;text-align:left;
					>div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;border-radius:2px;cursor:pointer;
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;left:-1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
					}
				}
			}
		}
		.basic_lists:last-child{
			.basic_category{border-bottom: 0;}
		}
		.pay_inform{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			>div{border: 1px solid #DFE2E5;border-radius: 2px;
				ul{padding-left: 20px;
					li{box-sizing:border-box;margin-right:90px;
						p{font-size: 13px;color: #556677;line-height:40px;
							.topay{color:#36af47;}
							.nopay{color:#F64744}
						}
						.pay_right{margin-left: 20px;}
					}
				}
			}
		}
		// 服务信息
		.service{padding-top: 20px;
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
		}
		//服务商信息
		.servicerInfo{
			padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.detail_list{border: 1px solid #e5e5e5;margin-top: -1px;padding-top: 10px;
				.list_tit{padding:0 22px;
					>p{font-size: 14px;color: #556677;line-height:20px;text-align:left;}
					.serial{width:38px;}
					.order{width:128px;}
				}
				// 详情
				ul{padding-left:20px;padding-right: 50px;
					li{
						// 数据为空，高亮
						position: relative;
						.errNull{color: #F64744;}
						p{font-size: 13px;color: #7F8FA4;line-height:24px;}
						.state_name{width:128px;}
						.state_txt{width:82%;word-break:break-all;}
						.setServicer{
							a{
								margin-left:20px;border:1px solid #479CFF; color: #479CFF;padding:0 10px;height: 24px;line-height:24px;display:inline-block;border-radius: 2px;
								&:hover{text-decoration:none;}
							}
						}
						.idcode{
							width: 300px;position: absolute; top:0;left: 51%;
							.state_txt{width:120px;word-break:break-all;}
						}
					}
				}
			}
	  	.service_table{margin-top: 10px;
	      >p{font-size: 13px;color: #556677;margin-bottom:10px;
	        button{width: 70px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
	        .service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
	        .service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:not-allowed;}
	      }
	      .tb01{width:20%;}
	      .tb02{width:15%;}
	      .tb03{width:15%;}
	      .tb04{width:15%;}
	      .tb05{width:35%;}
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
	  }

	  //售后信息
		.afterSaleInfo{
			padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.detail_list{border: 1px solid #e5e5e5;margin-top: -1px;padding-top: 10px;
				.list_tit{padding:0 22px;
					>p{font-size: 14px;color: #556677;line-height:20px;text-align:left;}
					.serial{width:38px;}
					.order{width:128px;}
				}
				// 详情
				ul{padding-left:20px;padding-right: 50px;
					li{
						// 数据为空，高亮
						.errNull{color: #F64744;}
						p{font-size: 13px;color: #7F8FA4;line-height:18px;}
						.state_name{width:128px;}
						.state_txt{width:82%;word-break:break-all;}
						.setServicer{
							a{
								margin-left:20px;border:1px solid #479CFF; color: #479CFF;padding:0 10px;height: 24px;line-height:24px;display:inline-block;border-radius: 2px;
								&:hover{text-decoration:none;}
							}
						}
					}
				}
			}
	  	.service_table{margin-top: 10px;
	      >p{font-size: 13px;color: #556677;margin-bottom:10px;
	        button{width: 70px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
	        .service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
	        .service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:not-allowed;}
	      }
	      .tb01{width:20%;}
	      .tb02{width:10%;}
	      .tb03{width:10%;}
	      .tb04{width:10%;}
	      .tb05{width:10%;}
	      .tb06{width:20%;}
	      .tb07{width:20%;}
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
	  }

		// 预览
		.img_preview{
			.el-dialog--tiny{width:940px;
				img{width:900px;}
			}
		}
		.img_preview{
	    .el-carousel{margin:0 auto;width:835px;
	      .el-carousel__container{margin:0 auto;height:650px;
	        .el-carousel__arrow{position: fixed;}
	        .el-carousel__item{text-align:center;width:810px;overflow-y: auto;
	          img{width:810px;}
	        }
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

		.el-carousel__container{height:600px;}
		.el-carousel__button{background-color: #3db1fa;}

		.detail_null{text-align:center;position: absolute;top:50%;width:100%;
			span{vertical-align: middle;display: inline-block;line-height:34px;vertical-align: top;font-size:13px;color: #A8AFB5;}
		}

		.note_table{
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.td_1{width:30%;}
			.td_2{width:70%;}
			.note_list{border-box:box-sizing;border: 1px solid #dfe2e5;background-color:#f5f5f5;
				p{padding-left:20px;font-size:13px;color:#223344;line-height:40px;height:40px;}
			}
			.note_tab{border-box:box-sizing;border-left: 1px solid #dfe2e5;border-right: 1px solid #dfe2e5;border-bottom: 1px solid #dfe2e5;background-color:#fff;
				p{padding-left:20px;font-size:13px;color:#556677;line-height:40px;height:40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
			}
			.note_null{height:60px;text-align:center;padding:10px 0;line-height:35px;border-left: 1px solid #dfe2e5;border-right: 1px solid #dfe2e5;border-bottom: 1px solid #dfe2e5;
				img{width:35px;}
				span{ont-size: 13px;color: #A8AFB5;margin-left: 5px;vertical-align: middle;display: inline-block;vertical-align: top;}
			}
			.add_note{border: 1px solid #479CFF;border-radius: 2px;text-align:center;line-height:30px;height:30px;width:92px;font-size: 13px;color: #479CFF;cursor:pointer;}
		}

		.setServicerDialog{
	  	.el-dialog--small{width: 520px;}
	  	.el-dialog__body{padding-top: 10px;}
	  	.el-form-item__label{text-align: left;display: block;float: none;}
	  	.el-form-item__content{margin-left: 0!important}
	  	.set_btn{
	  		text-align: right;
				span{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;display: inline-block;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF;margin-right: 10px;}
				.disabled{background-color: #ccc;cursor: not-allowed;}
			}
	  }
	}
</style>

<template>
	<div class="state_type" v-loading="loading">
		<!-- 创新保订单显示 http://localhost:9005/#/service/allService/bsOrderList/339069/1 -->
		<div class="service_table mb20">
			<p>
				申请／注册号：{{registration ? registration : '待商标局形式审查通过后显示' }}
			</p>
			<div class="business mt15 mb15" v-if="type == 1">
				<div class="business_list">
					<table class="result_type">
		        <thead>
		          <tr class="thead">
		          	<th width="200">时间</th>
		          	<th>备注人</th>
		            <th>说明类型</th>
		            <th>备注内容</th>
		          </tr>
		        </thead>
		        <tbody class="tr-color">
		        	<template v-if="infoBusiness && infoBusiness.length">
		          <tr class="list_info" v-for="item in infoBusiness" :key="item.createTime">
		          	<td class="alignc">{{item.createTime | format}}</td>
		          	<td class="alignc">{{item.operator}}</td>
		          	<td class="alignc">{{Remarktype(item.type)}}</td>
		          	<td class="alignc"><span>{{item.remark}}</span></td>
		          </tr>
		          </template>
		          <tr class="empty" v-else>
		            <td colspan="4" class="norecord" style="padding-left: 20px;border-bottom: 1px solid #DFE2E5;border-right:1px solid #DFE2E5;">暂无信息</td>
		          </tr>
		        </tbody>
			    </table>
				</div>
				<!-- isHandleRemark 为1 显示 -->
				<button v-if="detailInfo.isHandleRemark == 1 && localStore.get('permission').indexOf('iprp_cxb_additional_remarks') !== -1" class="mt15" @click="addRecord">新增办理说明</button>
			</div>

			<!-- 拾贝平台和创新保在这儿共用 -->
      <p>
        办理状态：
        <template v-if="type==2 && detailInfo.feedback_stage==4">已完善待申报</template>
        <template v-else>{{detailInfo.feedback_stage|fileStateName}}</template>
				<!-- 申报 -->
        <button v-if="((type==2 && detailInfo.feedback_stage==4) || detailInfo.feedback_stage == 7) && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" class="service_btn ml10" @click="OfficeClick(7)">手动申报</button>
				<!-- 反馈受理通知结果 -->
        <button v-if="detailInfo.feedback_stage == 8 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage)">{{detailInfo.feedback_stage | btnState}}</button>
        <!-- 形式审查 -->
        <button v-if="detailInfo.feedback_stage == 9 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage)">{{detailInfo.feedback_stage | btnState}}</button>
        <!-- 实质审查 -->
        <button class="service_btn ml10" v-if="(detailInfo.feedback_stage == 11 || detailInfo.feedback_stage == 19) && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(10)">{{10 | btnState}}</button>
        <!-- 返回部分驳回结果  -->
        <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 13 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(13)">{{11 | btnState}}</button>
        <!-- 初审公告 -->
        <button class="service_btn ml10" v-if="(detailInfo.feedback_stage == 12 || detailInfo.feedback_stage == 22)&& localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(12)">{{12 | btnState}}</button>
        <!-- 反馈部分异议结果 -->
        <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 16 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(16)">{{13 | btnState}}</button>
        <!-- 反馈部分异议答辩结果 -->
        <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 17 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(17)">{{17 | btnState}}</button>
        <!-- 发放注册证 -->
        <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 15 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(14)">{{14 | btnState}}</button>
        <!-- 反馈驳回结果  -->
        <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 14 && localStore.get('permission').indexOf('sbfw_gnsb_zs_all_business_process') !== -1" @click="OfficeClick(15)">{{15 | btnState}}</button>
    	</p>
		</div>
		<!-- type 0 默认; 1 创新保; 2 国内商标自助注册 -->
		<!-- 创新保流程 -->
		<handle-state-cxb v-if="type == 1" :stateData="stateData"></handle-state-cxb>
		<!-- 拾贝流程 -->
		<handle-state v-else :stateData="stateData" :type="type"></handle-state>

    <el-dialog
      :visible.sync="dialogImg"
      size="tiny" class="img_preview" :modal-append-to-body="true">
      <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
        <el-carousel-item v-for="(imgSrc,$index) in proxyImg" :key="$index">
          <img :src="imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

    <!-- 图片预览 -->
		<el-dialog
			:visible.sync="dialogVisible"
			size="tiny" class="img_preview" :modal-append-to-body="true">
			<img :src="imgsrc" alt="">
		</el-dialog>

		<el-dialog :title="auditInfo | auditName" v-loading="loadAudio" :close-on-click-modal="false"
				:visible.sync="dialogOffice" class="state_preview state_dialog" :class="{state_dialog_memo: auditInfo == 7}" :modal-append-to-body="true">
				<el-form ref="trademarkData" :model="trademarkData" :rules="rules" :inline="true" auto-complete="off" label-width="135px">
					<p v-if="auditInfo == 7" class="mb20">确认该项申报材料至商标局</p>
					<el-form-item label="受理通知结果" prop="accept" v-if="auditInfo == 9">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="6">受理</el-radio>
							<el-radio label="-6">不予受理</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="实质审查结果" prop="accept" v-if="auditInfo == 10">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="12">通过</el-radio>
							<el-radio label="13">部分驳回</el-radio>
							<el-radio label="14">驳回</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="初审公告结果" prop="accept" v-if="auditInfo == 12">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="15">通过</el-radio>
							<el-radio label="16">部分异议</el-radio>
							<el-radio label="17">异议</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="部分驳回结果" prop="accept" v-if="auditInfo == 13">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="12">通过</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否办理驳回复审" prop="bool" v-if="auditInfo == 15">
						<el-radio-group v-model="trademarkData.bool">
							<el-radio label="1">是</el-radio>
							<el-radio label="21">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<br  v-if="auditInfo == 15">
					<el-form-item label="驳回复审结果" prop="accept" v-if="auditInfo == 15&&trademarkData.bool==1">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="19">通过</el-radio>
							<el-radio label="20">不通过</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="初审公告结果" prop="accept" v-if="auditInfo == 16">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="15">通过</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否办理异议答辩" prop="bool" v-if="auditInfo == 17">
						<el-radio-group v-model="trademarkData.bool">
							<el-radio label="1">是</el-radio>
							<el-radio label="21">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<br  v-if="auditInfo == 17">
					<el-form-item label="异议答辩结果" prop="accept" v-if="auditInfo == 17&&trademarkData.bool==1">
						<el-radio-group v-model="trademarkData.accept">
							<el-radio label="23">通过</el-radio>
							<el-radio label="24">不通过</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="申请号" prop="number" v-if="auditInfo == 8">
						<el-input v-model="trademarkData.number" :maxlength="8" style="width:300px;"></el-input>
					</el-form-item>

					<el-form-item :label="trademarkData.accept | timeStatus(auditInfo)" v-if="auditInfo > 7&&(!trademarkData.bool||trademarkData.bool<21)" required>
						<el-col :span="11">
							<el-form-item prop="time">
								<el-date-picker type="date" placeholder="选择日期" v-model="trademarkData.time" style="width:300px;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>

					<!-- 图片 -->
					<el-form-item :label="trademarkData.accept | nameFile(auditInfo)" v-if="(auditInfo==12||auditInfo==16) && trademarkData.accept">
						<div class="upload_component">
						<p class="err_txt">{{errTxt}}</p>
							<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_name" :postAction="'iprp_middleground/api/file/upload'" :url="standby1" :valueName="'standby1'" :size="5" :extensions="'pdf,gif,jpg,jpeg,png,bmp'" :isDialog="true"></uploader>
							<div class="upload_tip">
								<p>请上传{{trademarkData.accept | nameFile(auditInfo)}}</p><!-- 受理通知书、初审公告、注册证 -->
								<p class="format">支持pdf\gif\jpg\jpeg\png\bmp，文件大小限5MB以内</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item :label="trademarkData.accept | nameFile(auditInfo)" v-if="auditInfo > 7&&auditInfo!=12&&auditInfo!=16&& trademarkData.accept" required>
						<div class="upload_component">
						<p class="err_txt">{{errTxt}}</p>
							<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_name" :postAction="'iprp_middleground/api/file/upload'" :url="standby1" :valueName="'standby1'" :size="5" :extensions="'pdf,gif,jpg,jpeg,png,bmp'" :isDialog="true"></uploader>
							<div class="upload_tip">
								<p>请上传{{trademarkData.accept | nameFile(auditInfo)}}</p><!-- 受理通知书、初审公告、注册证 -->
								<p class="format">支持pdf\gif\jpg\jpeg\png\bmp，文件大小限5MB以内</p>
							</div>
						</div>
					</el-form-item>
				</el-form>
				<div class="dialog_memo">
					<div class="label mt10 mb10">备注</div>
					<el-input class="service_note"
						type="textarea"
						:rows="5"
						v-model="textarea" :maxlength="200">
					</el-input>
					<span class="service_limit">{{textarea.length}}-200字</span>
				</div>
				<div class="set_btn clearfix mt15">
					<p class="left_btn fr" @click="remove">取消</p>
					<p class="right_btn fr mr10" @click="officeInfo('trademarkData')">提交</p>
				</div>
		</el-dialog>

		<el-dialog title="新增业务办理说明（该信息将同步至服务商及拾贝网客户）" v-loading="loadAudio" :close-on-click-modal="false"
				:visible.sync="dialogBusiness" :modal-append-to-body="true" class="business_dialog state_preview">
			<template>
				<el-form ref="formBusiness" :model="formBusiness" :rules="form" label-width="110px">
			  	<!-- <span class="state_radio">说明类型：</span> -->
			  	<el-form-item label="说明类型：" prop="type">
				  	<el-radio-group v-model="formBusiness.type">
					    <el-radio class="ml15" v-for="item in businessState" :key="item.num" :label="item.label" :disabled="(item.num == 1 && !!stateData[18]) || (item.num == 1 && !!stateData[99]) || (item.num == 2 && !!stateData[18]) ||(item.num == 2 && !!stateData[99])">{{item.name}}</el-radio>
					  </el-radio-group>
				  </el-form-item>

					<el-form-item v-if="formBusiness.type == 1" label="退款告知函：" class="mt15" required>
						<div class="upload_component fl mt10">
							<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_refund_name" :postAction="'iprp_middleground/api/file/upload'" :url="standby1_refund" :valueName="'standby1_refund'" :size="5" :extensions="'pdf'" :isDialog="true"></uploader>
							<div class="upload_tip" style="top:80px;">
								<!-- <p>格式为PDF，大小限5M以内。</p>受理通知书、初审公告、注册证 -->
								<p class="format">格式为PDF，文件大小限5MB以内</p>
							</div>
							<p class="err_txt">{{errTxt}}</p>
						</div>
					</el-form-item>
					<el-form-item label="备注：" prop="remark">
				    <el-input class="service_note" :rows="5" type="textarea" :maxlength="100" v-model="formBusiness.remark"></el-input>
				  </el-form-item>
					<span class="service_limit">{{formBusiness.remark.length}}-100字</span>
					<div class="set_btn clearfix mt15">
						<p class="right_btn fr" @click="formData">提交</p>
						<p class="left_btn fr mr10" @click="resetForm">取消</p>
					</div>
				</el-form>
			</template>
		</el-dialog>

			<!-- <tongTianTa :visible.sync="ifrDialogVisible"></tongTianTa> -->
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	import uploader from 'cps/uploader/uploader.vue'
	import tongTianTa from 'cps/tongTianTa/tongTianTa.vue'
  import handleState from 'cps/handleState/handleState.vue'
  import handleStateCxb from 'cps/handleState/handleStateCxb.vue'
	const stateUrl = './api/findOrderFeedbacks';
	const operationUrl = './api/declare';
  const rootUrl = CONFIG.rootUrl;
  const getTimeUrl = rootUrl + '/api/findWorkOrdersList'
	export default {
  	components: {
  		uploader,handleState,tongTianTa,handleStateCxb
		},
    props:['order_id','order_sn','registration','detailData'],
    data() {
    	let checkNumber = (rule, value, callback) => {
				let reg = /^[0-9]*$/;
				if (!value) {
					return callback(new Error('请填写申请号'));
				}
				setTimeout(() => {
					if (!reg.test(value)) {
						callback(new Error('申请号格式错误'));
					} else {
						callback();
					}
				}, 1000);
			}
      return {
      	formBol:true,
      	type:'',
      	BusinessInfoLists:[],//业务办理说明
      	formBusiness:{
					remark:'',
					type:'',
      	},
      	businessState:[
	      	{
	      		num:1,
	      		name:'服务已退款',
	      		label:'1'
	      	},
	      	{
	      		num:2,
	      		name:'服务已重新申报',
	      		label:'2'
	      	},
	      	{
	      		num:3,
	      		name:'其他',
	      		label:'3'
	      	}
      	],
      	dialogBusiness:false,
      	ifrDialogVisible:false,
      	loadAudio:false,
      	isOnline: false,//自动申报是否在8:30 - 16:30
      	localStore: store,
      	// 详情
      	stateData:{},
      	loading:false,
      	proxyImg:{},
      	dialogImg:false,
        token:'',
        // 审核弹框显示内容
				auditInfo:'',
				dialogOffice:false,
				dialogVisible:false,
				textarea:'',
				imgsrc:'',
				errTxt:'',
				standby1_name:'',
				standby1:'',
				standby1_refund_name:'',
				standby1_refund:'',
				trademarkData:{
					accept:'6',
					number:'',
					time:''
				},
				detailInfo:{
					subject:{},
					information:{},
					orderInformation:{},
					serviceProvider:{},
					spFeedbacks:[],
					operationRecord:[]
				},
				rules:{
					accept:[
						{ required: true, message: '', trigger: 'blur' , message: '请选择是否通过'}
					],
					bool:[
						{ required: true, message: '', trigger: 'blur', message: '请选择是否办理' }
					],
					number: [
						{ validator:checkNumber, required: true,trigger: 'blur' }
					],
					time: [
						{type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
					]
				},
				form:{
					type:[
						{ required: true, message: '请选择说明类型', trigger: 'change' }
						// {required: true, message: '', trigger: 'blur' , message: '请选择说明类型'}
					],
					/*remark:[
						{ required: true, message: '请输入备注信息', trigger: 'blur' }
					]*/
				},
				infoBusiness:[]
      }
    },
    methods: {
    	addRecord(){
    		this.dialogBusiness = true;
    		this.formBusiness = {
					remark:'',
					type:'',
      	};
      	this.standby1_refund = '';
    	},
    	Remarktype(type){
    		let typeName = '';
    		if(type == 1){
    			typeName = '订单已退款';
    		}else if(type == 2){
    			typeName = '订单已重新申报';
    		}else if(type == 3){
    			typeName = '其他';
    		}
    		return typeName;
    	},
    	//查询id，添加sn
    	resetForm(){
    		this.dialogBusiness = false;
				this.$refs['formBusiness'].resetFields();
    	},
    	dealtInstructions(){//查询业务信息
				this.$http.get('./api/findHandleRemark/'+this.order_id)
				.then((response) => {
					this.infoBusiness = response.data;
				})
				.catch((err)=>{

				})
    	},
    	formData() {//上传业务信息
    		let self = this;
    		if(this.formBol){
    			this.formBol = false;
    		}else{
    			return;
    		}
    		self.$refs['formBusiness'].validate((valid) => {
    			if(self.formBusiness.type == 1){
    				if(!self.standby1_refund){
    					this.errTxt = '请上传退款告知函';
    					self.formBol = true;
	    				return;
	    			}else{
	    				self.formBusiness.refundNoticeUrl = self.standby1_refund;
	    			}
    			}
    			// self.formBusiness.createTime = new Date().getTime();
    			self.formBusiness.orderSn = this.order_sn;
    			self.$http.post('./api/addHandleRemark',this.formBusiness)
    			.then((response) => {
    				self.formBol = true;
    				self.$message.success('提交成功');
    				self.dialogBusiness = false;
    				self.dealtInstructions();
    				self.getFeedbacks();
					})
					.catch((err)=>{
						self.formBol = true;
					})
    		})


    	},
      // 状态图片预览
		  previewImg(url){
	      this.loading = true;
		    this.$http.get('./api/preview?pdf_url='+url)
		    .then((response) => {
	        this.loading = false;
	        this.proxyImg = response.data.urls;
	        this.dialogImg = true;
		    })
		    .catch((error) => {
	        this.loading = false;
		    });
		  },
		  resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
			},
		  remove(){
				this.dialogOffice = false;
				this.trademarkData = {
					accept:6,
					number:'',
					time:''
				}
			},
		  // 审核
			OfficeClick(state, isAuto){
				if (isAuto) {
					this.ifrDialogVisible = true;
		      return;
				}
				this.trademarkData.accept='';
				if(state==7||state==8||state==9||state==10||state==12||state==13||state==14||state==15||state==16||state==17){
					if(state == 7){//提交商标局
						this.trademarkData.accept = 4;
						this.auditInfo = state;
					}else if(state == 8){//申请回执
						// 5
						this.trademarkData.accept = 5;
						this.auditInfo = state;
					}else if(state == 9){//受理通知
						// 6  -6
						this.auditInfo = state;
					}else if(state == 10){//实质审查
						// 6  -6
						this.auditInfo = state;
					}else if(state == 12){//初审公告
						// 6  -6
						this.auditInfo = state;
					}else if(state == 13){//部分驳回结果
						// 6  -6
						this.auditInfo = state;
					}else if(state == 14){//发放注册证
						// 6  -6
						this.trademarkData.accept = 18;
						this.auditInfo = state;
					}else if(state == 15){//部分异议结果
						// 6  -6
						this.auditInfo = state;
					}else if(state == 16){//部分异议结果
						this.auditInfo = state;
					}else if(state == 17){//反馈异议答辩结果
						// 6  -6
						this.auditInfo = state;
					}
					this.dialogOffice = true;
				}
			},
			// 提交
			officeInfo(formName){
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(self.auditInfo > 7&&self.auditInfo!=12&&self.auditInfo!=15&&self.auditInfo!=16&&self.auditInfo!=17&&!self.urlInfo){
							self.errTxt = "文件未上传";
							return;
						}
						self.errTxt = "";
						if(self.detailInfo.feedback_stage == 9){
							// self.step = self.trademarkData.accept;
						}
						var time = '';
						if(Date.parse(self.trademarkData.time)){
							time = Date.parse(self.trademarkData.time);
						}
						// 驳回复审
						if(self.detailInfo.feedback_stage==14){
							if(self.trademarkData.bool==21){
								// 不参与驳回复审
								self.trademarkData.accept=21;
							}
						}
						// 异议答辩
						if(self.detailInfo.feedback_stage==17){
							if(self.trademarkData.bool==21){
								// 异议答辩
								self.trademarkData.accept=22;
							}
						}
						var data = {
							orderSn:self.order_sn,
							memo:self.textarea,
							time:time+'',
							url:self.urlInfo,
							acceptMaterials:self.trademarkData.number,
							step:self.trademarkData.accept
						}
						self.loadAudio=true;
						self.$http.post(operationUrl,data)
						.then((resp) => {
							self.$message({
								message: '提交成功',
								type: 'success'
							});
							self.loadAudio=false;
							self.dialogOffice = false;
							self.$router.back(-1);
						})
						.catch((error) => {
							self.loadAudio=false;
							self.dialogOffice = false;
							if (error.response && error.response.data) {
								self.$message({
									message: error.response.data.msg,
									type: 'error'
								});
							}
						});
					} else {
						return false;
					}
				});

			},
			uploaderErrCallback(data){
				this.$alert(data.msg);
			},
			// 上传图片部分
			setUploadedDataBlack(data){
				this.urlInfo = data.data.url;
				var d = data.data;
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					this.trademarkData.black_white_pic_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			getFeedbacks(){
				this.$http.get(stateUrl+'?order_id=' + this.order_id)
	    	.then((resp) => {
	    		this.stateData = resp.data.feedbacks;
	    		this.detailInfo = resp.data.feedbacks;
	    		this.loading = false;
	    	}).catch((error) => {
	    		this.loading = false;
	        console.log(error);
	      });
			}
    },
    mounted() {
    	var self = this;
    	// 判断是否是创新保订单，如果是，则调取办理说明接口  0 默认; 1 创新保; 2 国内商标自助注册
    	this.type = this.$route.params.type.toString();
    	if(this.type == 1){
    		this.dealtInstructions();
    	}
    	this.getFeedbacks();
      this.token = VueCookie.get('token');
    },
    watch: {
    	standby1_refund(){
    		if (this.standby1_refund) {
    			this.errTxt = '';
    		}else{
    			this.errTxt = '请上传退款告知函';
    		}
    	}
    },
    filters: {
    	format:	Filters.formatDate.dateFormat,
    	picType: Filters.picType,
			timeStatus: Filters.timeStatus,
			nameFile: Filters.nameFile,
			fileStateName: Filters.fileStateName,
			auditName: Filters.auditName,
			btnState: Filters.btnState,
			fileName: Filters.fileName,
			licenseName: Filters.licenseName
		}
  }
</script>
<style lang='less'>
	.state_type{padding:20px;background-color:#fff;border:1px solid #dfe2e5;border-top: 0;
		//完成该状态
		.state_list{position: relative;left: 5px;
			// 圆
			i{background-color:#DFE2E5;}
			// 颜色判断
			.success_bg{background-color:#36AF47;z-index:90;}

			.max_round{width:11px;height:11px;border-radius:50%;display:block;position: absolute;top: 0px;left:-5px;}
			.min_round{width:9px;height:9px;border-radius:50%;display:block;position: absolute;top: 38px;left:-4px;}
			.list_top{border-left:1px solid #dfe2e5;padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			.list_fotter{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			// 边框颜色判断
			div.success_border{border-color:#36AF47;}
			div.success_color >p{color:#36AF47;}
			.list_bot{padding-bottom: 20px;border-left:1px solid #dfe2e5;padding-left: 30px;z-index:1;margin-top: -5px;
				>p{font-size: 13px;color: #223344;line-height:100%;position: relative;
          span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
        }
				ul{padding-top: 10px;
					.list_l{width:30%;}
					.list_m{width:25%;}
					.list_r{width:45%;}
					li{
						.tit{text-align:left;color:#556677;}
						.txt{color: #7F8FA4;margin-left:30px;}
						.note_txt{max-width: 77%;min-width:100px;word-break:break-all;}
						.operation{max-width:77%;word-break:break-all;}
						.note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
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
          .el-carousel__item{text-align:center;width:810px;height:1150px;
            img{width:810px;}
          }
        }
      }
    }

    // 弹框样式
		.state_preview{
			.el-dialog__title{font-size: 14px;color: #223344;font-weight: normal;}
			.el-dialog__body{padding-top:10px;}
			.el-dialog--small{width:600px;}
			.radio,.state_radio,p{font-size: 14px;color: #556677;}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
			.service_limit{position: absolute;bottom:85px;right: 30px;color:#999;font-size:13px;}
			.upload_component{position: relative;
				.err_txt{color:red;font-size:12px;}
				.upload_tip{
					position: absolute;left: 140px;bottom:0;width:185px;font-size: 12px;color: #556677;line-height: 16px;
					p.format{color: #A8AFB5;padding-top: 5px; word-break: break-all;}
				}
			}
		}

		.service_table{
			p{font-size: 13px;color: #223344;
				button{height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;padding:0 10px;}
				.service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
				.service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:default;}
				span{font-size: 13px;color: #7F8FA4;}
			}
			.business{
				button{border:1px solid #DFE2E5;width:120px;line-height:30px;border-radius:3px;}
				.business_list{border: 1px solid #DFE2E5;border-right:0;border-bottom:0;
					.result_type{width:100%;background-color: #F5F5F5;
						thead{height: 30px;overflow:hidden;
							tr{border-bottom: 1px solid #DFE2E5;text-align: center;height: 30px;overflow:hidden;
								th{text-align: center;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;border-right: 1px solid #DFE2E5;}
								th.alignc{text-align: center;}
								th.minWidth{min-width: 60px;}
								th.maxWidth{max-width: 200px;}
							}
						}
						tbody{
							tr{height: 30px;background-color: #fff;
								td{min-height: 30px;font-size: 13px;color: #556677;padding:5px 3px;word-break:break-all;
									.el-checkbox{position: relative;top: -1px;}
									.regInfo{display: inline-block;min-width: 100px;max-width: 150px;word-break: break-all;}
								}
								td.alignc{text-align: center;}
								td.maxWidth{max-width: 200px;}
								td.action{min-width: 60px;
									a{color: #479CFF;margin-right: 7px}
								}
							}
							.list_info{border-bottom:1px solid #DFE2E5;
								td{
									border-right: 1px solid #DFE2E5;
									span{display: inline-block;max-width: 300px;word-break: break-all;}
								}
							}
							tr:hover,tr.hover{background-color: #F9F9F9;}
							tr.empty{
								.empty_ic{height: 200px;text-align: center;padding-top:83px;
									span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
								}
								&:hover{background-color: #fff;}
							}
						}
						tfoot{

						}
					}

				}
			}
		}
	}
	.business_dialog{
		.state_radio{font-size: 14px;color:#1f2d3d;}
		.service_limit{position: absolute;bottom:85px;right: 30px;font-size: 14px;color: #A8AFB5;}
		.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
		>p{color:#1f2d3d;}
		.el-dialog__title{font-size:14px;}
	}
</style>

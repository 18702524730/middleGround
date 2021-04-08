<template>
	<div class="form_wrap">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本资料</li>
				<li class="fl" :class="{'sele_border':status == 2}" @click="status=2">备注</li>
			</ul>
		</div>
	  <div class="form">
	  	<template v-if="status == 1">
	    <div class="basic_lists" v-if="detailInfo.subject && detailInfo.subject.applyType">
	      <p>申请主体</p>
	      <div class="basic_category clearfix">
	        <ul class="fl category_left">
	          <li>
	            <p class="tit">主体类型</p>
	            <p class="txt">{{detailInfo.subject.applyType | format}}</p>
	          </li>
	          <li>
	            <p class="tit">{{detailInfo.subject.applyType | mainBodeSbj}}名称</p>
	            <p class="txt">{{detailInfo.subject.applyName}}</p>
	          </li>
	          <li v-if="detailInfo.subject.applyType != 4">
	            <p class="tit">{{detailInfo.subject.applyType | mainBodeNumber}}</p>
	            <p class="txt">{{detailInfo.subject.applyNumber}}</p>
	          </li>
	          <li>
	            <p class="tit">{{detailInfo.subject.applyType | mainBodeSbj}}联系电话</p>
	            <p class="txt">{{detailInfo.subject.applyPhone}}</p>
	          </li>
	          <li>
	            <p class="tit">{{detailInfo.subject.applyType | mainBodeSbj}}注册地址</p>
	            <p class="txt">{{detailInfo.subject.applyAreaInfo}}{{detailInfo.subject.applyAddress}}</p>
	          </li>
	        </ul>
	        <!-- <div class="basic_img fl clearfix">
	          <div class="fr">
	            <img :src="usinessLicense[0]" alt="">
	            <p @click="certificatePreview(usinessLicense)">营业执照</p>
	          </div>
	        </div> -->
	        <div class="basic_img fl clearfix">
	          <div class="fr ml30" v-if="detailInfo.subject.standby1" @click="certificatePreview(usinessLicense)">
	              <img :src="usinessLicense[0]" alt="">
	              <p :title="detailInfo.subject.applyType | fileName">{{detailInfo.subject.applyType | fileName}}</p>
				  <a :href="detailInfo.subject.standby1" target="_blank" @click.stop class="chakanywj">查看原文件</a>
	            </div>
	            <div class="fr" v-if="detailInfo.subject.standby2 && detailInfo.subject.applyType != 2" @click="certificatePreview(licenseName)">
	              <img :src="licenseName[0]" alt="">
	              <p :title="detailInfo.subject.applyType | licenseName">{{detailInfo.subject.applyType | licenseName}}</p>
				  <a :href="detailInfo.subject.standby2" target="_blank" @click.stop class="chakanywj">查看原文件</a>
	            </div>
	        </div>
	      </div>
	    </div>
	    <div class="basic_lists" v-else>
	      <p>申请主体</p>
      	暂无
      </div>

	    <div class="basic_lists" v-if="detailInfo.information && detailInfo.information.trademarkName">
	      <p>商标注册信息</p>
	      <div class="basic_category clearfix" v-if="detailInfo.information">
	        <ul class="fl category_left">
	          <li>
	            <p class="tit">商标名称</p>
	            <p class="txt">{{detailInfo.information.trademarkName}}</p>
	          </li>
	          <li>
	            <p class="tit">图样类型</p>
	            <p class="txt">{{detailInfo.information.picType | picType}}</p>
	          </li>
	          <li>
	            <p class="tit">商标描述</p>
	            <p class="txt">{{detailInfo.information.trademarkDesc}}</p>
	          </li>
	          <li>
	            <p class="tit">被委托单位</p>
	            <p class="txt">{{detailInfo.information.entrustedUnit}}</p>
	          </li>
	          <li >
	            <p class="tit">合同书</p>
	            <p class="txt" v-if="detailInfo.information.contractUrl"><a style="color:#20a0ff;" :href="detailInfo.information.contractUrl" target= '_blank'>下载</a></p>
	            <p class="txt" v-else>未上传</p>
	          </li>
	          <li >
	            <p class="tit">确认书</p>
	            <p class="txt" v-if="detailInfo.information.confirmUrl"><a style="color:#20a0ff;" :href="detailInfo.information.confirmUrl" target= '_blank'>下载</a></p>
	            <p class="txt" v-else>未上传</p>
	          </li>
	          <li >
	            <p class="tit">委托书</p>
	            <p class="txt" v-if="detailInfo.information.proxyUrl"><a style="color:#20a0ff;" :href="detailInfo.information.proxyUrl" target= '_blank'>下载</a> </p>
	            <p class="txt" v-else>未上传</p>
	          </li>
	        </ul>
	        <div class="basic_img fl clearfix">
	          <div class="fr mb20" :class="{'ml30':!detailInfo.information.specifyPicUrl}" v-if="detailInfo.information.blackWhitePicUrl" @click="preview(detailInfo.information.blackWhitePicUrl)">
	            <img :src="detailInfo.information.blackWhitePicUrl" alt="">
	            <p title="黑白色">黑白色</p>
	          </div>
	          <div class="fr mr30 ml30 mb20" v-if="detailInfo.information.specifyPicUrl" @click="preview(detailInfo.information.specifyPicUrl)">
	            <img :src="detailInfo.information.specifyPicUrl" alt="">
	            <p title="指定色">指定色</p>
	          </div>
	          <div class="fr mb20" v-if="detailInfo.information.proxyUrl" @click="preview(detailInfo.information.proxyUrl)">
	            <img :src="detailInfo.information.proxyUrl" alt="">
	            <p title="委托书">委托书</p>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="basic_lists" v-else>
	      <p>商标注册信息</p>
      	暂无
      </div>

	    <div class="service_list">
	      <p>服务单信息</p>
	      <div class="detail_list" v-for="(info,$index) in detailInfo.orderInformation">
	        <div class="list_tit clearfix">
	          <p class="fl serial" v-if="$index<9">0{{$index+1}}</p>
	          <p class="fl serial" v-if="$index>=9">{{$index+1}}</p>
	          <p class="fl order">服务单号</p>
	          <p class="fl">{{info.orderSn}}</p>
	        </div>
	        <ul class="mt10 clearfix" style="padding-left: 58px;">
	        	<li class="clearfix mb10">
	            <p class="state_name fl">办理状态</p>
	            <p class="state_txt fl">{{info.order_feedback_state}} <a href="#" class="view" @click.prevent="viewRecord(info)">查看详情</a></p>
	          </li>
	          <li class="clearfix mb10">
	            <p class="state_name fl">{{goodsname(info.intCls) || '--'}}</p>
	           	<!--  <p class="state_txt fl" :class="{'msgColor':!info.service_nice_min.length}" v-if="!info.service_nice_min.length">共{{eventsChildren.length || 0}}个小项</p> -->
	            <p class="state_txt fl">共{{info.minNumber}}个小项<span v-if="info.minNumber">（{{info.min}}）</span></p>
	          </li>
	          <li class="clearfix mb10">
	            <p class="state_name fl">在线近似商标</p>
	            <p class="state_txt fl">{{info.similarTrademark || '--'}}</p>
	          </li>
	          <li class="clearfix mb10">
	            <p class="state_name fl">注册通过率</p>
	            <p class="state_txt fl">{{info.registerPassRate ? info.registerPassRate+'%' : '--'}}</p>
	          </li>
	          <li class="clearfix mb10">
	            <p class="state_name fl">风险说明及注册建议</p>
	            <p class="state_txt fl">{{info.advice || '--'}}</p>
	          </li>
	        </ul>
	      </div>
	    </div>
	    <!-- 开票信息 -->
	    <div class="list_detail">
	      <p class="mb10 mt15">开票信息</p>
	      <div class="clearfix" v-if="detailInfo.invoice && detailInfo.invoice.invoiceType && detailInfo.subject">
	        <ul class="list_left fl">
	          <li class="mb10 clearfix">
	            <p class="left_txt fl">发票类型</p>
	            <p class="right_txt fl">{{detailInfo.invoice.invoiceType | invoiceTypeFormat}}</p>
	          </li>
	          <li class="mb10 clearfix">
	            <p class="left_txt fl">发票抬头</p>
	            <p class="right_txt fl">{{detailInfo.invoice.invoiceTitle || '--'}}</p>
	          </li>
	          <li class="mb10 clearfix" v-if="detailInfo.invoice.invoiceType == 2 && detailInfo.subject.applyType == 2">
	            <p class="left_txt fl">{{detailInfo.subject.applyType | mainBodeSbj}}地址</p>
	            <p class="right_txt fl">{{detailInfo.invoice.address || '--'}}</p>
	          </li>
	          <li class="mb10 clearfix" v-if="detailInfo.invoice.invoiceType == 2 && detailInfo.subject.applyType == 2">
	            <p class="left_txt fl">开户银行</p>
	            <p class="right_txt fl">{{detailInfo.invoice.accountBank || '--'}}</p>
	          </li>
	        </ul>
	        <div class="list_right fl">
	          <ul class="right_list">
	            <li class="mb10 clearfix" v-if="detailInfo.subject.applyType == 2">
	              <p class="left_txt fl">纳税人识别号</p>
	              <p class="right_txt fl">{{detailInfo.invoice.invoiceCode || '--'}}</p>
	            </li>
	            <li class="mb10 clearfix" v-if="detailInfo.invoice.invoiceType == 2 && detailInfo.subject.applyType == 2">
	              <p class="left_txt fl">{{detailInfo.subject.applyType | mainBodeSbj}}联系电话</p>
	              <p class="right_txt fl">{{detailInfo.invoice.registPhone || '--'}}</p>
	            </li>
	            <li class="mb10 clearfix" v-if="detailInfo.invoice.invoiceType == 2 && detailInfo.subject.applyType == 2">
	              <p class="left_txt fl">银行账号</p>
	              <p class="right_txt fl">{{detailInfo.invoice.accountNumber || '--'}}</p>
	            </li>
	          </ul>
	        </div>
	      </div>
	      <div class="kpx" v-else>
	        <p>未申请开票</p>
	      </div>
	    </div>
	    <!-- 服务商信息 -->
			<div class="service_list servicerInfo" v-if="detailInfo.serviceProvider">
				<p>服务商信息</p>
				<div class="detail_list">
					<ul class="mt5 clearfix">
						<li class="clearfix mb10">
							<p class="state_name fl">服务商名称</p>
							<p class="state_txt fl setServicer">
								{{detailInfo.serviceProvider.sp_name}}
								<a v-if="!isAllWorkOrder && detailInfo.workOrderType != 1 && detailInfo.status<4 && localStore.get('permission').indexOf('iprp_audit_material_rebute') !== -1" href="#" @click.prevent="setServicer">设置服务商</a><!-- 审核材料的工单详情 -->
								<a v-if="isAllWorkOrder && detailInfo.status<4 && localStore.get('permission').indexOf('iprp_work_order_list_rebute_sp') !== -1" href="#" @click.prevent="setServicer">设置服务商</a><!-- 全部服务下的工单详情 -->
							</p>
							<div class="idcode">
								<p class="state_name fl">服务商识别码</p>
								<p class="state_txt fl setServicer">{{detailInfo.serviceProvider.idCode}}</p>
							</div>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl">服务商账号</p>
							<p class="state_txt fl">{{detailInfo.serviceProvider.sp_account}}</p>
						</li>
					</ul>
				</div>
				<div class="service_table" v-if="detailInfo.spFeedbacks">
					<ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;">操作时间</li>
	          <li class="fl tb02">操作前服务商</li>
	          <li class="fl tb03">操作后服务商</li>
	          <li class="fl tb04">操作人</li>
	          <li class="fl tb05">备注</li>
	        </ul>
	        <ul class="table_list clearfix" v-if="!detailInfo.spFeedbacks.length">
	          <li class="fl tb01" style="padding-left:20px;"><p>暂无记录</p></li>
	          <li class="fl tb02"><p></p></li>
	          <li class="fl tb03"><p></p></li>
	          <li class="fl tb04"><p></p></li>
	          <li class="fl tb05"><p></p></li>
	        </ul>
	        <template v-else>
		        <ul class="table_list clearfix" v-for="data in detailInfo.spFeedbacks">
		          <li class="fl tb01" style="padding-left:20px;"><p>{{data.operating_time | dateFormat}}</p></li>
		          <li class="fl tb02"><p>{{data.operating_start_sp}}</p></li>
		          <li class="fl tb03"><p>{{data.operating_end_sp}}</p></li>
		          <li class="fl tb04"><p>{{data.operator}}</p></li>
		          <li class="fl tb05"><p>{{data.memo}}</p></li>
		        </ul>
	        </template>
        </div>
			</div>

	    <!--操作记录 -->
	    <div class="service">
	      <p class="service_tit">操作记录</p>
	      <div class="service_table">
	        <p>当前服务状态：{{recordContent}}
	          <button v-if="isAllWorkOrder && detailInfo.status<4 && localStore.get('permission').indexOf('iprp_work_order_audit') !== -1" :class="{'service_nullbtn':detailInfo.status<3,'service_btn':detailInfo.status==3}" class="ml10" @click="auditClick(detailInfo)">审核</button><!-- 全部工单中的审核 -->
	          <button v-if="!isAllWorkOrder && detailInfo.status<4 && localStore.get('permission').indexOf('iprp_audit_material_audit') !== -1" :class="{'service_nullbtn':detailInfo.status<3,'service_btn':detailInfo.status==3}" class="ml10" @click="auditClick(detailInfo)">审核</button><!-- 审核材料中的审核 -->
	          <button v-if="detailInfo.status>=4" class="service_nullbtn ml10">已审核</button>
	        </p>
	        <ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;">操作时间</li>
	          <li class="fl tb02">操作</li>
	          <li class="fl tb03">操作人</li>
	        </ul>
	        <ul class="table_list clearfix" v-for="data in detailInfo.operationRecord">
	          <li class="fl tb01" style="padding-left:20px;"><p>{{data.operatorTime | dateFormat}}</p></li>
	          <li class="fl tb02"><p>{{data.recordContentService}}</p></li>
	          <li class="fl tb03"><p>{{data.operatorName}}</p></li>
	        </ul>
	      </div>
	    </div>
			</template>
			<template v-if="status == 2">
				<!--备注 -->
		    <div class="service remark">
		      <p class="service_tit">备注信息</p>
		      <div class="service_table remark_table">
		        <ul class="table_tit clearfix">
		          <li class="tb01" style="padding-left:20px;">操作时间</li>
		          <li class="tb02">备注人</li>
		          <li class="tb03">备注内容</li>
		        </ul>
		        <template v-if="remarkData.length">
			        <ul class="table_list remark_list clearfix" v-for="item in remarkData">
			          <li class="tb01" style="padding-left:20px;"><span>{{item.create_time | dateFormat}}</span></li>
			          <li class="tb02"><span>{{item.operator_name}}</span></li>
			          <li class="tb03"><span>{{item.content}}</span></li>
			        </ul>
		        </template>
		        <template v-else>
			        <ul class="table_list clearfix">
			          <li class="tb01" style="padding-left:20px;"><span>暂无备注信息</span></li>
			          <li class="tb02"><span> </span></li>
			          <li class="tb03"><span> </span></li>
			        </ul>
		        </template>
		        <p style="padding-top: 20px;">
		          <button class="service_btn" @click="openRemarkDialog()">添加备注</button>
		        </p>
		      </div>
		    </div>
			</template>

			<!-- 申报资料审核 -->
	    <el-dialog title="审核" :close-on-click-modal="false"
	      :visible.sync="dialogState" class="state_preview" :modal-append-to-body="true">
				<!-- 审核不通过下拉 -->
	      <el-form ref="audit" :model="audit" :rules="choose" label-width="125px">
		      <el-form-item label="审核材料结果" prop="radio">
				    <el-radio-group v-model="audit.radio">
				      <el-radio label="1">审核通过</el-radio>
				      <el-radio label="2">审核不通过</el-radio>
				    </el-radio-group>
				  </el-form-item>
		      <el-form-item label="审核不通过原因" prop="state" v-if="audit.radio==2">
				    <el-select v-model="audit.state">
					    <el-option label="委托书信息有误" value="委托书信息有误"></el-option>
					    <el-option label="开票信息有误" value="开票信息有误"></el-option>
					    <el-option label="申请主体信息有误" value="申请主体信息有误"></el-option>
					    <el-option label="注册商标信息有误" value="注册商标信息有误"></el-option>
					    <el-option label="商标图样有误" value="商标图样有误"></el-option>
					    <el-option label="其他" value="其他"></el-option>
				    </el-select>
				  </el-form-item>
	      </el-form>

	      <p class="mt10 mb10">备注：</p>
	      <el-input class="service_note"
	        type="textarea"
	        :rows="5"
	        v-model="textarea" :maxlength="200">
	      </el-input>
	      <span class="service_limit">{{textarea.length}}-200字</span>
	      <div class="set_btn clearfix mt15">
	        <p class="left_btn fr" @click="dialogState = false">取消</p>
	        <p class="right_btn fr mr10" @click="submitAudit">提交</p>
	      </div>
	    </el-dialog>


	    <!-- 申报资料审核（创新保） -->
			<el-dialog title="申报资料审核"
			  :visible.sync="dialogTab" class="state_preview" :modal-append-to-body="true">
		  	<el-form ref="audit" :model="audit" :rules="choose" label-width="125px">
			  	<el-form-item label="确认审核结果：" style="margin-bottom: 5px;">
				  	<el-radio-group v-model="radio">
					    <el-radio class="mr15" v-for="item in radioState" :key="item.num" :label="item.num">{{item.name}}</el-radio>
					  </el-radio-group>
				  </el-form-item>
					<!-- <el-form-item label="审核不通过原因：" v-if="radio == 2" style="margin-bottom: 5px;">
						<el-select v-model="auditstate" placeholder="请选择">
					    <el-option
					      v-for="item in reasons"
					      :key="item.id"
					      :label="item.name"
					      :value="item.name"
					      >
					    </el-option>
					  </el-select>
					</el-form-item> -->
				</el-form>
				<template v-if="radio == 2">
					<p class="mt10 mb10">备注：</p>
					<el-input class="service_note"
					  type="textarea"
					  :rows="5"
					  v-model="textarea" :maxlength="100">
					</el-input>
					<span class="service_limit">{{textarea.length}}-100字</span>
				</template>
				<div class="set_btn clearfix mt15">
					<p class="right_btn fr" @click="InfoAudit">确认</p>
					<p class="left_btn fr mr10" @click="cancelAudit">取消</p>
				</div>
			</el-dialog>
	    <!-- 图片预览 -->
	    <!-- <el-dialog
	      :visible.sync="dialogVisible"
	      size="tiny" class="img_preview" :modal-append-to-body="true">
	      <img :src="imgsrc" alt="">
	    </el-dialog> -->
		<div class="movepreviewbox" v-if="dialogVisible">
        <div class="movepreview" id="movediv">

          <img :src="imgsrc" alt />
          <span class="guan" @click="dialogVisible= false"><i class="el-icon-close"></i></span>
          <div class="gai"></div>
        </div>
      </div>
	    <!-- 证书预览 -->
	    <el-dialog
	      :visible.sync="dialogImg"
	      size="tiny" class="img_preview" :modal-append-to-body="true">
	       <el-carousel :interval="5000" arrow="always" :autoplay='false' trigger="click">
	        <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
	          <img :src="item" alt="">
	        </el-carousel-item>
	      </el-carousel>
	    </el-dialog>

	    <el-dialog title="更换服务商"	:visible.sync="setServicerVisible" class="setServicerDialog" :modal-append-to-body="true">
				<el-form ref="setServicerData" :model="setServicerData" :rules="setServicerRules" :inline="false" auto-complete="off" label-width="170px">
					<el-form-item label="请选择服务商" prop="spId">
						<el-select clearable v-model="setServicerData.spId" placeholder="请选择服务商" style="width: 480px;">
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
					<el-form-item label="" prop="isContact">
						<el-checkbox v-model="setServicerData.isContact">确认已与服务商联系</el-checkbox>
					</el-form-item>

					<div class="set_btn clearfix">
						<span class="left_btn" @click="setServicerVisible=false">取消</span>
						<span class="right_btn" :class="{disabled: !setServicerData.isContact}" @click="servicerConfirm('setServicerData')">确认</span>
					</div>
				</el-form>
			</el-dialog>

			<!-- 服务记录 -->
	    <el-dialog
	      :visible.sync="dialogService" title="服务记录"
	      size="tiny" class="service_preview" :modal-append-to-body="true">
	      <!-- 头部显示 -->
	      <div class="apply_num" v-if="!previewImg">
	        <span class="apply_left">申请/注册号</span>
	        <span v-if="!acceptMaterials" class="apply_right">待商标局形式审查通过后显示</span>
	        <span v-else class="apply_right">{{acceptMaterials}}</span>
	      </div>
	      <div class="preview_tit mt25 mb20 ml20" v-if="previewImg">
	        <p @click="previewImg = false"><img src="~assets/img/return.png" alt="">预览《{{certificateImg | downFileName}}》</p>
	      </div>
	      <!-- 办理进度 -->
	      <div class="state_list" v-if="!previewImg && recordData" v-loading="dialogServiceLoading" style="padding-bottom: 15px;">
	      	<template v-if="detailInfo.workOrderType==0 || detailInfo.workOrderType==2">
		      	<!-- 外部包裹 -->
		        <div class="state_time" v-if="recordData[0]||!recordData[99]">
		          <p :class="{'sc':recordData[0]}"><span class="mr10">●</span>服务单已生成</p>
		          <div v-for="item in recordData[0]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		          </div>
		          <i></i>
		        </div>

		        <template v-if="detailInfo.workOrderType==0">
							<!-- 服务商已接单 -->
			        <div class="state_time" v-if="recordData[2]||!recordData[99]">
			          <p :class="{'sc':recordData[2]}"><span class="mr10">●</span>服务商已接单</p>
			          <div v-for="item in recordData[2]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
							<!-- 待服务完善 -->
			        <div class="state_time" v-if="recordData[3]||!recordData[99]">
			          <p :class="{'sc':recordData[3]}"><span class="mr10">●</span>待服务完善</p>
			          <div v-for="item in recordData[3]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
							<!-- 待用户确认信息 -->
			        <div class="state_time" v-if="(recordData[4]&&recordData[4].length)||!recordData[99]">
			          <p :class="{'sc':recordData[4] && recordData[4].length}"><span class="mr10">●</span>待用户确认信息</p>
			          <div v-if="recordData[4] && recordData[4].length" v-for="itemoperate in recordData[4]" style="border-left: 1px dashed #ddd;width:359px;margin-left:4px">
			            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
			          </div>
			          <i style="height:26px;margin-top:0"></i>
			        </div>
								<!-- 待支付加项费用 -->
			        <div class="state_time" v-if="recordData[5]">
			          <p :class="{'sc':recordData[5]}"><span class="mr10">●</span>待支付加项费用</p>
			          <div v-for="item in recordData[5]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
							<!-- 待平台审核 -->
			        <div class="state_time" v-if="recordData[6]||!recordData[99]">
			          <p :class="{'sc':recordData[6]}"><span class="mr10">●</span>待平台审核</p>
			          <div v-for="item in recordData[6]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
							<!-- 待申报至商标局 -->
			        <div class="state_time" v-if="recordData[7]||!recordData[99]">
			          <p :class="{'sc':recordData[7]}"><span class="mr10">●</span>待申报至商标局</p>
			          <div v-for="item in recordData[7]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
		        </template>

		        <template v-if="detailInfo.workOrderType==2">
		        	<!-- 已完善待申报 -->
			        <div class="state_time" v-if="recordData[3]||!recordData[99]">
			          <p :class="{'sc':recordData[3]}"><span class="mr10">●</span>已完善待申报</p>
			          <div v-for="item in recordData[3]">
			            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
			            <span class="ml40">{{item.operating_time | formatDate}}</span>
			          </div>
			          <i></i>
			        </div>
			      </template>


						<!-- 待商标局收文 -->
		        <div class="state_time" v-if="recordData[8]||!recordData[99]">
		          <p :class="{'sc':recordData[8]}"><span class="mr10">●</span>待商标局收文</p>
		          <div v-for="item in recordData[8]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		          </div>
		          <i></i>
		        </div>
		        <!-- 待形式审查 -->
		        <div class="state_time" v-if="recordData[9]">
		          <p :class="{'sc':recordData[9]}"><span class="mr10">●</span>待形式审查</p>
		          <div v-for="item in recordData[9]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
		        <div class="state_time" v-if="!recordData[11]&&!recordData[99]">
		          <p><span class="mr10">●</span>待实质审查</p>
		          <i></i>
		        </div>
						<!-- 待实质审查 -->
		        <div class="state_time" v-if="recordData[11]">
		          <p :class="{'sc':recordData[11]}"><span class="mr10">●</span>待实质审查</p>
		          <div v-if="recordData[11]&&recordData[11].length" v-for="info in recordData[11]">
		            <span class="ml25 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		            <i></i>
		          </div>
		        </div>
						<!-- 实质审查部分驳回 -->
		        <div class="state_time" v-if="recordData[13]">
		          <p :class="{'sc':recordData[13]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[13]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
						<!-- 实质审查不通过被驳回 -->
		        <div class="state_time" v-if="recordData[14]">
		          <p :class="{'sc':recordData[14]}"><span class="mr10">●</span>被驳回</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[14]&&recordData[14].length" v-for="info in recordData[14]">
		            <span class="ml25 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          	<i></i>
		          </div>
		          <i v-if="!recordData[14]"></i>
		        </div>
						<!-- 形式审查通过待实质审查 -->
		        <div class="state_time" v-if="recordData[19]">
		          <p :class="{'sc':recordData[19]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[19]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
						<!-- 待初审公告 ，后台返回值状态-->
						<div class="state_time" v-if="recordData[12]||!recordData[99]">
		          <p :class="{'sc':recordData[12]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[12]&&recordData[12].length" v-for="info in recordData[12]">
		            <span class="ml25 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          	<i></i>
		          </div>
		          <i v-if="!recordData[12]"></i>
		        </div>
						<!-- 初审公告部分异议 -->
		        <div class="state_time" v-if="recordData[16]">
		          <p :class="{'sc':recordData[16]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[16]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
						<!-- 初审公告不通过被异议 -->
		        <div class="state_time" v-if="recordData[17]">
		          <p :class="{'sc':recordData[17]}"><span class="mr10">●</span>被异议</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[17]&&recordData[17].length" v-for="info in recordData[17]">
		            <span class="ml25 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          	<i></i>
		          </div>
		          <i v-if="!recordData[17]"></i>
		        </div>
						<!-- 实质审查通过待初审公告 -->
		        <div class="state_time" v-if="recordData[22]">
		          <p :class="{'sc':recordData[22]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[22]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
						<!--  初审公告通过待发放注册证 -->
			      <div class="state_time" v-if="!recordData[99]">
		          <p :class="{'sc':recordData[15]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[15]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		          <i></i>
		        </div>
						<!-- 已发放注册证 -->
		        <div class="state_time" v-if="!recordData[99]">
		          <p :class="{'sc':recordData[18]}"><span class="mr10">●</span>已发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-for="item in recordData[18]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		        </div>
		        <!-- 办理终止 -->
		        <div class="state_time" v-if="recordData[99]">
		          <p :class="{'sc':recordData[99]}"><span class="mr10">●</span>办理终止</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[99]" v-for="item in recordData[99]">
		            <span class="ml25 time_left">{{item.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{item.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{item.type | downFileName}}</span>
		            <a v-if="item.url" class="ml40" @click="previewClick(item)">预览</a>
		            <a v-if="item.url" class="ml20" :href="rootUrl+'/api/downFile?access_token='+token+'&url='+item.url" target="_blank">下载</a>
		          </div>
		        </div>
					</template>

					<!-- 创新保工单的服务单办理状态 -->
					<template v-if="detailInfo.workOrderType==1">
						<!-- 服务单已生成 -->
		        <div class="state_time" v-if="recordData[0]">
		          <p :class="{'sc':recordData[0]}"><span class="mr10">●</span>服务单已生成</p>
		          <div v-if="recordData[0] && recordData[0].length" v-for="itemoperate in recordData[0]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 已提交待确认 -->
		        <div class="state_time" v-if="(recordData[2]&&recordData[2].length)||!recordData[99]">
		          <p :class="{'sc':recordData[2] && recordData[2].length}"><span class="mr10">●</span>已提交待确认</p>
		          <div v-if="recordData[2] && recordData[2].length" v-for="itemoperate in recordData[2]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 已确认待上报 -->
		        <div class="state_time" v-if="(recordData[5]&&recordData[5].length)||!recordData[99]">
		          <p :class="{'sc':recordData[5] && recordData[5].length}"><span class="mr10">●</span>已确认待上报</p>
		          <div v-if="recordData[5] && recordData[5].length" v-for="itemoperate in recordData[5]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 已上报待审核 -->
		        <div class="state_time" v-if="recordData[6]">
		          <p :class="{'sc':recordData[6]}"><span class="mr10">●</span>已上报待审核</p>
		          <div v-if="recordData[6] && recordData[6].length" v-for="itemoperate in recordData[6]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
		        <!-- 已审核待申报-不通过 -->
		        <div class="state_time" v-if="recordData[7]">
		          <p :class="{'sc':recordData[7]}"><span class="mr10">●</span>已审核待申报</p>
		          <div v-if="recordData[7] && recordData[7].length" v-for="itemoperate in recordData[7]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
		        <!-- 待商标局收文 -->
		        <div class="state_time" v-if="recordData[9]">
		          <p :class="{'sc':recordData[9]}"><span class="mr10">●</span>待商标局收文</p>
		          <div v-if="recordData[9] && recordData[9].length" v-for="itemoperate in recordData[9]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{itemoperate.type | downFileName}}</span>
		            <a v-if="itemoperate.url" class="ml40" @click="previewClick(itemoperate)">预览</a>
		            <a v-if="itemoperate.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+itemoperate.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 待形式审查 -->
		        <div class="state_time" v-if="recordData[10]">
		          <p :class="{'sc':recordData[10]}"><span class="mr10">●</span>待形式审查</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[10] && recordData[10].length" v-for="itemoperate in recordData[10]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{itemoperate.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{itemoperate.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{itemoperate.type | downFileName}}</span>
		            <a v-if="itemoperate.url" class="ml40" @click="previewClick(itemoperate)">预览</a>
		            <a v-if="itemoperate.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+itemoperate.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
		        <div class="state_time" v-if="!recordData[11]&&!recordData[99]">
		          <p><span class="mr10">●</span>待实质审查</p>
		          <i></i>
		        </div>
						<!-- 待实质审查 -->
		        <div class="state_time" v-if="recordData[11]">
		          <p :class="{'sc':recordData[11]}"><span class="mr10">●</span>待实质审查</p>
		          <div v-if="recordData[11]&&recordData[11].length" v-for="info in recordData[11]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 实质审查部分驳回 -->
		        <div class="state_time" v-if="recordData[13]">
		          <p :class="{'sc':recordData[13]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[13]&&recordData[13].length" v-for="info in recordData[13]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 实质审查不通过被驳回 -->
		        <div class="state_time" v-if="recordData[14]">
		          <p :class="{'sc':recordData[14]}"><span class="mr10">●</span>被驳回</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[14]&&recordData[14].length" v-for="info in recordData[14]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 形式审查通过待实质审查 -->
		        <div class="state_time" v-if="recordData[19]">
		          <p :class="{'sc':recordData[19]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[19]&&recordData[19].length" v-for="info in recordData[19]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 待初审公告 ，后台返回值状态-->
						<div class="state_time" v-if="recordData[12]||!recordData[99]">
		          <p :class="{'sc':recordData[12]}"><span class="mr10">●</span>待初审公告</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[12]&&recordData[12].length" v-for="info in recordData[12]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 初审公告部分异议 -->
		        <div class="state_time" v-if="recordData[16]">
		          <p :class="{'sc':recordData[16]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		         	<div v-if="recordData[16]&&recordData[16].length" v-for="info in recordData[16]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 初审公告不通过被异议 -->
		        <div class="state_time" v-if="recordData[17]">
		          <p :class="{'sc':recordData[17]}"><span class="mr10">●</span>被异议</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[17]&&recordData[17].length" v-for="info in recordData[17]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 实质审查通过待初审公告 -->
		        <div class="state_time" v-if="recordData[22]">
		          <p :class="{'sc':recordData[22]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[22]&&recordData[22].length" v-for="info in recordData[22]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!--  初审公告通过待发放注册证 -->
			      <div class="state_time" v-if="!recordData[99]">
		          <p :class="{'sc':recordData[15]}"><span class="mr10">●</span>待发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[15]&&recordData[15].length" v-for="info in recordData[15]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		          <i style="margin-top: 0;height: 20px;"></i>
		        </div>
						<!-- 已发放注册证 -->
		        <div class="state_time" v-if="!recordData[99]">
		          <p :class="{'sc':recordData[18]}"><span class="mr10">●</span>已发放注册证</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[18]&&recordData[18].length" v-for="info in recordData[18]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		        </div>
		        <!-- 办理终止 -->
		        <div class="state_time" v-if="recordData[99]">
		          <p :class="{'sc':recordData[99]}"><span class="mr10">●</span>办理终止</p><!-- 显示用户查看状态 -->
		          <div v-if="recordData[99]&&recordData[99].length" v-for="info in recordData[99]" style="border-left: 1px dashed #ddd;margin-left:4px">
		            <span class="ml20 time_left">{{info.bs_feedback_operate || '--'}}</span>
		            <span class="ml40">{{info.operating_time | formatDate}}</span>
		            <span class="ml40 mr515" style="width:95px;display:inline-block;">{{info.type | downFileName}}</span>
		            <a v-if="info.url" class="ml40" @click="previewClick(info)">预览</a>
		            <a v-if="info.url" class="ml20" :href="rootUrl+'/api/downNetFile?access_token='+token+'&url='+info.url" target="_blank">下载</a>
		          </div>
		        </div>
					</template>


        </div>
	      <div class="img_preview" v-if="previewImg">
	        <!-- <img :src="previewSrc" alt=""> -->
	        <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
	          <el-carousel-item v-for="(itemSrc,$index) in previewSrc" :key="$index">
	            <img :src="itemSrc" alt="">
	          </el-carousel-item>
	        </el-carousel>
	      </div>
	    </el-dialog>
	    <el-dialog title="添加备注"
	      :visible.sync="dialogRemark" class="state_preview" :modal-append-to-body="true">
	      <p class="mt10 mb10">备注：</p>
	      <el-input class="service_note"
	        type="textarea"
	        :rows="5"
	        v-model="content" :maxlength="200">
	      </el-input>
	      <span class="service_limit">{{content.length}}-200字</span>
	      <div class="set_btn clearfix mt15">
	        <p class="left_btn fr" @click="dialogRemark = false">取消</p>
	        <p class="right_btn fr mr10" @click="addRemark">提交</p>
	      </div>
	    </el-dialog>
	  </div>
  </div>
</template>
<script>
import VueCookie from 'vue-cookie'
import { gbs } from 'config/settings.js';
import {LimitDrag} from 'utils/drag.js'
import Filters from 'utils/filters/filters.js'
import {store} from 'utils/';
import intClsData from 'apis/intClsData.js'
const rootUrl = CONFIG.rootUrl;
const detailUrl = './api/findWorkOrderDetail';
const auditUrl = './api/auditing';
const pdfUrl = './api/preview';
const getRemarkUrl = './api/WorkOrdersRemarks/work_order_sn'
const addRemarkUrl = './api/WorkOrdersRemarks'
const spListUrl = './api/findAllSp';
const allotSpUrl = './api/allotWorkOrder/{work_order_sn}'
const feedbackSpUrl = './api/findBsFeedbackCode'
export default {

data() {
  return {
  	type: '', //type: 0 默认; 1 创新保; 2 国内商标自助注册
  	noRepeat:true,//防止重复提交
  	radio:1,
  	auditstate:'',
  	// 不通过原因
    reasons:[
      {
      	id:1,
      	name:'委托书信息有误',
      },
      {
      	id:2,
      	name:'开票信息有误',
      },
      {
      	id:3,
      	name:'申请主体信息有误',
      },
      {
      	id:4,
      	name:'注册商标信息有误',
      },
      {
      	id:5,
      	name:'商标图样有误',
      },
      {
      	id:6,
      	name:'其他',
      }
    ],
  	dialogTab:false, //创新保审核
  	// 服务状态
    radioState:[
      {
      	num:1,
      	name:'通过',
      	label:1
      },
      {
      	num:2,
      	name:'不通过',
      	label:2
      }
    ],
  	isAllWorkOrder: false,
  	audit:{
  		radio:'',
  		state:''
  	},
  	rootUrl:rootUrl,
  	status: 1,
  	work_order_sn:'',
  	remarkData:[],
  	dialogRemark: false,
  	content:'',

    dialogVisible:false,
    dialogImg:false,
    detailInfo:{
      subject:{},
      information:{},
      orderInformation:{},
      serviceProvider:{},
      spFeedbacks:[],
      operationRecord:[]
    },
    textarea:'',
    dialogState:false,
    // 当前服务状态
    recordContent:'',
    imgsrc:'',
    proxyImg:[],
    // 营业执照
    usinessLicense:[],
    // 委托书
    powerAttorney:[],
    cateIdData: intClsData.cateIdData,
    licenseName:[],

    localStore: store,
    setServicerVisible: false,
		spIdOptions:[],
		setServicerData:{
			spId:'',
			memo:'',
			isContact: false,
			workOrderId:''
		},
		choose:{
			radio:[
				{ required: true, message: '请选择审核是否通过', trigger: 'blur' }
			],
			state:[
				{ required: true, message: '请选择审核不通过原因', trigger: 'blur' }
			]
		},
		setServicerRules:{
			spId:[
				{ required: true, message: '请选择服务商', trigger: 'blur' }
			],
			isContact: [
				{ type:'boolean', required: true, message: '请确认已与服务商联系', trigger: 'change' }
			],
			memo: [
				{ required: true, message: '请填写备注', trigger: 'blur' }
			]
		},
		//服务记录
		dialogService:false,
		acceptMaterials:'',
		recordData:'',
		dialogServiceLoading:false,
		// 弹框 - 证书 - 预览
    previewImg:false,
    previewSrc:'',
		token:''
  }
},
watch:{
	status(){
		if (this.status==2) {
			this.getRemark()
		}
	}
},
methods: {
	cancelAudit(){
		this.textarea = '';
		this.radio = 1;
		this.dialogTab = false;
	},
	InfoAudit(){//材料审核
		let self = this;
		if(this.noRepeat){
			self.noRepeat = false;
			let data = {
  			memo:self.textarea,
  			step:self.radio,
  			reason:self.auditstate,
  			workOrderId:self.detailInfo.information.workOrderId
  		}
  		if (!self.radio) {
				self.$message({
					message: '请选择审核是否通过',
					type: 'warning'
				});
				self.noRepeat = true;
				return;
  		}
  		if (self.radio == 2 && !data.memo) {
				self.$message({
					message: '请填写备注',
					type: 'warning'
				});
				self.noRepeat = true;
				return;
  		}
  		self.$http.post(auditUrl,data)
	    .then((resp) => {
	    	self.$message({
					message: '提交成功',
					type: 'success'
				});
	      self.dialogTab = false;
	      self.noRepeat = true;
	      self.search();
	    })
	    .catch((err) => {
	    	self.dialogTab = false;
	    	self.noRepeat = true;
	      self.$message({
	        message: err.response.data.msg,
	        type: 'warning'
	      });
	    });
		}
	},
	// 弹框内预览
  previewClick(data){
    console.log(data)
    this.$http.get('./api/preview?pdf_url='+data.url)
    .then((response) => {
      this.previewSrc = response.data.urls;
    })
    .catch((error) => {
      console.log(error)
    });
    this.certificateImg = data.type;
    this.previewImg = true;
  },
	viewRecord(recordData){
    var self = this;
    // 申请号
    self.acceptMaterials = recordData.acceptMaterials;
    self.dialogServiceLoading = true;
    this.$http.get('./api/findBsFeedbackCode?orderSn='+recordData.orderSn).then((response) => {
    	self.dialogServiceLoading = false;
      self.recordData = response.data;
    })
    .catch((error) => {
    	self.dialogServiceLoading = false;
      console.log(error)
    });
    this.dialogService = true;
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
	setServicer(){
		this.setServicerVisible = true;
		this.getSpList();
		this.setServicerData = {
			spId:'',
			memo:'',
			isContact: false,
			workOrderId:''
		};
		this.$refs['setServicerData'].resetFields();
	},
	servicerConfirm(name){
		this.setServicerData.workOrderSn = this.work_order_sn;

		var data = Object.assign({}, this.setServicerData);
		data.isContact = data.isContact ? 1 : 0;

		this.$refs[name].validate((valid) => {
			if (valid) {
				this.$http.put(allotSpUrl.replace('{work_order_sn}', this.$route.params.id), data)
		    .then((resp) => {
		    	this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.search();
		      this.setServicerVisible = false;
		    })
		    .catch((err) => {
		      this.$message({
		        message: err.response.data.msg,
		        type: 'warning'
		      });
		    });
		  }
		})
	},
	addRemark(){
    var data = {
      work_order_sn:this.work_order_sn,
      content:this.content
    }
    this.$http.post(addRemarkUrl, data)
    .then((resp) => {
    	this.$message({
				message: '提交成功',
				type: 'success'
			});
      this.dialogRemark = false;
      this.getRemark();
    })
    .catch((err) => {
      this.$message({
        message: err.response.data.msg,
        type: 'warning'
      });
    });
  },
	openRemarkDialog(){
		this.dialogRemark = true;
		this.content = '';
	},
	getRemark(){
		this.$http.get(getRemarkUrl.replace('work_order_sn', this.work_order_sn))
    .then((resp) => {
    	this.remarkData = resp.data;
    })
    .catch((err) => {
      this.$message({
        message: err.response.data.msg,
        type: 'warning'
      });
    });
	},
	view(orderSn){
		var route = this.$route;
		var query = route.query;
		if (route.matched[1].path.indexOf('allService') !== -1) {
			this.$router.push({name: 'bsOrderDetail', params: {id: orderSn}, query: query })
		}else{
			this.$router.push({name: 'reportDetail', params: {id: orderSn}, query: query })
		}
	},
  goodsname(item){
    if(item){
      var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
      return str;
    }else{
      var str = '--';
      return str;
    }
  },
  preview(src){
    this.imgsrc = src;
	this.dialogVisible = true;
	this.$nextTick(()=>{
        new LimitDrag('movediv')
      })
  },
  submitAudit(){
  	var self = this;
    this.$refs['audit'].validate((valid) => {
      if (valid) {
        // if(!self.textarea){
        // 	self.$message({
		      //   message: '备注不能为空',
		      //   type: 'warning'
		      // });
        // 	return;
        // }
        var data = {
		      workOrderSn: this.work_order_sn,
		      memo:self.textarea,
		      step:self.audit.radio,
		      reason:self.audit.state
      	}
        self.$http.post(auditUrl,data)
		    .then((resp) => {
		    	self.$message({
						message: '提交成功',
						type: 'success'
					});
		      self.dialogState = false;
		      self.search();
		    })
		    .catch((err) => {
		      self.$message({
		        message: err.response.data.msg,
		        type: 'warning'
		      });
		    });
      } else {
        return false;
      }
    });

  },
  auditClick(detail){
  	var state = detail.status;
    if(state<3){
      return false;
    }else if(detail.workOrderType == 1){
      this.dialogTab = true;
    }else{
      this.dialogState = true;
    }
  },
  search(){
    var self = this;
    this.$http.get(detailUrl+'?workOrderSn='+this.$route.params.id)
    .then((resp) => {
      self.detailInfo = resp.data;
      if(self.detailInfo.operationRecord[0]){
        self.recordContent = self.detailInfo.operationRecord[0].recordContentService;
      }
      // 营业执照
      if(self.detailInfo.subject.standby1){
        self.imgUrl(self.detailInfo.subject.standby1);
      }
      // 营业执照
      if(self.detailInfo.subject.standby2){
        self.licenseUrl(self.detailInfo.subject.standby2);
      }
      // 委托书
      if(self.detailInfo.information.proxyUrl){
        self.certificateImgUrl(self.detailInfo.information.proxyUrl);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },
  // 执照
  licenseUrl(url){
    this.$http.get('./api/preview?pdf_url='+url)
    .then((response) => {
      this.licenseName = response.data.urls;
    })
    .catch((error) => {
			this.$message({
				message: 'pdf预览生成失败',
				type: 'error'
			});
    });
  },
  // 营业执照
  imgUrl(url){
    this.$http.get('./api/preview?pdf_url='+url)
    .then((response) => {
      this.usinessLicense = response.data.urls;
    })
    .catch((error) => {
      this.$message({
				message: 'pdf预览生成失败',
				type: 'error'
			});
    });
  },
  // 委托书
  certificateImgUrl(url){
    var self = this;
    this.$http.get('./api/preview?pdf_url='+url)
    .then((response) => {
      self.powerAttorney = response.data.urls;
    })
    .catch((error) => {
      this.$message({
				message: 'pdf预览生成失败',
				type: 'error'
			});
    });
  },
  certificatePreview(url){
    this.proxyImg = url;
    this.dialogImg = true;
  }
},
created() {
},
mounted() {
	this.isAllWorkOrder = this.$route.path.indexOf('allService') !== -1;
	this.type = this.$route.params.type;
	this.work_order_sn = this.$route.params.id;
  this.search();
  this.token = VueCookie.get('token');
},
filters: {
  format:Filters.subjectTypeFormat,
  mainBodeSbj:Filters.mainBodeSbj,
  formatDate:Filters.formatDate.dateFormat,
  mainBodeNumber:Filters.mainBodeNumber,
  invoiceTypeFormat:Filters.invoiceTypeFormat,
  picType: function (index) {
    switch (index){
      case 1:
        return "黑白色";
      case 2:
        return "指定色";
    }
  },
  dateFormat:Filters.formatDate.dateFormat,
  fileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "申请人身份证";
        break;
      case '2':
        ret = "企业营业执照副本复印件";
        break;
      case '3':
        ret = "申请人护照";
        break;
      case '4':
        ret = "企业登记证件";
        break;
    }
    return ret;
  },
  licenseName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "个体工商户营业执照";
        break;
      case '2':
        ret = "";
        break;
      case '3':
        ret = "中文护照译本";
        break;
      case '4':
        ret = "企业登记证件译本";
        break;
    }
    return ret;
  },
  downFileName: Filters.downFileName,
},
watch:{
  dialogService: function(now,val){
    if(!now){
      this.previewImg = false;
    }
  },
	status(){
		if (this.status==2) {
			this.getRemark()
		}
	}
}
}
</script>
<style lang='less'>
.form_wrap{
	.service_detail_tab{
		margin:0 0 0 0;position: relative;background-color: #fff;box-sizing: content-box;width: 100%;
		ul{border-bottom:1px solid #dfe2e5;height:40px;
			li{height:40px;text-align: center;font-size:14px;color:#556677;cursor:pointer;padding:13px 12px 0;line-height: 100%;}
			.sele_border{box-sizing:border-box;background-color:#fff;border:1px solid #DFE2E5;border-bottom: 1px solid #fff;}
		}
	}
  .form{
  	background-color:#fff;padding:0 30px 30px;border: 1px solid #DFE2E5;border-top:0;border-radius: 0 2px 2px 2px;min-height: 500px;
    .basic_lists{padding-top:20px;
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
            .txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;}
          }
        }
        //右侧图片预览定位
        .basic_img{width:40%;text-align:left;
          >div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;border-radius:2px;cursor:pointer;
            img{width:98px;height:118px;}
            p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;left:-1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
		  }
		  .chakanywj{
			  position: absolute;
			  bottom: -26px;
			  left: 0;
			  width: 100%;
			  padding-top: 5px;
			  line-height: 20px;
			  font-size: 14px;
			  color:#379dea;
		  }
        }
      }
    }

	  .service_list{padding-top:20px;
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
	          p{font-size: 13px;color: #7F8FA4;line-height:18px;}
	          .state_name{width:128px;}
	          .state_txt{
	          	width:82%;position: relative;
	          	.view{position: absolute; left: 170px;color:#20a0ff;}
	          }
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
	  }


	  .service{padding-top: 20px;
	    .service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
	    .service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;font-size: 13px;color: #479CFF;cursor:pointer;}
	    .service_table{margin-top: 10px;
	      >p{font-size: 13px;color: #556677;margin-bottom:10px;
	        button{width: 70px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
	        .service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
	        .service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:not-allowed;}
	      }
	      .tb01{width:30%;}
	      .tb02{width:30%;}
	      .tb03{width:40%;}
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

	  .remark{
	    .remark_table{margin-top: 10px;
	      >p{font-size: 13px;color: #556677;margin-bottom:10px;
	        button{width: 70px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
	        .service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
	      }
	      .tb01{width:30%;}
	      .tb02{width:20%;}
	      .tb03{width:50%;}
	      ul{
	        li{text-align:left;line-height: 40px;min-height: 40px;}
	      }
	      .table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;display: table;width: 100%;
	        li{font-size: 13px;color: #223344;display: table-cell;vertical-align: middle;}
	      }
	      .table_list{
	      	border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;display: table;width: 100%;
	        li{border-bottom:1px solid #DFE2E5;display: table-cell;vertical-align: middle;line-height: 20px;padding:10px 0;
	          span{line-height:18px;word-break: break-all;font-size: 13px;color: #556677;}
	        }
	        li:last-child{
	      		padding-right: 20px;
	      	}
	      }
	    }
	  }

	  .list_detail{padding-bottom:10px;
	    .kpx{
	      p{text-align:left}
	    }
	    >div{border: 1px solid #e5e5e5;padding:10px 20px;color:#7F8FA4;
	      >p{font-size:14px;text-align:center;}
	    }
	    >p{font-size: 14px;color: #333333;}
	    .list_left{width:495px;
	      li{
	        .left_txt{width:120px;font-size: 13px;color: #556677;text-align:left;}
	        .right_txt{width:375px;font-size: 13px;color: #556677;text-align:left;word-break:break-all;}
	      }
	    }
	    .list_right{width:410px;text-align:left;padding-left: 70px;
	      div{position: relative;width:100px;height:120px;border:1px solid #E6E6E6;border-radius:2px;
	        img{width:98px;height:118px;}
	        p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;left:-1px;}
	      }
	      .right_list{width:340px;
	        li{
	          .left_txt{width:104px;font-size: 13px;color: #556677;text-align:left;}
	          .right_txt{width:236px;font-size: 13px;color: #556677;text-align:left;word-break:break-all;}
	        }
	      }
	    }
	  }
	  // 弹框样式
	  .state_preview{
	    .el-dialog__title{font-size: 14px;color: #223344;font-weight: normal;}
	    .el-dialog__body{padding-top:10px;}
	    .el-dialog--small{width:500px;}
	    .radio,.state_radio,p{font-size: 14px;color: #556677;}
	    .set_btn{
	      p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
	      .right_btn{background: #479CFF;color:#fff;}
	      .left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
	    }
	    .service_limit{position: absolute;bottom:85px;right: 30px;color:#999;font-size:13px;}
	  }

		.preview_tit{
	    p{cursor:pointer;
	      img{vertical-align: top;margin-right:7px;}
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

	  .setServicerDialog{
	  	.el-dialog--small{width: 520px;}
	  	.el-dialog__body{
	  		padding-top: 10px;
	  		.el-form-item{margin-bottom: 12px;}
	  	}
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

	  .servicerInfo{
	  	.service_table{margin-top: 10px;
	      >p{font-size: 13px;color: #556677;margin-bottom:10px;
	        button{width: 70px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
	        .service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
	        .service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:default;}
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


		.state_list{
	    .state_time{margin-top: -10px;
	      p{
	        span{font-size:16px;color:#D8D8D8;}
	      }
	      a{text-decoration:none;font-size: 13px;color: #999999;cursor:pointer;}
	      a:hover{color: #3DB1FA;}
	      i{border-left:1px dashed #ddd;height:23px;display:block;margin-top: -8px;margin-left: 4px;}
	    }
	    .change_providers{
	      img{width:70px;}
	      .change_txt{
	        span{font-size: 14px;color: #333333;}
	        p{font-size: 13px;color: #666666;line-height:19px;
	          img{width:18px;vertical-align: top;}
	          a{text-decoration:none;cursor:pointer;color:#3db1fa;}
	        }
	      }
	    }
	  }
	  // 服务记录
	  .service_preview{
	  	.el-dialog__body{padding: 0 0 20px;}
	    .apply_num{padding:30px 20px 20px;
	      .apply_left{font-size: 14px;color: #333333;}
	      .apply_right{margin-left: 15px;font-size: 14px;color: #999999;}
	    }
	    .state_list{margin:0 20px;padding:0;border-top:1px solid #eee;border-bottom:1px solid #eee;padding-top:25px;max-height:355px;overflow: auto;
	      .state_time{
	        p{line-height:20px;font-size:14px;color:#556677;
	          span{font-size:16px;}
	        }
	        .sc{color:#09BB07;
	          span{color:#09BB07;}
	        }
	        span{font-size: 13px;color: #999999;}
	        .time_left{width:160px;display:inline-block;}
	        i{height:56px;margin-top: -30px;}
	        .last_time{height:26px;}
	      }
	    }
	    .el-dialog{width:860px;padding:10px 10px 30px;
	      .el-dialog__header{text-align:left;
	        .el-dialog__title{font-size: 16px;color: #333333;font-weight: normal;}
	      }
	    }
	  }
	}
	.el-form-item__label{text-align: left}
	.el-textarea__inner{resize: none;}
	.el-form-item__label{text-align:left;}
}
</style>

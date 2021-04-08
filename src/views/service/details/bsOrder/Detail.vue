<template>
	<div class="report_wrap">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本资料</li>
				<li class="fl" :class="{'sele_border':status == 2}" @click="status=2">备注</li>
			</ul>
		</div>
		<div class="report" v-loading="infoLoading">
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
						<div class="basic_img fl clearfix">
							<div class="fr ml30" v-if="detailInfo.subject.standby1" @click="certificatePreview(usinessLicense)">
								<img :src="usinessLicense[0]" alt="">
								<p :title="detailInfo.subject.applyType | fileName">{{detailInfo.subject.applyType | fileName}}</p>
							</div>
							<div class="fr" v-if="detailInfo.subject.standby2 && detailInfo.subject.applyType != 2" @click="certificatePreview(licenseName)">
								<img :src="licenseName[0]" alt="">
								<p :title="detailInfo.subject.applyType | licenseName">{{detailInfo.subject.applyType | licenseName}}</p>
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
					<div class="basic_category clearfix">
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
							<div class="fr mb20" v-if="powerAttorney[0]" @click="certificatePreview(powerAttorney)">
								<img :src="powerAttorney[0]" alt="">
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
					<div class="detail_list">
						<div class="list_tit clearfix">
							<p class="fl order">服务单号</p>
							<p class="fl">{{detailInfo.orderInformation.orderSn}}</p>
						</div>
						<ul class="mt10 clearfix">
							<li class="clearfix mb10">
								<p class="state_name fl">{{goodsname || '--'}}</p>
								<p class="state_txt fl">共{{detailInfo.orderInformation.minNumber}}个小项<span v-if="detailInfo.orderInformation.minNumber">（{{detailInfo.orderInformation.min}}）</span></p>
							</li>
							<template v-if="detailInfo.workOrderType!=2">
								<li class="clearfix mb10">
									<p class="state_name fl">在线近似商标</p>
									<p class="state_txt fl">{{detailInfo.orderInformation.similarTrademark}}</p>
								</li>
								<li class="clearfix mb10">
									<p class="state_name fl">注册通过率</p>
									<p class="state_txt fl" v-if="detailInfo.orderInformation.registerPassRate">{{detailInfo.orderInformation.registerPassRate}}%</p>
								</li>
								<li class="clearfix mb10">
									<p class="state_name fl">风险说明及注册建议</p>
									<p class="state_txt fl">{{detailInfo.orderInformation.advice || '--'}}</p>
								</li>
							</template>
						</ul>
					</div>
				</div>

				<!-- 开票信息 -->
				<div class="list_detail">
					<p class="mb10">开票信息</p>
					<div class="clearfix" v-if="detailInfo.invoice">
						<ul class="list_left fl">
		          <li class="mb10 clearfix">
		            <p class="left_txt fl">发票类型</p>
		            <p class="right_txt fl">{{detailInfo.invoice.invoiceType | invoiceTypeFormat}}</p>
		          </li>
							<li class="mb10 clearfix">
								<p class="left_txt fl">发票抬头</p>
								<p class="right_txt fl">{{detailInfo.invoice.invoiceTitle || '--'}}</p>
							</li>
							<li class="mb10 clearfix" v-if="detailInfo.subject.applyType == 2 && detailInfo.invoice.invoiceType == 2">
								<p class="left_txt fl">{{detailInfo.subject.applyType | mainBodeSbj}}地址</p>
								<p class="right_txt fl">{{detailInfo.invoice.address || '--'}}</p>
							</li>
							<li class="mb10 clearfix" v-if="detailInfo.subject.applyType == 2 && detailInfo.invoice.invoiceType == 2">
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
								<li class="mb10 clearfix" v-if="detailInfo.subject.applyType == 2 && detailInfo.invoice.invoiceType == 2">
									<p class="left_txt fl">{{detailInfo.subject.applyType | mainBodeSbj}}联系电话</p>
									<p class="right_txt fl">{{detailInfo.invoice.registPhone || '--'}}</p>
								</li>
								<li class="mb10 clearfix" v-if="detailInfo.subject.applyType == 2 && detailInfo.invoice.invoiceType == 2">
									<p class="left_txt fl">银行账号</p>
									<p class="right_txt fl">{{detailInfo.invoice.accountNumber || '--'}}</p>
								</li>
							</ul>
						</div>
					</div>
					<div class="kpx" v-if="!detailInfo.invoice">
						<p>未申请开票</p>
					</div>
				</div>

				<!-- 服务商信息 -->
				<div class="service_list servicerInfo" v-if="detailInfo.spFeedbacks">
					<p>服务商信息</p>
					<div class="detail_list">
						<ul class="mt5 clearfix">
							<li class="clearfix mb10">
								<p class="state_name fl">服务商名称</p>
								<p class="state_txt fl setServicer">{{detailInfo.serviceProvider.sp_name}} </p>
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
					<div class="service_table">
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
			        <ul class="table_list clearfix" v-for="(data, index) in detailInfo.spFeedbacks" :key="index">
			          <li class="fl tb01" style="padding-left:20px;"><p>{{data.operating_time | dateFormat}}</p></li>
			          <li class="fl tb02"><p>{{data.operating_start_sp}}</p></li>
			          <li class="fl tb03"><p>{{data.operating_end_sp}}</p></li>
			          <li class="fl tb04"><p>{{data.operator}}</p></li>
			          <li class="fl tb05"><p>{{data.memo}}</p></li>
			        </ul>
		        </template>
	        </div>
				</div>
				<!-- 拾贝订单 -->
				<div class="list_state">
					<p>进度跟踪</p>
					<div class="service_table">
						<p>
							申请／注册号：{{detailInfo.feedback_stage<=8 ? '待商标局形式审查通过后显示' : (detailInfo.orderInformation.acceptMaterials || '--')}}
						</p>
			      <p>
              办理状态：
              <template v-if="detailInfo.workOrderType==2 && detailInfo.feedback_stage==4">已完善待申报</template>
        			<template v-else>{{detailInfo.order_feedback_state||'--'}}</template>

							<!-- 申报 -->
							<template v-if="detailInfo.workOrderType==2 && detailInfo.feedback_stage==4">
								<button v-if="localStore.get('permission').indexOf('sbfw_gnsb_zs_verified_operator') !== -1" class="service_btn ml10" @click="OfficeClick(7)">手动申报</button>
              	<button v-if="isOnline && localStore.get('permission').indexOf('sbfw_gnsb_zs_verified_operator') !== -1" class="service_btn ml10" @click="OfficeClick(7, true)">自动申报</button>
							</template>
							<template v-else>
	              <button v-if="detailInfo.feedback_stage == 7 && localStore.get('permission').indexOf('sbfw_gnsb_zs_verified_operator') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage)">{{detailInfo.feedback_stage | btnState}}</button>
	              <button v-if="isOnline && detailInfo.feedback_stage == 7 && localStore.get('permission').indexOf('sbfw_gnsb_zs_verified_operator') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage, true)">自动申报</button>
              </template>
							<!-- 反馈受理通知结果 -->
              <button v-if="detailInfo.feedback_stage == 8 && localStore.get('permission').indexOf('sbfw_gnsb_zs_cl_operator') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage)">{{detailInfo.feedback_stage | btnState}}</button>
              <!-- 形式审查 -->
              <button v-if="detailInfo.feedback_stage == 9 && localStore.get('permission').indexOf('sbfw_gnsb_zs_sl_operator') !== -1" class="service_btn ml10" @click="OfficeClick(detailInfo.feedback_stage)">{{detailInfo.feedback_stage | btnState}}</button>
              <!-- 实质审查 -->
              <button class="service_btn ml10" v-if="(detailInfo.feedback_stage == 11 || detailInfo.feedback_stage == 19) && localStore.get('permission').indexOf('sbfw_gnsb_sub_review') !== -1" @click="OfficeClick(10)">{{10 | btnState}}</button>
              <!-- 返回部分驳回结果  -->
              <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 13 && localStore.get('permission').indexOf('sbfw_gnsb_sub_review_for_part') !== -1" @click="OfficeClick(13)">{{11 | btnState}}</button>
              <!-- 初审公告 -->
              <button class="service_btn ml10" v-if="(detailInfo.feedback_stage == 12 || detailInfo.feedback_stage == 22)&& localStore.get('permission').indexOf('sbfw_gnsb_regist_notice') !== -1" @click="OfficeClick(12)">{{12 | btnState}}</button>
              <!-- 反馈部分异议结果 -->
              <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 16 && localStore.get('permission').indexOf('sbfw_gnsb_zs_partial_objection_for_part') !== -1" @click="OfficeClick(16)">{{13 | btnState}}</button>
              <!-- 反馈异议答辩结果 -->
              <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 17 && localStore.get('permission').indexOf('sbfw_gnsb_zs_feedback_objection') !== -1" @click="OfficeClick(17)">{{17 | btnState}}</button>
              <!-- 发放注册证 -->
              <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 15 && localStore.get('permission').indexOf('sbfw_gnsb_regist_certificate') !== -1" @click="OfficeClick(14)">{{14 | btnState}}</button>
              <!-- 反馈驳回结果  -->
              <button class="service_btn ml10" v-if="detailInfo.feedback_stage == 14 && localStore.get('permission').indexOf('sbfw_gnsb_zs_feedback_dismissal') !== -1" @click="OfficeClick(15)">{{15 | btnState}}</button>
          	</p>
					</div>
					<!-- 创新保流程 -->
					<handle-state-cxb v-if="detailInfo.workOrderType  == 1" :stateData="stateData"></handle-state-cxb>
					<!-- 拾贝流程 -->
					<handle-state v-else :stateData="stateData" :type="detailInfo.workOrderType+''"></handle-state>
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
			        <ul class="table_list remark_list clearfix" v-for="(item, index) in remarkData" :key="index">
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
					<el-carousel-item v-for="(srcImg,$index) in proxyImg" :key="$index">
						<img :src="srcImg" alt="">
					</el-carousel-item>
				</el-carousel>
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
							<el-radio v-if="detailInfo.workOrderType != 1" label="21">否</el-radio>
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
							<el-radio v-if="detailInfo.workOrderType != 1" label="21">否</el-radio>
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
					<!-- 创新保 -->
					<el-form-item :label="trademarkData.accept | nameFile(auditInfo)" v-if="auditInfo > 7&&trademarkData.accept&&trademarkData.bool!=21 && detailInfo.workOrderType == 1" required>
						<div class="upload_component">
						<p class="err_txt">{{errTxt}}</p>
							<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_name" :postAction="'iprp_middleground/api/file/upload'" :url="standby1" :valueName="'standby1'" :size="5" :extensions="'pdf'" :isDialog="true"></uploader>
							<div class="upload_tip">
								<p>请上传{{trademarkData.accept | nameFile(auditInfo)}}</p>
								<p class="format">支持pdf，文件大小限5MB以内</p>
							</div>
						</div>
					</el-form-item>
					<!-- 拾贝 -->
					<el-form-item :label="trademarkData.accept | nameFile(auditInfo)" v-if="auditInfo > 7&& trademarkData.accept&&trademarkData.bool!=21 && detailInfo.workOrderType != 1" required>
						<div class="upload_component">
						<p class="err_txt">{{errTxt}}</p>
							<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_name" :postAction="'iprp_middleground/api/file/upload'" :url="standby1" :valueName="'standby1'" :size="5" :extensions="'pdf,gif,jpg,jpeg,png,bmp'" :isDialog="true"></uploader>
							<div class="upload_tip">
								<p>请上传{{trademarkData.accept | nameFile(auditInfo)}}</p>
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

			<el-dialog title="更换服务商"	:visible.sync="setServicerVisible" class="setServicerDialog" :modal-append-to-body="true">
				<el-form ref="setServicerData" :model="setServicerData" :rules="setServicerRules" :inline="false" auto-complete="off" label-width="170px">
					<el-form-item label="请选择服务商" prop="sp_id">
						<el-select clearable v-model="setServicerData.sp_id" placeholder="请选择服务商" style="width: 480px;">
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
		<tongTianTa :visible.sync="ifrDialogVisible" :orderInfo="detailInfo" :needSpider="needSpider" v-if="detailInfo.feedback_stage == 7 || detailInfo.feedback_stage == 4"></tongTianTa>
	</div>
</template>
<script>
import VueCookie from 'vue-cookie'
import {store} from 'utils/';
import $ from 'jquery'
import { gbs } from 'config/settings.js';
import Filters from 'utils/filters/filters.js'
import cateIdData from 'apis/intClsData.js'
import uploader from 'cps/uploader/uploader.vue'
import tongTianTa from 'cps/tongTianTa/tongTianTa.vue'
import handleState from 'cps/handleState/handleState.vue'
import handleStateCxb from 'cps/handleState/handleStateCxb.vue'
const detailReportUrl = './api/findTrademarkDetail';
const pdfUrl = './api/preview';
const operationUrl = './api/declare';
const rootUrl = CONFIG.rootUrl;
const getRemarkUrl = './api/OrdersRemarks/order_id'
const addRemarkUrl = './api/OrdersRemarks'
const spListUrl = './api/findAllSp';
const allotSpUrl = CONFIG.adminUrl + '/api/orders/{order_id}'
const getTimeUrl = rootUrl + '/api/nextPageTrademark'
export default {
components: {
	uploader,tongTianTa,handleState,handleStateCxb
},
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
		needSpider: 0, //是否抓取商标局尼斯小项开关
		infoLoading: false,
		isOnline: true,//自动申报是否在8:00 - 20:00
		ifrDialogVisible: false,
		status: 1,
  	order_id:'',
  	remarkData:[],
  	dialogRemark: false,
  	content:'',
  	loadAudio:false,
		rootUrl:rootUrl,
		instructions:'',
		trademarkData:{
			accept:'',
			number:'',
			time:'',
			bool:''
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
		standby1_name:'',
		standby1:'',
		dialogVisible:false,
		dialogImg:false,
		// 提交商标局
		dialogOffice:false,
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
		radio:'',
		imgsrc:'',
		proxyImg:{},
		// 营业执照
		usinessLicense:[],
		// 委托书
		powerAttorney:[],
		// 个人执照
		licenseName:[],
		clsData:cateIdData.cateIdData,
		// steps:'',
		stateData:{},
		step:'',
		urlInfo:'',
		// 审核弹框显示内容
		auditInfo:'',
		// 大类名字
		goodsname:'',
		errTxt:'',
		token:'',
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
	}
},
mounted() {
	this.search();
	this.token = VueCookie.get('token');
	this.order_id = this.$route.params.id;
	this.needSpider = this.$route.query.spider ? 1 : 0;
	//this.getTime(); 先去除时间限制
},
methods: {
	getTime(){
    var self = this;
    var xhr = new XMLHttpRequest();
    if( !xhr ){
       xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("HEAD", getTimeUrl+'?access_token='+this.token, true);
    xhr.onreadystatechange=function(){
      if( xhr.readyState == 4 && xhr.status == 200 ){
        var date = xhr.getResponseHeader("Date");
        var d = Filters.formatDate.dateFormat(date);
        var d1 = d.split(' ')[0] + ' 08:00:00';
        var d2 = d.split(' ')[0] + ' 20:00:00';
        self.isOnline = d>d1 && d<d2;
      }
    }
    xhr.send(null);
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
		this.setServicerData = {};
		this.$refs['setServicerData'].resetFields();
	},
	servicerConfirm(name){
		this.setServicerData.order_id = this.detailInfo.orderInformation.orderId;

		var data = Object.assign({}, this.setServicerData);
		data.is_contact = data.is_contact ? 1 : 0;
		data.is_rebuild_sp = data.sp_id ? 2 : 1;

		this.$refs[name].validate((valid) => {
			if (valid) {
				this.$http.put(allotSpUrl.replace('{order_id}', this.setServicerData.order_id), data)
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
      order_sn:this.order_id,
      content:this.content
    }
    if(!this.content){
      this.$message({
        message: '备注不能为空',
        type: 'warning'
      });
      return false;
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
		this.$http.get(getRemarkUrl.replace('order_id', this.order_id))
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
				if(self.auditInfo > 7&&self.auditInfo!=15&&self.auditInfo!=17&&!self.urlInfo && !(self.auditInfo==12&&self.trademarkData.accept==15)){
					self.errTxt = "文件未上传";
					return;
				}
				console.log(11111)
				self.errTxt = "";
				if(self.detailInfo.feedback_stage == 9){
					self.step = self.trademarkData.accept;
				}
				var time = '';
				if(Date.parse(self.trademarkData.time)){
					time = Date.parse(self.trademarkData.time);
				}
				// 驳回复审
				if(self.detailInfo.feedback_stage==14){
					if(self.trademarkData.bool==21){
						// 不参与驳回复审
						time = '';
						self.urlInfo='';
						self.trademarkData.accept=21;
					}
				}
				// 异议答辩
				if(self.detailInfo.feedback_stage==17){
					if(self.trademarkData.bool==21){
						// 异议答辩
						time = '';
						self.urlInfo='';
						self.trademarkData.accept=22;
					}
				}
				var data = {
					orderSn:self.$route.params.id,
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
					self.$router.push({path:'/service/tmApply/reportList',query:(self.$route.query)});
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
	// 查看委托书
	preview(src){
		this.imgsrc = src;
		this.dialogVisible = true;
	},
	// 初始化
	search(){
		var self = this;
		self.standby1 = '';
		self.textarea = '';
		self.trademarkData.number = '';
		self.urlInfo = '';
		self.trademarkData.time = '';

		self.infoLoading = true;
		this.$http.get(detailReportUrl+'?orderSn='+this.$route.params.id)
		.then((resp) => {
			self.infoLoading = false;
			self.detailInfo = resp.data;
			// console.log(self.detailInfo)
			// self.steps = self.detailInfo.feedback_stage;
			self.stateData = self.detailInfo.feedbacks;
			self.goodsname = '第'+self.detailInfo.orderInformation.intCls+'类-'+self.clsData[self.detailInfo.orderInformation.intCls-1].goodsname;
			// 证件
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
		.catch((error) => {
			self.infoLoading = false;
			console.log(error);
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
	// 状态部分pdf查看
	certificatePreview(url){
		this.proxyImg = url;
		this.dialogImg = true;
	},
	// 状态图片预览
	previewImg(url){
		this.$http.get('./api/preview?pdf_url='+url)
		.then((response) => {
			if(response.data.urls){
				this.certificatePreview(response.data.urls);
			}
		})
		.catch((error) => {
			this.$message({
				message: 'pdf预览生成失败',
				type: 'error'
			});
		});
	}
},
watch:{
	dialogOffice(now,val) {
		if(!now){
			//弹框关闭，所有内容初始化
			this.errTxt = '';
			this.textarea = '';
			this.standby1 = '';
			this.trademarkData.time = '';
			this.trademarkData.number = '';
			this.trademarkData.accept = '6';
		}
	},
	status(){
		console.log(this.status)
		if (this.status==2) {
			this.getRemark()
		}
	}
},
filters: {
	dateFormat:Filters.formatDate.dateFormat,
	format:Filters.subjectTypeFormat,
  mainBodeSbj:Filters.mainBodeSbj,
  mainBodeNumber:Filters.mainBodeNumber,
  invoiceTypeFormat:Filters.invoiceTypeFormat,
	picType: Filters.picType,
	timeStatus: Filters.timeStatus,
	nameFile: Filters.nameFile,
	fileStateName: Filters.fileStateName,
	auditName: Filters.auditName,
	btnState: Filters.btnState,
	fileName: Filters.fileName,
	licenseName: Filters.licenseName,
}
}
</script>
<style lang='less'>
.report_wrap{
	.service_detail_tab{
		margin:0;position: relative;background-color: #fff;box-sizing: content-box;width: 100%;
		ul{border-bottom:1px solid #dfe2e5;height:40px;
			li{height:40px;text-align: center;font-size:14px;color:#556677;cursor:pointer;padding:13px 12px 0;line-height: 100%;}
			.sele_border{box-sizing:border-box;background-color:#fff;border:1px solid #DFE2E5;border-bottom: 1px solid #fff;}
		}
	}
	.report{background-color:#fff;padding:10px 30px 30px;border: 1px solid #DFE2E5;border-top:0;border-radius: 0 2px 2px 2px;min-height: 500px;
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
						.txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;word-break: break-all;}
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

		.service_list{padding-top:20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.detail_list{border: 1px solid #e5e5e5;margin-top: -1px;padding-top: 6px;
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
						.state_txt{width:82%;word-break:break-all;}
						.setServicer{
							a{
								margin-left:20px;border:1px solid #479CFF; color: #479CFF;padding:0 10px;height: 24px;line-height:24px;display:inline-block;border-radius: 2px;
								&:hover{text-decoration:none;}
							}
						}
						.idcode{
							width: 300px;position: absolute; top:0;left: 565px;
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
					.service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:default;}
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
		// 弹框样式 (备注弹框也在用)
		.state_preview{
			.el-dialog__title{font-size: 14px;color: #223344;font-weight: normal;}
			.el-dialog__body{padding-top:15px;}
			.el-dialog--small{width:500px;}
			.radio,.state_radio,p{font-size: 14px;color: #556677;}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
			.service_limit{position: absolute;bottom:85px;right: 30px;color:#999;font-size:13px;}
			.upload_component{
				position: relative;
				.upload_tip{
					position: absolute;left: 140px;bottom:0;width:185px;font-size: 12px;color: #556677;line-height: 16px;
					p.format{color: #A8AFB5;padding-top: 5px; word-break: break-all;}
				}
			}
		}
		.state_dialog{
			.el-dialog--small{width:600px;}
			.dialog_memo{
				div.label{text-align: right;padding-right:12px;text-align:left}
				.service_limit{bottom:80px;right: 35px;}
			}
			.upload_component{
				.upload_tip{width:270px;}
			}
			.set_btn{}
		}
		.state_dialog_memo{
			.el-dialog--small{width:455px;}
			.dialog_memo{
				div.label{float:none;display: block;width: auto;text-align: left;padding-right:0;}
			}
			.set_btn{padding-right: 0px;}
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
		.list_state{padding-top:20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.service_table{margin-top: 10px;
				>p{font-size: 13px;color: #556677;margin-bottom:10px;
					button{padding:0 8px;height: 24px;line-height: 24px;text-align: center;border-radius: 2px;font-size: 13px;}
					.service_btn{border: 1px solid #479CFF;color: #479CFF;cursor: pointer;}
					.service_nullbtn{border: 1px solid #DFE2E5;color: #7F8FA4;cursor:default;}
				}
			}
		}

		.list_detail{padding-top:20px;
	    .kpx{
	      p{text-align:left}
	    }
			>div{border: 1px solid #e5e5e5;padding:10px 20px;color:#7F8FA4;
				>p{font-size:13px;text-align:center;}
			}
			>p{font-size: 14px;color: #333333;}
			.list_left{width:495px;
				li{
					.left_txt{width:128px;font-size: 13px;color: #7F8FA4;text-align:left;}
					.right_txt{width:365px;font-size: 13px;color: #7F8FA4;text-align:left;word-break:break-all;}
				}
				li:last-child{margin-bottom: 0;}
			}
			.list_right{width:410px;text-align:left;padding-left: 70px;
				div{position: relative;width:100px;height:120px;border:1px solid #E6E6E6;border-radius:2px;
					img{width:98px;height:118px;}
					p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;left:-1px;}
				}
				.right_list{width:340px;
					li{
						.left_txt{width:104px;font-size: 13px;color: #7F8FA4;text-align:left;}
						.right_txt{width:236px;font-size: 13px;color: #7F8FA4;text-align:left;word-break:break-all;}
					}
				}
			}
		}
		.state_preview  .err_txt{color: #ff4949;font-size: 12px;}
		.state_preview  .imgtype{color: #999;font-size: 12px;margin-left: 135px;margin-top: -20px;}

		//备注
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

	  .servicerInfo{
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
	}
}
.el-form-item__label{text-align:left;}
.el-select-dropdown__item{max-width: 300px;min-width:150px;}
.el-message{top:70px;}
.el-form--inline .el-form-item__content{min-width:100px;}
</style>

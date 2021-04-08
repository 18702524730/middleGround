<template>
	<div class="order_basic_dateil clearfix" v-loading="loading">
		<div v-if="detailData.cxbStatus == 5" class="than_info fr" @click="thanInfo">{{thanData ? '对比客户下单资料' : '取消对比'}}</div>
		<div v-if="!loading">
			<div class="basic_lists mt10" v-if="detailData.basicInfo">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">工单号</p>
							<p class="txt">{{detailData.basicInfo.workOrderSn}}</p>
						</li>
						<li>
							<p class="tit">服务号</p>
							<p class="txt">{{detailData.basicInfo.serviceId}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.basicInfo.bsName}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.basicInfo.createTime | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.basicInfo.payTime | dateFormat}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">任务号</p>
							<p class="txt">{{detailData.basicInfo.taskId}}</p>
						</li>
						<li>
							<p class="tit">服务分类</p>
							<p class="txt">{{detailData.basicInfo.bsClassName}}</p>
						</li>
						<li>
							<p class="tit">金额</p>
							<p class="txt">{{detailData.basicInfo.orderAmount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt" :class="{'topay':detailData.basicInfo.payState == 1,'nopay':!detailData.basicInfo.payState}">{{detailData.basicInfo.payState | payStatusformat}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 客户信息 -->
			<div class="basic_lists" v-if="detailData.custInfo">
				<p>客户信息</p>
				<div v-if="detailData.custInfo.isBind==1" class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">绑定拾贝网</p>
							<p class="txt">已绑定</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.custInfo.industry || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.custInfo.qq || '--'}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.custInfo.weixin || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.custInfo.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.custInfo.name || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.custInfo.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.custInfo.phone || '--'}}</p>
						</li>
					</ul>
				</div>
				<div v-if="detailData.custInfo.isBind==0" class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">未绑定拾贝网账号</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 申请主体 -->
			<div class="basic_lists" v-if="detailData.applySubject">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<!-- 待diff的为差异化 -->
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.applySubject.applyType | formatApplySbj}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyType_diff ||　detailData.applySubject.applyType_diff === null">
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.applySubject.applyType_diff | formatApplySbj}}</p>
						</li>

						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.applySubject.applyName || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyName_diff ||　detailData.applySubject.applyName_diff === null">
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.applySubject.applyName_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.applySubject.applyPhone || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyPhone_diff ||　detailData.applySubject.applyPhone_diff === null">
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.applySubject.applyPhone_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}邮箱</p>
							<p class="txt">{{detailData.applySubject.applyEmail || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyEmail_diff ||　detailData.applySubject.applyEmail_diff === null">
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}邮箱</p>
							<p class="txt">{{detailData.applySubject.applyEmail_diff || '--'}}</p>
						</li>

						<li v-if="detailData.applySubject.applyType!=4">
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.applySubject.applyFax || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyFax_diff ||　detailData.applySubject.applyFax_diff === null">
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.applySubject.applyFax_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}地址</p>
							<p class="txt">{{detailData.applySubject.applyAddress || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyAddress_diff ||　detailData.applySubject.applyAddress_diff === null">
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}地址</p>
							<p class="txt">{{detailData.applySubject.applyAddress_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}邮编</p>
							<p class="txt">{{detailData.applySubject.applyZipCode || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.applySubject.applyZipCode_diff ||　detailData.applySubject.applyZipCode_diff === null">
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}邮编</p>
							<p class="txt">{{detailData.applySubject.applyZipCode_diff || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix"><!--  -->
						<div class="fl mb20 mr20" v-if="usinessLicense&&usinessLicense.length" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p :title="detailData.applySubject.applyType | licenseName">{{detailData.applySubject.applyType | licenseName}}</p>
						</div>
						<!-- 差异化 -->
		        <div v-if="usinessLicense_diff && usinessLicense_diff.length" class="customer fl mr20 mb20" @click="certificatePreview(usinessLicense_diff)">
							<img :src="usinessLicense_diff[0]" alt="">
            	<p :title="detailData.applySubject.applyType | licenseName">{{detailData.applySubject.applyType | licenseName}}</p>
		          <span>客户下单信息</span>
						</div>
		        <div v-if="cardImg&&cardImg.length" class="fl mb20 mr20" @click="certificatePreview(cardImg)">
		          <img :src="cardImg[0]" alt="">
		          <p :title="detailData.applySubject.applyType | fileName">{{detailData.applySubject.applyType | fileName}}</p>
		        </div>
						<!-- 差异化 -->
		        <div v-if="cardImg_diff && cardImg_diff.length" class="customer fl mb20" @click="certificatePreview(cardImg_diff)">
		          <img :src="cardImg_diff[0]" alt="">
		          <p :title="detailData.applySubject.applyType | fileName">{{detailData.applySubject.applyType | fileName}}</p>
		          <span>客户下单信息</span>
		        </div>
					</div>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData.contactInfo">
				<p>联系人信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">联系人电话</p>
							<p class="txt">{{detailData.contactInfo.contactPhone || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.contactInfo.contactPhone_diff || detailData.contactInfo.contactPhone_diff === null">
							<p class="tit">联系人电话</p>
							<p class="txt">{{detailData.contactInfo.contactPhone_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">联系人邮箱</p>
							<p class="txt">{{detailData.contactInfo.contactEmail || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.contactInfo.contactEmail_diff || detailData.contactInfo.contactEmail_diff === null">
							<p class="tit">联系人邮箱</p>
							<p class="txt">{{detailData.contactInfo.contactEmail_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">联系人地址</p>
							<p class="txt">{{detailData.contactInfo.contactAddress || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.contactInfo.contactAddress_diff || detailData.contactInfo.contactAddress_diff === null">
							<p class="tit">联系人地址</p>
							<p class="txt">{{detailData.contactInfo.contactAddress_diff || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">联系人姓名</p>
							<p class="txt">{{detailData.contactInfo.contactName || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.contactInfo.contactName_diff || detailData.contactInfo.contactName_diff === null">
							<p class="tit">联系人姓名</p>
							<p class="txt">{{detailData.contactInfo.contactName_diff || '--'}}</p>
						</li>

						<li>
							<p class="tit">联系人邮编</p>
							<p class="txt">{{detailData.contactInfo.contactZipCode || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.contactInfo.contactZipCode_diff || detailData.contactInfo.contactZipCode_diff === null">
							<p class="tit">联系人邮编</p>
							<p class="txt">{{detailData.contactInfo.contactZipCode_diff || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 开票信息 -->
			<div class="basic_lists" v-if="detailData.invoiceInfo !== undefined && detailData.operState > 1">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="detailData.invoiceInfo === null || (detailData.invoiceInfo && !detailData.invoiceInfo.invoiceType)">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<ul class="fl" v-if="detailData.invoiceInfo && detailData.invoiceInfo.invoiceType">
						<li>
							<p class="tit">发票类型</p>
							<p class="txt">{{detailData.invoiceInfo.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">发票抬头</p>
							<p class="txt">{{detailData.invoiceInfo.invoiceTitle || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}地址</p>
							<p class="txt">{{detailData.invoiceInfo.address || '--'}}</p>
						</li>
						<li>
							<p class="tit">开户银行</p>
							<p class="txt">{{detailData.invoiceInfo.accountBank || '--'}}</p>
						</li>
						<li>
							<p class="tit">寄送地址</p>
							<p class="txt">{{detailData.invoiceInfo.sendAddress || '--'}}</p>
						</li>
					</ul>
					<ul class="fl" v-if="detailData.invoiceInfo && detailData.invoiceInfo.invoiceType">
						<li>
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoiceInfo.invoiceCode || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.applySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.invoiceInfo.registPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">银行账号</p>
							<p class="txt">{{detailData.invoiceInfo.accountNumber || '--'}}</p>
						</li>
						<li>
							<p class="tit">是否寄送</p>
							<p class="txt">{{detailData.invoiceInfo.sendState == 1 ? '寄送' : detailData.invoiceInfo.sendState == 2 ? '不寄送' : '--'}}</p>
						</li>
					</ul>
				</div>
			</div>

			<!-- 代理顾问分配记录 -->
			<div class="service_list servicerInfo">
				<p>代理顾问分配记录</p>
				<div class="service_table">
					<ul class="table_tit clearfix">
	          <li class="fl tb05" style="padding-left:20px;">代理顾问</li>
	          <li class="fl tb05" style="padding-left:60px;">分配时间</li>
	        </ul>
	        <template v-if="detailData.agentDistributeRecords">
		        <ul class="table_list clearfix" v-for="item in detailData.agentDistributeRecords" :key="item.num" :label="item.num">
		          <li class="fl tb05" style="padding-left:20px;"><p class="txt_info">{{item.operatorName}}</p></li>
		          <li class="fl tb05" style="padding-left:60px;"><p class="txt_info">{{item.agentDistributeTime|dateFormat}}</p></li>
		        </ul>
	        </template>
	        <ul class="table_list clearfix" v-else>
	          <li class="fl tb05" style="padding-left:20px;"><p class="txt_info">暂无记录</p></li>
	          <li class="fl tb05" style="padding-left:60px;"><p class="txt_info"></p></li>
	        </ul>
        </div>
			</div>

			<!-- 服务商信息 -->
			<div class="service_list servicerInfo" v-if="detailData.serviceProvider">
				<p>服务商信息</p>
				<div class="detail_list">
					<ul class="mt5 clearfix">
						<li class="clearfix mb10">
							<p class="state_name fl">服务商名称</p>
							<p class="state_txt fl setServicer">
								{{detailData.serviceProvider.sp_name}}
								<a v-if="localStore.get('permission').indexOf('iprp_cxb_set_servicer') !== -1" href="#" @click.prevent="setServicer">设置服务商</a>
							</p>
							<div class="idcode">
								<p class="state_name fl">服务商识别码</p>
								<p class="state_txt fl setServicer">{{detailData.serviceProvider.idCode}}</p>
							</div>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl">服务商账号</p>
							<p class="state_txt fl">{{detailData.serviceProvider.sp_account}}</p>
							<div class="idcode" style="width: 500px;">
								<p class="state_name fl">绑定创新保账号</p>
								<p class="state_txt fl" style="width: 300px;">{{detailData.serviceProvider.thirdAccount}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="service_table operateR" v-if="detailData.spFeedbacks">
					<ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;width: 20%">操作时间</li>
	          <li class="fl tb02" style="width: 20%">操作前服务商</li>
	          <li class="fl tb03" style="width: 20%">操作后服务商</li>
	          <li class="fl tb04" style="width: 10%">操作人</li>
	          <li class="fl tb05" style="width: 30%">备注</li>
	        </ul>
	        <ul class="table_list clearfix" v-if="!detailData.spFeedbacks.length">
	          <li class="fl tb01" style="padding-left:20px;width: 20%"><p>暂无记录</p></li>
	          <li class="fl tb02" style="width: 20%"><p></p></li>
	          <li class="fl tb03" style="width: 20%"><p></p></li>
	          <li class="fl tb04" style="width: 10%"><p></p></li>
	          <li class="fl tb05" style="width: 30%"><p></p></li>
	        </ul>
	        <template v-else>
		        <ul class="table_list clearfix" v-for="data in detailData.spFeedbacks">
		          <li class="fl tb01" style="padding-left:20px;width: 20%"><p>{{data.operating_time | dateFormat}}</p></li>
		          <li class="fl tb02" style="width: 20%"><p>{{data.operating_start_sp}}</p></li>
		          <li class="fl tb03" style="width: 20%"><p>{{data.operating_end_sp}}</p></li>
		          <li class="fl tb04" style="width: 10%"><p>{{data.operator}}</p></li>
		          <li class="fl tb05" style="width: 30%"><p>{{data.memo}}</p></li>
		        </ul>
	        </template>
        </div>
			</div>

			<!-- 注册商标信息 -->
			<div class="basic_lists" v-if="detailData">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">0
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.trademarkInfo.trademarkName || '--'}}</p>
						</li>
						<li>
							<p class="tit">商标类别</p>
							<p class="txt">{{detailData.trademarkInfo.trademarkClass}}</p>
						</li>
						<li>
							<p class="tit">商标描述</p>
							<p class="txt">{{detailData.trademarkInfo.trademarkDesc || '--'}}</p>
						</li>
						<li class="customer_txt" v-if="detailData.trademarkInfo.trademarkDesc_diff || detailData.trademarkInfo.trademarkDesc_diff === null">
							<p class="tit">商标描述</p>
							<p class="txt">{{detailData.trademarkInfo.trademarkDesc_diff || '--'}}</p>
						</li>
						<li>
							<p class="tit">合同书</p>
							<p v-if="!detailData.trademarkInfo.contract" class="txt">未上传</p>
							<a v-else :href="detailData.trademarkInfo.contract">下载</a>
							<a v-if="detailData.trademarkInfo.contract_diff" class="red" :href="detailData.trademarkInfo.contract_diff">下载</a>
						</li>
						<li>
							<p class="tit">委托书</p>
							<p v-if="!detailData.trademarkInfo.proxy" class="txt">未上传</p>
							<a v-else :href="detailData.trademarkInfo.proxy">下载</a>
							<a v-if="detailData.trademarkInfo.proxy_diff" class="red" :href="detailData.trademarkInfo.proxy_diff">下载</a>
						</li>
						<li>
							<p class="tit">确认书</p>
							<p v-if="!detailData.trademarkInfo.confirm" class="txt">未上传</p>
							<a v-else :href="detailData.trademarkInfo.confirm">下载</a>
							<a v-if="detailData.trademarkInfo.confirm_diff" class="red" :href="detailData.trademarkInfo.confirm_diff">下载</a>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30 mb20" v-if="proxyPic[0]" @click="certificatePreview(proxyPic)">
	            <img :src="proxyPic[0]" alt="">
	            <p title="委托书">委托书</p>
						</div>
						<div class="customer fl mr30 mb20" v-if="blackWhitePic_diff[0]" @click="certificatePreview(proxyPic_diff)">
	            <img :src="proxyPic_diff[0]" alt="">
	            <p title="委托书">委托书</p>
	            <span>客户下单信息</span>
						</div>

						<div class="fl mr30 mb20" v-if="blackWhitePic[0]" @click="certificatePreview(blackWhitePic)">
	            <img :src="blackWhitePic[0]" alt="">
	            <p title="黑白色">黑白色</p>
						</div>
						<div class="customer fl mr30 mb20" v-if="blackWhitePic_diff[0]" @click="certificatePreview(blackWhitePic_diff)">
	            <img :src="blackWhitePic_diff[0]" alt="">
	            <p title="黑白色">黑白色</p>
	            <span>客户下单信息</span>
						</div>

						<div class="fl mr30 mb20" v-if="specifyAttorney[0]" @click="certificatePreview(specifyAttorney)">
	            <img :src="specifyAttorney[0]" alt="">
	            <p title="指定色">指定色</p>
						</div>
						<!-- 差异化 -->
						<div class="customer fl mr30 mb20" v-if="specifyAttorney_diff[0]" @click="certificatePreview(specifyAttorney_diff)">
	            <img :src="specifyAttorney_diff[0]" alt="">
	            <p title="指定色">指定色</p>
	            <span>客户下单信息</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 商标类别 -->
			<div class="service_list servicerInfo" v-if="detailData.trademarkInfo && detailData.operState > 1">
				<p>商标类别</p>
				<div class="service_table">
					<ul class="table_tit clearfix">
	          <li class="fl tb01" style="padding-left:20px;">序号</li>
	          <li class="fl tb02" style="padding-left:20px;">服务单号</li>
	          <li class="fl tb03" style="padding-left:20px;">商标类别</li>
	          <li class="fl tb04" style="padding-left:20px;">办理状态</li>
	          <li class="fl tb05" style="padding-left:20px;">小项信息</li>
	          <li class="fl tb06" style="padding-left:20px;">操作</li>
	        </ul>
	        <template v-if="detailData.trademarkInfo && detailData.trademarkInfo.trademarkCategories && detailData.trademarkInfo.trademarkCategories.length">
		        <ul class="table_list clearfix" v-for="item in detailData.trademarkInfo.trademarkCategories" :key="item.num" :label="item.num">
		          <li class="fl tb01" style="padding-left:20px;"><p class="txt_info">{{item.seq > 9 ? item.seq : '0' + item.seq}}</p></li>
		          <li class="fl tb02" style="padding-left:20px;"><p class="txt_info">{{item.orderSn}}</p></li>
		          <li class="fl tb03" style="padding-left:20px;"><p class="txt_info">{{item.niceClassInfo}}</p></li>
		          <li class="fl tb04" style="padding-left:20px;"><p class="txt_info">{{item.bsFeedbackCodeName || '--'}}</p></li>
		          <li class="fl tb05" style="padding-left:20px;"><p class="mt10">{{item.niceMinInfo || '--'}}<br/><span class="red">{{item.niceMinInfo_diff}}</span></p></li>
		          <li class="fl tb06" style="padding-left:20px;">
		          	<a v-if="detailData.operState >= 3" @click.prevent="view(item)">详情</a>
		          	<p class="mt10" v-else>--</p>
		          </li>
		        </ul>
	        </template>
	        <ul class="table_list clearfix" v-else>
	          <li class="fl tb01" style="padding-left:20px;"><p class="txt_info">空</p></li>
	          <li class="fl tb02" style="padding-left:20px;"><p class="txt_info"></p></li>
	          <li class="fl tb03" style="padding-left:20px;"><p class="txt_info"></p></li>
	          <li class="fl tb04" style="padding-left:20px;"><p class="txt_info"></p></li>
	          <li class="fl tb05" style="padding-left:20px;"><p></p></li>
	          <li class="fl tb06" style="padding-left:20px;"><a></a></li>
	        </ul>
        </div>
			</div>
			<!-- 操作记录 -->
			<div class="note_table mt20" v-if="detailData.operateRecord && detailData.operState > 1">
				<div class="note_list clearfix">
					<p class="td_1 fl">操作记录</p>
				</div>
				<div class="audit clearfix" v-if="detailData.operateRecord">
					<div>
						<p class="fl">申请人：</p>
						<p class="ml20 fl">{{detailData.operateRecord.applyName || '--'}}</p>
						<button v-if="detailData.cxbStatus == 5 && localStore.get('permission').indexOf('iprp_cxb_work_order_audit') !== -1" class="ml20" @click="dialogTab = true">审核</button>
					</div>
					<div v-if="detailData.operState == 3">
						<p class="fl">接收申报时间：</p>
						<p class="ml20 fl">{{detailData.operateRecord.declareTime | dateFormat}}</p>
					</div>
				</div>
				<template v-if="detailData.operateRecord.operateItems && detailData.operateRecord.operateItems.length">
					<div class="note_tab clearfix">
						<p class="td_1 fl">时间</p>
						<p class="td_2 fl">操作人</p>
						<p class="td_3 fl">操作动作</p>
					</div>
					<div style="border-top:0;" v-for="item in detailData.operateRecord.operateItems" :key="item.operatorName" :label="item.operatorName" class="note_tab clearfix">
						<p class="td_1 fl">{{item.operatorTime | dateFormat}}</p>
						<p class="td_2 fl">{{item.operatorName || '--'}}</p>
						<p class="td_3 fl">{{item.recordContentService || '--'}}</p>
					</div>
				</template>
				<div class="note_null" v-if="!detailData.operateRecord.operateItems">
					<img src="~assets/img/nulldata.png" alt="">
					<span>暂无信息</span>
				</div>
			</div>
			<div class="detail_null" v-if="!detailData">
				<div>
					<img src="~assets/img/nulldata.png" alt="">
					<span class="ml5">系统繁忙，请稍后再试</span>
				</div>
			</div>
		</div>

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

		<!-- 分配服务商 -->
    <el-dialog title="分配服务商" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog" :close-on-click-modal="false">
			<div class="title_in distribute_in">
				<h5>请选择创新保服务商：</h5>
				<div class="dialog_con_box">
					<el-select v-model="sp_id" placeholder="请选择创新保服务商" clearable>
	          <el-option
	            v-for="item in cxbServicerData"
	            :key="item.sp_id"
				      :label="item.name"
				      :value="item.sp_id">
	          </el-option>
	        </el-select>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible = false">取消</a><a href="" class="button yes" @click.prevent="confirm">确定</a></p>
			</div>
		</el-dialog>

		<!-- 申报资料审核 -->
		<el-dialog title="申报资料审核"
		  :visible.sync="dialogTab" class="state_preview" :modal-append-to-body="true">
	  	<el-form ref="audit" label-width="125px">
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
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const detailUrl = './api/findCxbWorkOrderDetail';
  const stateUrl = './api/setOrderFeedback';
  const pdfUrl = './api/preview';
  const allSpUrl = './api/findAllCxbServiceProvider';
  const distributeUrl = './api/rebuildCxbServiceProvider';

	const allotSpUrl = CONFIG.adminUrl + '/api/orders/'
	const auditUrl = './api/auditing';
	export default {
		//props:['detailData'],
  	components: {
    },
    data() {
      return {
      	sp_id:'',
      	isClicked: false,
      	distributeVisible: false,
      	cxbServicer:'', //选择的创新保服务商
      	cxbServicerData: [], //创新保服务商数据
      	state:'',
      	dialogTab:false,
      	noRepeat:true,//防止重复提交

      	thanData:true,
      	order_id:'',
      	localStore: store,
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
      	dialogVisible:false,
      	dialogImg:false,
      	imgsrc:'',
      	detailData:'',
      	// 营业执照
		    usinessLicense:[],
		    // 委托书
		    specifyAttorney:[],
		    //身份证
        cardImg:[],
        cardImg_diff:[],
        usinessLicense_diff:[],
        loading:false,
        // 证书图片地址集合
        proxyImg:{},
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
        radio:1,
        // 老旧数据判定
        order:'',
        blackWhitePic:[],//黑白色
        blackWhitePic_diff:[],//黑白色差异
        specifyAttorney_diff:[],//商标图样，差异
        usinessLicense_diff:[],//营业执照--差异
        proxyPic:[],//委托书
        proxyPic_diff:[]//委托书--差异
      }
    },
    methods: {
    	confirm(){
				if (!this.sp_id) {
					this.$message.error('请选择服务商');
					return;
				}
				if (this.isClicked) {
					return;
				}
				this.isClicked = true;
				this.$http.get(distributeUrl, {
					params: {
						spId: this.sp_id,
						workOrderSn: this.order_id
					}
				})
				.then((resp) => {
					this.isClicked = false;
					this.sp_id = '';
					this.$message({
            type: 'success',
            message: '设置成功!'
          });
          this.distributeVisible = false;
          this.infoDetail(0);
				})
				.catch((err) => {
					this.isClicked = false;
					var data = err.response.data;
					this.$message.error(data.msg);
					console.log(err);
				});
			},
    	//设置服务商
    	setServicer(){
    		this.distributeVisible = true;
    		this.sp_id = '';
    		this.getSpList();
    	},
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
	    			workOrderSn:self.detailData.basicInfo.workOrderSn
	    		}
	    		if (self.radio == 2 && !data.memo) {
						self.$message({
							message: '请填写备注',
							type: 'warning'
						});
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
			      self.infoDetail(0);
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
    	view(item) {
    		this.$router.push({name: 'bsOrderDetail', params: {id: item.orderId,type:1}})
    	},
    	thanInfo(){
        let self = this;
        if(this.thanData){
        	self.infoDetail(1);
        }else{
        	self.infoDetail(0,1);
        }
        console.log(self.thanData)
    	},
    	getSpList(){
				this.$http.get(allSpUrl)
				.then((resp) => {
					var data = resp.data;
					this.cxbServicerData = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},

      // 初始化
    	infoDetail(index,type){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?workOrderSn=' + this.order_id + '&isContrast=' + index)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		self.order = resp.data.order_is_history;
	    		if(self.detailData.applySubject.standby1){
	    		 	self.$http.get('./api/preview?pdf_url='+self.detailData.applySubject.standby1)
		        .then((response) => {
		          self.cardImg = response.data.urls;
		          if(index == 1){
	        			self.thanData = false;
        				self.$message('已对比客户的下单信息，差异内容将以红色字体标出。');
		          }else if(type == 1){
			        	self.$message('已取消对比客户的下单信息。');
				        self.thanData = true;
		          }
		        })
		        .catch((error) => {
		          console.log(error)
		        });
	    		}
	    		if(self.detailData.applySubject.standby1_diff){
	    		 	self.$http.get('./api/preview?pdf_url='+self.detailData.applySubject.standby1_diff)
		        .then((response) => {
		          self.cardImg_diff = response.data.urls;
		        })
		        .catch((error) => {
		          console.log(error)
		        });
	    		}else{
	    			self.cardImg_diff = '';
	    		}
	    		// 营业执照
		      if(self.detailData.applySubject.standby2){
		  			self.$http.get('./api/preview?pdf_url='+self.detailData.applySubject.standby2)
				    .then((response) => {
				      self.usinessLicense = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      };
		      // 营业执照——差异
		      if(self.detailData.applySubject.standby2_diff){
		  			self.$http.get('./api/preview?pdf_url='+self.detailData.applySubject.standby2_diff)
				    .then((response) => {
				      self.usinessLicense_diff = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }else{
	    			self.usinessLicense_diff = '';
	    		};
		      // 商标图样
		      if(self.detailData.trademarkInfo.specifyPicUrl){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.specifyPicUrl)
				    .then((response) => {
				      self.specifyAttorney = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }
		      // 商标图样--差异
		      if(self.detailData.trademarkInfo.specifyPicUrl_diff){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.specifyPicUrl_diff)
				    .then((response) => {
				      self.specifyAttorney_diff = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }else{
	    			self.specifyAttorney_diff = '';
	    		}
	    		// 委托书
		      if(self.detailData.trademarkInfo.proxy){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.proxy)
				    .then((response) => {
				      self.proxyPic = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }
		      // 委托书--差异
		      if(self.detailData.trademarkInfo.proxy_diff){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.proxy_diff)
				    .then((response) => {
				      self.proxyPic_diff = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }else{
	    			self.specifyAttorney_diff = '';
	    		}
	    		// 黑白色
	    		if(self.detailData.trademarkInfo.blackWhitePicUrl){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.blackWhitePicUrl)
				    .then((response) => {
				      self.blackWhitePic = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }
		      // 黑白色--差异
		      if(self.detailData.trademarkInfo.blackWhitePicUrl_diff){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.trademarkInfo.blackWhitePicUrl_diff)
				    .then((response) => {
				      self.blackWhitePic_diff = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }else{
	    			self.blackWhitePic_diff = '';
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
      }
    },
    mounted() {
    	this.order_id = this.$route.params.id;
    	this.state = this.$route.params.state;
    	this.infoDetail(0);
    	// this.status = this.$router.query.status;
    },
    filters: {
      sex: Filters.sex,
      priceformat: Filters.priceformat,
      formatApplySbj: Filters.subjectTypeFormat,
      payStatusformat:Filters.payStatusformat,
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
	.order_basic_dateil{background-color:#fff;padding:0px 20px 20px;min-height: 500px;position: relative;overflow: hidden;font-size:0;
		.red{color:red!important;}
		.than_info{box-sizing:border-box;background-color:#fff;border-bottom: 1px solid #fff;width:124px;border-radius:3px;line-height:30px;height:30px;background-color:#3db1fa;color:#fff;text-align: center;font-size:14px;cursor:pointer}
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:60%;}
				ul{width:50%;
					li.customer_txt{
						p{color:red;}
					}
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						p.nopay{color:#F64744}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;word-break:break-all;}
						a{color:#3db1fa;margin-left: 10px;cursor:pointer;text-decoration:none;font-size:13px;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:40%;text-align:left;
					>div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;border-radius:2px;cursor:pointer;
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;left:-1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
						span{display:block;position: absolute;bottom:-20px;width:100px;text-align: center;color:red;font-size:13px;}
					}
					.customer{border:1px solid red;}
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
				ul{
					li{text-align:left;line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;
					li{border-bottom:1px solid #DFE2E5;
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;
							span{color:red;}
						}
					}
				}
			}
		}
		//服务商信息
		.servicerInfo{
			padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.patch{height: 24px;width: 100px;}
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
	      .tb01{width:7%;}
	      .tb02{width:15%;}
	      .tb03{width:15%;}
	      .tb04{width:15%;}
	      .tb05{width:40%;}
	      .tb06{width:8%;}
	      ul{
	        li{text-align:left;line-height: 40px;min-height: 40px;}
	      }
	      .table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
	        li{font-size: 13px;color: #223344;}
	      }
	      .table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
	        li{
	        	.txt_info{line-height:18px;line-height: 40px;font-size: 13px;color: #556677;}
	          p{line-height:18px;line-height: 20px;font-size: 13px;color: #556677;}
	          a{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #3db1fa;text-decoration:none;cursor: pointer;}
	        }
	      }
	    }
	    .operateR{
	    	ul{
	        li{
			    	p{line-height: 40px!important;}
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
			.audit{padding-left:20px;
				div{line-height:40px;height:40px;
					p{font-size:13px;}
					button{font-size:13px;background-color:#3db1fa;color:#fff;text-align:center;padding:0 15px;height:25px;line-height:25px;border-radius:3px;}
				}
			}
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.td_1{width:30%;}
			.td_2{width:30%;}
			.td_3{width:40%;}
			.note_list{border-box:box-sizing;border: 1px solid #dfe2e5;background-color:#f5f5f5;
				p{padding-left:20px;font-size:13px;color:#223344;line-height:40px;height:40px;}
			}
			.note_tab{border-box:box-sizing;border: 1px solid #dfe2e5;background-color:#fff;
				p{padding-left:20px;font-size:13px;color:#556677;line-height:40px;height:40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
			}
			.note_null{height:60px;text-align:center;padding:10px 0;line-height:35px;border: 1px solid #dfe2e5;
				img{width:35px;}
				span{font-size: 13px;color: #A8AFB5;margin-left: 5px;vertical-align: middle;display: inline-block;vertical-align: top;}
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

	  .distributeDialog{
			// 弹框公用样式继承自common.css
			.el-dialog{
				width: 420px;height: 174px;transform:translate(-50%,-50%);
				.distribute_in{
					h5{font-size: 14px;color: #556677;font-weight: normal;}
					.dialog_con_box{
						padding-top: 10px;
						.el-input{width: 302px;}
					}
					.el-textarea{margin-top: 10px;}
					>p{text-align: right;padding-top: 12px;}
				}
			}
		}
	}
</style>

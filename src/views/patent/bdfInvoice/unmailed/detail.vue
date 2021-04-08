<template>
  <div class="patentdetail">
    <div class="service_detail_tab">
      <ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">案件信息</li>
      </ul>
      <span class="tobackbtn" @click="pageback">返回</span>
    </div>
    <div class="form">
      <template v-if="status == 1">
        <!-- 基本信息 -->
        <div class="basic_lists">
          <div class="basictitle">
            <h3>基本信息</h3>
          </div>
          <div class="basic_category clearfix">
            <ul class="fl">
              <li>
                <p class="tit">订单号（案号）：</p>
                <p class="txt">{{detailInfo.baseInfo.caseNo}}</p>
              </li>
              <li>
                <p class="tit">业务来源：</p>
                <p class="txt">{{detailInfo.baseInfo.businessSrc}}</p>
              </li>
              <li>
                <p class="tit">手机号：</p>
                <p class="txt">{{detailInfo.baseInfo.phone}}</p>
              </li>
              <li>
                <p class="tit">专利名称：</p>
                <p class="txt">{{detailInfo.baseInfo.patentName}}</p>
              </li>
              <li>
                <p class="tit">是否费减：</p>
                <p class="txt">{{detailInfo.baseInfo.feeDeduct | feeDeductFormat}}</p>
              </li>
              <li>
                <p class="tit">主体资格编号：</p>
                <p class="txt">{{detailInfo.baseInfo.subjectQualifyNo}}</p>
              </li>
              <li>
                <p class="tit">第一发明人身份证号：</p>
                <p class="txt">{{detailInfo.baseInfo.firstInventorIdcard}}</p>
              </li>
              <li>
                <p class="tit">服务费（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.serviceFee|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">合同金额（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.contractAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">发票抬头：</p>
                <p class="txt">{{detailInfo.baseInfo.invoiceTitle}}</p>
              </li>
              <li>
                <p class="tit">公司税号：</p>
                <p class="txt">{{detailInfo.baseInfo.invoiceCode}}</p>
              </li>
              <li>
                <p class="tit">开户银行：</p>
                <p class="txt">{{detailInfo.baseInfo.bank}}</p>
              </li>
              <li>
                <p class="tit">首次收款日期：</p>
                <p class="txt">{{detailInfo.baseInfo.firstCollectMoneyTime | dateFormat}}</p>
              </li>
              <li>
                <p class="tit">二次收款日期：</p>
                <p class="txt">{{detailInfo.baseInfo.secondCollectMoneyTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">订单编号：</p>
                <p class="txt">{{detailInfo.baseInfo.orderSn}}</p>
              </li>
              <li>
                <p class="tit">买家旺旺：</p>
                <p class="txt">{{detailInfo.baseInfo.buyerWw}}</p>
              </li>
              <li>
                <p class="tit">渠道分案时间：</p>
                <p class="txt">{{detailInfo.baseInfo.channelDivisionTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">拾贝结算渠道金额（渠道填写）：</p>
                <p class="txt">{{detailInfo.baseInfo.sebeSettleChannelAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">服务商：</p>
                <p class="txt">{{detailInfo.baseInfo.serviceProvider}}</p>
              </li>
              <li>
                <p class="tit">平台收案时间：</p>
                <p class="txt">{{detailInfo.baseInfo.platformReceiveCaseTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">代理人：</p>
                <p class="txt">{{detailInfo.baseInfo.agent}}</p>
              </li>
              <li>
                <p class="tit">时间绝限时间：</p>
                <p class="txt">{{detailInfo.baseInfo.eventDeadline|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">对应金额（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.correspondAmount | priceFormat}}</p>
              </li>
              <li>
                <p class="tit">收件人：</p>
                <p class="txt">{{detailInfo.baseInfo.receiver}}</p>
              </li>
              <li>
                <p class="tit">收件地址：</p>
                <p class="txt">{{detailInfo.baseInfo.receiveAddress}}</p>
              </li>
              <li>
                <p class="tit">备注：</p>
                <p class="txt">{{detailInfo.baseInfo.remark}}</p>
              </li>
            </ul>
            <ul class="fl">
              <li>
                <p class="tit">业务员：</p>
                <p class="txt">{{detailInfo.baseInfo.businessManager}}</p>
              </li>
              <li>
                <p class="tit">联系人：</p>
                <p class="txt">{{detailInfo.baseInfo.contacter}}</p>
              </li>
              <li>
                <p class="tit">联系邮箱：</p>
                <p class="txt">{{detailInfo.baseInfo.contactMail}}</p>
              </li>
              <li>
                <p class="tit">合同号：</p>
                <p class="txt">{{detailInfo.baseInfo.contractNo}}</p>
              </li>
              <li>
                <p class="tit">申请人：</p>
                <p class="txt">{{detailInfo.baseInfo.applicant}}</p>
              </li>
              <li>
                <p class="tit">发明人（按申请书顺序）：</p>
                <p class="txt">{{detailInfo.baseInfo.inventor}}</p>
              </li>
              <li>
                <p class="tit">官费（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.officialFee |priceFormat}}</p>
              </li>
              <li>
                <p class="tit">此单金额（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.amount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">发票类型：</p>
                <p class="txt">{{detailInfo.baseInfo.invoiceType | patentInvoiceTypeFormat}}</p>
              </li>
              <li>
                <p class="tit">公司注册地址：</p>
                <p class="txt">{{detailInfo.baseInfo.registAddress}}</p>
              </li>
              <li>
                <p class="tit">财务电话：</p>
                <p class="txt">{{detailInfo.baseInfo.financePhone}}</p>
              </li>
              <li>
                <p class="tit">开户银行账号：</p>
                <p class="txt">{{detailInfo.baseInfo.bankAccount}}</p>
              </li>
              <li>
                <p class="tit">首次收款金额（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.firstCollectMoneyAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">二次收款金额（元）：</p>
                <p class="txt">{{detailInfo.baseInfo.secondCollectMoneyAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">销售易流水号：</p>
                <p class="txt">{{detailInfo.baseInfo.xsySn}}</p>
              </li>
              <li>
                <p class="tit">需求编号：</p>
                <p class="txt">{{detailInfo.baseInfo.requirementSn}}</p>
              </li>
              <li>
                <p class="tit">渠道分案员：</p>
                <p class="txt">{{detailInfo.baseInfo.channelDivisonPerson}}</p>
              </li>
              <li>
                <p class="tit">渠道结算拾贝金额（渠道填写）：</p>
                <p class="txt">{{detailInfo.baseInfo.channelSettleSebeAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">汇款人（渠道填写）：</p>
                <p class="txt">{{detailInfo.baseInfo.remitter}}</p>
              </li>
              <li>
                <p class="tit">渠道回案时间：</p>
                <p class="txt">{{detailInfo.baseInfo.channelReturnCaseTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">案件当前状态：</p>
                <p class="txt">{{detailInfo.baseInfo.caseCurrentState}}</p>
              </li>
              <li>
                <p class="tit">对应事件：</p>
                <p class="txt">{{detailInfo.baseInfo.correspondEvent}}</p>
              </li>
              <li>
                <p class="tit">处理方式：</p>
                <p class="txt">{{detailInfo.baseInfo.processMethod}}</p>
              </li>
              <li>
                <p class="tit">收件电话：</p>
                <p class="txt">{{detailInfo.baseInfo.receivePhone}}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="basic_lists" v-if="detailInfo.baseInfo.applicatFeeInvoice==0">
            <div class="basictitle">
              <h3>申请费发票信息</h3>
              <el-button type="primary" @click="addInvoice('sqf')">录入发票信息</el-button>
            </div>
        </div> -->
        <div class="basic_lists" v-if="detailInfo.baseInfo.boardFeeInvoice==0">
            <div class="basictitle">
              <h3 class = 'fl'>办登费发票信息</h3>
              <el-button type="primary" @click="addInvoice('bdf')" class = 'fr'>录入发票信息</el-button>
            </div>
        </div>
        <div v-if="detailInfo.pasInvoiceInfoFormList">
          <div class="basic_lists" v-for="(item,key) in detailInfo.pasInvoiceInfoFormList" :key="key">
            <div class="basictitle">
              <h3 v-if="item.invoiceType==1">申请费发票信息</h3>
              <h3 v-if="item.invoiceType==2">办登费发票信息</h3>
            </div>
            <div class="basic_category clearfix">
              <ul class="fl">
                <li>
                  <p class="tit">电子/纸质发票：</p>
                  <p class="txt">{{item.invoiceForm|paperFormat}}</p>
                </li>
                <li v-if="item.invoiceForm==2">
                  <p class="tit">寄送方式：</p>
                  <p class="txt">{{item.sendType|sendTypeFormat}}</p>
                </li>
                <li v-if="item.invoiceForm==2&&item.sendType==2">
                  <p class="tit">代领人：</p>
                  <p class="txt">{{item.fetcher}}</p>
                </li>
                <li>
                  <p class="tit" v-if="item.invoiceType==1">申请费官费号：</p>
                  <p class="tit" v-if="item.invoiceType==2">办登费官费号：</p>
                  <p class="txt">{{item.officialTicketNumber }}</p>
                </li>
                <li>
                  <p class="tit" v-if="item.invoiceType==1">申请费服务费票号：</p>
                  <p class="tit" v-if="item.invoiceType==2">办登费服务费票号：</p>
                  <p class="txt">{{item.serviceTicketNumber }}</p>
                </li>
                <li>
                  <p class="tit">开票时间：</p>
                  <p class="txt">{{item.invoiceTime|dateFormat}}</p>
                </li>
                <li>
                  <p class="tit">备注：</p>
                  <p class="txt">{{item.remarks }}</p>
                </li>
                <li v-if="item.addressee">
                  <p class="tit">（票）收件人：</p>
                  <p class="txt">{{item.addressee}}</p>
                </li>
                <li v-if="item.telephone">
                  <p class="tit">（票）收件电话：</p>
                  <p class="txt">{{item.telephone}}</p>
                </li>
                <li v-if="item.address">
                  <p class="tit">（票）收件地址:</p>
                  <p class="txt">{{item.address}}</p>
                </li>
                <li v-if="item.expressNo">
                  <p class="tit">快递单号：</p>
                  <p class="txt">{{item.expressNo}}</p>
                </li>
                <li v-if="item.expressTime">
                  <p class="tit">邮寄日期：</p>
                  <p class="txt">{{item.expressTime|dateFormat}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
          <!-- 上传申请材料 -->
            <div class="basic_lists"  v-if="detailInfo.pasFlowFeedbackMap[1]">
              <div class="basictitle">
                <h3>上传申请材料</h3>
              </div>
              <div v-if="detailInfo.pasFlowFeedbackMap[1]">
                <div class="basic_category clearfix" v-for="item in detailInfo.pasFlowFeedbackMap[1]" :key="item.id">
                  <ul class="fl" >
                    <li>
                        <p class="tit">递交机构：</p>
                        <p class="txt">{{item.submitOrg}}</p>
                      </li>
                      <li>
                        <p class="tit">提交日期：</p>
                        <p class="txt">{{item.submitTime|dateFormat}}</p>
                      </li>
                      <li>
                        <p class="tit">申报员：</p>
                        <p class="txt">{{item.declarator}}</p>
                      </li>
                      <li v-if="item.pasFiles">
                        <p class="tit">申请材料：</p>
                        <div class="txt">
                          <div v-for="f in item.pasFiles" :key="f.id">
                              <span class="ziliao">{{f.fileName}}</span>
                            </div>
                        </div>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          <!-- 受理通知 -->
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[2]" >
              <div class="basictitle">
                <h3>上传受理通知</h3>
              </div>
              <div v-if="detailInfo.pasFlowFeedbackMap[2]" >
                <div class="basic_category clearfix" v-for="item in detailInfo.pasFlowFeedbackMap[2]" :key="item.id">
                  <ul class="fl">
                    <li>
                        <p class="tit">申请号：</p>
                        <p class="txt">{{item.applicatNumber}}</p>
                      </li>
                      <li>
                        <p class="tit">申请日：</p>
                        <p class="txt">{{item.applicatTime|dateFormat}}</p>
                      </li>
                      <li>
                        <p class="tit nopay">申请费缴纳截止日期：</p>
                        <p class="txt nopay">{{item.applicatFeeDeadline|dateFormat}}</p>
                      </li>
                      <li v-if="item.pasFiles">
                        <p class="tit">官文：</p>
                        <div class="txt">
                          <div v-for="f in item.pasFiles" :key="f.id">
                              <span class="ziliao">{{f.fileName}}</span>
                            </div>
                        </div>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          <!-- 申请费缴纳 -->
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[3]">
              <div class="basictitle">
                <h3>申请费缴纳</h3>
              </div>
              <div v-if="detailInfo.pasFlowFeedbackMap[3]">
                <div class="basic_category clearfix"  v-for="item in detailInfo.pasFlowFeedbackMap[3]" :key="item.id">
                  <ul class="fl">
                      <li>
                        <p class="tit">缴纳申请费日期：</p>
                        <p class="txt">{{item.turnInApplicatFeeTime|dateFormat}}</p>
                      </li>
                      <li>
                        <p class="tit">缴纳申请费金额（元）：</p>
                        <p class="txt">{{item.turnInApplicatFee|priceFormat}}</p>
                      </li>
                      <li>
                        <p class="tit">制单：</p>
                        <p class="txt">{{item.maker}}</p>
                      </li>
                      <li>
                        <p class="tit">官方黄票号：</p>
                        <p class="txt">{{item.officialYellowTicketNumber}}</p>
                      </li>
                      <li v-if="item.pasFiles">
                        <p class="tit">付款凭证：</p>
                        <div class="txt">
                          <div v-for="f in item.pasFiles" :key="f.id">
                              <span class="ziliao">{{f.fileName}}</span>
                              <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                              <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                            </div>
                        </div>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          <!-- 初步审查 -->
          <div v-if="thetype!=2">
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[4]"  >
              <div class="basictitle">
                <h3>反馈初步审查结果</h3>
              </div>
              <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[4]">
                <div class="firstaudit clearfix" v-for="item in detailInfo.pasFlowFeedbackMap[4]" :key="item.id">
                  <ul  class="fl">
                    <li>
                      <p class="tit">初步审查结果：</p>
                      <p class="txt">{{item.trialReviewResult|trialReviewResultFormat}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==1">
                      <p class="tit nopay">办登费缴纳截止日期：</p>
                      <p class="txt nopay">{{item.boardFeeDeadline|dateFormat}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==1">
                      <p class="tit">第几年度年费：</p>
                      <p class="txt">{{item.whichYear}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==2">
                      <p class="tit nopay">补正/审查截止日期：</p>
                      <p class="txt nopay">{{item.supplementReviewDeadline|dateFormat}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==3">
                      <p class="tit nopay">驳回复审截止日期：</p>
                      <p class="txt nopay">{{item.rejectReviewDeadline|dateFormat}}</p>
                    </li>
                    <li v-if="item.pasFiles">
                      <p class="tit">官文：</p>
                      <div class="txt">
                        <div v-for="(f,k) in item.pasFiles" :key="k">
                          <span class="ziliao">{{f.fileName}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div v-if="thetype==2">
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[4]"  >
              <div class="basictitle">
                <h3>反馈初步审查结果</h3>
              </div>
              <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[4]">
                <div class="firstaudit clearfix" v-for="item in detailInfo.pasFlowFeedbackMap[4]" :key="item.id">
                  <ul  class="fl">
                    <li>
                      <p class="tit">初步审查结果：</p>
                      <p class="txt">{{item.trialReviewResult|trialReviewResultFormat}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==2">
                      <p class="tit nopay">补正/审查截止日期：</p>
                      <p class="txt nopay">{{item.supplementReviewDeadline|dateFormat}}</p>
                    </li>
                    <li v-if="item.trialReviewResult==3">
                      <p class="tit nopay">驳回复审截止日期：</p>
                      <p class="txt nopay">{{item.rejectReviewDeadline|dateFormat}}</p>
                    </li>
                    <li v-if="item.pasFiles">
                      <p class="tit">官文：</p>
                      <div class="txt">
                        <div v-for="(f,k) in item.pasFiles" :key="k">
                          <span class="ziliao">{{f.fileName}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 待补待通(初审) -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[5]">
            <div class="basictitle">
              <h3>补正/审查</h3>
            </div>
            <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[5]">
              <div class="firstaudit clearfix" v-for="(item,key) in detailInfo.pasFlowFeedbackMap[5]" :key="key">
                <ul class="fl">
                  <li>
                    <p class="tit">递交日期：</p>
                    <p class="txt">{{item.submitTime|dateFormat}}</p>
                  </li>
                  <li v-if="item.pasFiles">
                    <p class="tit">补正材料：</p>
                    <div class="txt">
                      <div v-for="(f,k) in item.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 上传实质请求审核结果 -->
          <div v-if="detailInfo.pasFlowFeedbackMap[6]">
            <div class="basic_lists">
              <div class="basictitle">
                <h3>上传实质请求审核通知</h3>
              </div>
              <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[6]">
                <div class="firstaudit clearfix" v-for="(item,key) in detailInfo.pasFlowFeedbackMap[6]" :key="key">
                    <ul class="fl">
                      <li>
                        <p class="tit">实质请求审核结果：</p>
                        <p class="txt">{{'通过'}}</p>
                      </li>
                      <li v-if="item.pasFiles">
                        <p class="tit">官文：</p>
                        <div class="txt">
                          <div v-for="(f,k) in item.pasFiles" :key="k">
                            <span class="ziliao">{{f.fileName}}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 反馈实质审查结果 -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[7]">
            <div class="basictitle">
              <h3>反馈实质审查结果</h3>
            </div>
            <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[7]">
              <div class="firstaudit clearfix" v-for="(item,index) in detailInfo.pasFlowFeedbackMap[7]" :key="index">
                <ul  class="fl">
                  <li>
                    <p class="tit">实质审查结果：</p>
                    <p class="txt">{{item.substantReviewResult|trialReviewResultFormat}}</p>
                  </li>
                  <li v-if="item.substantReviewResult==1">
                    <p class="tit nopay">办登费缴纳截止日期：</p>
                    <p class="txt nopay">{{item.boardFeeDeadline|dateFormat}}</p>
                  </li>
                  <li v-if="item.substantReviewResult==1">
                    <p class="tit">第几年度年费：</p>
                    <p class="txt">{{item.whichYear}}</p>
                  </li>
                  <li v-if="item.substantReviewResult==2">
                    <p class="tit nopay" >补正/审查截止日期：</p>
                    <p class="txt nopay">{{item.supplementReviewDeadline|dateFormat}}</p>
                  </li>
                  <li v-if="item.substantReviewResult==3">
                    <p class="tit nopay">驳回复审截止日期：</p>
                    <p class="txt nopay">{{item.rejectReviewDeadline|dateFormat}}</p>
                  </li>
                  <li v-if="item.pasFiles">
                    <p class="tit">官文：</p>
                    <div class="txt">
                      <div v-for="(f,k) in item.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 待补待通(实审) -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[8]">
            <div class="basictitle">
              <h3>补正/审查（实审）</h3>
            </div>
            <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[8]">
              <div class="firstaudit clearfix" v-for="(item,key) in detailInfo.pasFlowFeedbackMap[8]" :key="key">
                <ul class="fl">
                  <li>
                    <p class="tit">递交日期：</p>
                    <p class="txt">{{item.submitTime|dateFormat}}</p>
                  </li>
                  <li v-if="item.pasFiles">
                    <p class="tit">补正材料：</p>
                    <div class="txt">
                      <div v-for="(f,k) in item.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 办登费缴纳 -->
          <div  v-if="detailInfo.pasFlowFeedbackMap[9]">
            <div class="basic_lists" >
              <div class="basictitle">
                <h3>办登费缴纳</h3>
              </div>
              <div v-if="detailInfo.pasFlowFeedbackMap[9]">
              <div class="basic_category clearfix"  v-for="(item,key) in detailInfo.pasFlowFeedbackMap[9]" :key="key">
                <ul class="fl">
                  <li>
                    <p class="tit">办登费收款金额（元）：</p>
                    <p class="txt">{{item.boardFeeReceiveAmount|priceFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">服务费（元）：</p>
                    <p class="txt">{{item.serviceFee |priceFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">办登费收款日期：</p>
                    <p class="txt">{{item.boardFeeReceiveTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">制单：</p>
                    <p class="txt">{{item.maker}}</p>
                  </li>
                  <li>
                    <p class="tit">缴费金额（元）：</p>
                    <p class="txt">{{item.turnInAmount|priceFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">办登费缴费时间：</p>
                    <p class="txt">{{item.boardFeeTurnInTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">官方黄票号：</p>
                    <p class="txt">{{item.officialYellowTicketNumber}}</p>
                  </li>
                  <li v-if="item.pasFiles">
                    <p class="tit">付款凭证：</p>
                    <div class="txt">
                      <div v-for="(f,k) in item.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
          <!-- 获得专利证书 -->
          <div class="basic_lists" v-if='zlzsdata'>
            <div class="basictitle">
              <h3>获取专利证书</h3>
            </div>
            <div class="basic_category clearfix">
              <ul class="fl">
                <li>
                    <p class="tit">授权日：</p>
                    <p class="txt">{{zlzsdata.authTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">授权公开号：</p>
                    <p class="txt">{{zlzsdata.authPublicNumber}}</p>
                  </li>
                  <li>
                    <p class="tit">收证日期：</p>
                    <p class="txt">{{zlzsdata.receiveCertificateTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">证书邮寄日期：</p>
                    <p class="txt">{{zlzsdata.certificateSendTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">证书邮寄单号：</p>
                    <p class="txt">{{zlzsdata.certificateSendNumber}}</p>
                  </li>
                  <li>
                    <p class="tit">（证书）收件人：</p>
                    <p class="txt">{{zlzsdata.receiver}}</p>
                  </li>
                  <li>
                    <p class="tit">（证书）收件电话：</p>
                    <p class="txt">{{zlzsdata.receivePhone}}</p>
                  </li>
                  <li>
                    <p class="tit">（证书）收件地址：</p>
                    <p class="txt">{{zlzsdata.receiveAddress}}</p>
                  </li>
                <li v-if="zlzsdata.pasFiles">
                  <p class="tit">官文：</p>
                  <div class="txt">
                      <div v-for="(f,k) in zlzsdata.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                      </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        <!-- 第三年度年费 -->
        <div v-if="detailInfo.pasYearFeeRecordList">
          <div class="basic_lists" v-for="(item,key) in detailInfo.pasYearFeeRecordList" :key="key">
            <div class="basictitle">
              <h3>第{{item.whichYear}}年度年费</h3>
            </div>
            <div class="basic_category clearfix">
              <ul v-if="item.turnInState==0">
                <li>
                  <p class="tit nopay">第几年度年费：</p>
                  <p class="txt nopay">{{item.whichYear}}</p>
                </li>
                <li>
                  <p class="tit nopay">截止日期：</p>
                  <p class="txt nopay">{{item.deadline|dateFormat}}</p>
                </li>
              </ul>
              <ul v-if="item.turnInState==1">
                <li>
                  <p class="tit nopay">第几年度年费：</p>
                  <p class="txt nopay">{{item.whichYear}}</p>
                </li>
                <li>
                  <p class="tit nopay">截止日期：</p>
                  <p class="txt nopay">{{item.deadline|dateFormat}}</p>
                </li>
                <li>
                  <p class="tit">年费缴纳方式：</p>
                  <p class="txt">{{item.yearFeeTurnInType==1?'我司代缴':'客户自缴'}}</p>
                </li>
                <li>
                  <p class="tit">第{{item.whichYear}}年年费收款金额（元）：</p>
                  <p class="txt">{{item.yearFeeReceiveAmount|priceFormat}}</p>
                </li>
                <li>
                  <p class="tit">第{{item.whichYear}}年年费收款时间：</p>
                  <p class="txt">{{item.yearFeeReceiveTime|dateFormat}}</p>
                </li>
                <li>
                  <p class="tit">制单：</p>
                  <p class="txt">{{item.maker}}</p>
                </li>
                <li>
                  <p class="tit">缴费时间：</p>
                  <p class="txt">{{item.turnInTime|dateFormat}}</p>
                </li>
                <li>
                  <p class="tit">缴费金额（元）：</p>
                  <p class="txt">{{item.turnInAmount|priceFormat}}</p>
                </li>
                <li>
                  <p class="tit">官方黄票号：</p>
                  <p class="txt">{{item.officialYellowTicketNumber}}</p>
                </li>
                <li v-if="item.pasFiles">
                  <p class="tit">付款凭证：</p>
                  <div class="txt">
                      <div v-for="(f,k) in item.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                  </div>
                </li>
              </ul>
              <ul v-if="false">
                <li>
                  <p class="tit">电子/纸质发票：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo}}</p>
                </li>
                <li>
                  <p class="tit">第3年年费官票号：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">第3年年费服务费票号：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo}}</p>
                </li>
                <li>
                  <p class="tit">开票时间：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">备注：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo}}</p>
                </li>
                
              </ul>
              <ul v-if="false">
                <li>
                  <p class="tit">（票）收件人：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">（票）收件电话：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">（票）收件地址：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">快递单号：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
                <li>
                  <p class="tit">邮寄日期：</p>
                  <p class="txt">{{detailInfo.baseInfo.caseNo }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <!-- 发票信息 -->
      <el-dialog :title="invoicetit" :visible.sync="isinvoice" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="invoicedatas" label-width="130px" :model="invoicedatas">
            <el-form-item label="发票类型：" prop="invoiceForm" required>
              	<el-radio v-model="invoicedatas.invoiceForm" :label="1">电子发票</el-radio>
				        <el-radio v-model="invoicedatas.invoiceForm" :label="2">纸质发票</el-radio>
            </el-form-item>
            <el-form-item class="submitdate" label="寄送方式：" prop="sendType" v-if='invoicedatas.invoiceForm==2'>
              	<el-radio v-model="invoicedatas.sendType" :label="1">快递邮寄</el-radio>
				        <el-radio v-model="invoicedatas.sendType" :label="2">商务代领</el-radio>
            </el-form-item>
            <el-form-item class="addressee" label="代领人员：" prop="fetcher" v-if='invoicedatas.sendType==2 && invoicedatas.invoiceForm==2'>
              <el-input type="text" v-model="invoicedatas.fetcher" placeholder="请填写代领人姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="phone" :label="offtit" prop="officialTicketNumber">
              <el-input type="text" v-model="invoicedatas.officialTicketNumber" placeholder="请填写官费号"></el-input>
            </el-form-item>
			      <el-form-item class="address" :label="servetit" prop="serviceTicketNumber">
              <el-input type="text" v-model="invoicedatas.serviceTicketNumber" placeholder="请填写服务票号" ></el-input>
            </el-form-item>
            <el-form-item class="mailDate" label="开票时间：" prop="invoiceTime">
              <el-date-picker v-model="invoicedatas.invoiceTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="mailNum" label="备注" prop="remarks">
              <el-input type="text" v-model="invoicedatas.remarks" placeholder="请填写备注"></el-input>
            </el-form-item>
            
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmit()" v-if="!ischange">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc()" v-if="ischange">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel()">取消</el-button>
        </div>
      </el-dialog>
      <!-- 图片预览 -->
      <el-dialog
        :visible.sync="dialogVisible"
        size="tiny"
        class="img_preview"
        :modal-append-to-body="true"
      >
        <img :src="imgsrc" alt />
      </el-dialog>
      <!-- 证书预览 -->
      <el-dialog
        :visible.sync="dialogImg"
        size="tiny"
        class="img_preview"
        :modal-append-to-body="true"
      >
        <el-carousel :interval="5000" arrow="always" :autoplay="false" trigger="click">
          <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import VueCookie from "vue-cookie";
import uploader from 'cps/uploader/uploader.vue';
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import { store } from "utils/";
const rootUrl = CONFIG.rootUrl;
const detailUrl = './api/findCaseDetail/{caseSysNo}'
const zlzsUrl='./api/findPasCertificateExpressDetail/{caseSysNo}'
const addInvoiceUrl = './api/addPasInvoice'
const editInvoiceUrl = './api/editPasInvoice'

const pdfUrl = "./api/preview";

const invoicedata = {
  sendType:null,
  fetcher:null,
  invoiceForm:1,
  officialTicketNumber:null,
  serviceTicketNumber:null,
  invoiceTime:null,
  remarks:null
}
export default {
  components: {
    uploader
  },
  data() {
    return {
      thetype:1,
      caseSysNo:'',
      ischange:'',
      isinvoice: false,
      isinvoicec: false,
      invoiceType:1,
      invoicedatas: Object.assign({},invoicedata),
      invoicetit:'',
      yearFeeRecordId:'',
      offtit:'',
      servetit:'',
      nowYear:'',
      noRepeat: true, //防止重复提交
      rootUrl: rootUrl,
      status: 1,
      dialogVisible: false,
      dialogImg: false,
      zlzsdata:{},
      detailInfo: {
        baseInfo:{},
        pasFlowFeedbackMap:{},
        otherOfficialMaterialList:[],
        otherApplicantMaterialList:[],
        pasYearFeeRecordList:[],
        pasInvoiceInfoFormList:[],
      },
      dialogState: false,
      // 当前服务状态
      recordContent: "",
      imgsrc: "",
      proxyImg: [],
      // 营业执照
      usinessLicense: [],
      // 委托书
      powerAttorney: [],
      licenseName: [],

      localStore: store,
      // 弹框 - 证书 - 预览
      previewImg: false,
      previewSrc: "",
	    token: "",
    };
  },
  watch: {
  },
  methods: {
    totimestamp(str) {
        return str?new Date(str).getTime():null
    },
    isNull(obj){
      let isnull = true;
      for( var key in obj){
        if(obj.hasOwnProperty(key)){
            if(obj[key]){
            isnull = false
          }
        }
        
      }
      return isnull
    },
    getzlzs(){
      this.$http.get(zlzsUrl.replace('{caseSysNo}',this.$route.params.id)).then(res=>{
          this.zlzsdata = res.data.obtainCertificate;
      })
    },
    changeInvoice(tp,it){
      this.invoicedatas = Object.assign({},it)
      this.ischange  = true;
      switch(tp){
        case 'sqf':
          this.invoicetit = '修改申请费发票信息';
          this.offtit = '申请费官票号';
          this.servetit = '申请费服务费票号';
          break;
        case 'bdf':
          this.invoicetit = '办登费发票信息';
          this.offtit = '办登费官票号';
          this.servetit = '办登费服务费票号';
          break;
        case 'nf':
          this.nowYear = it['whichYear'];
          this.invoicetit = `第${this.nowYear}年发票信息`;
          this.offtit = `第${this.nowYear}年年费官票号：`;
          this.servetit = `第${this.nowYear}年年费服务费票号：`;
          break;
      }
      this.isinvoice= true
    },
    commonSubmitc(){
      let subdata = Object.assign({},this.invoicedatas);
      console.log(subdata)
      if( !subdata.sendType  && subdata.invoiceForm==2){
        this.$message.warning('请选择寄送方式')
        return;
      }
      if(subdata.invoiceForm==1){
        delete subdata.sendType
        delete subdata.fetcher
      }
      if(subdata.sendType==1){
        delete subdata.fetcher
      }
      subdata.invoiceTime = this.totimestamp(subdata.invoiceTime);
      this.$http.post(editInvoiceUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search();
        // this.getzlzs();
        this.commonCancel()
      })
      
    },
    commonSubmit(){
      let subdata = Object.assign({},this.invoicedatas);
      if( !subdata.sendType  && subdata.invoiceForm==2){
        this.$message.warning('请选择寄送方式')
        return;
      }
      if(subdata.invoiceForm==1){
        delete subdata.sendType
        delete subdata.fetcher
      }
      if(subdata.sendType==1){
        delete subdata.fetcher
      }
      subdata.caseSysNo = this.caseSysNo;
      if(this.nowYear){
        subdata.yearFeeRecordId = this.yearFeeRecordId;
      }
      subdata.invoiceType  = this.invoiceType;
      subdata.invoiceTime = this.totimestamp(subdata.invoiceTime);
      this.$http.post(addInvoiceUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.commonCancel()
        this.search();
      })
    },
    commonCancel(){
      this.invoicedatas = Object.assign({},invoicedata)
      this.nowYear = ''
      this.isinvoice = false;
    },
    
    // 弹框内预览
    previewClick(data) {
      console.log(data);
      this.$http
        .get("./api/preview?pdf_url=" + data.url)
        .then(response => {
          this.previewSrc = response.data.urls;
        })
        .catch(error => {
          console.log(error);
        });
      this.certificateImg = data.type;
      this.previewImg = true;
    },
    preview(src) {
      this.$http.get("./api/preview?pdf_url=" + src)
        .then(response => {
          let urls = response.data.urls;
          if(urls){
            this.certificatePreview(urls)
          }else{
            this.$message.warning('预览失败')
          }
        })
        .catch(error => {
          this.$message({
            message: "该文件无法预览",
            type: "error"
          });
        });
      // this.imgsrc = src;
      // this.dialogVisible = true;
    },
    addInvoice(tp,it){
      this.ischange= false;
      switch(tp){
        case 'sqf':
          this.invoicetit = '申请费发票信息';
          this.offtit = '申请费官票号';
          this.servetit = '申请费服务费票号';
          this.invoiceType =1;
          break;
        case 'bdf':
          this.invoicetit = '办登费发票信息';
          this.offtit = '办登费官票号';
          this.servetit = '办登费服务费票号';
          this.invoiceType =2;
          break;
        case 'nf':
          this.nowYear = it['whichYear'];
          this.yearFeeRecordId = it['id']
          this.invoiceType =3;
          this.invoicetit = `第${this.nowYear}年发票信息`;
          this.offtit = `第${this.nowYear}年年费官票号：`;
          this.servetit = `第${this.nowYear}年年费服务费票号：`;
          break;
      }
      this.isinvoice = true
    },
    search() {
      var self = this;
      this.$http.get(detailUrl.replace('{caseSysNo}',this.$route.params.id))
        .then(resp => {
          self.detailInfo = resp.data;
          if(this.detailInfo.otherApplicantMaterialList){
            this.standby8_Data = this.detailInfo.otherApplicantMaterialList;
          }
          if(this.detailInfo.otherOfficialMaterialList){
            this.standby9_Data = this.detailInfo.otherOfficialMaterialList;
          }
          if(!this.detailInfo.pasFlowFeedbackMap){
            this.detailInfo.pasFlowFeedbackMap =  {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 执照
    licenseUrl(url) {
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          this.licenseName = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    // 营业执照
    imgUrl(url) {
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          this.usinessLicense = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    // 委托书
    certificateImgUrl(url) {
      var self = this;
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          self.powerAttorney = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    certificatePreview(url) {
      this.proxyImg = url;
      this.dialogImg = true;
    },
    pageback(){
      this.$router.go(-1)
    }
  },
  created() {},
  mounted() {
    this.caseSysNo = this.$route.params.id;
    this.thetype = this.$route.params.type;
    this.search();
    this.getzlzs()
    this.token = VueCookie.get("token");
  },
  filters: {
    patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
    invoiceTypeFormat: Filters.invoiceTypeFormat,
    trialReviewResultFormat: Filters.trialReviewResultFormat,
    paperFormat: Filters.paperFormat,
    sendTypeFormat: Filters.sendTypeFormat
  },
  watch: {
    dialogService: function(now, val) {
      if (!now) {
        this.previewImg = false;
      }
    },
  }
};
</script>
<style lang='less'>
.patentdetail {
  .service_detail_tab {
    margin: 0 0 0 0;
    position: relative;
    background-color: #fff;
    box-sizing: content-box;
    width: 100%;
    ul {
      border-bottom: 1px solid #dfe2e5;
      height: 40px;
      li {
        height: 40px;
        text-align: center;
        font-size: 14px;
        color: #556677;
        cursor: pointer;
        padding: 13px 12px 0;
        line-height: 100%;
      }
      .sele_border {
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #dfe2e5;
        border-bottom: 1px solid #fff;
      }
    }
  }
  .form {
    background-color: #fff;
    padding: 0 30px 30px;
    border: 1px solid #dfe2e5;
    border-top: 0;
    border-radius: 0 2px 2px 2px;
    min-height: 500px;
    .basic_lists {
      padding-top: 20px;
      .tips {
        color: #999;
        font-size: 14px;
        margin-left: 10px;
      }
      .basictitle {
        margin-left: -30px;
        margin-right: -30px;
        padding: 10px 30px;
        font-size: 16px;
        color: #223344;
        height: 56px;
        line-height: 36px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        background-color: #efefef;
      }
      .otherdata {
        padding: 20px 0;
        font-size: 14px;
        > li {
          margin-bottom: 10px;
        }
      }
      //左侧
      //公共部分，主要是间距，字体大小，颜色
      .basic_category {
        text-align: left;
        padding-bottom: 10px;
        .category_left {
          width: 60%;
        }
        ul {
          width: 50%;
          padding-left: 30px;
          li {
            overflow-x: hidden;
            p {
              float: left;
              line-height: 18px;
              margin-bottom: 10px;
            }
            // 已支付
            p.topay {
              color: #36af47;
            }
            p.nopay {
              color: #f64744;
            }
            .tit {
              margin-right: 10px;
              font-size: 13px;
              color: #556677;
            }
            .txt {
              float: left;
              font-size: 13px;
              color: #7f8fa4;
              max-width: 69%;
            }
          }
        }
        .firstaudit{
            padding-top: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            &:last-child{
              border-bottom: none;
            }
          }
        //右侧图片预览定位
        
      }
    }

    // 弹框样式
    .state_preview {
      .bzbox:last-child{
        border-bottom: none;
      }
      .el-dialog__title {
        font-size: 14px;
        color: #223344;
        font-weight: normal;
        font-weight: bold;
      }
      .el-dialog__body {
        padding-top: 10px;
        padding-bottom: 30px;
      }
      .el-dialog--small {
        width: 700px;
      }
      .el-form-item__label{
        padding-top: 9px;
      }
      .submitdate{
        .el-form-item__label{
          &::before{
            content: '*';
            color: #f76868;
            font-size: 14px;
            padding-right: 3px;
          }
        }
      }
      .submitdates{
        .el-form-item__label{
          &::before{
            content: '*';
            color: #f76868;
            font-size: 14px;
            padding-right: 3px;
          }
        }
      }
      .radio,
      .state_radio,
      p {
        font-size: 14px;
        color: #556677;
      }
      .set_btn {
        p {
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
        }
        .right_btn {
          background: #479cff;
          color: #fff;
        }
        .left_btn {
          background: #ffffff;
          border: 1px solid #479cff;
          color: #479cff;
        }
      }
      .service_limit {
        position: absolute;
        bottom: 85px;
        right: 30px;
        color: #999;
        font-size: 13px;
      }
    }

    .preview_tit {
      p {
        cursor: pointer;
        img {
          vertical-align: top;
          margin-right: 7px;
        }
      }
    }
    // 预览
    .img_preview {
      .el-dialog--tiny {
        width: 940px;
        img {
          width: 900px;
        }
      }
    }
    .img_preview {
      .el-carousel {
        margin: 0 auto;
        width: 835px;
        .el-carousel__container {
          margin: 0 auto;
          height: 650px;
          .el-carousel__arrow {
            position: fixed;
          }
          .el-carousel__item {
            text-align: center;
            width: 810px;
            overflow-y: auto;
            img {
              width: 810px;
            }
          }
        }
      }
    }

    .setServicerDialog {
      .el-dialog--small {
        width: 520px;
      }
      .el-dialog__body {
        padding-top: 10px;
        .el-form-item {
          margin-bottom: 12px;
        }
      }
      .el-form-item__label {
        text-align: left;
        display: block;
        float: none;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .set_btn {
        text-align: right;
        span {
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
          display: inline-block;
        }
        .right_btn {
          background: #479cff;
          color: #fff;
        }
        .left_btn {
          background: #ffffff;
          border: 1px solid #479cff;
          color: #479cff;
          margin-right: 10px;
        }
        .disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .servicerInfo {
      .service_table {
        margin-top: 10px;
        > p {
          font-size: 13px;
          color: #556677;
          margin-bottom: 10px;
          button {
            width: 70px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 2px;
            font-size: 13px;
          }
          .service_btn {
            border: 1px solid #479cff;
            color: #479cff;
            cursor: pointer;
          }
          .service_nullbtn {
            border: 1px solid #dfe2e5;
            color: #7f8fa4;
            cursor: default;
          }
        }
        .tb01 {
          width: 20%;
        }
        .tb02 {
          width: 15%;
        }
        .tb03 {
          width: 15%;
        }
        .tb04 {
          width: 15%;
        }
        .tb05 {
          width: 35%;
        }
        ul {
          li {
            text-align: left;
            line-height: 40px;
            height: 40px;
          }
        }
        .table_tit {
          background: #f5f5f5;
          border: 1px solid #dfe2e5;
          li {
            font-size: 13px;
            color: #223344;
          }
        }
        .table_list {
          border-left: 1px solid #dfe2e5;
          border-right: 1px solid #dfe2e5;
          li {
            border-bottom: 1px solid #dfe2e5;
            p {
              line-height: 18px;
              line-height: 40px;
              height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 13px;
              color: #556677;
            }
          }
        }
      }
    }

    .state_list {
      .state_time {
        margin-top: -10px;
        p {
          span {
            font-size: 16px;
            color: #d8d8d8;
          }
        }
        a {
          text-decoration: none;
          font-size: 13px;
          color: #999999;
          cursor: pointer;
        }
        a:hover {
          color: #3db1fa;
        }
        i {
          border-left: 1px dashed #ddd;
          height: 23px;
          display: block;
          margin-top: -8px;
          margin-left: 4px;
        }
      }
      .change_providers {
        img {
          width: 70px;
        }
        .change_txt {
          span {
            font-size: 14px;
            color: #333333;
          }
          p {
            font-size: 13px;
            color: #666666;
            line-height: 19px;
            img {
              width: 18px;
              vertical-align: top;
            }
            a {
              text-decoration: none;
              cursor: pointer;
              color: #3db1fa;
            }
          }
        }
      }
    }
    // 服务记录
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-textarea__inner {
    resize: none;
  }
  .el-form-item__label {
    text-align: left;
  }
}

.zipfilebox {
  display: flex;
  .namebox {
    margin-right: 20px;
    color: #666;
  }
}
.ziliao {
  text-decoration: underline;
  margin-right: 20px;
}
.downloadbtn {
  color: #379dea;
  cursor: pointer;
  margin-right: 20px;
  white-space: nowrap;
}
.uploadbtn {
  font-size: 14px;
  color: #379dea;
  cursor: pointer;
}
.reviseapply {
  > li {
    height: 30px;
  }
  .tit {
    float: left;
    margin-right: 10px;
    font-size: 13px;
    color: #556677;
  }
  .txt {
    float: left;
    font-size: 13px;
    color: #7f8fa4;
    max-width: 69%;
  }
}
.reviseapplybox {
  padding: 20px 30px 0;
  .resbox{
    padding-top: 20px;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border-bottom: none;
    }
    &:first-child{
      padding-top:0;
    }
  }
  .el-input__icon {
    top: -3px;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .btnbox {
    padding-top: 10px;
    text-align: center;
    .el-button--large {
      width: 80px;
    }
  }
  .uploadintr{
	  line-height: 20px;
	  color:#999;
	  font-size: 12px;
  }
  .materialbox{
	  padding-top: 10px;
	  padding-bottom: 10px;
	  >li{
		  line-height: 24px;
	  }
  }
}
.bzbox{
  padding-top: 20px;
  border-bottom: 1px solid #ccc;
}
</style>

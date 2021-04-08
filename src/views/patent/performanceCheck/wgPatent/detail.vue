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
                <li v-if="!!item.addressee">
                  <p class="tit">（票）收件人：</p>
                  <p class="txt">{{item.addressee}}</p>
                </li>
                <li v-if="!!item.telephone">
                  <p class="tit">（票）收件电话：</p>
                  <p class="txt">{{item.telephone}}</p>
                </li>
                <li v-if="!!item.address">
                  <p class="tit">（票）收件地址:</p>
                  <p class="txt">{{item.address}}</p>
                </li>
                <li v-if="!!item.expressNo">
                  <p class="tit">快递单号：</p>
                  <p class="txt">{{item.expressNo}}</p>
                </li>
                <li v-if="!!item.expressTime">
                  <p class="tit">邮寄日期：</p>
                  <p class="txt">{{item.expressTime|dateFormat}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
          <!-- 上传申请材料 -->
            <div class="basic_lists"  v-if="detailInfo.currentFlowStage==1 || detailInfo.pasFlowFeedbackMap[1]">
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
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[2] || detailInfo.currentFlowStage==2" >
              <div class="basictitle">
                <h3>受理通知</h3>
                
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
                        <p class="tit">官文材料：</p>
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
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[3] || detailInfo.currentFlowStage==3">
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
                            </div>
                        </div>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          <!-- 初步审查 -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[4] || detailInfo.currentFlowStage==4"  >
            <div class="basictitle">
              <h3>初步审查</h3>
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
                    <p class="tit">官文材料：</p>
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
          <!-- 待补待通(初审) -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[5] || detailInfo.currentFlowStage==5">
            <div class="basictitle">
              <h3>待补待通</h3>
            </div>
            <div class="basic_category clearfix" v-if="detailInfo.pasFlowFeedbackMap[5]">
              <div class="firstaudit clearfix" v-for="(item,key) in detailInfo.pasFlowFeedbackMap[5]" :key="key">
                <ul class="fl">
                  <li>
                    <p class="tit">递交日期：</p>
                    <p class="txt">{{item.submitTime|dateFormat}}</p>
                  </li>
                  <li v-if="item.pasFiles">
                    <p class="tit">官文材料：</p>
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
          <div  v-if="detailInfo.pasFlowFeedbackMap[9] || detailInfo.currentFlowStage==9">
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
                    <p class="tit">寄送方式：</p>
                    <p class="txt">{{zlzsdata.sendType|sendTypeFormat}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==2">
                    <p class="tit">代领人：</p>
                    <p class="txt">{{zlzsdata.fetcher}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==1">
                    <p class="tit">证书邮寄日期：</p>
                    <p class="txt">{{zlzsdata.certificateSendTime|dateFormat}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==1">
                    <p class="tit">证书邮寄单号：</p>
                    <p class="txt">{{zlzsdata.certificateSendNumber}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==1">
                    <p class="tit">（证书）收件人：</p>
                    <p class="txt">{{zlzsdata.receiver}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==1">
                    <p class="tit">（证书）收件电话：</p>
                    <p class="txt">{{zlzsdata.receivePhone}}</p>
                  </li>
                  <li v-if="zlzsdata.sendType==1">
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
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">第{{item.whichYear}}年年费收款金额（元）：</p>
                  <p class="txt">{{item.yearFeeReceiveAmount|priceFormat}}</p>
                </li>
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">第{{item.whichYear}}年年费收款时间：</p>
                  <p class="txt">{{item.yearFeeReceiveTime|dateFormat}}</p>
                </li>
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">制单：</p>
                  <p class="txt">{{item.maker}}</p>
                </li>
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">缴费时间：</p>
                  <p class="txt">{{item.turnInTime|dateFormat}}</p>
                </li>
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">缴费金额（元）：</p>
                  <p class="txt">{{item.turnInAmount|priceFormat}}</p>
                </li>
                <li v-if="item.yearFeeTurnInType==1">
                  <p class="tit">官方黄票号：</p>
                  <p class="txt">{{item.officialYellowTicketNumber}}</p>
                </li>
                <li v-if="item.pasFiles">
                  <p class="tit">付款凭证：</p>
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
      </template>
    </div>
  </div>
</template>
<script>
import VueCookie from "vue-cookie";
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import { store } from "utils/";
const rootUrl = CONFIG.rootUrl;
const detailUrl = './api/findCaseDetail/{caseSysNo}'
const zlzsUrl='./api/findPasCertificateExpressDetail/{caseSysNo}'

export default {
  data() {
    return {
      thetype:1,
      step:11,
      caseSysNo:'',
      ischange:'',
      zlzsdata:[],
      radios: 2,
      resradio:1,
      type: "", //type: 0 默认; 1 创新保; 2 国内商标自助注册
      noRepeat: true, //防止重复提交
      radio: 1,
      auditstate: "",
      isAllWorkOrder: false,
      audit: {
        radio: "",
        state: ""
      },
      rootUrl: rootUrl,
      status: 1,
      work_order_sn: "",
      remarkData: [],
      dialogRemark: false,
      content: "",

      dialogVisible: false,
      dialogImg: false,
      detailInfo: {
        baseInfo:{},
        pasFlowFeedbackMap:{},
        otherOfficialMaterialList:[],
        otherApplicantMaterialList:[],
        pasYearFeeRecordList:[],
        pasInvoiceInfoFormList:[],
      },
      textarea: "",
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
      //服务记录
      dialogService: false,
      acceptMaterials: "",
      recordData: "",
      dialogServiceLoading: false,
      // 弹框 - 证书 - 预览
      previewImg: false,
      previewSrc: "",
	    token: "",
    };
  },
  watch: {
  },
  methods: {
    
    getzlzs(){
      this.$http.get(zlzsUrl.replace('{caseSysNo}',this.$route.params.id)).then(res=>{
          this.zlzsdata = res.data.obtainCertificate;
      })
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
    pageback(){
      this.$router.go(-1)
    }
  },
  created() {},
  mounted() {
    this.caseSysNo = this.$route.params.id;
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
    status() {
      if (this.status == 2) {
      }
    }
  }
};
</script>


<template>
  <div class="patentdetail">
    <div class="service_detail_tab">
      <ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">案件信息</li>
        <li class="fl" :class="{'sele_border':status == 2}" @click="status=2">其他材料</li>
      </ul>
      <span class="tobackbtn" @click="pageback">返回</span>
    </div>
    <div class="form">
      <template v-if="status == 1">
        <!-- 基本信息 -->
        <div class="basic_lists">
          <div class="basictitle">
            <h3 class = 'fl'>基本信息</h3>
            <el-button type="primary" @click="torevise" class = 'fr'>修改</el-button>
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
                <h3 class = 'fl'>上传申请材料</h3>
                <el-button type="primary" @click="uploadMaterial('u','standby1')" v-if="detailInfo.currentFlowStage==1" class = 'fr'>上传</el-button>
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
                              <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                              <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                              <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                            </div>
                        </div>
                      </li>
                  </ul>
                  <div class="fr">
                      <el-button type="primary" @click="uploadMaterial('c','standby1',item)">修改</el-button>
                    </div>
                </div>
              </div>
            </div>
          <!-- 受理通知 -->
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[2] || detailInfo.currentFlowStage==2" >
              <div class="basictitle">
                <h3 class = 'fl'>上传受理通知</h3>
                <el-button type="primary" @click="uploadMaterial('u','standby2')" v-if="detailInfo.currentFlowStage==2" class = 'fr'>上传</el-button>
                
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
                              <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                              <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                              <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                            </div>
                        </div>
                      </li>
                  </ul>
                  <div class="fr">
                    <el-button type="primary" @click="uploadMaterial('c','standby2',item)">修改</el-button>
                  </div>
                </div>
              </div>
            </div>
          <!-- 申请费缴纳 -->
            <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[3] || detailInfo.currentFlowStage==3">
              <div class="basictitle">
                <h3 class = 'fl'>申请费缴纳</h3>
                <el-button type="primary" @click="uploadMaterial('u','standby3')" v-if="detailInfo.currentFlowStage==3" class = 'fr'>缴纳</el-button>
                
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
                              <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                              <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                              <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                            </div>
                        </div>
                      </li>
                  </ul>
                  <div class="fr">
                    <el-button type="primary" @click="uploadMaterial('c','standby3',item)">修改</el-button>
                  </div>
                </div>
              </div>
            </div>
          <!-- 初步审查 -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[4] || detailInfo.currentFlowStage==4"  >
            <div class="basictitle">
              <h3 class = 'fl'>反馈初步审查结果</h3>
              <el-button type="primary" @click="uploadMaterial('u','standby4')" v-if="detailInfo.currentFlowStage==4" class = 'fr'>反馈</el-button>
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
                        <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                    </div>
                  </li>
                </ul>
              <div class="fr"> 
                <el-button type="primary" @click="uploadMaterial('c','standby4',item)">修改</el-button>
              </div>
              </div>
            </div>
          </div>
          <!-- 补正/审查(初审) -->
          <div class="basic_lists" v-if="detailInfo.pasFlowFeedbackMap[5] || detailInfo.currentFlowStage==5">
            <div class="basictitle">
              <h3 class = 'fl'>补正/审查</h3>
              <el-button type="primary" @click="uploadMaterial('u','standby5')" v-if="detailInfo.currentFlowStage==5" class = 'fr'>上传补正材料</el-button>
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
                        <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="fr"><el-button type="primary" @click="uploadMaterial('c','standby5',item)" >修改</el-button></div>
              </div>
            </div>
          </div>

          <!-- 办登费缴纳 -->
          <div  v-if="detailInfo.pasFlowFeedbackMap[9] || detailInfo.currentFlowStage==9">
            <div class="basic_lists" >
              <div class="basictitle">
                <h3 class = 'fl'>办登费缴纳</h3>
                <el-button type="primary" @click="uploadMaterial('u','standby6')"  v-if="detailInfo.currentFlowStage==9" class = 'fr'>缴纳</el-button>
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
                        <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="fr">
                  <el-button type="primary" @click="uploadMaterial('c','standby6',item)">修改</el-button>
                </div>
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
                        <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
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
              <h3 class = 'fl'>第{{item.whichYear}}年度年费</h3>
              <div class = 'fr'>
                <el-button type="primary" @click="uploadMaterial('u','standby7',item)" v-if="item.turnInState==0">录入年费信息</el-button>
                <el-button type="primary" @click="uploadMaterial('c','standby7',item)" v-if="item.turnInState==1">修改</el-button>
              </div>
              
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
                  <p class="txt">{{item.yearFeeTurnInType|yearFeeTurnInTypeFormat}}</p>
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
                        <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                  </div>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </template>
      <template v-if="status == 2">
        <!--其他材料 -->
        <div class="basic_lists materialbox">
          <div class="basictitle">
            <h3>其他申请材料</h3>
          </div>
          <!-- <div>
            <el-button type="primary">上传</el-button>
            <span class="tips">备注：请以压缩包形式上传，压缩包格式支持rar/zip两种</span>
          </div> -->
          <div class="upload_component" style="margin-bottom:20px;">
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_middleground/api/uploadOtherMaterial?uploadType=1&caseSysNo='+caseSysNo" :url="standby8" :valueName="'standby8'"  ></pasuploader>
            <div class="upload_tip">
              <p v-if="standby8_name">已上传：{{standby8_name}}</p>
            </div>
          </div>
          <ul class="otherdata" v-if='standby8_Data.length>0'>
            <li v-for="(file,index) in standby8_Data" :key="file.id">
              <div>
                <span class="mr20">上传日期：{{file.createTime|dateFormat}}</span>
                <span class="mr20">操作人：{{file.operatorName}}</span>
                <span>
                  <span>材料：</span>
                  <span class="ziliao">{{decodeURIComponent(file.fileName)}}</span>
                  <span class="downloadbtn" @click="preview(file.url)">预览</span>
                  <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+file.url" target="_blank"  class="downloadbtn">下载</a>
                  <span class="downloadbtn" @click="otherDel('standby8',file)">删除</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="basic_lists materialbox">
          <div class="basictitle">
            <h3>其他官文材料</h3>
          </div>
          <div class="upload_component" style="margin-bottom:20px;">
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby9_name" :canPreview="false" :postAction="'iprp_middleground/api/uploadOtherMaterial?uploadType=2&caseSysNo='+caseSysNo" :url="standby9" :valueName="'standby9'" ></pasuploader>
            <div class="upload_tip">
              <p v-if="standby9_name">已上传：{{standby9_name}}</p>
            </div>
          </div>
          <ul class="otherdata" v-if='standby9_Data.length>0'>
            <li v-for="(file,index) in standby9_Data" :key="file.id">
              <div>
                <span class="mr20">上传日期：{{file.createTime|dateFormat}}</span>
                <span class="mr20">操作人：{{file.operatorName}}</span>
                <span>
                  <span>材料：</span>
                  <span class="ziliao">{{decodeURIComponent(file.fileName)}}</span>
                  <span class="downloadbtn" @click="preview(file.url)">预览</span>
                  <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+file.url" target="_blank"  class="downloadbtn">下载</a>
                  <span class="downloadbtn" @click="otherDel('standby9',file)">删除</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </template>
      <!-- 修改申请材料 -->
      <el-dialog :title="standby1_title" :visible.sync="is_standby1" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby1_Datas" label-width="80px" :rules="applyrules" :model="standby1_Datas">
            <el-form-item class="submitOrg" label="递交机构" prop="submitOrg">
              <el-input
                type="text"
                v-model="standby1_Datas.submitOrg"
                placeholder="请填写递交机构"
                :maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item class="submitdate" label="提交日期" prop="submitTime">
              <el-date-picker v-model="standby1_Datas.submitTime" type="date"  placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="member" label="申报员" prop="declarator">
              <el-input type="text" v-model="standby1_Datas.declarator" placeholder="请填申报员" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="申请材料">
              <div class="upload_component" style="margin-bottom:20px;">
                <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby1_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby1" :valueName="'standby1'"  ></pasuploader>
                <div class="upload_tip">
                  <div v-if="standby1_Data.length>0">
                    <p v-for="(file,index) in standby1_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby1',file)">删除</span></p>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox" >
          <el-button size="large" type="primary" @click="commonSubmitu('standby1')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby1')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby1')">取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改受理通知 -->
      <el-dialog :title="standby2_title" :visible.sync="is_standby2" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby2_Datas" label-width="100px" :model="standby2_Datas">
            <el-form-item class="submitdate" label="申请号" prop="applicatNumber">
              <el-input
                type="text"
                v-model="standby2_Datas.applicatNumber"
                placeholder="请填写申请号"
                :maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item class="submitdate" label="申请日" prop="applicatTime">
              <el-date-picker v-model="standby2_Datas.applicatTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="submitdate" label="申请费缴纳截止日期" prop="applicatFeeDeadline">
              <el-date-picker v-model="standby2_Datas.applicatFeeDeadline" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="官文">
              <div class="upload_component" style="margin-bottom:20px;">
                <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby2_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby2" :valueName="'standby2'"   :isDialog="true"></pasuploader>
                <div class="upload_tip">
                  <div v-if="standby2_Data.length>0">
                    <p v-for="(file,index) in standby2_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby2',file)">删除</span></p>
                  </div>
                </div>
              </div>
            </el-form-item>
            
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmitu('standby2')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby2')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby2')">取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改申请费缴纳 -->
      <el-dialog :title="standby3_title" :visible.sync="is_standby3" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby3_Datas" label-width="130px" :model="standby3_Datas">
            
			      <el-form-item class="turnInApplicatFee" label="缴纳申请费金额（元）" prop="turnInApplicatFee">
              <el-input type="number" v-model="standby3_Datas.turnInApplicatFee" placeholder="请填写缴纳官费金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="subdate" label="缴纳申请费日期" prop="turnInApplicatFeeTime">
              <el-date-picker v-model="standby3_Datas.turnInApplicatFeeTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="maker" label="制单" prop="maker">
              <el-input
                type="text"
                v-model="standby3_Datas.maker"
                placeholder="请填写制单人"
                :maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item class="officialYellowTicketNumber" label="官方黄票号" prop="officialYellowTicketNumber">
              <el-input type="text" v-model="standby3_Datas.officialYellowTicketNumber" placeholder="请填写官方黄票号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="pingzheng" label="付款凭证" prop="pingzheng">
              <div class="upload_component" style="margin-bottom:20px;">
                <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby3_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby3" :valueName="'standby3'"   :isDialog="true"></pasuploader>
                <div class="upload_tip">
                  <div v-if="standby3_Data.length>0">
                    <p v-for="(file,index) in standby3_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby3',file)">删除</span></p>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmitu('standby3')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby3')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby3')">取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改初步审查 -->
      <el-dialog :title="standby4_title" :visible.sync="is_standby4" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby4_Datas" label-width="120px" :model="standby4_Datas">
            <el-form-item class="submitdate" label="初步审查结果" prop="radio">
              	<el-radio v-model="standby4_Datas.trialReviewResult" :label="1" :disabled="ismodify">通过</el-radio>
                <el-radio v-model="standby4_Datas.trialReviewResult" :label="2" :disabled="ismodify">补正/审查意见</el-radio>
				        <el-radio v-model="standby4_Datas.trialReviewResult" :label="3" :disabled="ismodify">驳回</el-radio>
            </el-form-item>
            <div v-if="standby4_Datas.trialReviewResult==1">
              <el-form-item class="submitdate" label="办登费缴纳截止日期" prop="boardFeeDeadline">
                <el-date-picker v-model="standby4_Datas.boardFeeDeadline" type="date" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <el-form-item class="submitdate" label="第几年度年费" prop="whichYear">
                <!-- <el-input type="number" v-model="standby4_Datas.whichYear" placeholder="请填写年度" :min="1" :max="10"></el-input> -->
                <el-select v-model="standby4_Datas.whichYear" placeholder="请选择">
                  <el-option
                  v-for="item in yearoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="material" label="官文" prop="material">
                <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby4_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby4" :valueName="'standby4'"   :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="standby4_Data.length>0">
                      <p v-for="(file,index) in standby4_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby4',file)">删除</span></p>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div v-if="standby4_Datas.trialReviewResult==2">
              <el-form-item class="submitdate" label="补正/审查截止日期" prop="supplementReviewDeadline">
                <el-date-picker v-model="standby4_Datas.supplementReviewDeadline" type="date" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <el-form-item class="material" label="官文" prop="material">
                <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby4_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby4" :valueName="'standby4'"   :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="standby4_Data.length>0">
                      <p v-for="(file,index) in standby4_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby4',file)">删除</span></p>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div v-if="standby4_Datas.trialReviewResult==3">
              <el-form-item class="submitdate" label="驳回复审截止日期" prop="rejectReviewDeadline">
                <el-date-picker v-model="standby4_Datas.rejectReviewDeadline" type="date" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <el-form-item class="material" label="官文" prop="material">
                <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby4_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby4" :valueName="'standby4'"   :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="standby4_Data.length>0">
                      <p v-for="(file,index) in standby4_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby4',file)">删除</span></p>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmitu('standby4')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby4')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby4')">取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改补正/审查 -->
      <el-dialog :title="standby5_title" :visible.sync="is_standby5" class="state_preview">
          <div class="reviseapplybox">
            <div class="bzbox">
              <el-form ref="standby5_Datas" label-width="100px"  :model="standby5_Datas">
                <el-form-item class="submitdate" label="递交日期" prop="submitTime">
                  <el-date-picker v-model="standby5_Datas.submitTime" type="date" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item class="material" label="补正资料" prop="material">
                  <div class="upload_component" style="margin-bottom:20px;">
                    <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby5_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby5" :valueName="'standby5'"   :isDialog="true"></pasuploader>
                    <div class="upload_tip">
                      <div v-if="standby5_Data.length>0">
                        <p v-for="(file,index) in standby5_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby5',file)">删除</span></p>
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="btnbox">
            <el-button size="large" type="primary" @click="commonSubmitu('standby5')" v-if="ischange=='u'">确定</el-button>
            <el-button size="large" type="primary" @click="commonSubmitc('standby5')" v-if="ischange=='c'">确定</el-button>
            <span style="padding-left:50px;"></span>
            <el-button size="large" type="default" @click="commonCancel('standby5')">取消</el-button>
          </div>
      </el-dialog>
      <!-- 修改办登费缴纳信息 -->
      <el-dialog :title="standby6_title" :visible.sync="is_standby6" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby6_Datas" label-width="130px" :model="standby6_Datas">
            <el-form-item class="boardFeeReceiveAmount" label="办登费收款金额（元）" prop="boardFeeReceiveAmount">
              <el-input type="number" v-model="standby6_Datas.boardFeeReceiveAmount" placeholder="请填写办登费收款金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="serviceFee" label="服务费（元）" prop="serviceFee">
              <el-input type="number" v-model="standby6_Datas.serviceFee" placeholder="请填写服务费金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="boardFeeReceiveTime" label="办登费收款日期" prop="boardFeeReceiveTime">
              <el-date-picker v-model="standby6_Datas.boardFeeReceiveTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="maker" label="制单" prop="maker">
              <el-input type="text" v-model="standby6_Datas.maker" placeholder="请填写制单人" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="turnInAmount" label="缴费金额（元）" prop="turnInAmount">
              <el-input type="number" v-model="standby6_Datas.turnInAmount" placeholder="请填写缴费金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="boardFeeTurnInTime" label="办登费缴费日期" prop="boardFeeTurnInTime">
              <el-date-picker v-model="standby6_Datas.boardFeeTurnInTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
			      <el-form-item class="officialYellowTicketNumber" label="官方黄票号" prop="officialYellowTicketNumber">
              <el-input type="text" v-model="standby6_Datas.officialYellowTicketNumber" placeholder="请填写官方黄票号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="material" label="付款凭证" prop="material">
              <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby6_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby6" :valueName="'standby6'"   :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="standby6_Data.length>0">
                      <p v-for="(file,index) in standby6_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby6',file)">删除</span></p>
                    </div>
                  </div>
                </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmitu('standby6')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby6')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby6')">取消</el-button>
        </div>
      </el-dialog>
      <!-- 修改年费信息 -->
      <el-dialog :title="standby7_title" :visible.sync="is_standby7" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="standby7_Datas" label-width="110px"  :model="standby7_Datas">
            <el-form-item class="submitdate" label="年费缴纳方式" prop="yearFeeTurnInType">
              	<el-radio v-model="standby7_Datas.yearFeeTurnInType" :label="1" :disabled='isdisabled'>我司代缴</el-radio>
				        <el-radio v-model="standby7_Datas.yearFeeTurnInType" :label="2" :disabled='isdisabled'>客户自缴</el-radio>
            </el-form-item>
            <div v-if="standby7_Datas.yearFeeTurnInType ==1">
            <el-form-item class="amount" :label="`第${num}年年费收款金额（元）`" prop="yearFeeReceiveAmount">
              <el-input type="number" v-model="standby7_Datas.yearFeeReceiveAmount" placeholder="请填写年费收款金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="serviceamount" label="服务费（元）" prop="serviceFee">
              <el-input type="number" v-model="standby7_Datas.serviceFee" placeholder="请填写年费收款金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="subdate" :label="`第${num}年年费收款时间`" prop="yearFeeReceiveTime">
              <el-date-picker v-model="standby7_Datas.yearFeeReceiveTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="member" label="制单" prop="maker">
              <el-input type="text" v-model="standby7_Datas.maker" placeholder="请填写制单人" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="amounts" label="缴费金额" prop="turnInAmount">
              <el-input type="number" v-model="standby7_Datas.turnInAmount" placeholder="请填写缴费金额" :min="0"></el-input>
            </el-form-item>
            <el-form-item class="subdates" label="缴费时间" prop="turnInTime">
              <el-date-picker v-model="standby7_Datas.turnInTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
			      <el-form-item class="ticket" label="官方黄票号" prop="officialYellowTicketNumber">
              <el-input type="text" v-model="standby7_Datas.officialYellowTicketNumber" placeholder="请填写官方黄票号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="material" label="付款凭证" prop="material">
              <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby7_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby7" :valueName="'standby7'"   :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="standby7_Data.length>0">
                      <p v-for="(file,index) in standby7_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('standby7',file)">删除</span></p>
                    </div>
                  </div>
                </div>
            </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmitu('standby7')" v-if="ischange=='u'">确定</el-button>
          <el-button size="large" type="primary" @click="commonSubmitc('standby7')" v-if="ischange=='c'">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('standby7')">取消</el-button>
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
import pasuploader from 'cps/pasuploader/uploader.vue'
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import { store } from "utils/";
const rootUrl = CONFIG.rootUrl;
const detailUrl = './api/findCaseDetail/{caseSysNo}'
const zlzsUrl='./api/findPasCertificateExpressDetail/{caseSysNo}'
const yearFeeUrl ='./api/editPasYearFeeRecord'
const pasFlowUrl ='./api/editFeedbackOfPasFlow'
const createpasFlowUrl ='./api/createFeedbackOfPasFlow'
const delOtherMaterialUrl = './api/delOtherMaterial/{id}'
const pdfUrl = "./api/preview";
const standby1_Data={
        submitOrg: "",
        submitTime: '',
        declarator: "",
    }
const standby2_Data= {
        applicatNumber: "",
        applicatTime: "",
        applicatFeeDeadline:'',
    }
const standby3_Data={
        turnInApplicatFeeTime: "",
        turnInApplicatFee: "",
        maker: "",
        officialYellowTicketNumber:''
      }
const standby4_Data={
        trialReviewResult: 1,
        supplementReviewDeadline: "",
        rejectReviewDeadline: "",
        boardFeeDeadline:'',
        boardFeeDeadline:'',
        whichYear:''
      }
const standby5_Data={
        submitTime:'',
      }
const standby6_Data={
        boardFeeReceiveAmount: '',
        serviceFee:'',
        boardFeeReceiveTime: "",
        turnInAmount: "",
        boardFeeTurnInTime: '',
        officialYellowTicketNumber: "",
        maker:'',
      }

const standby7_Data={
        yearFeeTurnInType:1,
        yearFeeReceiveAmount: '',
        serviceFee:'',
        yearFeeReceiveTime: "",
        maker: "",
        turnInAmount: '',
        turnInTime: "",
        officialYellowTicketNumber:'',
      }
const yearoptions = [
		{
		  value: '1',
		  name: '0',
		  label: '1'
		}, {
		  value: '2',
		  name: '1',
		  label: '2'
		}, {
		  value: '3',
		  name: '2',
		  label: '3'
		}, {
		  value: '4',
		  name: '3',
		  label: '4'
		}, {
		  value: '5',
		  name: '4',
		  label: '5'
		}, {
		  value: '6',
		  name: '5',
		  label: '6'
		}, {
		  value: '7',
		  name: '6',
		  label: '7'
		}, {
		  value: '8',
		  name: '7',
		  label: '8'
		}, {
		  value: '9',
		  name: '8',
		  label: '9'
		}, {
		  value: '10',
		  name: '9',
		  label: '10'
		}, 
	]
export default {
  components: {
    pasuploader
  },
  data() {
    return {
      yearoptions: yearoptions,
      thetype:1,
      step:11,
      caseSysNo:'',
      ischange:'',
      applyrules: {
        submitOrg: [{ required: true, message: "请填写递交机构", trigger: "blur" }],
        declarator: [{ required: true, message: "请填写申报员", trigger: "blur" }],
	    },
      isfeerules: {
        boardFeeReceiveAmount: [{ required: true, message: "请填写办登费收款金额", trigger: "blur" }],
        maker: [{ required: true, message: "请填写制单人", trigger: "blur" }],
        turnInAmount: [{ required: true, message: "请填写缴费金额", trigger: "blur" }],
      },
      
      // 申请材料
      standby1:'',
      standby1_Data:[],
      standby1_Datas:Object.assign({},standby1_Data),
      standby1_Datac:{},
      standby1_title:'',
      is_standby1:false,
      standby1_name:'',
      // 受理通知
      standby2:'',
      standby2_Data:[],
      standby2_name:'',
      standby2_Datas:Object.assign({},standby2_Data),
      standby2_Datac:{},
      standby2_title:'',
      is_standby2:false,
      // 申请费
      standby3:'',
      standby3_Data:[],
      standby3_name:'',
      standby3_Datas:Object.assign({},standby3_Data),
      standby3_Datac:{},
      standby3_title:'',
      is_standby3:false,
      // 初步审查
      ismodify: false,
      standby4:'',
      standby4_Data:[],
      standby4_name:'',
      standby4_Datas:Object.assign({},standby4_Data),
      standby4_Datac:{},
      standby4_title:'',
      is_standby4:false,
      standby4c_Datac:[],
      // 补正/审查
      ismodifyd: false,
      standby5:'',
      standby5_Data:[],
      standby5_name:'',
      standby5_Datas:Object.assign({},standby5_Data),
      standby5_Datac:{},
      standby5_title:'',
      is_standby5:false,
      standby5c_Datac:[],
      
      // 办登费
      standby6:'',
      standby6_Data:[],
      standby6_name:'',
      standby6_Datas:Object.assign({},standby6_Data),
      standby6_Datac:{},
      standby6_title:'',
      is_standby6:false,
      //专利证书
      zlzsdata:{},
      // 年费
      standby7:'',
      standby7_Data:[],
      standby7_name:'',
      standby7_Datas:Object.assign({},standby7_Data),
      standby7_Datac:{},
      standby7_title:'',
      is_standby7:false,
      num:'',
      // 其他申请材料
      standby8:'',
      standby8_Data:[],
      standby8_name:'',
      // 其他官文材料
      standby9:'',
      standby9_Data:[],
      standby9_name:'',
      isdisabled:false,
      
      
      
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
    setUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
        let isrepeat= false;
        let md= this[data.valueName+'_Data'];
         for(let i=0;i<md.length;i++){
           if(d.url == md[i]['url']){
             isrepeat = true;
             break;
           }
         }
         if(!isrepeat){
            md.unshift(d)
          }
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
    },
    resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
    },
    resetUploaders(valueName,nm){
				this[nm][valueName] = '';
				this[nm][valueName+'_name'] = '';
		},
    uploaderErrCallback(data){
				this.$alert(data.msg);
    },
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
    createFlow(data,whichName){
      let subdata = data||{};
      this.$http.post(createpasFlowUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    editFlow(data,whichName){
      let subdata = data||{};
      this.$http.put(pasFlowUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    editYearFlow(data,whichName){
      let subdata = data||{};
      this.$http.put(yearFeeUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    //定位专用
    commonSubmitu(whichName){
      let subdata = Object.assign({},this[whichName+'_Datas']);
      let arr = [];
      let files = this[whichName+'_Data'];
      if(files.length>0){
        for(let i=0;i<files.length;i++){
          arr.push(files[i]['fileId'])
        }
      }
      if(arr.length>0){
        subdata.fileIds = arr;
      }
      switch(whichName){
        case 'standby1':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          subdata.nextFlowStage = 2;
          subdata.caseSysNo = this.caseSysNo;
          this.$refs.standby1_Datas.validate(valid=>{
            if(valid){
              if(!subdata.submitTime){
                this.$message.warning("请选择提交时间");
                return;
              }
              this.createFlow(subdata,whichName);
            }
          })
          break;
        case 'standby2':
          subdata.applicatTime = this.totimestamp(subdata.applicatTime);
          subdata.applicatFeeDeadline = this.totimestamp(subdata.applicatFeeDeadline);
          subdata.nextFlowStage = 3;
          subdata.caseSysNo = this.caseSysNo;
          if(!subdata.applicatNumber){
            this.$message.warning("请填写申请号");
            return;
          }
          if(!subdata.applicatTime){
            this.$message.warning("请选择申请时间");
            return;
          }
          if(!subdata.applicatFeeDeadline){
            this.$message.warning("请选择申请费缴纳截止时间");
            return;
          }
          this.createFlow(subdata,whichName);
          break;
        case 'standby3':
          subdata.turnInApplicatFeeTime = this.totimestamp(subdata.turnInApplicatFeeTime);
          if(this.isNull(subdata) && this.standby3_Data.length<1){
            this.$message.warning("请填写申请费缴纳信息或者上传支付凭证");
            return;
          }
          subdata.nextFlowStage = 4;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby4':
            subdata.boardFeeDeadline = this.totimestamp(subdata.boardFeeDeadline);
            subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
            subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
            if(!subdata.boardFeeDeadline && subdata.trialReviewResult==1){
              this.$message.warning("请选择办登费缴纳截止时间");
              return;
            }
            if(!subdata.whichYear && subdata.trialReviewResult==1){
              this.$message.warning("请填写第几年度");
              return;
            }
            if(!subdata.supplementReviewDeadline && subdata.trialReviewResult==2){
              this.$message.warning("请选择补正审查截止时间");
              return;
            }
            if(!subdata.rejectReviewDeadline && subdata.trialReviewResult==3){
              this.$message.warning("请选择驳回复审截止时间");
              return;
            }
            subdata.caseSysNo = this.caseSysNo;
            
            if(subdata.trialReviewResult==1){
              subdata.nextFlowStage = 9;
              delete subdata.supplementReviewDeadline
              delete subdata.rejectReviewDeadline
              this.createFlow(subdata,whichName);
            }
            if(subdata.trialReviewResult==2){
              subdata.nextFlowStage = 5;
              delete subdata.boardFeeDeadline
              delete subdata.rejectReviewDeadline
              delete subdata.whichYear
              this.createFlow(subdata,whichName);
            }
            if(subdata.trialReviewResult==3){
              subdata.nextFlowStage = -1;
              delete subdata.supplementReviewDeadline
              delete subdata.boardFeeDeadline
              delete subdata.whichYear
              this.createFlow(subdata,whichName);
            }
            
          break;
        case 'standby5':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期");
            return;
          }
          subdata.nextFlowStage = 4;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby6':
          subdata.boardFeeReceiveTime = this.totimestamp(subdata.boardFeeReceiveTime);
          subdata.boardFeeTurnInTime = this.totimestamp(subdata.boardFeeTurnInTime);
          if(this.isNull(subdata) && this.standby6_Data.length<1){
            this.$message.warning("请填写办登费缴纳信息或者上传支付凭证");
            return;
          }
          subdata.nextFlowStage = 10;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby7':
          subdata.yearFeeReceiveTime = this.totimestamp(subdata.yearFeeReceiveTime);
          subdata.turnInTime = this.totimestamp(subdata.turnInTime);
          if(this.isNull(subdata) && this.standby7_Data.length<1){
            this.$message.warning("请填写年费缴纳信息或者上传支付凭证");
            return;
          }
          if(!subdata.yearFeeTurnInType){
            this.$message.warning("请选择年费缴纳方式");
            return;
          }
          let sdata = {};
          if(subdata.yearFeeTurnInType==2){
            sdata.yearFeeTurnInType = 2;
            sdata.id = subdata.id
            this.editYearFlow(sdata,whichName)
          }else{
            sdata.yearFeeTurnInType = 1;
            sdata.id = subdata.id;
            sdata.yearFeeReceiveAmount = subdata.yearFeeReceiveAmount;
            sdata.serviceFee = subdata.serviceFee;
            sdata.yearFeeTurnInType = subdata.yearFeeTurnInType;
            sdata.yearFeeReceiveTime = subdata.yearFeeReceiveTime;
            sdata.maker = subdata.maker;
            sdata.turnInTime = subdata.turnInTime;
            sdata.turnInAmount = subdata.turnInAmount;
            sdata.officialYellowTicketNumber = subdata.officialYellowTicketNumber;
            sdata.fileIds = subdata.fileIds;
            this.editYearFlow(sdata,whichName)
          }
          // this.editYearFlow(subdata,whichName)
          break;
      }
        
    },
    commonSubmitc(whichName){
      let subdata = Object.assign({},this[whichName+'_Datas']);
      let arr = [];
      let files = this[whichName+'_Data'];
      if(files.length>0){
        for(let i=0;i<files.length;i++){
          arr.push(files[i]['fileId'])
        }
      }
      if(arr.length>0){
        subdata.fileIds = arr;
      }else{
        // subdata.fileIds = null;
        delete subdata.fileIds
        delete subdata.pasFiles
      }
      switch(whichName){
        case 'standby1':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          this.$refs.standby1_Datas.validate(valid=>{
            if(valid){
              if(!subdata.submitTime){
                this.$message.warning("请选择提交时间");
                return;
              }
              this.editFlow(subdata,whichName)
            }
          })
          break;
        case 'standby2':
          subdata.applicatTime = this.totimestamp(subdata.applicatTime);
          subdata.applicatFeeDeadline = this.totimestamp(subdata.applicatFeeDeadline);
          if(!subdata.applicatNumber){
            this.$message.warning("请填写申请号");
            return;
          }
          if(!subdata.applicatTime){
            this.$message.warning("请选择申请时间");
            return;
          }
          if(!subdata.applicatFeeDeadline){
            this.$message.warning("请选择申请费缴纳截止时间");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby3':
          subdata.turnInApplicatFeeTime = this.totimestamp(subdata.turnInApplicatFeeTime);
          if(this.isNull(subdata) && this.standby3_Data.length<1){
            this.$message.warning("请填写申请费缴纳信息或者上传支付凭证");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby4':
          subdata.boardFeeDeadline = this.totimestamp(subdata.boardFeeDeadline);
          subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
          subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
          if(!subdata.boardFeeDeadline && subdata.trialReviewResult==1){
            this.$message.warning("请选择办登费缴纳截止时间");
            return;
          }
          if(!subdata.whichYear && subdata.trialReviewResult==1){
            this.$message.warning("请填写第几年度");
            return;
          }
          if(!subdata.supplementReviewDeadline && subdata.trialReviewResult==2){
            this.$message.warning("请选择补正审查截止时间");
            return;
          }
          if(!subdata.rejectReviewDeadline && subdata.trialReviewResult==3){
            this.$message.warning("请选择驳回复审截止时间");
            return;
          }
          this.editFlow(subdata,whichName)        
          break;
        case 'standby5':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期");
            return
          }
          this.editFlow(subdata,whichName)
          break;
       
        case 'standby6':
          subdata.boardFeeReceiveTime = this.totimestamp(subdata.boardFeeReceiveTime);
          subdata.boardFeeTurnInTime = this.totimestamp(subdata.boardFeeTurnInTime);
          if(this.isNull(subdata) && this.standby6_Data.length<1){
            this.$message.warning("请填写申请费缴纳信息或者上传支付凭证");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby7':
          subdata.yearFeeReceiveTime = this.totimestamp(subdata.yearFeeReceiveTime);
          subdata.turnInTime = this.totimestamp(subdata.turnInTime);
          if(this.isNull(subdata) && this.standby7_Data.length<1){
            this.$message.warning("请填写年费缴纳信息或者上传支付凭证");
            return;
          }
          if(!subdata.yearFeeTurnInType){
            this.$message.warning("请选择年费缴纳方式");
            return;
          }
          let sdata = {};
          if(subdata.yearFeeTurnInType==2){
            sdata.yearFeeTurnInType = 2;
            sdata.id = subdata.id
            this.editYearFlow(sdata,whichName)
          }else{
            sdata.yearFeeTurnInType = 1;
            sdata.id = subdata.id;
            sdata.yearFeeReceiveAmount = subdata.yearFeeReceiveAmount;
            sdata.serviceFee = subdata.serviceFee;
            sdata.yearFeeTurnInType = subdata.yearFeeTurnInType;
            sdata.yearFeeReceiveTime = subdata.yearFeeReceiveTime;
            sdata.maker = subdata.maker;
            sdata.turnInTime = subdata.turnInTime;
            sdata.turnInAmount = subdata.turnInAmount;
            sdata.officialYellowTicketNumber = subdata.officialYellowTicketNumber;
            sdata.fileIds = subdata.fileIds;
            this.editYearFlow(sdata,whichName)
          }
          // this.editYearFlow(subdata,whichName)
          break;
      }
        
    },
    commonCancel(whichName){
      this[whichName+'_Data'] = [];
      this.resetUploader(whichName);
      this['is_'+whichName] = false;
    },
    otherDel(nm,item){
      this.$confirm('您确定要删除吗？','提示',{
			  confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
		  }).then(res=>{
        this.$http.delete(delOtherMaterialUrl.replace("{id}",item.id)).then(res=>{
          this.commonDel(nm,item)
        })
		  })
      
    },
    commonDel(aName,it){
      let datas = this[aName+'_Data'];
      for(let i=0;i<datas.length;i++){
        if(it.fileName ==datas[i]['fileName']){
          datas.splice(i,1);
          if(it.url==this[aName]){
            this.resetUploader(aName)
          }
          break;
        }
      }
      if(this[aName+'_Data'].length==0){
          this.resetUploader(aName)
      }
    },
    torevise() {
      store.set('pas_modify_basic',this.detailInfo.baseInfo);
      let step = this.$route.params.step;
      if(step==11){
        this.$router.push({name: "uploadApplyRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==12){
        this.$router.push({name: "uploadNoticeRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==13){
        this.$router.push({name: "applyFeeRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==14){
        this.$router.push({name: "firstAuditRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==15){
        this.$router.push({name: "toBeFilledRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==16){
        this.$router.push({name: "rejectedRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==17){
        this.$router.push({name: "bdfPayRevise",params: { state: this.caseSysNo,type:1,}});
      }
      if(step==18){
        this.$router.push({name: "yearPayRevise",params: { state: this.caseSysNo,type:1,}});
      }
      
    },
    uploadMaterial(uc,t,n) {
      if(uc=='u'){
        this.ischange = 'u';
        switch(t){
          case 'standby1':
            this[t+'_Datas'] = Object.assign({},standby1_Data);
            this[t+'_title'] = '上传申请材料';
            break;
          case 'standby2':
            this[t+'_Datas'] = Object.assign({},standby2_Data);
            this[t+'_title'] = '受理通知';
            break;
          case 'standby3':
            this[t+'_Datas'] = Object.assign({},standby3_Data);
            this[t+'_title'] = '申请费缴纳信息';
            break;
          case 'standby4':
            this[t+'_Datas'] = Object.assign({},standby4_Data);
            this[t+'_title'] = '反馈初步审查结果';
            this.ismodify = false;
            break;
          
          case 'standby5':
            this[t+'_Datas'] = Object.assign({},standby5_Data);
            this[t+'_title'] = '上传补正材料';
            this.ismodifyd = false;
            break;
          
          case 'standby6':
            this[t+'_Datas'] = Object.assign({},standby6_Data);
            this[t+'_title'] = '缴纳办登费信息';
            break;
          case 'standby7':
            this.isdisabled = false;
            this[t+'_Datas'] = Object.assign({},n);
            this.num = n['whichYear'];
            this[t+'_title'] = `第${this.num}年年费信息`;
            break;
        }
      }else{
        this.ischange = 'c';
        this[t+'_Datas'] = Object.assign({},n);
        if(n['pasFiles']){
          this[t+'_Data'] = [...n['pasFiles']];
        }
        switch(t){
          case 'standby1':
            this[t+'_title'] = '修改申请材料';
            break;
          case 'standby2':
            this[t+'_title'] = '修改受理通知';
            break;
          case 'standby3':
            this[t+'_title'] = '修改申请费缴纳信息';
            break;
          case 'standby4':
            this[t+'_title'] = '修改初步审查结果';
            this.ismodify = true;
            break;
          case 'standby5':
            this[t+'_title'] = '修改补正材料';
            break;
          case 'standby6':
            this[t+'_title'] = '修改缴纳办登费信息';
            break;
          case 'standby7':
            this.num = n['whichYear'];
            this.isdisabled = true;
            this[t+'_title'] = `第${this.num}年年费信息`;
            break;
        }
      }
      this['is_'+t] = true
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
          this.$message.error(err.response.data.msg);;
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
    this.step = this.$route.params.step;
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
    sendTypeFormat: Filters.sendTypeFormat,
    yearFeeTurnInTypeFormat:Filters.yearFeeTurnInTypeFormat
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
            &:first-child{
              padding-top: 0;
            }
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
a.downloadbtn,
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

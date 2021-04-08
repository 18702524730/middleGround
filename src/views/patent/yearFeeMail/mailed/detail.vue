<template>
  <div class="patentdetail">
    <div class="service_detail_tab">
      <ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}">案件信息</li>
      </ul>
      <span class="tobackbtn" @click="pageback">返回</span>
    </div>
    <div class="form">
      <template >
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
        <!-- 申请费发票邮寄 -->
        <div class="basic_lists">
          <div class="basictitle">
            <h3 class = 'fl'>第{{detailInfo.pasExpressInfoForm.whichYear}}年度年费</h3>
            <el-button type="primary" @click="openDailog('change','nf')" class = 'fr'>修改</el-button>
          </div>
          <div class="basic_category clearfix" v-if="detailInfo.pasExpressInfoForm">
            <ul>
                <li>
                  <p class="tit nopay">第几年度年费：</p>
                  <p class="txt nopay">{{detailInfo.pasExpressInfoForm.whichYear}}</p>
                </li>
                <li>
                  <p class="tit nopay">截止日期：</p>
                  <p class="txt nopay">{{detailInfo.pasExpressInfoForm.deadline|dateFormat}}</p>
                </li>
                <li>
                  <p class="tit">年费缴纳方式：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.yearFeeTurnInType|yearFeeTurnInTypeFormat}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">第{{detailInfo.pasExpressInfoForm.whichYear}}年年费收款金额（元）：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.yearFeeReceiveAmount|priceFormat}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">第{{detailInfo.pasExpressInfoForm.whichYear}}年年费收款时间：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.yearFeeReceiveTime|dateFormat}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">制单：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.maker}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">缴费时间：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.yearTurnInTime|dateFormat}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">缴费金额（元）：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.yearTurnInAmount |priceFormat}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.yearFeeTurnInType==1">
                  <p class="tit">官方黄票号：</p>
                  <p class="txt">{{detailInfo.pasExpressInfoForm.officialYellowTicketNumber}}</p>
                </li>
                <li v-if="detailInfo.pasExpressInfoForm.pasFiles">
                  <p class="tit">付款凭证：</p>
                  <div class="txt">
                      <div v-for="(f,k) in detailInfo.pasExpressInfoForm.pasFiles" :key="k">
                        <span class="ziliao">{{f.fileName}}</span>
                        <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                        <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                      </div>
                  </div>
                </li>
            </ul>
            <ul>
              <li>
                <p class="tit">电子/纸质发票：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.invoiceForm|paperFormat}}</p>
              </li>
              <li>
                <p class="tit">寄送方式：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.sendType|sendTypeFormat}}</p>
              </li>
              <li>
                <p class="tit">办登费官费号：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.officialTicketNumber}}</p>
              </li>
              <li>
                <p class="tit">办登费服务费票号:</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.serviceTicketNumber}}</p>
              </li>
              <li>
                <p class="tit">开票时间：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.invoiceTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">备注：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.remarks}}</p>
              </li>
              <li>
                <p class="tit">（票）收件人：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.addressee}}</p>
              </li>
              <li>
                <p class="tit">（票）收件电话：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.telephone}}</p>
              </li>
              <li>
                <p class="tit">（票）收件地址:</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.address}}</p>
              </li>
              <li>
                <p class="tit">快递单号：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.expressNo}}</p>
              </li>
              <li>
                <p class="tit">邮寄日期：</p>
                <p class="txt">{{detailInfo.pasExpressInfoForm.expressTime|dateFormat}}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <!-- 发票邮寄信息 -->
      <el-dialog :title="mailtitle" :visible.sync="isapplymail" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="maildatas" label-width="130px" :model="maildatas" :rules='mailRule'>
            <el-form-item class="addressee" label="（票）收件人" prop="addressee">
              <el-input type="text" v-model="maildatas.addressee" placeholder="请填写收件人" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item class="telephone" label="（票）收件电话" prop="telephone">
              <el-input type="text" v-model="maildatas.telephone" placeholder="请填写收件电话" :maxlength="11"></el-input>
            </el-form-item>
			      <el-form-item class="address" label="（票）收件地址" prop="address">
              <el-input type="text" v-model="maildatas.address" placeholder="请填写收件地址" ></el-input>
            </el-form-item>
            <el-form-item class="expressNo" label="快递单号" prop="expressNo">
              <el-input type="text" v-model="maildatas.expressNo" placeholder="请填写快递单号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="submitdate" label="邮寄日期" prop="expressTime">
              <el-date-picker v-model="maildatas.expressTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmit('change')">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel()">取消</el-button>
        </div>
      </el-dialog>
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
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import {telephoneRule} from "utils/validate.js";
import { store } from "utils/";
const rootUrl = CONFIG.rootUrl;
const detailUrl = "./api/findPasExpressDetail";
const addUrl = "./api/addPasExpress";
const editUrl = "./api/editPasExpress";
const maildata={
        addressee: "",
        telephone: '',
        address: "",
        expressNo:'',
        expressTime:'',
      }
export default {
  data() {
    return {
      maildatas:Object.assign({},maildata),
      rootUrl: rootUrl,
      mailRule:{
        addressee: [{ required: true, message: "请填写收件人", trigger: "blur" }],
        telephone: [
          { required: true, message: "请填写收件人电话", trigger: "blur" },
          {validator: telephoneRule,trigger: 'blur'}
        ],
        address: [{ required: true, message: "请填写收件人地址", trigger: "blur" }],
        expressNo: [
          { required: true, message: "请填写快递单号", trigger: "blur" }
        ],
      },
      isapplymail: false,
      mailtitle:'',
      status: 1,
      caseSysNo:'',
      type:1,
      detailInfo:{
        baseInfo:{},
        pasExpressInfoForm:{}
      },
      proxyImg: [],
      dialogImg: false,
      token:''
    };
  },
  watch: {
  },
  filters:{
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
  methods: {
    search() {
      var self = this;
      let data = {
        caseSysNo: this.caseSysNo,
        caseType: this.type
      }
      this.$http.get(detailUrl,{params:data})
        .then(resp => {
          self.detailInfo = resp.data;
          console.log(this.detailInfo)
        })
        .catch(err => {
          this.$message.error(err.response.data.msg);
        });
    },
    totimestamp(str) {
        return str?new Date(str).getTime():null
    },
    openDailog(t,n){
      if(t=='add'){
        this.maildatas = Object.assign({},maildata)
        if(n=='sqf'){
          this.mailtitle = '申请费邮寄信息'
        }
        if(n=='bdf'){
          this.mailtitle = '办登费邮寄信息'
        }
        if(n=='nf'){
          this.mailtitle = '年费费邮寄信息'
        }
      }
      if(t=='change'){
        this.maildatas = Object.assign({},this.detailInfo.pasExpressInfoForm)
        if(n=='sqf'){
          this.mailtitle = '修改申请费邮寄信息'
        }
        if(n=='bdf'){
          this.mailtitle = '修改办登费邮寄信息'
        }
        if(n=='nf'){
          this.mailtitle = '修改年费费邮寄信息'
        }
      }
      this.isapplymail = true;
    },
    commonSubmit(t){
      let datas = Object.assign({},this.maildatas);
      datas.expressTime = this.totimestamp(datas.expressTime)
      datas.caseSysNo = this.caseSysNo;
      datas.invoiceId = this.detailInfo.pasExpressInfoForm.id;
      // let sdata = {};
      // sdata.expressTime = this.totimestamp(datas.expressTime)
      // sdata.caseSysNo = this.caseSysNo;
      // sdata.addressee = datas.addressee
      // sdata.telephone = datas.telephone
      // sdata.address = datas.address
      // sdata.expressNo = datas.expressNo
      if(t=='add'){
        
        // sdata.invoiceId = this.detailInfo.pasExpressInfoForm.id;
        this.$refs.maildatas.validate(valid=>{
          if(valid){
            if(!datas.expressTime){
              this.$message.warning('请选择邮寄日期');
              return;
            }
            this.$http.post(addUrl,datas).then(res=>{
              this.$message.success('操作成功');
              this.commonCancel();
              this.search()
            }).catch(err=>{
              this.$message.error(err.response.data.msg)
            })
          }
        })
      };
      if(t=='change'){
        datas.id = this.detailInfo.pasExpressInfoForm.expressId;
        // sdata.id = this.detailInfo.pasExpressInfoForm.expressId;
        // sdata.invoiceId = this.detailInfo.pasExpressInfoForm.id;
        this.$refs.maildatas.validate(valid=>{
          if(valid){
            if(!datas.expressTime){
              this.$message.warning('请选择邮寄日期');
              return;
            }
            this.$http.post(editUrl,datas).then(res=>{
              this.$message.success('操作成功');
              this.commonCancel();
              this.search()
            }).catch(err=>{
              this.$message.error(err.response.data.msg)
            })
          }
        })
      };
    },
    commonCancel(){
      this.maildatas = Object.assign({},maildata)
      this.isapplymail = false;
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
    this.type = this.$route.params.type;
    this.search();
    this.token = VueCookie.get("token");
  },
  
};
</script>


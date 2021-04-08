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
                <p class="txt">{{detailInfo.baseInfo.contractAmount}}</p>
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
                <p class="txt">{{detailInfo.baseInfo.channelSettleSebeAmount}}</p>
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
        <!-- 获得专利证书 -->
        <div class="basic_lists">
          <div class="basictitle">
            <h3 class = 'fl'>获取专利证书</h3>
            <el-button type="primary" @click="openDailog('pletter')" class = 'fr' v-if="detailInfo.obtainCertificate">修改</el-button>
          </div>
          <div class="basic_category clearfix"  v-if="detailInfo.obtainCertificate">
            <ul class="fl">
                  <li>
                    <p class="tit">授权日：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.authTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">授权公开号：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.authPublicNumber}}</p>
                  </li>
                  <li>
                    <p class="tit">收证日期：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.receiveCertificateTime|dateFormat}}</p>
                  </li>
                  <li>
                    <p class="tit">寄送方式：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.sendType|sendTypeFormat}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==2">
                    <p class="tit">代领人员：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.fetcher}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==1">
                    <p class="tit">证书邮寄日期：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.certificateSendTime|dateFormat}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==1">
                    <p class="tit">证书邮寄单号：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.certificateSendNumber}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==1">
                    <p class="tit">（证书）收件人：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.receiver}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==1">
                    <p class="tit">（证书）收件电话：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.receivePhone}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.sendType==1">
                    <p class="tit">（证书）收件地址：</p>
                    <p class="txt">{{detailInfo.obtainCertificate.receiveAddress}}</p>
                  </li>
                  <li v-if="detailInfo.obtainCertificate.pasFiles">
                    <p class="tit">官文：</p>
                    <div class="txt">
                        <div v-for="(f,k) in detailInfo.obtainCertificate.pasFiles" :key="k">
                          <span class="ziliao">{{decodeURIComponent(f.fileName)}}</span>
                          <span class="downloadbtn" @click="preview(f.fileUrl)">预览</span>
                          <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+f.fileUrl" target="_blank"  class="downloadbtn">下载</a>
                        </div>
                    </div>
                  </li>
            </ul>
          </div>
        </div>
      </template>
      <!-- 专利证书邮寄信息 -->
      <el-dialog title="修改专利证书邮寄信息" :visible.sync="is_pletter" class="state_preview">
        <div class="reviseapplybox">
          <el-form ref="zlzsdatas" label-width="130px" :model="pletter_Datas">
            <el-form-item class="submitdate" label="授权日" prop="authTime">
              <el-date-picker v-model="pletter_Datas.authTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="submitdate" label="授权公开号" prop="authPublicNumber">
              <el-input type="text" v-model="pletter_Datas.authPublicNumber" placeholder="请填写授权公开号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="submitdate" label="收证日期" prop="receiveCertificateTime">
              <el-date-picker v-model="pletter_Datas.receiveCertificateTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="submitdate" label="寄送方式：" prop="sendType">
              	<el-radio v-model="pletter_Datas.sendType" :label="1">快递邮寄</el-radio>
				        <el-radio v-model="pletter_Datas.sendType" :label="2">商务代领</el-radio>
            </el-form-item>
            <el-form-item class="fetcher" label="代领人员：" prop="fetcher" v-show='pletter_Datas.sendType==2'>
              <el-input type="text" v-model="pletter_Datas.fetcher" placeholder="请填写代领人姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="mailDate" label="证书邮寄日期" prop="certificateSendTime" v-show='pletter_Datas.sendType==1'>
              <el-date-picker v-model="pletter_Datas.certificateSendTime" type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="mailNum" label="证书邮寄单号" prop="certificateSendNumber" v-show='pletter_Datas.sendType==1'>
              <el-input type="text" v-model="pletter_Datas.certificateSendNumber" placeholder="请填写证书邮寄单号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="addressee" label="（证书）收件人" prop="receiver" v-show='pletter_Datas.sendType==1'>
              <el-input type="text" v-model="pletter_Datas.receiver" placeholder="请填写收件人" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item class="phone" label="（证书）收件电话" prop="receivePhone" v-show='pletter_Datas.sendType==1'>
              <el-input type="text" v-model="pletter_Datas.receivePhone" placeholder="请填写收件电话" :maxlength="11"></el-input>
            </el-form-item>
			      <el-form-item class="address" label="（证书）收件地址" prop="receiveAddress" v-show='pletter_Datas.sendType==1'>
              <el-input type="text" v-model="pletter_Datas.receiveAddress" placeholder="请填写收件地址" ></el-input>
            </el-form-item>
            <el-form-item class="official" label="官文" prop="official">
              <div class="upload_component" style="margin-bottom:20px;">
                  <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="pletter_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="pletter" :valueName="'pletter'"  :isDialog="true"></pasuploader>
                  <div class="upload_tip">
                    <div v-if="pletter_Data.length>0">
                      <p v-for="(file,index) in pletter_Data" :key="index">已上传：{{decodeURIComponent(file.fileName)}} <span class="downloadbtn" @click="commonDel('pletter',file)">删除</span></p>
                    </div>
                  </div>
                </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="btnbox">
          <el-button size="large" type="primary" @click="commonSubmit('pletter')">确定</el-button>
          <span style="padding-left:50px;"></span>
          <el-button size="large" type="default" @click="commonCancel('pletter')">取消</el-button>
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
import pasuploader from 'cps/pasuploader/uploader.vue'
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import { store } from "utils/";
const zlzsUrl='./api/findPasCertificateExpressDetail/{caseSysNo}'
const pasFlowUrl ='./api/editFeedbackOfPasFlow'
const createpasFlowUrl ='./api/createFeedbackOfPasFlow'
const rootUrl = CONFIG.rootUrl;
const pletter_Data={
        authTime:'',
        authPublicNumber:'',
        receiveCertificateTime: '',
        certificateSendTime:'',
        certificateSendNumber: "",
        receiver: "",
        receivePhone: '',
        receiveAddress: "",
        sendType:'',
        fetcher:''
      }
export default {
  components:{
    pasuploader
  },
  data() {
    return {
      pletter_Datas:Object.assign({},pletter_Data),
      detailInfo:{
        baseInfo:{},
        obtainCertificate:{}
      },
      is_pletter: false,
      pletter_name:'',
      pletter:'',
      pletter_Data:[],
      status: 1,
      caseSysNo:'',
      dialogImg: false,
      proxyImg:[],
      rootUrl: rootUrl,
      token:''
    };
  },
  watch: {
  },
  methods: {
    setUploadedMaterial(data){
        var d = data.data;
        let isrepeat= false;
        let md= this[data.valueName+'_Data'];
         for(let i=0;i<md.length;i++){
           if(d.url == md[i]['url']){
             isrepeat = true;
             break;
           }
         }
         if(!isrepeat){
            md.push(d)
          }
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
    },
      resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
			},
      uploaderErrCallback(data){
				this.$alert(data.msg);
      },
      commonDel(aName,it){
        let datas = this[aName+'_Data'];
        for(let i=0;i<datas.length;i++){
          if(it.id ==datas[i]['id']){
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
      totimestamp(str) {
        return str?new Date(str).getTime():null
      },
      createFlow(data,whichName){
        let subdata = data||{};
        this.$http.post(createpasFlowUrl,subdata).then(res=>{
          this.$message.success('操作成功');
          
          this.commonCancel(whichName)
          this.$router.go(-1)
        }).catch(err=>{
          console.log(err)
          this.$message.error(err.response.data.msg);
        })
      },
      editFlow(data,whichName){
        let subdata = data||{};
        this.$http.put(pasFlowUrl,subdata).then(res=>{
          this.$message.success('操作成功');
          this.getzlzs()
          this.commonCancel(whichName)
        }).catch(err=>{
          this.$message.error(err.response.data.msg);
        })
      },
      commonSubmit(whichName){
        
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
          subdata.fileIds = null;
        }

        if(!subdata.authTime){
          this.$message.warning("请选择授权日");
          return;
        }
        if(!subdata.authPublicNumber){
          this.$message.warning("请填写授权公开号");
          return;
        }
        if(!subdata.receiveCertificateTime){
          this.$message.warning("请选择收证日期");
          return;
        }
        if(!subdata.sendType){
          this.$message.warning("请选择寄送方式");
          return;
        }
        let exp = /^1\d{10}$/
        if(subdata.sendType==1&&subdata.receivePhone&& !exp.test(subdata.receivePhone)){
          this.$message.warning('请输入正确的手机号')
          return
        }
        subdata.authTime = this.totimestamp(subdata.authTime);
        subdata.receiveCertificateTime = this.totimestamp(subdata.receiveCertificateTime);
        subdata.certificateSendTime = this.totimestamp(subdata.certificateSendTime);
        
        subdata.caseSysNo = this.caseSysNo;
        if(subdata.sendType==1){
          delete subdata.fetcher;
        }
        if(subdata.sendType==2){
          delete subdata.certificateSendTime
          delete subdata.certificateSendNumber
          delete subdata.receiver
          delete subdata.receivePhone
          delete subdata.receiveAddress
        }
        this.editFlow(subdata,whichName);
      },
      commonCancel(whichName){
        this.pletter_Datas = Object.assign({},pletter_Data)
        this['is_'+whichName] = false;
      },
    openDailog(t){
      let odata = this.detailInfo.obtainCertificate
      this[t+'_Datas'] = Object.assign({},odata);
        if(odata['pasFiles']){
          this[t+'_Data'] = odata['pasFiles'];
        }
      this.is_pletter = true;
    },
    getzlzs(){
      this.$http.get(zlzsUrl.replace('{caseSysNo}',this.$route.params.id)).then(res=>{
        this.detailInfo = res.data
      })
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
    this.caseSysNo = this.$route.params.id
    this.getzlzs();
    this.token = VueCookie.get("token");
  },
  filters: {
    patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
    invoiceTypeFormat: Filters.invoiceTypeFormat,
    sendTypeFormat: Filters.sendTypeFormat
  },
};
</script>


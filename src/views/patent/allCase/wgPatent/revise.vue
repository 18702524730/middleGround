<template>
<div class="patentdetail">
  <div class="form">
    <div class="basic_lists revise" style="padding-top:0">
          <div class="basictitle">
            <h3 class='fl'>基本信息</h3>
            <div class='fr'>
              <el-button  type="default" @click="toback">返回</el-button>
            </div>
          </div>
          <div class="basic_category clearfix">
            <div class="fl itembasic">
            <el-form ref="form" label-width="150px" :rules="amountRules" :model="addData">
                <el-form-item class="caseNo" label="订单号（案号）：" prop="caseNo">
                  <el-input type="text" v-model="addData.caseNo" placeholder="请填写订单号（案号）" ></el-input>
                </el-form-item>
                <el-form-item class="businessSrc" label="业务来源：" prop="businessSrc">
                  <el-input type="text" v-model="addData.businessSrc" placeholder="请填写业务来源" ></el-input>
                </el-form-item>
                <el-form-item class="phone" label="手机号：" prop="phone">
                  <el-input type="text" v-model="addData.phone" placeholder="请填写手机号" :maxlength="40"></el-input>
                </el-form-item>
                <el-form-item class="patentName" label="专利名称：" prop="patentName">
                  <el-input type="text" v-model="addData.patentName" placeholder="请填写专利名称" ></el-input>
                </el-form-item>
                <el-form-item class="feeDeduct" label="是否费减：" prop="feeDeduct">
                  <el-radio v-model="addData.feeDeduct" :label="1">是</el-radio>
                  <el-radio v-model="addData.feeDeduct" :label="0">否</el-radio> 
                </el-form-item>
                <el-form-item class="subjectQualifyNo" label="主体资格编号：" prop="subjectQualifyNo">
                  <el-input type="text" v-model="addData.subjectQualifyNo" placeholder="请填写主体资格编号" ></el-input>
                </el-form-item>
                <el-form-item class="firstInventorIdcard" label="第一发明人身份证号：" prop="firstInventorIdcard">
                  <el-input type="text" v-model="addData.firstInventorIdcard" placeholder="请填写第一发明人身份证号" :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item class="serviceFee" label="服务费（元）：" prop="serviceFee" >
                  <el-input type="text" v-model="addData.serviceFee" placeholder="请填写服务费" :maxlength="11" ></el-input>
                </el-form-item>
                <el-form-item class="contractAmount" label="合同金额（元）：" prop="contractAmount">
                  <el-input type="text" v-model="addData.contractAmount" placeholder="请填写合同金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="invoiceTitle" label="发票抬头：" prop="invoiceTitle">
                  <el-input type="text" v-model="addData.invoiceTitle" placeholder="请填写发票抬头" ></el-input>
                </el-form-item>
                <el-form-item class="invoiceCode" label="公司税号：" prop="invoiceCode">
                  <el-input type="text" v-model="addData.invoiceCode" placeholder="请填写公司税号" ></el-input>
                </el-form-item>
                <el-form-item class="bank" label="开户银行：" prop="bank">
                  <el-input type="text" v-model="addData.bank" placeholder="请填写开户银行" ></el-input>
                </el-form-item>
                <el-form-item class="firstCollectMoneyTime" label="首次收款时间：" prop="firstCollectMoneyTime">
                  <el-date-picker
                    v-model="addData.firstCollectMoneyTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="secondCollectMoneyTime" label="二次收款时间：" prop="secondCollectMoneyTime">
                  <el-date-picker
                    v-model="addData.secondCollectMoneyTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="orderSn" label="订单编号：" prop="orderSn">
                  <el-input type="text" v-model="addData.orderSn" placeholder="请填写订单编号" ></el-input>
                </el-form-item>
                <el-form-item class="buyerWw" label="买家旺旺：" prop="buyerWw">
                  <el-input type="text" v-model="addData.buyerWw" placeholder="请填写买家旺旺" ></el-input>
                </el-form-item>
                <el-form-item class="channelDivisionTime" label="渠道分案时间：" prop="channelDivisionTime">
                  <el-date-picker
                    v-model="addData.channelDivisionTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="sebeSettleChannelAmount" label="拾贝结算渠道金额（渠道填写）：" prop="sebeSettleChannelAmount">
                  <el-input type="text" v-model="addData.sebeSettleChannelAmount" placeholder="请填写拾贝结算渠道金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="serviceProvider" label="服务商：" prop="serviceProvider">
                  <el-input type="text" v-model="addData.serviceProvider" placeholder="请填写服务商" ></el-input>
                </el-form-item>
                <el-form-item class="platformReceiveCaseTime" label="平台收案时间：" prop="platformReceiveCaseTime">
                  <el-date-picker
                    v-model="addData.platformReceiveCaseTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="agent" label="代理人：" prop="agent">
                  <el-input type="text" v-model="addData.agent" placeholder="请填写代理人" ></el-input>
                </el-form-item>
                <el-form-item class="eventDeadline" label="事件绝限时间：" prop="eventDeadline">
                  <el-date-picker
                    v-model="addData.eventDeadline"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="correspondAmount" label="对应金额（元）：" prop="correspondAmount">
                  <el-input type="text" v-model="addData.correspondAmount" placeholder="对应金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="processMethod" label="处理方式：" prop="processMethod">
                  <el-input type="text" v-model="addData.processMethod" placeholder="请填写处理方式" ></el-input>
                </el-form-item>
                <el-form-item label="收件地址：">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入地址"
                    v-model="addData.receiveAddress">
                  </el-input>
                </el-form-item>
                <el-form-item class="remark" label="备注：" prop="remark">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="addData.remark">
                  </el-input>
                </el-form-item>
            </el-form>
            </div>
            <div class="fl itembasic">
            <el-form ref="form1" label-width="150px" :rules="amountRules" :model="addData">
                <el-form-item class="businessManager" label="业务员：" prop="businessManager">
                  <el-input type="text" v-model="addData.businessManager" placeholder="请填写业务员" ></el-input>
                </el-form-item>
                <el-form-item class="contacter" label="联系人：" prop="contacter">
                  <el-input type="text" v-model="addData.contacter" placeholder="请填写联系人" ></el-input>
                </el-form-item>
                <el-form-item class="contactMail" label="联系邮箱：" prop="contactMail">
                  <el-input type="text" v-model="addData.contactMail" placeholder="请填写联系邮箱" ></el-input>
                </el-form-item>
                <el-form-item class="contractNo" label="合同号：" prop="contractNo">
                  <el-input type="text" v-model="addData.contractNo" placeholder="请填写合同号" ></el-input>
                </el-form-item>
                <el-form-item class="applicant" label="申请人：" prop="applicant">
                  <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
                </el-form-item>
                <el-form-item class="inventor" label="发明人(按申请书顺序):" prop="inventor">
                  <el-input type="text" v-model="addData.inventor" placeholder="请填写发明人" ></el-input>
                </el-form-item>
                <el-form-item class="officialFee" label="官费（元）：" prop="officialFee">
                  <el-input type="text" v-model="addData.officialFee" placeholder="请填写官费" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="amount" label="此单金额（元）：" prop="amount">
                  <el-input type="text" v-model="addData.amount" placeholder="请填写此单金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="invoiceType" label="发票类型：" prop="invoiceType">
                  <el-radio v-model="addData.invoiceType" :label="1">专票</el-radio>
                  <el-radio v-model="addData.invoiceType" :label="2">普票</el-radio> 
                </el-form-item>
                <el-form-item class="registAddress" label="公司注册地址：" prop="registAddress">
                  <el-input type="text" v-model="addData.registAddress" placeholder="请填写公司注册地址"></el-input>
                </el-form-item>
                
                <el-form-item class="financePhone" label="财务电话：" prop="financePhone">
                  <el-input type="text" v-model="addData.financePhone" placeholder="请填写财务电话" ></el-input>
                </el-form-item>
                <el-form-item class="bankAccount" label="开户银行账号：" prop="bankAccount">
                  <el-input type="text" v-model="addData.bankAccount" placeholder="请填写开户银行账号" ></el-input>
                </el-form-item>
                <el-form-item class="firstCollectMoneyAmount" label="首次收款金额（元）：" prop="firstCollectMoneyAmount">
                 <el-input type="text" v-model="addData.firstCollectMoneyAmount" placeholder="请填写首次收款金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="secondCollectMoneyAmount" label="二次收款金额（元）：" prop="secondCollectMoneyAmount">
                  <el-input type="text" v-model="addData.secondCollectMoneyAmount" placeholder="请填写二次收款金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="xsySn" label="销售易流水号：" prop="xsySn">
                  <el-input type="text" v-model="addData.xsySn" placeholder="请填写销售易流水号" ></el-input>
                </el-form-item>
                <el-form-item class="requirementSn" label="需求编号：" prop="requirementSn">
                  <el-input type="text" v-model="addData.requirementSn" placeholder="请填写需求编号" ></el-input>
                </el-form-item>
                <el-form-item class="channelDivisonPerson" label="渠道分案员：" prop="channelDivisonPerson">
                  <el-input type="text" v-model="addData.channelDivisonPerson" placeholder="请填写渠道分案员" ></el-input>
                </el-form-item>
                <el-form-item class="channelSettleSebeAmount" label="渠道结算拾贝金额（渠道填写）：" prop="channelSettleSebeAmount">
                  <el-input type="text" v-model="addData.channelSettleSebeAmount" placeholder="请填写渠道结算拾贝金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="remitter" label="汇款人（渠道填写）：" prop="remitter">
                  <el-input type="text" v-model="addData.remitter" placeholder="请填写汇款人" ></el-input>
                </el-form-item>
                <el-form-item class="channelReturnCaseTime" label="渠道回案时间：" prop="channelReturnCaseTime">
                  <el-date-picker
                    v-model="addData.channelReturnCaseTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="caseCurrentState" label="案件当前状态：" prop="caseCurrentState">
                  <el-input type="text" v-model="addData.caseCurrentState" placeholder="请填写案件当前状态" ></el-input>
                </el-form-item>
                <el-form-item class="correspondEvent" label="对应事件：" prop="correspondEvent">
                  <el-input type="text" v-model="addData.correspondEvent" placeholder="请填写对应事件" ></el-input>
                </el-form-item>
                
                <el-form-item  label="收件人：">
                  <el-input type="text" v-model="addData.receiver" placeholder="收件人" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="收件电话：" prop="receivePhone">
                  <el-input type="text" v-model="addData.receivePhone" placeholder="收件电话" :maxlength="11"></el-input>
                </el-form-item>
                
            </el-form>
            </div> 
          </div>
          <div class="btnbox">
            <el-button size="large" type="primary" @click="tosubmit">确定</el-button>
            <span style="padding-left:100px;"></span>
            <el-button size="large" type="default" @click="toback">返回</el-button>
          </div>
        </div>
  </div>
  
</div>
  
</template>

<script>
import {store} from 'utils/';
const initdata = {
  caseNo:'',
  businessManager:'',
  businessSrc:'',
  contacter:'',
  phone:'',
  contactMail:'',
  patentName:'',
  contractNo:'',
  feeDeduct:'',
  applicant:'',
  subjectQualifyNo:'',
  inventor:'',
  firstInventorIdcard:'',
  officialFee:'',
  serviceFee:'',
  amount:'',
  contractAmount:'',
  invoiceType:'',
  invoiceTitle:'',
  registAddress:'',
  invoiceCode:'',
  financePhone:'',
  bank:'',
  bankAccount:'',
  firstCollectMoneyAmount:'',
  firstCollectMoneyTime:'',
  secondCollectMoneyAmount:'',
  secondCollectMoneyTime:'',
  xsySn:'',
  orderSn:'',
  requirementSn:'',
  buyerWw:'',
  channelDivisonPerson:'',
  channelDivisionTime:'',
  remitter:'',
  sebeSettleChannelAmount:'',
  channelSettleSebeAmount:'',
  serviceProvider:'',
  agent:'',
  channelReturnCaseTime:'',
  platformReceiveCaseTime:'',
  caseCurrentState:'',
  eventDeadline:'',
  correspondEvent:'',
  correspondAmount:'',
  processMethod:'',
  receiver:'',
  receiveAddress:'',
  receivePhone:'',
  remark:''
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/addCase'
const editurl = './api/editCase'
export default {
    name:'reviseBasic',
    data(){
        return{
            addData:Object.assign({},initdata),
            thetype:'',
            caseSysNo:'',
            amountRules:{
              'officialFee':[{validator: amountRule,trigger:'blur'}],
              'serviceFee':[{validator: amountRule,trigger:'blur'}],
              'amount':[{validator: amountRule,trigger:'blur'}],
              'contractAmount':[{validator: amountRule,trigger:'blur'}],
              'firstCollectMoneyAmount':[{validator: amountRule,trigger:'blur'}],
              'secondCollectMoneyAmount':[{validator: amountRule,trigger:'blur'}],
              'sebeSettleChannelAmount':[{validator: amountRule,trigger:'blur'}],
              'channelSettleSebeAmount':[{validator: amountRule,trigger:'blur'}],
              'correspondAmount':[{validator: amountRule,trigger:'blur'}]
            }
        }
    },
    mounted(){
      // store.remove('pas_patent_data')
      let ptype= this.$route.params.type;
      let caseSysNo = this.$route.params.state;
      this.thetype = ptype;
      this.caseSysNo = caseSysNo==0?null:caseSysNo;
      if(caseSysNo==0){
        let data = store.get('pas_patent_data');
        if(data){
          this.addData = Object.assign({},data)
        }
        let that =this;
        this.addData.channelReturnCaseTime =this.totimestamp(this.addData.channelReturnCaseTime); 
        this.addData.eventDeadline = this.totimestamp(this.addData.eventDeadline);
        this.addData.platformReceiveCaseTime = this.totimestamp(this.addData.platformReceiveCaseTime);
        this.addData.channelDivisionTime = this.totimestamp(this.addData.channelDivisionTime);
        this.addData.firstCollectMoneyTime = this.totimestamp(this.addData.firstCollectMoneyTime);
        this.addData.secondCollectMoneyTime = this.totimestamp(this.addData.secondCollectMoneyTime);
        window.onbeforeunload = function(){
          store.remove('pas_patent_data')
          if(!that.isNull(that.addData)){
            store.set('pas_patent_data', that.addData)
          }
        }
      }else{
        let info = store.get('pas_modify_basic');
        this.addData = Object.assign({},info)
      }      
    },
    beforeRouteLeave(to,from,next){
      if(!this.caseSysNo){
        store.remove('pas_patent_data');
        if(!this.isNull(this.addData)){
          this.addData.channelReturnCaseTime =this.totimestamp(this.addData.channelReturnCaseTime); 
          this.addData.eventDeadline = this.totimestamp(this.addData.eventDeadline);
          this.addData.platformReceiveCaseTime = this.totimestamp(this.addData.platformReceiveCaseTime);
          this.addData.channelDivisionTime = this.totimestamp(this.addData.channelDivisionTime);
          this.addData.firstCollectMoneyTime = this.totimestamp(this.addData.firstCollectMoneyTime);
          this.addData.secondCollectMoneyTime = this.totimestamp(this.addData.secondCollectMoneyTime);
          store.set('pas_patent_data', this.addData)
        }
      }
      next()
    },
    
    methods:{
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
      totimestamp(str) {
        return str?new Date(str).getTime():null
      },
      tosubmit(){
        if(this.isNull(this.addData)){
          this.$message({
            message:'请填写内容后再提交',
            type: 'warning'
          })
        }else{
          let type = {
            patentType: this.thetype,
          }
          let exp = /^1\d{10}$/
            if(this.addData.receivePhone&& !exp.test(this.addData.receivePhone)){
              this.$message.warning('请输入正确的手机号')
              return
            }
            let isnum = /^\d+(\.\d{1,2})?$/
            if(this.addData.officialFee){
              if(!isnum.test(this.addData.officialFee)){
                this.$message.warning('官费必须是数字')
                return
              }
              if(this.addData.officialFee<0){
                this.$message.warning('官费不能是负数')
                return
              }
            }
            if(this.addData.serviceFee){
              if(!isnum.test(this.addData.serviceFee)){
                this.$message.warning('服务费必须是数字')
                return
              }
              if(this.addData.serviceFee<0){
                this.$message.warning('服务费不能是负数')
                return
              }
            }
            
            if(this.addData.contractAmount){
              if(!isnum.test(this.addData.contractAmount)){
                this.$message.warning('合同金额必须是数字')
                return
              }
              if(this.addData.contractAmount<0){
                this.$message.warning('合同金额不能是负数')
                return
              }
            }
            
            if(this.addData.amount){
              if(!isnum.test(this.addData.amount)){
                this.$message.warning('此单金额必须是数字')
                return
              }
              if(this.addData.amount<0){
                this.$message.warning('此单金额不能是负数')
                return
              }
            }
            if(this.addData.firstCollectMoneyAmount){
              if(!isnum.test(this.addData.firstCollectMoneyAmount)){
                this.$message.warning('首次收款金额必须是数字')
                return
              }
              if(this.addData.firstCollectMoneyAmount<0){
                this.$message.warning('首次收款金额不能是负数')
                return
              }
            }
            if(this.addData.secondCollectMoneyAmount){
              if(!isnum.test(this.addData.secondCollectMoneyAmount)){
                this.$message.warning('二次收款金额必须是数字')
                return
              }
              if(this.addData.secondCollectMoneyAmount<0){
                this.$message.warning('二次收款金额不能是负数')
                return
              }
            }
            if(this.addData.sebeSettleChannelAmount){
              if(!isnum.test(this.addData.sebeSettleChannelAmount)){
                this.$message.warning('拾贝结算渠道金额必须是数字')
                return
              }
              if(this.addData.sebeSettleChannelAmount<0){
                this.$message.warning('拾贝结算渠道金额不能是负数')
                return
              }
            }
            if(this.addData.channelSettleSebeAmount){
              if(!isnum.test(this.addData.channelSettleSebeAmount)){
                this.$message.warning('渠道结算拾贝金额必须是数字')
                return
              }
              if(this.addData.channelSettleSebeAmount<0){
                this.$message.warning('渠道结算拾贝金额不能是负数')
                return
              }
            }
            if(this.addData.correspondAmount){
              if(!isnum.test(this.addData.correspondAmount)){
                this.$message.warning('对应金额必须是数字')
                return
              }
              if(this.addData.correspondAmount<0){
                this.$message.warning('对应金额不能是负数')
                return
              }
            }
          this.addData.channelReturnCaseTime =this.totimestamp(this.addData.channelReturnCaseTime); 
          this.addData.eventDeadline = this.totimestamp(this.addData.eventDeadline);
          this.addData.platformReceiveCaseTime = this.totimestamp(this.addData.platformReceiveCaseTime);
          this.addData.channelDivisionTime = this.totimestamp(this.addData.channelDivisionTime);
          this.addData.firstCollectMoneyTime = this.totimestamp(this.addData.firstCollectMoneyTime);
          this.addData.secondCollectMoneyTime = this.totimestamp(this.addData.secondCollectMoneyTime);
          let subdata = Object.assign({},this.addData,type);
          subdata.caseSysNo  = this.caseSysNo;
          if(!this.caseSysNo){
            this.$http.post(addurl,subdata).then(res=>{
              this.$message.success('添加成功')
              store.remove('pas_patent_data');
              this.addData = Object.assign({},initdata)
              this.toback()
            }).catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "warning"
              });
            });
          }else{
            this.$http.put(editurl,subdata).then(res=>{
              this.$message.success('修改成功');
              store.remove('pas_modify_basic');
              this.toback()
            }).catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "warning"
              });
            });
          }
          
        }
        
      },
      toback(){
        this.$router.go(-1)
      }
    }
}
</script>

<style lang='less'>
.patentdetail{
  .form {
    .revise{
      padding-top:0;
      input{
        width: 300px;
        padding: 0 5px;
        border: 1px solid #ccc;
      }
      textarea{
        width: 300px;
      }
      .el-date-editor.el-input{
        width: 293px;
      }
    }
    .itembasic{
      width:50%;
      padding-left: 30px;
      .el-input__icon {
        top:-3px;
        right: -10px;
      }
      .el-form-item{
        margin-bottom: 15px;
      }
      .el-form-item__error{
        padding-top: 0;
      }
    }
    
  }
}
.btnbox{
    padding-top: 30px;
    text-align: center;
    .el-button--large{
      width: 150px;
    }
  }
</style>
<template>
<div class="activistadd">
  <div class="form">
    <div class="basic_lists revise" style="padding-top:0">
          <div class="basictitle">
            <h3 class='fl'>基本信息</h3>
            <!-- <div class='fr'>
              <el-button  type="default" @click="toback">返回</el-button>
            </div> -->
          </div>
          <div class="basic_category clearfix">
            <div class="fl itembasic">
            <el-form ref="forms" label-width="180px" :rules="amountRules" :model="addData">
               <el-form-item class="submitdate" label="业务来源：">
                  <el-select v-model="addData.businessSrc">
                    <el-option :label="it.title" :value="it.id" :name='it.id' v-for="it in sourcelist" :key="it.id">{{it.title}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="业务类型：" prop="businessType">
                  <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item  label="业务名称：" prop="businessName">
                  <el-input type="text" v-model="addData.businessName" placeholder="请填写业务名称" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item  label="业务员：" prop="salesman">
                  <el-input type="text" v-model="addData.salesman" placeholder="请填写业务员" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item class="submitdate" label="客户类型：">
                  <el-select v-model="addData.custType">
                    <el-option :label="it.title" :value="it.id" :name='it.id' v-for="it in cuslist" :key="it.id">{{it.title}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="权利人（客户名称）：" prop="obligee">
                  <el-input type="text" v-model="addData.obligee" placeholder="请填写权利人" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item class="serviceFee" label="联系人：" prop="contactPerson" >
                  <el-input type="text" v-model="addData.contactPerson" placeholder="请填写联系人" :maxlength="10" ></el-input>
                </el-form-item>
                <el-form-item class="contractAmount" label="联系电话：" prop="contactPhone">
                  <el-input type="text" v-model="addData.contactPhone" placeholder="请填写联系电话" :maxlength="40"></el-input>
                </el-form-item>
                <el-form-item  label="微信号：" :maxlength='40'>
                  <el-input type="text" v-model="addData.wechat" placeholder="请输入微信号" ></el-input>
                </el-form-item>
                <el-form-item label="合同号：" :maxlength='20'>
                  <el-input type="text" v-model="addData.contractNo" placeholder="请输入合同号" ></el-input>
                </el-form-item>
                <el-form-item class="platformReceiveCaseTime" label="合同签订时间：" prop="platformReceiveCaseTime">
                  <el-date-picker
                    v-model="addData.signTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="合同金额（元）：" prop="contractAmount">
                  <el-input type="text" v-model="addData.contractAmount" placeholder="请填写合同金额" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="服务费（元）：" prop="serviceFee">
                  <el-input type="text" v-model="addData.serviceFee" placeholder="请填写服务费" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="官费（元）：" prop="officeFee">
                  <el-input type="text" v-model="addData.officeFee" placeholder="请填写官费" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="到账时间：">
                  <el-date-picker
                    v-model="addData.arriveTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="跨部门激励人：">
                  <el-input type="text" v-model="addData.crossDepartmentInspirePerson" placeholder="请填写跨部门激励人" :maxlength='10'></el-input>
                </el-form-item>
                <el-form-item label="跨部门激励费（元）：" prop="crossDepartmentInspireFee">
                  <el-input type="text" v-model="addData.crossDepartmentInspireFee" placeholder="请填写跨部门激励费" :maxlength='11'></el-input>
                </el-form-item>
                <el-form-item label="代理人：">
                  <el-input type="text" v-model="addData.agent" placeholder="请填写代理人" :maxlength='10'></el-input>
                </el-form-item>
                <el-form-item label="代理完成费用（元）：" prop="agentFee">
                  <el-input type="text" v-model="addData.agentFee" placeholder="请填写代理完成费用" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="其他成本费（元）：" prop="otherCostFee">
                  <el-input type="text" v-model="addData.otherCostFee" placeholder="请填写其他成本费" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="计提额（元）：" prop="estimateAmount">
                  <el-input type="text" v-model="addData.estimateAmount" placeholder="请填写计提额" :maxlength='11'></el-input>
                </el-form-item>
                <el-form-item label="申请号：">
                  <el-input type="text" v-model="addData.applicationNumber" placeholder="请填写申请号" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item label="申报时间：">
                  <el-date-picker
                    v-model="addData.declareTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="发票抬头：">
                  <el-input type="text" v-model="addData.invoiceTitle" placeholder="请填写发票抬头" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item label="开票单号：">
                  <el-input type="text" v-model="addData.invoiceReceipt" placeholder="请填写开票单号" :maxlength='40'></el-input>
                </el-form-item>
                <el-form-item label="开票时间：">
                  <el-date-picker
                    v-model="addData.invoiceTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="完成时间：">
                  <el-date-picker
                    v-model="addData.finishTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="合同：">
                    <div class="upload_component" style="margin-bottom:20px;">
                        <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby_name" :canPreview="false" :postAction="'iprp_middleground/api/file/upload'" :url="standby" :valueName="'standby'" :size='5' :extensions='"rar,zip,pdf,jpg,bmp,png,RAR,ZIP,PDF,JPG,BMP,PNG"'   :isDialog="true"></pasuploader>
                        <div class="upload_tip">
                            <div v-if="standby_name">
                            <p>已上传：{{decodeURIComponent(standby_name)}}</p>
                            </div>
                            
                        </div>
                        <p style='color:#A8AFB5;font-size:12px;'>备注：1.有业务合同的请务必上传合同；2.格式为RAR、ZIP、PDF、JPG、BMP、PNG大小限5M以内</p>
                    </div>
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
import pasuploader from 'cps/pasuploader/uploader.vue'
const initdata = {
  contractNo:'',
  signTime:'',
  salesman:'',
  businessType:'',
  obligee:'',
  contactPerson:'',
  contactPhone:'',
  serviceFee:'',
  invoiceTitle:'',
  contractAmount:'',
  invoiceReceipt:'',
  invoiceTime:'',
  businessSrc:'',
  businessName:'',
  custType:'',
  wechat:'',
  officeFee:'',
  estimateAmount:'',
  arriveTime:'',
  otherCostFee:'',
  crossDepartmentInspirePerson:'',
  crossDepartmentInspireFee:'',
  agent:'',
  agentFee:'',
  applicationNumber:'',
  declareTime:'',
  finishTime:'',
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addUrl = './api/addStereoProtectCase'
const editUrl = './api/updateStereoProtectCase'
export default {
    name:'reviseBasic',
    data(){
        return{
            addData:Object.assign({},initdata),
            thetype:'',
            dataUniqueNo:'',
            amountRules:{
              // 'businessSrc':[{required:true,message:'请选择业务来源',trigger:'change'}],
              'businessType':[{required:true,message:'请输入业务类型',trigger:'blur'}],
              'businessName':[{required:true,message:'请输入业务名称',trigger:'blur'}],
              'salesman':[{required:true,message:'请输入业务员',trigger:'blur'}],
              // 'custType':[{required:true,message:'请选择客户类型',trigger:'change'}],
              'obligee':[{required:true,message:'请输入权利人',trigger:'blur'}],
              'contactPerson':[{required:true,message:'请输入联系人',trigger:'blur'}],
              'contactPhone':[{required:true,message:'请输入联系电话',trigger:'blur'}],
              'serviceFee':[{validator: amountRule,trigger:'blur'}],
              'officeFee':[{validator: amountRule,trigger:'blur'}],
              'contractAmount':[{validator: amountRule,trigger:'blur'}],
              'otherCostFee':[{validator: amountRule,trigger:'blur'}],
              'crossDepartmentInspireFee':[{validator: amountRule,trigger:'blur'}],
              'estimateAmount':[{validator: amountRule,trigger:'blur'}],
              'agentFee':[{validator: amountRule,trigger:'blur'}],
            },
            sourcelist:[
              {title:'1（线上）',id:1},
              {title:'2（线下）',id:2},
              {title:'3（渠道）',id:3}
            ],
            cuslist:[
              {title:'新客户',id:1},
              {title:'老客户',id:2},
              {title:'分配客户/交办业务',id:3}
            ],
            standby:'',
            standby_Data:[],
            standby_name:'',
        }
    },
    components:{
        pasuploader
    },
    mounted(){
      // store.remove('pas_patent_data')
      let ptype= this.$route.params.type;
      this.dataUniqueNo = this.$route.params.id;
      this.thetype = ptype;
      if(ptype==2){
        let data  = store.get('activistDetail');
        this.addData = Object.assign({},data);
        this.standby_name = this.addData.contractFileName
        this.standby = this.addData.contractUrl
        console.log(this.addData)
      }      
    },
    methods:{
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
        uploaderErrCallback(data){
                    this.$alert(data.msg);
        },
      totimestamp(str) {
        return str?new Date(str).getTime():null
      },
      tosubmit(){
          this.$refs.forms.validate(valid=>{
              if(valid){
                  let data = Object.assign({},this.addData);
                  if(!data.businessSrc){
                    this.$message.warning('请选择业务来源');
                    return;
                  }
                  if(!data.custType){
                    this.$message.warning('请选择客户类型');
                    return;
                  }
                  data.contractFileName = this.standby_name;
                  data.contractUrl = this.standby;
                  data.signTime = this.totimestamp(this.addData.signTime);
                  data.arriveTime = this.totimestamp(this.addData.arriveTime);
                  data.declareTime = this.totimestamp(this.addData.declareTime);
                  data.invoiceTime = this.totimestamp(this.addData.invoiceTime);
                  data.finishTime = this.totimestamp(this.addData.finishTime);
                  
                  if(this.thetype ==1){
                      this.$http.post(addUrl,data).then(res=>{
                          this.$message.success('操作成功');
                          this.$router.go(-1)
                      }).catch(err=>{
                          this.$message.warning(err.response.data.msg)
                      })
                  }
                  if(this.thetype ==2){
                      this.$http.put(editUrl,data).then(res=>{
                          store.remove('activistDetail')
                          this.$message.success('操作成功');
                          this.$router.go(-1)
                      }).catch(err=>{
                          this.$message.warning(err.response.data.msg)
                      })
                  }
              }
          })
      },
      toback(){
        this.$router.go(-1)
      }
    }
}
</script>

<style lang='less'>
.activistadd{
    .upload_component{
        position: relative;
        .upload_tip{
            position: absolute;left: 140px;bottom:0;max-width:600px;font-size: 12px;color: #556677;line-height: 16px;
            p{color: #333; word-break: break-all; font-size: 12px;}
        }
    }
    .basictitle {
        display:box;
        display:-webkit-box;
        display:-webkit-flex; 
        display:-moz-box; 
        display:-ms-flexbox; 
        display: flex;
        margin-left: -16px;
        margin-right: -16px;
        padding: 10px 30px;
        font-size: 16px;
        color: #223344;
        height: 56px;
        line-height: 36px;
        margin-bottom: 10px;
        
        justify-content: space-between;
        background-color: #efefef;
      }
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
    .itembasic{
      width:50%;
      padding-left: 30px;
      .el-input{
        height: 30px;
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
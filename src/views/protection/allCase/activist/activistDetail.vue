<template>
  <div class="patentdetail">
    <div class="service_detail_tab">
      <ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本信息</li>
        <!-- <li class="fl" :class="{'sele_border':status == 2}" @click="status=2">其他材料</li> -->
      </ul>
    </div>
    <div class="form">
      <template v-if="status == 1">
        <!-- 基本信息 -->
        <div class="basic_lists">
          <div class="basictitle">
            <h3 class = 'fl'>基本信息</h3>
            <div class = 'fr'>
              <el-button type="primary" @click="torevise">修改</el-button>
            </div>
            
          </div>
          <div class="basic_category clearfix">
            <ul class="fl">
              <li>
                <p class="tit">业务来源：</p>
                <p class="txt">{{detailInfo.businessSrc}}</p>
              </li>
              <li>
                <p class="tit">业务类型：</p>
                <p class="txt">{{detailInfo.businessType}}</p>
              </li>
              <li>
                <p class="tit">业务名称：</p>
                <p class="txt">{{detailInfo.businessName}}</p>
              </li>
              <li>
                <p class="tit">业务员：</p>
                <p class="txt">{{detailInfo.salesman}}</p>
              </li>
              <li>
                <p class="tit">客户类型：</p>
                <p class="txt">{{detailInfo.custType |customerTypeFormat}}</p>
              </li>
              <li>
                <p class="tit">权利人（客户名称）：</p>
                <p class="txt">{{detailInfo.obligee}}</p>
              </li>
              <li>
                <p class="tit">联系人：</p>
                <p class="txt">{{detailInfo.contactPerson}}</p>
              </li>
              <li>
                <p class="tit">联系电话：</p>
                <p class="txt">{{detailInfo.contactPhone}}</p>
              </li>
              <li>
                <p class="tit">微信号：</p>
                <p class="txt">{{detailInfo.wechat}}</p>
              </li>
              <li>
                <p class="tit">合同号：</p>
                <p class="txt">{{detailInfo.contractNo}}</p>
              </li>
              <li>
                <p class="tit">合同签订时间：</p>
                <p class="txt">{{detailInfo.signTime |dateFormat}}</p>
              </li>
              <li>
                <p class="tit">合同金额（元）：</p>
                <p class="txt">{{detailInfo.contractAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">服务费（元）：</p>
                <p class="txt">{{detailInfo.serviceFee|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">官费（元）：</p>
                <p class="txt">{{detailInfo.officeFee|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">到账时间：</p>
                <p class="txt">{{detailInfo.arriveTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">跨部门激励人：</p>
                <p class="txt">{{detailInfo.crossDepartmentInspirePerson}}</p>
              </li>
              <li>
                <p class="tit">跨部门激励费（元）：</p>
                <p class="txt">{{detailInfo.crossDepartmentInspireFee|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">代理人：</p>
                <p class="txt">{{detailInfo.agent}}</p>
              </li>
              <li>
                <p class="tit">代理完成费（元）：</p>
                <p class="txt">{{detailInfo.agentFee|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">其他成本费（元）：</p>
                <p class="txt">{{detailInfo.otherCostFee|priceFormat}}</p>
              </li>
              
              <li>
                <p class="tit">计提额（元）：</p>
                <p class="txt">{{detailInfo.estimateAmount|priceFormat}}</p>
              </li>
              <li>
                <p class="tit">申请号：</p>
                <p class="txt">{{detailInfo.applicationNumber}}</p>
              </li>
              <li>
                <p class="tit">申报时间：</p>
                <p class="txt">{{detailInfo.declareTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">发票抬头：</p>
                <p class="txt">{{detailInfo.invoiceTitle}}</p>
              </li>
              <li>
                <p class="tit">开票单号</p>
                <p class="txt">{{detailInfo.invoiceReceipt}}</p>
              </li>
              <li>
                <p class="tit">开票时间：</p>
                <p class="txt">{{detailInfo.invoiceTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">完成时间：</p>
                <p class="txt">{{detailInfo.finishTime|dateFormat}}</p>
              </li>
              <li>
                <p class="tit">合同：</p>
                <p class="txt" v-if='detailInfo.contractUrl'>{{detailInfo.contractFileName}} <span class="downloadbtn" @click="preview(detailInfo.contractUrl)">预览</span>
                              <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+detailInfo.contractUrl" target="_blank"  class="downloadbtn">下载</a></p>
              </li>
              
            </ul>
            
          </div>
        </div>
      </template>

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
const detailUrl = './api/findStereoProtectCaseDetail/{dataUniqueNo}'
const downloadUrl = './api/downFile'
const pdfUrl = "./api/preview";
export default {
  components: {
    pasuploader
  },
  data() {
    return {
      thetype:1,
      dataUniqueNo:'',
      ischange:'',
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
      
      detailInfo: {
      },
      textarea: "",
      dialogState: false,
      // 当前服务状态
      recordContent: "",
      imgsrc: "",
      proxyImg: [],
      dialogImg: false,
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
  methods: {
      torevise(){
        store.remove('activistDetail')
        store.set('activistDetail',this.detailInfo);
        this.$router.push({name:'activistAdd',params:{type:2,id: this.dataUniqueNo}})
      },
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
      this.$http.get(detailUrl.replace('{dataUniqueNo}',this.$route.params.id))
        .then(resp => {
          self.detailInfo = resp.data;
        })
        .catch(err => {
          this.$message.error(err.response.data.msg);;
        });
    },
    
    certificatePreview(url) {
      this.proxyImg = url;
      this.dialogImg = true;
    }
  },
  created() {},
  mounted() {
    this.dataUniqueNo = this.$route.params.id;
    this.search();
    this.token = VueCookie.get("token");
  },
  filters: {
	  priceFormat:Filters.priceformat,
    dateFormat: Filters.formatDate.datesFormat,
    customerTypeFormat:Filters.customerTypeFormat
  },
  watch: {
    
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
        display:box;
        display:-webkit-box;
        display:-webkit-flex; 
        display:-moz-box; 
        display:-ms-flexbox; 
        display: flex;
        margin-left: -30px;
        margin-right: -30px;
        padding: 10px 30px;
        font-size: 16px;
        color: #223344;
        height: 56px;
        line-height: 36px;
        margin-bottom: 10px;
        
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

    .materialbox{
      .upload_component{
				position: relative;
				.upload_tip{
					position: absolute;left: 140px;bottom:0;max-width:600px;font-size: 12px;color: #556677;line-height: 16px;
					p{color: #A8AFB5; word-break: break-all;}
				}
			}
    }


    // 弹框样式
    .state_preview {
      .bzbox:last-child{
        border-bottom: none;
      }
      // .el-select{
      //   width:100%;
      // }
      
      .upload_component{
				position: relative;
				.upload_tip{
					position: absolute;left: 140px;bottom:0;width:360px;font-size: 12px;color: #556677;line-height: 16px;height: 120px; overflow-y: auto;
					p{ word-break: break-all;}
				}
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

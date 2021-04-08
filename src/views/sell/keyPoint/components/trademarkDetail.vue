<template>
  <!-- 商标详情 -->
  <el-dialog
    :visible.sync="showDialoge"
    custom-class="detail_dialog">
   <div class="detail_top clearfix">
    <div class="clearfix">
      <img class="fl" :src="trademarkDetail.tmImg" alt="">
      <div class="detail_right fl ml15">
        <div>
          <span class="name">商标名称</span><span class="txt ml15">{{ trademarkDetail.tmName }}</span><span class="host ml15">{{ trademarkDetail.currentStatus }}</span>
        </div>
        <div class="mt10">
          <span class="name">注册号</span><span class="txt ml15">{{ trademarkDetail.regNo }}</span>
        </div>
        <div class="mt10">
          <span class="name">申请人</span><span class="txt ml15">{{ trademarkDetail.applicantCn }}</span>
        </div>
      </div>
    </div>
    <div class="result mt20">
      <table class="result_type">
        <tbody class="tr-color">
          <tr>
            <td class="border_r" width="150">申请时间</td>
            <td class="border_r c-3">{{ trademarkDetail.appDate || '--' }}</td> 
            <td class="border_r">注册时间</td>
            <td class="border_r c-3">{{ trademarkDetail.regDate || '--' }}</td>
            <td class="border_r">有效年限</td>
            <td class="border_r c-3">{{ trademarkDetail.privateDate || '--' }}</td>
            <td class="border_r">已使用年限</td>
            <td class="border_r c-3">--</td>
          </tr>
          <tr>
            <td class="border_r">商标类别</td>
            <td class="border_r c-3">{{ trademarkDetail.intCls < 10 ? '0'+trademarkDetail.intCls : trademarkDetail.intCls  }}-{{ clsData[1].goodsname }} </td> 
            <td class="border_r">法律状态</td>
            <td class="border_r c-3">{{ trademarkDetail.currentStatus }}</td>
            <td class="border_r">相关官文</td>
            <td class="border_r c-3" colspan="3">
              <p v-if="noticeByRegn.length" v-for="info in noticeByRegn">{{ info.ann_date }}  第{{ info.ann_num }}期 &nbsp;&nbsp;&nbsp;<a href="" @click.prevent="showRegnoFn(info)">{{ info.ann_type }}</a></p>
              <p v-if="!noticeByRegn.length">暂无官文</p>
            </td>
          </tr>
          <tr>
            <td class="border_r">商品服务列表</td>
            <td class="border_r" :colspan="3">
              <p v-for="info in trademarkDetail.goodsList">• {{ info.goodsName }}</p>
            </td> 
            <td class="border_r">注册流程</td>
            <td class="border_r" colspan="3">
              <p v-for="info in trademarkDetail.flowList">• {{ info.flowDate }} {{ info.flowName }}</p>
            </td>
          </tr>
          <!-- <tr>
            <td class="border_r">备注</td>
            <td class="border_r c-3" colspan="7">
              <p>{{ remarks }}</p>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
   </div>
  </el-dialog>

</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import CONFIG_ from 'config/hostConfig.js';
	import {store} from 'utils/';
	import cateIdData from 'utils/intClsData.js';

	const distributeMenuPermission = 'iprp_mpsteward_key_mainwantbuy';
	const sellUrl = CONFIG_.rootUrl;
  const findTrademarkDetails = sellUrl + '/api/findTrademarkDetails';  //查询商标详情
  const findNoticeByRegno = sellUrl + '/api/findNoticeByRegno';  //管家查询官文
  

  export default {
    name: 'work-order-list',
    props: {
    	// 外部传进来的空值展示与否的变量
    	showModal: {
    		type: Boolean,
    		default: false
    	},
    	itemObj: {
    		type: Object,
    		default: {}
    	}
    },
    data() {
      return {
      	trademarkDetail: {},  //商标详情
      	clsData: cateIdData.cateIdData,  //所有商标类型
      	noticeByRegn: [],  //官文
      	showDialoge: false,  //组件内部的空值展示与否的变量
      }
    },
    mounted() {
    	this.showDialoge = this.showModal;
    	this.getDetailFn();  //查询商标详情
    },
    methods: {
    	// 展示官文
    	showRegnoFn (info) {
    		if (info.image === '0' || info.image==null) {  //接着请求
    			let params ={
    				annNum: info.ann_num,
    				annTypecode: info.ann_type_code
    			}
    			/* 待提供地址 */ 
    			this.$http.get('./sbgg/tmann/annInfoView/selectInfoidBycode.html', {params: params})
    			.then( resp => {
            let data = resp;
    				this.$http.post('./sbgg/tmann/annInfoView/imageView.html', qs.stringify({id: data.data, pageNum: info.page_no, flag:1}))
    				.then( resp => {
              let imgUrl = '';
              if (info.page_no > 3) {
                imgUrl = resp.data.imaglist[3];
              }
              else if (info.page_no>0 && info.page_no<4) {
                imgUrl = resp.data.imaglist[info.page_no-1];
              }
              else{
                this.$message({
                  type: 'error',
                  message: '暂无官文信息'
                })
              }
              window.open(imgUrl)
    				})
    			})
    		}
    		else{
    			window.open(info.image);
    		}
    	},
    	// 查询商标详情
    	getDetailFn () {
    		let params = {
          trademarkId: this.itemObj.trademarkId
        }
        this.$http.get(findTrademarkDetails, {params: params})
        .then( (resp) => {
          this.trademarkDetail = resp.data.data;
          this.showTmDeail = true;
        })
        this.findNoticeByRegnoFn(this.itemObj.regNo);  //查询官文
    	},
    	// 查询商标官文
      findNoticeByRegnoFn (regno) {
        let params = {
          regno: regno,
          page: 1,
          size: 1000
        }
        this.$http.get(findNoticeByRegno, {params: params})
        .then( resp => {
          this.noticeByRegn = resp.data.data;
        })
      },
    },
    watch: {
    	showModal (n, o) {
    		if (n != o) {
    			this.showDialoge = this.showModal;
    		}
    	},
    	showDialoge (n, o) {
    		if (n != o) {
    			this.$emit('showModalChange', n)
    		}
    	}
    }
  }
</script>
<style lang='less'>
.detail_dialog,.warn_dialog{
  img{width:90px;height:90px;border:1px solid #eee;}
  .detail_top{
    >p{color:red;}
    .detail_right{
      div{
        span{font-size:13px;display:inline-block;line-height:18px;}
        .name{color:#666;width:53px;}
        .txt{color:#333}
        .host{background-color:#EEF8FF;border-radius:3px;height:24px;line-height:24px;color:#3db1fa;font-size:12px;padding:0 11px;}
      }
    }
    button{width:126px;height:30px;text-align:center;line-height:30px;background-color:#479cff;color:#fff;font-size:14px;border-radius: 2px;}
  }
  .result{padding:0;
    .result_type{
      tbody{
        tr{
          td.c-3{color:#333;}
          td{padding-left:10px;font-size: 12px;color:#666;
            p{font-size:12px;
              a{color:#3db1fa;text-decoration: none}
            }
          }
        }
      }
    }
  }
}
</style>

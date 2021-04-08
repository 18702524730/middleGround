<template>
  <div class="workCommonList clientServiceOrder">
	  <p class="t_title">
	  	<span class="text">检测到{{ totalSize }}个近似商标</span>
	  </p>

	  <div class="result">
  	 	<table class="result_type" v-loading="loading">
        <thead>
          <tr class="thead">
          	<th >序号</th>
          	<th>商标名称</th>
          	<th>商标图</th>
            <th class="minWidth">注册号</th>
            <th class="alignc" width="100">商标类别</th>
            <th class="alignc" width="140">申请人</th>
            <th class="alignc">法律状态</th>
						<th class="alignc">申请时间</th>
            <th class="alignc">注册时间</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in approximatetwo" v-show="!loading && approximatetwo.length" >
          	<td>{{ index+1}}</td>
            <td>{{ item.tmName }}</td>
            <td><img v-if="item.tmImg" :src="item.tmImg" width="48" height="48"></td>
            <td>{{item.regNo}}</td>
            <td class="alignc">{{ item.intCls < 10 ? '0'+item.intCls : item.intCls }}-{{ clsData[item.intCls - 1].goodsname }}</td>
            <td class="alignc">{{item.applicantCn}}</td>
            <td class="alignc">{{item.currentStatus}}</td>
            <td class="alignc">{{item.appDate || '--'}}</td>
            <td class="alignc">{{item.regDate || '--'}}</td>
            <td class="action">
            	<a href="" class="view" @click.prevent="checkTmDetailFn(item)">查看</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !approximatetwo.length">
            <td colspan="13" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <!-- <div class="my_loading" v-show="loading" v-loading="loading">
	    </div> -->
	    <div class="tb_pagination" v-if="!loading && approximatetwo.length">
	    	<el-pagination
		      @current-change="currentPageFn"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next"
		      :total="totalSize" class="fr">
		    </el-pagination>
	    </div>
	  </div>

		<!-- 商标详情 -->
    <el-dialog
      :visible.sync="showTmDeail"
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
              <td class="border_r">申请时间</td>
              <td class="border_r c-3">{{ trademarkDetail.appDate || '--' }}</td>
              <td class="border_r">注册时间</td>
              <td class="border_r c-3">{{ trademarkDetail.regDate || '--' }}</td>
              <td class="border_r">有效年限</td>
              <td class="border_r c-3">{{ trademarkDetail.privateDate || '--' }}</td>
              <td class="border_r">已使用年限</td>
              <td class="border_r c-3">{{ trademarkDetail.yearNumber || '--' }}</td>
            </tr>
            <tr>
              <td class="border_r">商标类别</td>
              <td class="border_r c-3">{{ trademarkDetail.intCls < 10 ? '0'+trademarkDetail.intCls : trademarkDetail.intCls  }}-{{ clsData[1].goodsname }} </td>
              <td class="border_r">法律状态</td>
              <td class="border_r c-3">{{ trademarkDetail.currentStatus }}</td>
              <td class="border_r">相关官文</td>
              <td class="border_r c-3" colspan="3">
                <p v-for="info in noticeByRegn">{{ info.ann_date }}  第{{ info.ann_num }}期 &nbsp;&nbsp;&nbsp;<a href="" @click.prevent="showRegnoFn(info)">{{ info.ann_type }}</a></p>
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

  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import CONFIG_ from 'config/hostConfig.js';
	import cateIdData from 'utils/intClsData.js';

	const sellUrl = CONFIG_.rootUrl;
  const approximatetwo = sellUrl + '/api/approximatetwo';  //查询近似商标
  const findTrademarkDetails = sellUrl + '/api/findTrademarkDetails';  //查询商标详情
  const findNoticeByRegno = sellUrl + '/api/findNoticeByRegno';  //管家查询官文

  export default {
    name: 'work-order-list',
    data() {
      return {
      	loading: false,
      	showTmDeail: false,
      	approximatetwo: [],  //近似商标列表
      	currentPage: 1,
      	pageSize: 10,
      	totalSize: 1,
      	clsData: cateIdData.cateIdData,  //所有商标类型
      	trademarkDetail: {}, //商标详情
      	noticeByRegn: [],  //官文
      }
    },
    mounted() {
    	this.approximatetwoFn();  //查询近似商标
    },
    methods: {
    	// 展示官文
    	showRegnoFn (info) {
    		if (info.image === '0' || info.image === null) {  //接着请求
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
    	// 查看商标详情
      checkTmDetailFn (item) {
        let params = {
        	trademarkId: '',
          regNo: item.applicantOther2,
          intCls: item.intCls
        }
        this.$http.get(findTrademarkDetails, {params: params})
        .then( (resp) => {
          this.trademarkDetail = resp.data.data;
          this.showTmDeail = true;
        })
        this.findNoticeByRegnoFn(item.regNo);  //查询官文
      },
    	// 查询商标求购意向
      approximatetwoFn () {
        let params = {
        	keyword: this.$route.query.keyword || '',
          page: this.currentPage,
          size: this.pageSize
        }
        this.loading = true;
        if (params.keyword) {
          this.$http.get(approximatetwo, {params: params})
          .then( (resp) => {
            this.loading = false;
            this.approximatetwo = resp.data.data;
            this.totalSize = resp.data.total;
          })
        }
        else{
          this.loading = false;
          this.approximatetwo = [];
        }
      },
      // 重置搜索结果
      resetFn () {
      	this.searchObj = {};
      	this.approximatetwoFn();  //查询近似商标
      },
      // 翻页
      currentPageFn () {
      	this.approximatetwoFn();  //查询近似商标
      }
    },
    filters: {

    }
  }
</script>
<style lang='less'>
.workCommonList{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow: hidden;padding-bottom: 20px;
	.t_title {
		width:100%; height:30px; line-height:30px; background: #eee; margin-left: 10px; text-align: left;
		.text {font-size: 14px; padding-left: 10px;}
	}
	.condition{
		padding-left: 10px;padding-top: 5px;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{height: 30px;}
		}
		.data_picker{
			width: 220px;
			.el-date-editor--daterange.el-input{
				width: 220px;
			}
		}
		.form_submit{
			float: left;
			button{float: left;width: 88px;height: 30px;line-height: 28px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
			.submit{}
			.reset{background-color: #fff;color:#479CFF;}
		}
	}
	.result{
		padding: 10px 10px 0 10px;
		.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
		.el-checkbox__inner::after{left: 4px;top: 0;}
		.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36AF47;border-color: #36AF47;}
		/* .table_handle{
			height: 50px;background: #F9F9F9;border: 1px solid #DFE2E5;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#DFE2E5;line-height: 20px;vertical-align: top;
			.all{
				margin-left: 20px;height: 20px;display: inline-block;
				.el-checkbox{height: 20px;vertical-align: top;}
			}
			.table_handle_btn{margin-left: 20px;margin-right: 20px;padding-left:24px;font-size: 14px;color:#479CFF;display: inline-block;background: transparent url(~assets/img/myServiceOrder/batch.png) 0 center no-repeat;display: inline-block;cursor: pointer;}
			.batch{background-image: url(~assets/img/myServiceOrder/batch.png);}
			.infoSubmit{background-image: url(~assets/img/myServiceOrder/infoSubmit.png);}
		} */
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.alignc{text-align: center;}
					th.minWidth{min-width: 60px;}
					th.maxWidth{max-width: 200px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;word-break:break-all;
						.el-checkbox{position: relative;top: -1px;}
						.regInfo{display: inline-block;min-width: 100px;max-width: 150px;word-break: break-all;}
					}
					td.alignc{text-align: center;}
					td.maxWidth{max-width: 200px;}
					td.action{
						min-width: 60px;
						a{color: #479CFF;margin-right: 7px}
					}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
		.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0;}
		}
	}

	.distributeDialog{
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{
				font-size: 14px;
				.el-dialog__close{font-size: 12px;}
			}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio{width: 92px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
			}
			.dialog-footer{
				.el-button{width: 88px;height: 30px;padding:8px 15px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height: 14px; }
				.el-button--primary{background: #479CFF;border-radius: 2px;color: #fff;}
			}
		}
	}

	.memoDialog{
		.el-dialog{
			width: 500px;height: 256px;
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{font-size: 14px;}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.el-textarea{margin-top: 10px;}
			}
		}
	}

}
.clientServiceOrder{
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;}
				}
			}
		}
	}
}
</style>

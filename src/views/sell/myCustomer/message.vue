<template>
  <div class="workCommonList clientServiceOrder">

	  <div class="result">
  	 	<table class="result_type" v-loading="loading">
        <thead>
          <tr class="thead">
          	<th >客户账号</th>
          	<th>微信昵称</th>
          	<th>客户姓名</th>
            <th class="alignc">上次分配归属</th>
            <th class="alignc" >移回时间</th>
            <th class="alignc" width="100">移回公海原因</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in searchList" v-show="!loading && searchList.length" v-if="index<9">
          	<td>{{item.phone}}</td>
            <td><span class="regInfo" :title="item.regInfo">{{ item.weixinNickname }}</span></td>
            <td>{{ item.memberName }}</td>
            <td class="alignc">{{ item.saleName }}</td>
            <td class="alignc">{{item.backTimeStr}}</td>
            <td class="alignc text_over" :title="item.backReason">{{item.backReason}}</td>
            <td class="action">
            	<a href="" class="view" @click.prevent="goIndexFn(item)">查看</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !searchList.length">
            <td colspan="13" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <div class="tb_pagination" v-if="!loading && searchList.length">
	    	<el-pagination
		      @current-change="currentPageFn"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next"
		      :total="totalSize" class="fr">
		    </el-pagination>
	    </div>
	  </div>
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/';
	import CONFIG_ from 'config/hostConfig.js';

	const sellUrl = CONFIG_.rootUrl;
  const getCustomerBackLogList = sellUrl + '/api/getCustomerBackLogList';  //查询转移列表

  export default {
    name: 'work-order-list',
    data() {
      return {
      	loading: false,
      	searchObj: {},
      	searchList: [],  //转移罅隙列表
      	currentPage: 1,
      	pageSize: 10,
      	totalSize: 1,
      }
    },
    mounted() {
    	this.getCustomerBackLogListFn();  //查询转移列表
    },
    methods: {
    	// 查询搜索记录
      getCustomerBackLogListFn () {
        let params = {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }
        this.loading = true;
        this.$http.post(getCustomerBackLogList, qs.stringify(params))
        .then( (resp) => {
        	this.loading = false;
          this.searchList = resp.data.elements;
          this.totalSize = resp.data.totalElements;
        })
      },
      // 翻页
      currentPageFn () {
      	this.getCustomerBackLogListFn();  //默认查询搜索记录
      },
      goIndexFn (item) {
      	this.$router.push({path: `customerList?memberPhone=${item.phone}`});
      }
    },
    filters: {

    }
  }
</script>
<style lang='less'>
.workCommonList{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow: hidden;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
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
					td.text_over {max-width:100px; white-space: nowrap; overflow: hidden; text-overflow:ellipsis; }
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

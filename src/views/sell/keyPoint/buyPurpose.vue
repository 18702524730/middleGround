<template>
  <div class="workCommonList clientServiceOrder">
	  <div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="searchObj.remarkName" placeholder="商品名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="searchObj.memberSn" placeholder="客户账号"></el-input></div>
	  	<div class="form_control"><el-input v-model="searchObj.phone" placeholder="联系方式"></el-input></div>
	  	<div class="form_control"><el-input v-model="searchObj.nickname" placeholder="微信昵称"></el-input></div>
	  	<div class="form_control" v-if="distributeIsAllowed">
				<el-select v-model="searchObj.saleId" clearable placeholder="客户归属">
					<el-option
						v-for="item in findSaleNameList"
						:key="item.name"
						:label="item.name"
						:value="item.admin_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="getUserBuyPurposeListFn(); currentPage = 1;">搜索</button>
				<button class="reset" @click="resetFn">重置</button>
			</div>
	  </div>

	  <div class="result">
  	 	<table class="result_type" v-loading="loading">
        <thead>
          <tr class="thead">
						<th v-if="showCheckBox"></th>
          	<th >序号</th>
          	<th>商标名称</th>
          	<th>商标图</th>
            <th class="minWidth">注册号</th>
            <th class="alignc" width="100">商标类别</th>
            <th class="alignc" width="140">申请人</th>
            <th class="alignc">法律状态</th>
						<th class="alignc">申请时间</th>
            <th class="alignc">注册时间</th>
            <th class="minWidth alignc">近似商标</th>
            <th class="minWidth alignc">客户账号</th>
            <th class="minWidth alignc">联系方式</th>
            <th class="minWidth alignc">微信昵称</th>
            <th class="minWidth alignc" v-if="distributeIsAllowed">客户归属</th>
            <th class="minWidth alignc">备注</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in userBuyPurposeList" v-show="!loading && userBuyPurposeList.length" v-if="index<9">
          	<td v-if="showCheckBox"><el-checkbox v-model="item.isSelect" :disabled="item.userAccount != null" @change="handleCheckChangeFn(item, index)"></el-checkbox></td>
          	<td>{{ index+1}}</td>
            <td>{{ item.tmName }}</td>
            <td><img v-if="item.tmImg" :src="item.tmImg" width="48" height="48"></td>
            <td>{{item.regNo}}</td>
            <td class="alignc" v-if="item.intCls">{{ item.intCls<10 ? '0'+item.intCls : item.intCls }}--{{ item.intCls>0 ? cateIdData[item.intCls-1].goodsname : '' }}</td>
						<td class="alignc" v-if="!item.intCls">--</td>
            <td class="alignc">{{item.applicantCn}}</td>
            <td class="alignc">{{item.currentStatus}}</td>
            <td class="alignc">{{item.appDate || '--'}}</td>
            <td class="alignc">{{item.regDate || '--'}}</td>
            <td class="alignc action"><a href="" @click.prevent="goSImilarFn(item)">查看</a></td>
            <td class="alignc">{{item.userAccount || '--'}}</td>
            <td class="alignc">{{item.phone}}</td>
            <td class="alignc">{{item.nickname}}</td>
            <td class="alignc" v-if="distributeIsAllowed">{{item.saleName}}</td>
            <td class="alignc" >{{ item.remarks || '--' }}</td>
            <td class="action">
            	<a href="" class="view" @click.prevent="checkTmDetailFn(item)">查看</a>
            	<a href="" class="view" @click.prevent="editRemarkFn(item)">编辑</a>
            	<a href="" class="view" v-if="!item.userAccount && distributeIsAllowed" @click.prevent="distributionOneFn(item)">分配</a>
            </td>
          </tr>
          <tr v-if="showCheckBox">
          	<td colspan="2" ><el-checkbox v-model="checkedAll" @change="selectAllFn()">全选</el-checkbox></td>
          	<td colspan="14"></td>
          </tr>
          <tr class="empty" v-show="!loading && !userBuyPurposeList.length">
            <td colspan="16" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <!-- <div class="my_loading" v-show="loading" v-loading="loading">
	    </div> -->
	    <div class="tb_pagination clearfix" v-if="distributeIsAllowed">
	    	<el-button type="primary" size="small" v-if="!showCheckBox" @click="showCheckBoxFn">批量分配</el-button>
	    	<el-button type="primary" size="small" v-if="showCheckBox" @click="distributionFn">确认分配</el-button>
	    	<el-pagination
		      @current-change="currentPageFn"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next"
		      :total="totalSize" class="fr">
		    </el-pagination>
	    </div>
	  </div>

		<el-dialog
      title="分配求购商标"
      :visible.sync="selectVisible"
      size="tiny"
      custom-class="select_box"
      >
      <p class="info">将此条商标求购信息分配给</p>
      <el-select v-model="selectEmployeeID" placeholder="请选择销售人员" size="small">
        <el-option
          v-for="item in findSaleNameList"
          :key="item.admin_id"
          :label="item.name"
          :value="item.admin_id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSelectFn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 商标详情 -->
    <trade-detail :showModal="showTmDeail" :itemObj="selectTmObj" @showModalChange="changeModalFn" v-if="showTmDeail" ></trade-detail>	

    <el-dialog
      title="备注"
      :visible.sync="remarkVisible"
      size="tiny"
      >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入备注"
        v-model="remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRemarkFn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import CONFIG_ from 'config/hostConfig.js';
	import {store} from 'utils/';
	import tradeDetail from './components/trademarkDetail';
  import intClsData from 'utils/intClsData.js'

	const distributeMenuPermission = 'iprp_mpsteward_key_mainwantbuy';
	const sellUrl = CONFIG_.rootUrl;
  const userBuyPurposeList = sellUrl + '/api/userBuyPurposeList';  //查询商标求购意向
  const findSaleName = sellUrl + '/api/findSaleName';  //查询销售专员
  const assignBuyPurpose = sellUrl + '/api/assignBuyPurpose';  //单个或批量分配
  const editBuyPurposeRemark = sellUrl + '/api/editBuyPurposeRemark'; //求购意向编辑备注

  export default {
    name: 'work-order-list',
    components: {
    	tradeDetail
    },
    data() {
      return {
      	loading: false,
      	searchObj: {},
      	userBuyPurposeList: [],  //商标求购意向列表
      	currentPage: 1,
      	pageSize: 10,
      	totalSize: 1,
      	246: false, //是否展示复选框
      	checkAll: false,  //全选
      	selectVisible: false,  //分配弹窗
      	distributeIsAllowed: false, //权限判断
      	checkedAll: false, 
      	showTmDeail: false,  //商标详情弹窗
      	remarkVisible: false,  //备注弹窗
      	showCheckBox: false,  //是否展示复选框
      	remark: '',  //备注
      	options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        selectOption: '',  //选择的选项
        findSaleNameList: [],  //销售专员列表
        selectEmployeeID: '',
        selectTmObj: {}, //选择的商标信息
        cateIdData: intClsData.cateIdData,  //所有商标大类数据
      }
    },
    mounted() {
    	this.getUserBuyPurposeListFn();  //查询商标求购意向
    	this.findSaleNameFn();  //查询销售专员
    	this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
    },
    methods: {
    	// 编辑备注
      editRemarkFn (item) {
        this.selectItem = item;
        this.remarkVisible = true;
      },
      // 提交备注
      submitRemarkFn () {
        let params = {
          id: this.selectItem.id,
          remark: this.remark
        }
        if (this.remark) {
          this.$http.post(editBuyPurposeRemark, qs.stringify(params))
          .then( resp => {
            this.remarkVisible = false;
            this.getUserBuyPurposeListFn();  //查询商标求购意向
          })
        }
        else{
          this.$message({
            type: 'error',
            message: '请填写备注!'
          });
        }
      },
    	// 查看商标详情
    	checkTmDetailFn (item) {
    		this.selectTmObj = item;
				this.showTmDeail = true;
    	},
    	// 详情弹窗状态修改
    	changeModalFn (data) {
    		this.showTmDeail = data;
    	},
    	//  去近似商标页
      goSImilarFn (item) {
        this.$router.push({path: 'similarList', query:{keyword: item.tmName}})
      },
    	// 选择待分配商标
    	handleCheckChangeFn (item, index) {
    		this.isSelectAllFn();   //判断是否需要全选
				let selectList = JSON.parse(sessionStorage.getItem('selectList')) || [];
				console.log(item)
				if (item.isSelect && item.userAccount == null) {
					selectList.push(item);
				}
				else{
					selectList.forEach( (info, i) => {
						if (info.id == item.id) {
							selectList.splice(i, 1);
						}
					})
				}
				sessionStorage.setItem('selectList', JSON.stringify(selectList));
    	},
    	// 判断是否需要全选
			isSelectAllFn () {
				for (var i = 0; i < this.userBuyPurposeList.length; i++) {
					let info = this.userBuyPurposeList[i];
					if (!info.isSelect && !info.userAccount) {
						this.checkedAll = false;
						break
					}
					else{
						this.checkedAll = true;
					}
				}
			},
			// 全选
			selectAllFn () {
				let selectList = JSON.parse(sessionStorage.getItem('selectList')) || [];
				this.userBuyPurposeList.forEach( (item) => {
					if (!item.userAccount) {
						item.isSelect = this.checkedAll;
						if (this.checkedAll) {
							selectList = selectList.concat(item);
						}
						else{
							let i = selectList.indexOf(item);
							selectList.splice(i, 1);
						}
					}
				})
				sessionStorage.setItem('selectList', JSON.stringify(selectList));
			},
    	// 查询销售专员
    	findSaleNameFn () {
    		this.$http.get(findSaleName)
    		.then( resp => {
    			this.findSaleNameList = resp.data.elements;
    		})
    	},
    	// 单个分配
    	distributionOneFn (item) {
				sessionStorage.removeItem('selectList');
				item.isSelect = true;
				let selectList = [].concat(item);
				sessionStorage.setItem('selectList', JSON.stringify(selectList));
				this.distributionFn(); //确认分配
    	},
    	// 确认选择分配
    	submitSelectFn () {
    		let selectList = JSON.parse(sessionStorage.getItem('selectList')) || [];
				let list_ = [];
				let selectEmployeeName = '';
				if (!selectList.length) {   //如果没选择数据
					list_ = [];
				}
				else{
					selectList.forEach( (item) => {
						item.showCheckbox = false;
						if (item.isSelect) {
							list_.push(item.id)
						}
					})
				}
				this.findSaleNameList.forEach( (item) => {
					if (item.admin_id == this.selectEmployeeID) {
						selectEmployeeName = item.name
					}
				})
    		let params = {
    			ids: list_.join(','),
    			saleId: this.selectEmployeeID || '',
    			saleName: selectEmployeeName
    		}
    		if (params.saleName) {
    			this.$http.post(assignBuyPurpose, qs.stringify(params))
	    		.then( resp => {
	    			this.selectVisible = false;  //弹窗
	    			this.showCheckBox = false;
	    			this.$message({
	            type: 'success',
	            message: '分配成功!'
	          });
	          sessionStorage.removeItem('selectList');
	          this.getUserBuyPurposeListFn();  //查询商标求购意向
	    		})
    		}
    		else{
    			this.$message({
            type: 'error',
            message: '请选择销售人员!'
          });
    		}
    	},
    	// 确认分配
    	distributionFn () {
    		let selectList = JSON.parse(sessionStorage.getItem('selectList')) || [];
    		if (selectList.length) {
    			this.selectVisible = true;
    		}
    		else {
    			this.$message({
    				type: 'error',
    				message: '请勾选商标信息！'
    			})
    		}
    	},
    	// 批量分配
    	showCheckBoxFn () {
    		this.showCheckBox = true;
    	},
    	// 查询商标求购意向
      getUserBuyPurposeListFn () {
        let params = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          memberSn: this.searchObj.memberSn,
          phone: this.searchObj.phone,
          remarkName: this.searchObj.remarkName,
          nickname: this.searchObj.nickname,
          saleId: this.searchObj.saleId
        }
        this.loading = true;
        this.$http.post(userBuyPurposeList, qs.stringify(params))
        .then( (resp) => {
        	this.loading = false;
          this.totalSize = resp.data.totalElements;
          this.userBuyPurposeList = resp.data.elements;
        })
      },
      // 重置搜索结果
      resetFn () {
        this.currentPage = 1;
      	this.searchObj = {};
      	// this.getUserBuyPurposeListFn();  //查询商标求购意向
      },
      // 翻页
      currentPageFn () {
      	this.getUserBuyPurposeListFn();  //查询商标求购意向
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
						.all {margin-left: 8px; vertical-align: middle;}
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
.select_box {
	height: 200px;
	.el-dialog__body {padding: 10px 20px;}
	.info {color:#333; margin:10px 0; font-size: 16px; }
}
</style>

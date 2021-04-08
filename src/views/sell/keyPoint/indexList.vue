<template>
  <div class="workCommonList clientServiceOrder">
	  <div class="condition clearfix" v-if="!distributeIsAllowed">
			<p class="title_box">
				<span class="name">姓名：{{ userInfo.name }}</span>
				<span class="post">职位：{{ userInfo.dg_name }}</span>
				<span class="my_tips" @mouseenter="cardVisible=true" >我的概况</span>
			</p>
	  </div>

    <div class="condition clearfix" v-if="distributeIsAllowed">
      <div class="form_control" style="width: 200px;">
        <el-select v-model="selectEmployee" placeholder="请选择员工姓名" size="small" >
          <el-option value="" label="所有员工">所有员工</el-option>
          <el-option
            v-for="item in findSaleNameList"
            :key="item.admin_id"
            :label="item.name"
            :value="item.admin_id">
          </el-option>
        </el-select>
      </div>

      <div class="form_submit">
        <button class="submit" @click="searchEpmloyeeFn">搜索</button>
        <button class="reset" @click="resetFn">重置</button>
      </div>
    </div>

    <el-dialog
      title=""
      custom-class="card_dilog"
      :visible.sync="cardVisible"
      size="small"
      @mouseleave="cardVisible=false"
      >
      <div class="card_box clearfix">
        <div class="item" v-for="item in cardList">
          <p class="num"><b>{{ item.num }}</b>个</p>
          <p class="info">{{ item.name }}</p>
        </div>
      </div>
    </el-dialog>

	  <div class="result">
	  	<p class="table_tit">
	  		<span class="text">消息总览</span>
        <router-link :to="{name: 'message'}" class="all" v-if="messageListTotal>10">查看全部</router-link>
	  	</p>
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th >客户账号</th>
          	<th>微信昵称</th>
          	<th>客户姓名</th>
            <th class="alignc">主体企业情况</th>
            <th class="alignc" >被异议风险</th>
            <th class="alignc" >被撤三风险</th>
            <th class="alignc">变更风险</th>
            <th class="alignc">到期风险</th>
            <th class="alignc">竞品企业情况</th>
            <th class="minWidth alignc">可异议情报</th>
            <th class="minWidth alignc">可撤三情报</th>
            <th class="alignc">未续展注销情报</th>
            <th class="alignc" v-if="distributeIsAllowed">客户归属</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in messageList" v-show="!loading && messageList.length" v-if="index<10">
          	<td>{{item.memberPhone}}</td>
            <td>{{ item.nickname }}</td>
            <td>{{ item.truename }}</td>
            <td class="alignc">{{item.mySubject || 0}}家, 共{{item.myTrademarkNumber || 0}}个商标, 已托管{{item.myDepositeNumber || 0}}个</td>
            <td class="alignc">{{item.news22}}</td>
            <td class="alignc">{{item.news23}}</td>
            <td class="alignc">{{item.news21}}</td>
            <td class="alignc">{{item.news24}}</td>
            <td class="alignc">{{item.otherSubject || 0}}家, 共{{item.otherTrademarkNumber || 0}}个商标, 已托管{{item.otherDepositeNumber || 0}}个</td>
            <td class="alignc">{{item.news31}}</td>
            <td class="alignc">{{item.news32}}</td>
            <td class="alignc">{{ item.news33 }}</td>
            <td class="alignc" v-if="distributeIsAllowed">{{ item.saleName }}</td>
            <td class="action">
            	<a href="" class="view" @click.prevent="goCompanyFn(item)">查看</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !messageList.length">
            <td colspan="14" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <!-- <div class="my_loading" v-show="loading" v-loading="loading">
	    </div> -->
	  </div>

	  <div class="result">
	  	<p class="table_tit">
	  		<span class="text">搜索记录</span>
	  		<router-link :to="{name: 'searchList'}" class="all" v-if="searchListTotal>10">查看全部</router-link>
	  	</p>
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th >客户账号</th>
          	<th>微信昵称</th>
          	<th>客户姓名</th>
            <th class="alignc">搜索记录条数</th>
            <th class="alignc" >总搜索次数</th>
            <th class="alignc" >搜索次数最多（公司）</th>
            <th class="alignc">搜索次数最多（商标）</th>
            <th class="alignc" v-if="distributeIsAllowed">客户归属</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in searchList" v-show="!loading && searchList.length" v-if="index<10">
          	<td>{{item.phone}}</td>
            <td><span class="regInfo" :title="item.regInfo">{{ item.weixinNickname }}</span></td>
            <td>{{ item.userName }}</td>
            <td class="alignc">{{ item.recordNum }}</td>
            <td class="alignc">{{item.totalSearchNum}}</td>
            <td class="alignc">{{item.maxSearchCompany}}</td>
            <td class="alignc">{{item.maxSearchTrademark}}</td>
            <td class="alignc" v-if="distributeIsAllowed">{{ item.saleName }}</td>
            <td class="action">
              <router-link :to="{path: `/sell/myCustomer/customerList?type=3&status=3&id=${item.memberId}&openId=${item.openId}`}">查看</router-link>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !searchList.length">
            <td colspan="9" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <div class="my_loading" v-show="loading" v-loading="loading">
	    </div>
	  </div>

	  <div class="result">
	  	<p class="table_tit">
	  		<span class="text">商标求购意向</span>
        <router-link :to="{name: 'buyPurpose'}" class="all" v-if="userBuyPurposeListTotal>10">查看全部</router-link>
	  	</p>
  	 	<table class="result_type">
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
            <th class="minWidth alignc">近似商标</th>
            <th class="minWidth alignc">客户账号</th>
            <th class="minWidth alignc">联系方式</th>
            <th class="minWidth alignc" v-if="!distributeIsAllowed">微信昵称</th>
            <th class="minWidth alignc" v-if="distributeIsAllowed">客户归属</th>
            <th class="minWidth alignc">备注</th>
            <th class="minWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in userBuyPurposeList" v-show="!loading && userBuyPurposeList.length" v-if="index<10">
          	<td>{{ index+1}}</td>
            <td>{{ item.tmName }}</td>
            <td><img v-if="item.tmImg" :src="item.tmImg" width="48" height="48"></td>
            <td>{{item.regNo}}</td>
            <td class="alignc">{{ item.intCls<10 ? '0'+item.intCls : item.intCls }}--{{ cateIdData[item.intCls-1].goodsname }}</td>
            <td class="alignc">{{item.applicantCn}}</td>
            <td class="alignc">{{item.currentStatus}}</td>
            <td class="alignc">{{item.appDate || '--'}}</td>
            <td class="alignc">{{item.regDate || '--'}}</td>
            <td class="alignc action"><a href="" @click.prevent="goSImilarFn(item)">查看</a></td>
            <td class="alignc">{{item.userAccount}}</td>
            <td class="alignc">{{item.phone}}</td>
            <td class="alignc" v-if="!distributeIsAllowed">{{item.nickname}}</td>
            <td class="alignc" v-if="distributeIsAllowed">{{item.saleName}}</td>
            <td class="alignc" style="max-width:200px;">{{ item.remarks || '--' }}</td>
            <td class="action">
            	<a href="" class="view" @click.prevent="checkTmDetailFn(item)">查看</a>
              <a href="" class="view" @click.prevent="editRemarkFn(item)">编辑</a>
              <a href="" class="view" v-if="!item.userAccount && distributeIsAllowed" @click.prevent="distributionOneFn(item)">分配</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !userBuyPurposeList.length">
            <td colspan="15" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
	    <div class="my_loading" v-show="loading" v-loading="loading">
	    </div>
	  </div>

    <!-- 商标详情 -->
    <trade-detail :showModal="showTmDeail" :itemObj="selectItem" @showModalChange="changeModalFn" v-if="showTmDeail" ></trade-detail>

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

    <el-dialog
      title="分配求购商标"
      :visible.sync="selectVisible"
      size="tiny"
      custom-class="select_box"
      >
      <p class="info">将此条商标求购信息分配给</p>
      <el-select v-model="selectEmployeeID" placeholder="请选择" size="small">
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

  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/';
  import cateIdData from 'utils/intClsData.js';
  import CONFIG_ from 'config/hostConfig.js';
  import {store} from 'utils/';
  import tradeDetail from './components/trademarkDetail';
  import intClsData from 'utils/intClsData.js'

	const workOrderListUrl = './api/findWorkOrdersList';
	const spListUrl = './api/findAllSp';
	const entrustedUnitListUrl = './api/findAllentrustedUnit';

  const distributeMenuPermission = 'iprp_mpsteward_key_mainsurvey';
  const sellUrl = CONFIG_.rootUrl;
  const findCustomerList = sellUrl + '/api/findCustomerList';  //查询消息总览列表
  const searchCount = sellUrl + '/api/searchCount';  //查询搜索记录
  const userBuyPurposeList = sellUrl + '/api/userBuyPurposeList';  //查询商标求购意向
  const findTrademarkDetails = sellUrl + '/api/findTrademarkDetails';  //查询商标详情
  const editBuyPurposeRemark = sellUrl + '/api/editBuyPurposeRemark'; //求购意向编辑备注
  const statisticsCustomer = sellUrl + '/api/statisticsCustomer';  //员工概况
  const findSaleName = sellUrl + '/api/findSaleName';  //查询销售专员
  const findNoticeByRegno = sellUrl + '/api/findNoticeByRegno';  //管家查询官文
  const assignBuyPurpose = sellUrl + '/api/assignBuyPurpose';  //单个或批量分配

  export default {
    name: 'work-order-list',
    components: {
      tradeDetail
    },
    data() {
      return {
        userInfo: store.get('userinfo'),
	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
	      loading: false,
        showTmDeail: false,  //商标详情弹窗
        remarkVisible: false,  //备注弹窗
        remark: '',  //备注
        selectItem: {},  //选择的需要编辑的条目

        cardVisible: false,  //我的概況彈窗
        distributeIsAllowed: false, //判断是否是主管
        selectVisible: false,  //分配弹窗
        cardList: [
          {name: '我的客户', num: 500},
          {name: '新联络客户', num: 100},
          {name: '确认合作客户', num: 200},
          {name: '已合作客户', num: 300},
          {name: '未回款客户', num: 100},
        ],
        searchList: [],  //搜索记录
        searchListTotal: 1,  //总条数
        userBuyPurposeList: [],  //商标求购意向列表
        userBuyPurposeListTotal: 1,  //总条数
        messageList: [],  //消息总览
        messageListTotal: [], //总条数
        trademarkDetail: {},  //商标详情
        noticeByRegn: [],  //官文
        clsData: cateIdData.cateIdData,  //所有商标类型
        searchObj: {},  //搜索条件
        findSaleNameList: [],  //销售专员列表
        selectEmployee: '',  //独秀安选择的员工
        selectOption: '',  //选择的选项
        findSaleNameList: [],  //销售专员列表
        selectEmployeeID: '',
        selectTmObj: {}, //选择的商标信息
        cateIdData: intClsData.cateIdData,  //所有商标大类数据
      }
    },
    mounted() {
      this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
      this.getSearchListFn();  //默认查询搜索记录
      this.getUserBuyPurposeListFn();  //查询商标求购意向
      this.findCustomerListFn();  //查询消息总览
      this.getStatisticsCustomerFn(); //查询员工概况
      this.findSaleNameFn();  //查询销售专员
    },
    methods: {
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
        console.log(list_)
        let params = {
          ids: list_.join(','),
          saleId: this.selectEmployeeID-0,
          saleName: selectEmployeeName
        }
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
      },
      // 确认分配
      distributionFn () {
        this.findSaleNameFn();  //查询销售专员
        this.selectVisible = true;
      },
      // 查询销售专员
      findSaleNameFn () {
        this.$http.get(findSaleName)
        .then( resp => {
          this.findSaleNameList = resp.data.elements;
        })
      },
      // 查询员工概况
      getStatisticsCustomerFn () {
        let self = this;
        self.$http.get(statisticsCustomer)
        .then( resp => {
          resp.data.elements.forEach(function (item){
            if (item.saleId == -1) {
              self.cardList[0].num = item.number;  //
              self.cardList[1].num = item.numberliaisonState;  //
              self.cardList[2].num = item.number3;  //
              self.cardList[3].num = item.number5+item.number4;  //已合作客户
              self.cardList[4].num = item.number4;  //未回款客户
            }
          })
        })
      },
      // 搜索员工
      searchEpmloyeeFn () {
        this.findCustomerListFn();  //查询消息总览
      },
      // 重置搜索
      resetFn () {
        this.selectEmployee = '';
      },
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
        this.selectItem = item;
        this.showTmDeail = true;
      },
      // 详情弹窗状态修改
      changeModalFn (data) {
        this.showTmDeail = data;
      },
      //  客户企业概况
      goCompanyFn (item) {
        this.$router.push({name:'companyList', query: {memberId: item.memberId, memberPhone: item.memberPhone, memberName: item.truename}})
      },
      //  去近似商标页
      goSImilarFn (item) {
        this.$router.push({path: 'similarList', query:{keyword: item.tmName}})
      },
      // 查询消息总览
      findCustomerListFn () {
        let params = {
          pageNo: 1,
          pageSize: 10,
          saleId: this.selectEmployee || ''
        }
        this.$http.post(findCustomerList, qs.stringify(params))
        .then( (resp) => {
          this.messageList = resp.data.elements;
          this.messageListTotal = resp.data.total_elements;
        })
      },
      // 查询搜索记录
      getSearchListFn () {
        let params = {
          pageNo: 1,
          pageSize: 10
        }
        this.$http.post(searchCount, qs.stringify(params))
        .then( (resp) => {
          this.searchList = resp.data.elements;
          this.searchListTotal = resp.data.totalElements;
        })
      },
      // 查询商标求购意向
      getUserBuyPurposeListFn () {
        let params = {
          pageNo: 1,
          pageSize: 10
        }
        this.$http.post(userBuyPurposeList, qs.stringify(params))
        .then( (resp) => {
          console.log(resp)
          this.userBuyPurposeList = resp.data.elements;
          this.userBuyPurposeListTotal = resp.data.totalElements;
        })
      },

    },
    filters: {

    },
    watch:{

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
		.title_box {
			width: 100%; color: #333;
			.name {float: left; font-size: 16px; margin-right: 30px;}
			.post {float: left; font-size: 16px; }
			.my_tips {font-size: 16px; float: right; font-weight: bolder; margin-right: 20px; cursor: pointer; color:#479CFF; }
		}
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
		padding: 10px 10px 0 10px; margin-bottom: 10px;
		.table_tit {
			width: 100%; height: 30px; line-height: 30px; margin-bottom: 5px; margin-top: 10px;
			.text {font-size:16px; font-weight: bolder; color: #111; float: left;}
			.all {color: #479CFF; float: right; margin-right: 20px; font-size: 14px; cursor: pointer;}
		}
		.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
		.el-checkbox__inner::after{left: 4px;top: 0;}
		.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36AF47;border-color: #36AF47;}
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.alignc{text-align: center; padding-right: 10px;}
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
						min-width: 60px; text-align: center;
						a{color: #479CFF;margin-right: 0;}
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
.card_dilog {
  .el-dialog__header {
    padding: 20px 20px 0 20px;
  }
  .el-dialog__body {
    padding: 0;
    .card_box {
      padding: 0 20px 20px 20px;
      .item {
        float: left; width: 180px; height: 100px; background: #F8F8F8; border:1px solid #eee; margin: 20px;
        .num {
          width:100%; text-align: center; font-size: 14px; margin-top: 20px;
          b {font-size: 26px;}
        }
        .info {width: 100%; text-align: center; font-size: 14px; margin-top: 5px;}
      }
    }
  }
}
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

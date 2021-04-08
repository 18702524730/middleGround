<template>
  <div class="emloyee_box">
    <ul class="note_box clearfix">
      <li> “客户”指商标管家小程序的单个用户，每个客户对应多家主体企业和多家竞品企业 </li>
      <li>“主体企业”指商标管家小程序中用户设置的“我的企业”；“竞品企业”指商标管家小程序中用户设置的“关注企业”。</li>
    </ul>

	  <!-- <div class="card_box clearfix">
      <div class="item top"  v-for="(item, index) in cardList">
        <p class="num_box"><span class="num">{{ item.num }}</span>个</p>
        <p class="info">{{ item.name }}</p>
      </div>
    </div>
    <div class="card_box clearfix" v-for="info in employeeCostomeList">
      <div class="item"  v-for="(item, index) in info">
        <p class="num_box"><span class="num">{{ item.num }}</span>个</p>
        <p class="info">{{ item.name }}</p>
      </div>
    </div> -->

    <div class="card_box clearfix"  v-for="(item, index) in employeeCostomeList" v-if="item.saleId==-1" >
      <div class="item top" >
        <p class="num_box"><span class="num">{{ item.number }}</span>个</p>
        <p class="info" >我的客户</p>
      </div>
      <div class="item top" >
        <p class="num_box"><span class="num">{{ item.numberliaisonState }}</span>个</p>
        <p class="info" >新联络客户</p>
      </div>
      <div class="item top" >
        <p class="num_box"><span class="num">{{ item.number3 }}</span>个</p>
        <p class="info" >确认合作客户</p>
      </div>
      <div class="item top" >
        <p class="num_box"><span class="num">{{ item.number5+item.number4 }}</span>个</p>
        <p class="info" >已合作客户</p>
      </div>
      <div class="item top" >
        <p class="num_box"><span class="num">{{ item.number4 }}</span>个</p>
        <p class="info" >未回款客户</p>
      </div>
    </div>
    <div class="card_box clearfix"  v-for="(item, index) in employeeCostomeList" v-if="item.saleId!==0 && item.saleId!==-1">
      <div class="item" :class="{'top': item.saleId==-1}" >
        <p class="num_box"><span class="num">{{ item.number }}</span>个</p>
        <p class="info" >{{ item.saleName || '--' }}</p>
      </div>
      <div class="item" :class="{'top': item.saleId==-1}" >
        <p class="num_box"><span class="num">{{ item.numberliaisonState }}</span>个</p>
        <p class="info">{{ item.saleName || '--' }}</p>
      </div>
      <div class="item" :class="{'top': item.saleId==-1}" >
        <p class="num_box"><span class="num">{{ item.number3 }}</span>个</p>
        <p class="info">{{ item.saleName || '--' }}</p>
      </div>
      <div class="item" :class="{'top': item.saleId==-1}" >
        <p class="num_box"><span class="num">{{ item.number5+item.number4}}</span>个</p>
        <p class="info">{{ item.saleName || '--' }}</p>
      </div>
      <div class="item" :class="{'top': item.saleId==-1}" >
        <p class="num_box"><span class="num">{{ item.number4 }}</span>个</p>
        <p class="info">{{ item.saleName || '--' }}</p>
      </div>
    </div>


  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/';
  import CONFIG_ from 'config/hostConfig.js';


	const workOrderListUrl = './api/findWorkOrdersList';
	const spListUrl = './api/findAllSp';
	const entrustedUnitListUrl = './api/findAllentrustedUnit';

  const sellUrl = CONFIG_.rootUrl;
  const searchCount = sellUrl + '/api/searchCount';  //查询搜索记录
  const statisticsCustomer = sellUrl + '/api/statisticsCustomer';  //查询员工概况

  export default {
    name: 'work-order-list',
    data() {
      return {
	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
	      loading: false,

        cardVisible: false,  //我的概況彈窗
        cardList: [
          {name: '我的客户', num: 500},
          {name: '新联络客户', num: 100},
          {name: '确认合作客户', num: 200},
          {name: '已合作客户', num: 300},
          {name: '未回款客户', num: 100},
        ],
        arrList: [
          {name: '张三', num: 500},
          {name: '张三', num: 100},
          {name: '张三', num: 200},
          {name: '张三', num: 300},
          {name: '张三', num: 100},
        ],
        searchList: [],  //搜索记录
        employeeCostomeList: [],  
      }
    },
    mounted() {
      this.getStatisticsCustomerFn(); //查询员工概况
    },
    methods: {
      // 查询员工概况
      getStatisticsCustomerFn () {
        let self = this;
        self.employeeCostomeList = [];
        self.$http.get(statisticsCustomer)
        .then( resp => {
          self.employeeCostomeList = resp.data.elements;
          // 简单排序
          self.employeeCostomeList.sort(function(a, b){
            return a.saleId - b.saleId
          })
        })
      },
    },

  }
</script>
<style lang='less'>
.emloyee_box {
  .note_box {
    width:100%;
    li {width:100%; float: left; list-style: disc; list-style-position: inside; color: #999; font-size:12px; padding-left:20px;}
  }
  .card_box {
    width:100%; height: auto; margin-top: 20px; border-bottom: 1px dashed #eee; float: left;
    .item {
      float: left; width: 260px; height: 118px; background: #F8F8F8; border:1px solid #eee; margin: 0 20px 20px 20px; 
      .num_box {
        width:100%; text-align: center; font-size: 14px; margin-top: 20px;
        .num {font-size: 26px;}
      }
      .info {width: 100%; text-align: center; font-size: 14px; margin-top: 3px; color: #333;}
    }
    .top {
      background:#F4F9FF; border: 1px solid #DCECFF; 
      .num_box {
        color: #479CFF;
        span {cursor: initial;}
      }
    }
  }
}
</style>

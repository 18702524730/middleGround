<template>
<div class="shop_trademark">
  <div class="condition clearfix">
    <div class="form_control"><el-input v-model="shop.companyName" placeholder="商标名称"></el-input></div>
    <div class="form_control" style="width:200px">
      <el-select v-model="shop.regStatus" placeholder="商标类别" size="small">
        <el-option
          v-for="item in cateIdData"
          :key="item.id"
          :label="(item.id<10 ? '0'+item.id : item.id) +'-'+item.goodsname"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="form_control">
      <el-select clearable v-model="shop.law" placeholder="法律状态" size="small">
        <el-option
          v-for="item in law"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="form_submit">
      <button class="submit" @click="search(); pg_index=1;">搜索</button>
      <button class="reset" @click="reset()">重置</button>
    </div>
  </div>
  <div class="result">
    <table class="result_type">
      <thead>
        <tr class="thead">
          <th width="40" class="border_r">序号</th>
          <th class="border_r  alignc">商标名称</th>
          <th class="border_r" width="60">商标图</th>
          <th class="minWidth border_r  alignc">注册号</th>
          <th class="alignc border_r">商标类别</th>
          <th class="alignc border_r" width="80">申请人</th>
          <th class="border_r  alignc">法律状态</th>
          <th class="minWidth border_r">申请时间</th>
          <th class="minWidth border_r">注册时间</th>
          <th class="minWidth alignc border_r">近似商标</th>
          <th class="minWidth alignc border_r">联系方式</th>
          <th class="minWidth border_r alignc">备注</th>
          <th class="minWidth alignc border_r">操作</th>
        </tr>
      </thead>
      <tbody class="tr-color">
        <tr v-if="shopList && shopList.length" v-for="(item,index) in shopList">
          <td class="border_r alignc">{{index+1}}</td>
          <td class="border_r  alignc"><span class="regInfo">{{item.tmName || '--'}}</span></td>
          <td class="border_r alignc"><img :src="item.tmImg" width="60px" alt=""></td>
          <td class="border_r">{{item.regNo || '--'}}</td>
          <td class="alignc border_r">{{item.intCls}}</td>
          <td class="alignc border_r">{{item.applicantCn || '--'}}</td>
          <td class="border_r alignc">{{item.currentStatus || '--'}}</td>
          <td class="border_r">{{item.appDate || '--'}}</td>
          <td class="border_r alignc">{{item.regDate || '--'}}</td>
          <td class="alignc border_r"><a class="view" :href="'#/sell/keyPoint/similarList?keyword='+item.tmName">查看</a></td>
          <td class="alignc border_r">{{item.phone || '--'}}</td>
          <td class="border_r alignc" :title="item.remarks" width="90"><p class="nowrap">{{item.remarks ? (item.remarks.length > 15 ? item.remarks.substring(0,14) + '...' : item.remarks) : '--'}}</p></td>
          <td class="alignc action" width="60">
            <a @click="trademarkDetail(item)" class="view">查看</a>
            <a @click="editorData(item)" class="view">编辑</a>
          </td>
        </tr>
        <tr class="empty" v-if="!shopList.length">
          <td colspan="13" class="norecord">
            <div class="empty_ic"><span>暂无信息</span></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my_loading" v-show="loading" v-loading="loading">
    </div>
    <div class="tb_pagination" v-if="!loading">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pg_index"
        :page-size="pg_count"
        layout="total, prev, pager, next"
        :total="total" class="fr">
      </el-pagination>
    </div>
  </div>
  <!-- 商标详情 -->
  <el-dialog
    v-model="dialogDetail"
    custom-class="detail_dialog">
   <div class="detail_top clearfix">
    <div class="clearfix">
      <img class="fl" :src="detailData.tmImg" alt="">
      <div class="detail_right fl ml15">
        <div>
          <span class="name">商标名称</span><span class="txt ml15">{{detailData.tmName}}</span><span class="host ml15" v-if="detailData.stewardState">{{detailData.stewardState == 1 ? '未托管' : detailData.stewardState == 2 ? '已托管' : ''}}</span>
        </div>
        <div class="mt10">
          <span class="name">注册号</span><span class="txt ml15">{{detailData.regNo}}</span>
        </div>
        <div class="mt10">
          <span class="name">申请人</span><span class="txt ml15">{{detailData.applicantCn}}</span>
        </div>
      </div>
    </div>
    <div class="result mt20">
      <table class="result_type">
        <tbody class="tr-color">
          <tr>
            <td class="border_r">申请时间</td>
            <td class="border_r c-3">{{detailData.regDate}}</td>
            <td class="border_r">注册时间</td>
            <td class="border_r c-3">{{detailData.regDate}}</td>
            <td class="border_r">有效年限</td>
            <td class="border_r c-3">{{detailData.privateDate}}</td>
            <!-- <td class="border_r">已使用年限</td>
            <td class="border_r c-3">{{detailData.}}</td> -->
          </tr>
          <tr>
            <td class="border_r">商标类别</td>
            <td class="border_r c-3">{{goodsname(detailData.intCls)}}</td>
            <td class="border_r">法律状态</td>
            <td class="border_r c-3">{{detailData.currentStatus}}</td>
            <td class="border_r">相关官文</td>
            <td class="border_r c-3" colspan="3">
              <p v-for="item in bookList">{{item.ann_date}} 第{{item.ann_num}}期<a>《{{item.ann_type}}》</a></p>
            </td>
          </tr>
          <tr>
            <td class="border_r">商标服务列表</td>
            <td class="border_r" colspan="3">
              <p v-for="info in detailData.goodsList">• {{info.goodsCode}}  {{info.goodsName}}</p>
            </td>
            <td class="border_r">注册流程</td>
            <td class="border_r" colspan="3">
              <p v-for="item in detailData.flowList">• {{item.flowDate}}  {{item.flowName}}</p>
            </td>
          </tr>
          <!-- <tr>
            <td class="border_r">备注</td>
            <td class="border_r c-3" colspan="7">
              <p>备注巴拉巴拉</p>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!-- <button class="mt20 fr">查看近似商标</button> -->
   </div>
  </el-dialog>
  <el-dialog
    title="备注"
    :visible.sync="remarkVisible"
    size="tiny"
    >
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入备注"
      v-model="remark" :maxlength="200">
    </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="remarkVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRemarkFn">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import intClsData from 'utils/intClsData.js'
  const buyUrl = './api/userBuyPurposeList';
  const detailUrl = './api/findTrademarkDetails';
  const RegnoUrl = './api/findNoticeByRegno';
  const editBuyPurposeRemark = './api/editBuyPurposeRemark'; //求购意向编辑备注
  const law = [
    {
      id:1,
      name:'待审中'
    },
    {
      id:2,
      name:'已初审'
    },
    {
      id:3,
      name:'已驳回'
    },
    {
      id:4,
      name:'已注册'
    },
    {
      id:5,
      name:'已销亡'
    }
  ]
   export default {
    data() {
      return {
        remarkVisible:false,
        dialogDetail:false,
        loading:false,
        cateIdData: intClsData.cateIdData,
        law:law,
        pg_index:1,
        pg_count:10,
        total:0,
        shop:{
          regStatus:'',
          law:''
        },
        shopList:[],
        detailData:{},
        bookList:[],
        remark:''
      }
    },
    methods: {
      editorData(item){
        this.selectItemId = item.id;
        this.remarkVisible = true;
      },
      // 提交备注
      submitRemarkFn () {
        let params = {
          id: this.selectItemId,
          remark: this.remark
        }
        this.$http.post(editBuyPurposeRemark, qs.stringify(params))
        .then( resp => {
          this.remark = '';
          this.remarkVisible = false;
          this.search();  //查询商标求购意向
        })
      },
      goodsname(item){
        if(item){
          var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
          return str;
        }else{
          var str = '--';
          return str;
        }
      },
      trademarkDetail(item){
        let data = {
          trademarkId:item.trademarkId
        }
        this.$http.get(detailUrl,{params:data})
        .then((resp) => {
          this.detailData = resp.data.data;
          this.dialogDetail = true;
          console.log(resp)
        })
        .catch((err) => {
          this.dialogDetail = true;
        });
        let info = {
          regno:item.regNo
        }
        this.$http.get(RegnoUrl,{params:info})
        .then((resp) => {
          this.bookList = resp.data.data;
          console.log(resp)
        })
        .catch((err) => {
          this.dialogDetail = true;
        });
      },
      search(){
        let data = {
          memberId:this.$route.query.id,
          remarkName:this.shop.companyName,
          remarkTypeList:this.shop.regStatus,
          currentStatusList:this.shop.law,
          pageNo:this.pg_index,
          pageSize: this.pg_count,
        }
        this.$http.post(buyUrl,qs.stringify(data))
        .then((resp) => {
          this.shopList = resp.data.elements;
          this.total = resp.data.totalElements;
          console.log(resp)
        })
        .catch((err) => {
        });
      },
      reset(){
        this.pg_index = 1;
        this.shop = {
          regStatus:'',
          law:''
        }
      },
      handleCurrentChange(){

      },
      toChangePage(item){
        this.$router.push({query: {type:1,status:1,focusType:1,enterType:1,id:item.id}})
      }
    },
    mounted(){
      this.search();
    }
  }
</script>
<style lang="less">
// 求购商标
  .shop_trademark{border:1px dashed #DFE2E5;padding-bottom:30px;
    .form_submit{margin-top:3px;}
  }
</style>

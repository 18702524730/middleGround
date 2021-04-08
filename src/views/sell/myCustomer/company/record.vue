<template>
<div class="record">
  <p class="ml10">共{{numIndex.totalNum }}条搜索记录，总搜索次数为{{numIndex.totalSearchCount}}次</p>
  <div class="condition clearfix">
    <div class="form_control"><el-input v-model="searchRecord.companyName" placeholder="请输入搜索内容"></el-input></div>
    <div class="form_control">
      <el-select clearable v-model="searchRecord.searchType" placeholder="搜索类型">
        <el-option
          v-for="item in searchType"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="form_submit">
      <button class="submit" @click="search(true); pg_index=1;">搜索</button>
      <button class="reset" @click="reset">重置</button>
    </div>
  </div>
  <div class="result">
    <table class="result_type">
      <thead>
        <tr class="thead">
          <th width="40" class="border_r  alignc">序号</th>
          <th class="border_r  alignc">搜索内容</th>
          <th class="border_r alignc" width="100">搜索类型</th>
          <th class="minWidth border_r  alignc">搜索次数</th>
          <th class="alignc border_r">备注</th>
        </tr>
      </thead>
      <tbody class="tr-color">
        <tr v-for="(item,index) in recordData">
          <td class="border_r alignc">{{index+1}}</td>
          <td class="border_r  alignc">{{item.name}}</td>
          <td class="border_r alignc">{{item.recordType == 1 ? '商标' : '企业'}}</td>
          <td class="border_r alignc">{{item.searchNum}}次</td>
          <td class="alignc action">
            <span>{{item.remark || '--'}}</span>
            <a @click="editorData(item)" class="view" style="display:inline-block">编辑</a>
          </td>
        </tr>
        <tr class="empty" v-if="!loading && !recordData.length">
          <td colspan="5" class="norecord">
            <div class="empty_ic"><span>暂无信息</span></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="tb_pagination" v-if="!loading && recordData.length">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pg_index"
        :page-size="pg_count"
        layout="total, prev, pager, next"
        :total="total" class="fr">
      </el-pagination>
    </div>
  </div>
  <el-dialog
    title="备注"
    :visible.sync="remarkVisible"
    size="tiny"
    >
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入备注" :maxlength="200"
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
  import Vue from 'vue'
  import qs from 'qs'
  import intClsData from 'utils/intClsData.js'
  const recordUrl = './api/getSearchRecordList';
  const RecordCountUrl = './api/SearchRecordCount';
  const editSearchRecordRemark = './api/editSearchRecordRemark';
  const searchType = [
    {
      id:1,
      name:'商标'
    },
    {
      id:2,
      name:'企业'
    }
  ]
   export default {
    data() {
      return {
        remarkVisible:false,
        loading:false,
        searchRecord:{},
        searchType:searchType,
        recordData:[],
        pg_index:1,
        pg_count:10,
        total:0,
        selectItemId:'',
        remark:'',
        numIndex:{}
      }
    },
    methods: {
      editorData(item){
        this.selectItemId = item.id;
        this.remarkVisible = true;
      },
      // 提交备注
      submitRemarkFn () {
        if(!this.remark){
          this.$message({
            message: '请填写备注',
            type: 'warning'
          });
          return
        }
        let params = {
          id: this.selectItemId,
          remark: this.remark
        }
        this.$http.post(editSearchRecordRemark, qs.stringify(params))
        .then( resp => {
          this.remark = '';
          this.remarkVisible = false;
          this.search();
        })
      },
      search(){
        let data = {
          memberId:this.$route.query.id,
          openId:this.$route.query.openId,
          recordType:this.searchRecord.searchType,
          name:this.searchRecord.companyName,
          pageNo:this.pg_index,
          pageSize:this.pg_count,
        }
        this.$http.post(recordUrl,qs.stringify(data))
        .then((resp) => {
          this.recordData = resp.data.elements;
          this.total = resp.data.totalElements;
          console.log(resp)
        })
        .catch((err) => {
          this.dialogDetail = true;
        });
      },
      reset(){
        this.pg_index = 1;
        this.searchRecord.companyName = '';
        this.searchRecord.searchType = '';
      },
      handleCurrentChange(page){
        this.pg_index = page;
        this.search();
      }
    },
    mounted(){
      let data = {
        memberId:this.$route.query.id,
        openId:this.$route.query.openId
      }
      this.$http.post(RecordCountUrl,qs.stringify(data))
      .then((resp) => {
        this.numIndex = resp.data;
        console.log(resp)
      })
      .catch((err) => {
      });
      this.search();
    }
  }
</script>
<style lang="less">
.record{border:1px dashed #DFE2E5;padding-bottom:30px;padding-top:10px;
  >p{font-size:14px;}
}
</style>

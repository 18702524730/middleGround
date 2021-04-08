<template>
<div class="message">
	<div class="tit">
		<p class="mt10 ml10">{{type ? '主体' : '竞品'}}企业——{{type ? '风险预警' : '重要情报'}} {{number > 999 ? '999+' : number}}</p>
	</div>
	<div class="result">
	 	<table class="result_type">
      <thead>
        <tr class="thead">
        	<th class="border_r alignc">公司名称</th>
        	<th class="border_r alignc">{{type ? '被异议风险' : '可异议情报'}}</th>
        	<th class="border_r alignc">{{type ? '被撤三风险' : '可撤三情报'}}</th>
          <th class="border_r alignc">变更风险</th>
          <th class="alignc border_r">到期风险</th>
          <th class="alignc border_r">操作</th>
        </tr>
      </thead>
      <tbody class="tr-color">
        <tr v-for="item in msgData">
        	<td class="border_r alignc">{{item.applicationName}}</td>
          <td class="border_r alignc">{{item.typeClassification2}}</td>
          <td class="border_r alignc">{{item.typeClassification3}}</td>
          <td class="border_r alignc">{{item.typeClassification1}}</td>
          <td class="alignc border_r">{{item.typeClassification4}}</td>
          <td class="alignc action">
          	<a v-if="item.typeClassification1 + item.typeClassification2 + item.typeClassification3 + item.typeClassification4" class="view" @click="lookWarn(item)">查看</a>
            <p v-else>查看</p>
          </td>
        </tr>
        <tr class="empty" v-if="!msgData.length">
          <td colspan="6" class="norecord">
            <div class="empty_ic"><span>暂无信息</span></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my_loading" v-show="loading" v-loading="loading">
    </div>
    <div class="tb_pagination" v-if="!loading && msgData.length">
    	<el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="pg_index"
	      :page-size="pg_count"
	      layout="total, prev, pager, next"
	      :total="total" class="fr">
	    </el-pagination>
    </div>
  </div>
  <!-- 风险预警 -->
  <el-dialog
    v-model="dialogWarning" :title="type ? '风险预警' : '情报中心'"
    custom-class="warn_dialog">
    <div class="warn_lists mb20">
      <div v-for="item in warnList" class="detail_top clearfix mt5">
        <div class="clearfix">
          <img class="fl" :src="item.tradeMark.tmImg" alt="">
        <div class="detail_right fl ml15">
          <div>
            <span class="name">商标名称</span><span class="txt ml15">{{item.tmName}}</span>
          </div>
          <div class="mt10">
            <span class="name">注册号</span><span class="txt ml15">{{item.tradeMark.regNo}}</span>
          </div>
          <div class="mt10">
            <span class="name">类别</span><span class="txt ml15">{{item.tradeMark.intCls}}</span>
          </div>
        </div>
        <div class="detail_right fl ml15">
          <div>
            <span class="name">申请时间</span><span class="txt ml15">{{item.tradeMark.regDate}}</span>
          </div>
          <div class="mt10">
            <span class="name">申请人</span><span class="txt ml15">{{item.tradeMark.applicantCn}}</span>
          </div>
          <div class="mt10">
            <span class="name">法律状态</span><span class="txt ml15">{{item.tradeMark.currentFlow}}</span>
          </div>
        </div>
        </div>
        <p class="mt10" v-if="item.newsType==2 && item.typeClassification==1">此商标工商信息有变更，商标著录项目信息未同步，可联系客户办理商标变更/转让业务</p>
        <p class="mt10" v-if="item.newsType==2 && item.typeClassification==2">此商标处于初审公告期，可能有第三方异议风险，可联系客户询问是否需要异议答辩</p>
        <p class="mt10" v-if="item.newsType==2 && item.typeClassification==3">此商标已满3年，可能有第三方撤三风险，可联系客户询问是否需要撤三答辩</p>
        <p class="mt10" v-if="item.newsType==2 && item.typeClassification==4">此商标即将到期，可联系客户办理续展业务</p>
        <p class="mt10" v-if="item.newsType==3 && item.typeClassification==1">此商标正处于初审公告期，可联系客户询问是否需要对此商标提出异议</p>
        <p class="mt10" v-if="item.newsType==3 && item.typeClassification==2">此商标注册已满三年，可联系客户询问是否需要对此商标提出撤三申请</p>
        <p class="mt10" v-if="item.newsType==3 && item.typeClassification==3">此商标未续展注销已满一年，可联系客户询问是否需要注册此商标</p>
      </div>
    </div>
    <div class="tb_pagination mb20" v-if="!loading && warnList.length">
      <el-pagination
        @current-change="DialogCurrentChange"
        :current-page.sync="pg_index_dialog"
        :page-size="pg_count"
        layout="total, prev, pager, next"
        :total="total_dialog" class="fr">
      </el-pagination>
    </div>
    <button @click="dialogWarning = false">联系客户</button>
  </el-dialog>
</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	const findStewardUrl = './api/findStewardSubjectByMemberId';
	const NewsByUrl = './api/statisticsNewsByOne';
  const NewsUrl = './api/findNews';
	const contactState = [
		{
			id:1,
			name:'已联络'
		},
		{
			id:2,
			name:'未联络'
		}
	];
	const khState = [
		{
			id:1,
			name:'无明确合作意向'
		},
		{
			id:2,
			name:'有意向，未确定合作'
		},
		{
			id:3,
			name:'确定合作，有异议未处理'
		},
		{
			id:4,
			name:'合同已签，未到款'
		},
		{
			id:5,
			name:'已到款'
		}
	]
	 export default {
	 	props:['type'],
    data() {
      return {
      	loading:false,
      	dataList:[],
      	pg_index:1,
      	pg_count:10,
      	total:0,
      	msgData:[],
      	number:0,
        dialogWarning:false,

        pg_index_dialog:1,
        total_dialog:0,
        warnList:[]
      }
    },
    methods: {
      lookWarn(item){
        this.warnId = item.id;
        this.searchWarn();
      },
      searchWarn () {
        let data = {
          pg_index:this.pg_index_dialog,
          pg_count: this.pg_count,
          stewardSubjectId:this.warnId,
          newsType:this.type ? 2 : 3
        }
        this.loading = true;
        this.$http.get(NewsUrl,{params:data})
        .then((resp) => {
          this.warnList = resp.data.elements;
          this.total_dialog = resp.data.total_elements;
          this.dialogWarning = true;
          this.loading = false;
        })
        .catch((err) => {
          this.dialogWarning = true;
        });
      },
      DialogCurrentChange(page){
        this.pg_index_dialog = page;
        this.searchWarn();

      },
    	search(){
    		let route = this.$route;
    		let data = {
    			memberId:route.query.id,
    			pg_index:this.pg_index,
    			pg_count:this.pg_count
    		}
    		if(this.type){
    			let info = {
    				applicationType:1
    			}
    			data = Object.assign({},data,info);
    		}else{
    			let info = {
    				applicationType:2
    			}
    			data = Object.assign({},data,info);
    		}
    		this.$http.get(findStewardUrl,{params:data})
				.then((resp) => {
					this.msgData = resp.data.elements;
					this.total = resp.data.total_elements;
					console.log(resp)
				})
				.catch((err) => {
				});
    	},
    	reset(){

    	},
    	handleCurrentChange(){
        this.search();
    	},
    	toChangePage(item){
    		this.$router.push({query: {type:1,status:1,focusType:1,enterType:1,id:item.id}})
    	}
    },
    mounted(){
    	let data = {
    		memberId:this.$route.query.id
    	}
    	if(this.type){
  			let info = {
  				newsType:2
  			}
  			data = Object.assign({},data,info);
  		}else{
  			let info = {
  				newsType:3
  			}
  			data = Object.assign({},data,info);
  		}
    	this.$http.get(NewsByUrl,{params:data})
			.then((resp) => {
				this.number = resp.data.newsNumber;
				console.log(resp)
			})
			.catch((err) => {
			});
    	this.search();
    }
  }
</script>
<style lang="less">
// 消息总览
	.message{border:1px dashed #DFE2E5;padding-bottom:30px;
		.tit{
			p{font-size:16px;}
		}
	}
</style>

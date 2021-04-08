<template>
<div class="customer_details" v-loading="loading">
	<!-- 客户企业 -->
	<div class="bor_desh">
		<div class="tit_table clearfix">
			<p class="fl ml10 mt10 mb10" style="color:#3db1fa;">{{enterStatus ? '主体' : '竞品'}}企业{{total}}</p>
			<p class="fl ml20 mt10 mb10">国际业务{{internationalNumber}}</p>
		</div>
		<div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="mainBody.companyName" placeholder="企业名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="mainBody.legalName" placeholder="企业法人"></el-input></div>
	    <div class="form_control">
		  	<el-select v-model="mainBody.regStatus" placeholder="登记状态">
			    <el-option
			      v-for="item in regStatus"
			      :key="item.id"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control">
		  	<el-select v-model="mainBody.company" placeholder="企业规模">
			    <el-option
			      v-for="item in companySize"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(); pg_index=1;">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>
		<div class="result">
		 	<table class="result_type">
	      <thead>
	        <tr class="thead">
	        	<th width="40" class="border_r">序号</th>
	        	<th class="border_r  alignc">企业名称</th>
	        	<th class="border_r" width="60">企业法人</th>
	          <th class="minWidth border_r alignc">旗下商标</th>
	          <th class="alignc border_r" width="100">{{enterStatus ? '风险预警' : '情报中心'}}</th>
	          <th class="alignc border_r">联系电话</th>
	          <th class="border_r  alignc">是否有国际业务</th>
	          <th class="minWidth border_r">成立日期</th>
	          <th class="minWidth border_r">登记状态</th>
	          <th class="minWidth alignc border_r">注册资本</th>
	          <th class="minWidth alignc border_r">所属行业</th>
	          <th class="minWidth border_r alignc">企业规模</th>
	          <th class="minWidth border_r alignc">备注</th>
	          <th class="minWidth alignc border_r">操作</th>
	        </tr>
	      </thead>
	      <tbody class="tr-color">
	        <tr v-for="(item,index) in dataList" :key="item.id">
	        	<td class="border_r alignc">{{index + 1}}</td>
	          <td class="border_r  alignc"><span class="regInfo">{{item.applicationName}}</span></td>
	          <td class="border_r alignc">{{item.frname}}</td>
	          <td class="border_r alignc">共{{item.trademarkNumber}}个，已托管{{item.depositeNumber}}个</td>
	          <td class="alignl border_r">
	          	<span v-show="enterStatus">共{{item.typeClassification1 + item.typeClassification2 + item.typeClassification3 + item.typeClassification4}}条，{{item.typeClassification2 || '0'}}条可异议风险，{{item.typeClassification3 || '0'}}条被撤三风险，{{item.typeClassification1 || '0'}}条变更风险，{{item.typeClassification4 || '0'}}条到期风险
	          	<a v-if="item.typeClassification1 || item.typeClassification2 || item.typeClassification3 || item.typeClassification4" style="display:block;cursor:pointer" @click="lookWarn(item)">查看</a>
	          	</span>
	          	<span v-show="!enterStatus">共{{item.typeClassification1 + item.typeClassification2 + item.typeClassification3}}条，{{item.typeClassification1 || '0'}}条可异议情报，{{item.typeClassification2 || '0'}}条可撤三情报，{{item.typeClassification3 || '0'}}条未续展注销
	          	<a v-if="item.typeClassification1 || item.typeClassification2 || item.typeClassification3" style="display:block;cursor:pointer" @click="lookWarn(item)">查看</a>
	          	</span>
	          </td>
	          <td class="alignc border_r">{{item.tel}}</td>
	          <td class="border_r alignc">{{item.international ? (item.international == 1 ? '是' : '否') : '否'}}</td>
	          <td class="border_r">{{item.esdate}}</td>
	          <td class="border_r alignc">{{item.applicationState || '--'}}</td>
	          <td class="alignc border_r">{{item.regcap}}万元</td>
	          <td class="alignc border_r">{{item.industryconame}}</td>
	          <td class="alignc border_r">{{sizeCompany(item.scale)}}</td>
	          <td class="border_r alignc" :title="item.remarks"><p class="nowrap">{{item.remarks ? (item.remarks.length > 15 ? item.remarks.substring(0,14) + '...' : item.remarks) : '--'}}</p></td>
	          <td class="alignc action" width="60">
	          	<a class="view" @click="toChangePage(item)">查看</a>
	          	<a class="view" @click="RemarkFn(item)">编辑</a>
	          </td>
	        </tr>
	        <tr class="empty" v-if="!loading && !dataList.length">
	          <td colspan="14" class="norecord">
	            <div class="empty_ic"><span>暂无信息</span></div>
	          </td>
	        </tr>
	      </tbody>
	    </table>
	    <div class="tb_pagination" v-if="!loading && dataList.length">
	    	<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="pg_index"
		      :page-size="pg_count"
		      layout="total, prev, pager, next"
		      :total="total" class="fr">
		    </el-pagination>
	    </div>
	  </div>
	</div>
	<!-- 风险预警 -->
	<el-dialog
	  v-model="dialogWarning" :title="enterStatus ? '风险预警' : '情报中心'"
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
	 	<button @click="goDetailFn()">联系客户</button>
	</el-dialog>
	<!-- 编辑企业详情 -->
  <el-dialog
  	title="编辑企业详情"
	  v-model="dialogEditor"
	  custom-class="editor_dialog" size="tiny">
	  <el-form ref="editor"  :rules="editorInfo" :model="editor">
	  	<el-form-item label="是否有国际业务" prop="resource">
		    <el-radio-group v-model="editor.resource">
		      <el-radio label="1" value='1'>是</el-radio>
		      <el-radio label="0" value='0'>否</el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="企业规模" prop="scale">
		    <el-select v-model="editor.scale" placeholder="请选择企业规模">
		      <el-option v-for="(item, index) in companySize" :key="index" :label="item.name" :value="item.id"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input type="textarea" v-model="editor.desc" placeholder="备注" maxlength="200"></el-input>
		  </el-form-item>
		  <button @click="submitRemarkFn">完成</button>
	  </el-form>
	</el-dialog>
</div>
</template>
<script>
	import Vue from 'vue'
	const StewardUrl = './api/findStewardSubject';
	const ByMmeberUrl = './api/statisticsinternationalByMmeberId';
	const NewsUrl = './api/findNews';
	const updateUrl = './api/updateSubject';

	const companySize = [
		{
			id:'1',
			name:'3000万以下（年销售额）'
		},
		{
			id:'2',
			name:'3000万-5000万（年销售额）'
		},
		{
			id:'3',
			name:'5000万-1亿（年销售额）'
		},
		{
			id:'4',
			name:'1亿-2亿（年销售额）'
		},
		{
			id:'5',
			name:'2亿到5亿（年销售额）'
		},
		{
			id:'6',
			name:'5亿以上（年销售额）'
		}
	]
	const regStatus = [
		{
			id:1,
			name:'在营'
		},
		{
			id:2,
			name:'存续'
		},
		{
			id:3,
			name:'吊销'
		},
		{
			id:4,
			name:'注销'
		},
		{
			id:5,
			name:'迁入'
		},
		{
			id:6,
			name:'迁出'
		},
		{
			id:7,
			name:'停业'
		},
		{
			id:8,
			name:'清算'
		}
	]
	 export default {
	 	props:['enterStatus'],
    data() {
      return {
      	dialogEditor:false,
      	editor:{
      		resource:'',
      		scale:''
      	},
      	editorInfo:{
	      	resource: [
            { required: true, message: '请选择是否有国际业务', trigger: 'change' }
          ],
          scale: [
            { required: true, message: '请选择企业规模', trigger: 'change' }
          ]
	      },

      	dialogWarning:false,
      	loading:false,
      	companySize:companySize,//企业规模
      	regStatus:regStatus,//登记状态
      	mainBody:{
      		legalName:'',
      		companyName:'',
      		regStatus:'',
      		company:''
      	},
      	comGoods:{},
      	dataList:[],
      	applicationType:1,

      	pg_index:1,
      	pg_count:10,
      	total:0,
      	internationalNumber:0,
      	warnList:[],

      	pg_index_dialog:1,
      	total_dialog:0,
      	selectItem: {},  //选择的企业
      }
    },
    methods: {
    	// 联系客户
    	goDetailFn () {
    		this.dialogWarning = false;
    		this.toChangePage(this.selectItem);
    	},
    	RemarkFn(item){//编辑企业
    		this.id = item.id;
    		this.dialogEditor = true;
    	},
    	submitRemarkFn(){//编辑企业
    		let self = this;
    		this.$refs['editor'].validate((valid) => {
          if (valid) {
          	let data = {
          		id:this.id,
          		international:this.editor.resource,
          		scale:this.editor.scale,
          		remarks:this.editor.desc,
          	}
          	this.$http.post(updateUrl,data)
          	.then((resp) =>{
          		this.dialogEditor = false;
          		this.editor = {
          			resource:'',
          			scale:'',
          			desc:''
          		}
          		if(self.enterStatus){
				    		self.applicationType = 1;
				    		self.search();
				    	}else{
				    		self.applicationType = 2;
				    		self.search();
				    	}
          		console.log(resp)
          	})
          }
        })
    	},
    	lookWarn(item){//查看风险
    		this.selectItem = item;  //选择的企业
    		this.warnId = item.id;
    		let data = {
    			pg_index:this.pg_index_dialog,
    			pg_count: this.pg_count,
    			stewardSubjectId:item.id,
    			newsType:this.enterStatus ? 2 : 3
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
    	searchWarn(){//风险，情报翻页数据
    		let data = {
    			pg_index:this.pg_index_dialog,
    			pg_count:this.pg_count,
    			stewardSubjectId:this.warnId,
    			newsType:this.enterStatus ? 2 : 3
    		}
    		this.$http.get(NewsUrl,{params:data})
    		.then((resp) => {
    			this.warnList = resp.data.elements;
				})
				.catch((err) => {
				});
    	},
    	sizeCompany(index){//过滤企业规模
    		let name = '';
    		if(index){
    			this.companySize.forEach(item => {
	    			if(item.id == index){
	    				name = item.name;
	    			}
	    		})
    		}else{
    			name = '--';
    		}
    		return name;
    	},
    	search(){//搜索
    		let data = {
    			memberId:this.$route.query.id,
    			applicationName:this.mainBody.companyName,
    			frname:this.mainBody.legalName,
    			applicationState:this.mainBody.regStatus,
    			scale:this.mainBody.company,
    			applicationType:this.applicationType,
	    		pg_index:this.pg_index,
	    		pg_count: this.pg_count,
	    	}
	    	let self = this;
				console.log(this.mainBody.company,'测试')
	    	this.$http.get(StewardUrl,{params:data})
				.then((resp) => {
					this.total = resp.data.total_elements;
					this.dataList = resp.data.elements;
				})
				.catch((err) => {
				});
    	},
    	reset(){//重置
    		this.pg_index = 1;
    		this.mainBody = {
    			companyName:'',
    			legalName:'',
    			company:'',
    			regStatus:'',
    		}
    	},
    	handleCurrentChange(page){//翻页
    		console.log(page)
    		this.pg_index = page;
    		if(this.enterStatus){
    			this.applicationType = 1;
	    		this.search();
	    	}else{
    			this.applicationType = 2;
	    		this.search();
	    	}
    	},
    	DialogCurrentChange(page){//弹框翻页
    		this.pg_index_dialog = page;
    		this.searchWarn();
    	},
    	toChangePage(item){//企业信息页面
    		var url =	this.$route.query;
    		if(this.enterStatus){
    			let data = {
    				myName: item.applicationName,
    				enterType:'2',
    				enterId:item.id
    			}
    			url = Object.assign({},url,data)
    		}else{
    			let data = {
    				focusName: item.applicationName,
    				focusType:'2',
    				focusId:item.id
    			}
    			url = Object.assign({},url,data)
    		}
    		console.log(url)
    		this.$router.push({query: url})
    	}
    },
    mounted(){
    	let data={};
    	if(this.enterStatus){
    		data = {
					memberId:this.$route.query.id,
    			applicationType:1
    		}
    	}else{
				data = {
					memberId:this.$route.query.id,
    			applicationType:2
    		}
    	}
    	console.log(data)
    	this.$http.get(ByMmeberUrl,{params:data})
			.then((resp) => {
				this.internationalNumber = resp.data.internationalNumber;
			})
			.catch((err) => {
			});
    	console.log(this.$route.query)
    	if(this.enterStatus){
    		this.applicationType = 1;
    		this.search();
    	}else{
    		this.applicationType = 2;
    		this.search();
    	}
    }
  }
</script>
<style lang="less">
// 企业详情部分
	.customer_details{
		.bor_desh{border:1px dashed #DFE2E5;padding-bottom:30px;}
		.tit_table{
			>p{font-size:16px;cursor: pointer;}
			p:hover{color:#3db1fa;}
		}
	}
	.warn_dialog{width:700px;
		.el-dialog__body{padding: 10px 0 20px;}
		.detail_top{background-color:#f6f6f6;padding:10px;}
		.warn_lists{height:500px;overflow-y: scroll;}
		.el-dialog__body >button{margin: 0 auto;background-color:#3db1fa;color:#fff;padding:5px 40px;border-radius:2px;display:block;}
		.tb_pagination{display:block;height:32px;}
	}
</style>

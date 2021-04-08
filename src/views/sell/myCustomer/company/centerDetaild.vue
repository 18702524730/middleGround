<template>
<div class="enter clearfix">
	<div class="top" v-if="status == 1">
		<span @click="ToLists">返回</span>
		<span class="ml30">{{enterStatus ? '主体' : '竞品'}}企业>{{companyName}}</span>
	</div>
	<div class="enter_type mt10 mb10" v-if="status < 3">
		<span :class="{'txt_color' : typeStatus}" @click="typeStatus = true">企业信息</span>
		<span class="ml30" :class="{'txt_color' : !typeStatus}" @click="Byrelation(),typeStatus = false">旗下商标</span>
	</div>
	<!-- 企业信息 -->
	<template v-if="datailsData && typeStatus">
		<div class="detail_item clearfix fl">
			<p class="fl key">企业法人</p>
			<p class="fl ml20 txt">{{datailsData.frname}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">登记状态</p>
			<p class="fl ml20 txt">{{datailsData.entstatus}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">联系电话</p>
			<p class="fl ml20 txt">{{datailsData.tel}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">地址</p>
			<p class="fl ml20 txt" style="width:73%;">{{datailsData.dom}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">企业类型</p>
			<p class="fl ml20 txt" style="width:72%;">{{datailsData.enttype || '--'}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">所属行业</p>
			<p class="fl ml20 txt">{{datailsData.industryphyname || '--'}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">注册资本</p>
			<p class="fl ml20 txt">{{datailsData.regcap || '--'}}万人民币</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">实缴资本</p>
			<p class="fl ml20 txt" style="width:73%;">{{datailsData.regcap || '--'}}万人民币</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">工商注册号</p>
			<p class="fl ml20 txt">{{datailsData.regno || '--'}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">成立日期</p>
			<p class="fl ml20 txt">{{datailsData.esdate || '--'}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key">企业规模</p>
			<p class="fl ml20 txt">{{sizeCompany(datailsData.scale)}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key key_max">是否有国际业务</p>
			<p class="fl ml20 txt">{{datailsData.international ? (datailsData.international == 1 ? '是' : '否') : '否'}}</p>
		</div>
		<div class="detail_item clearfix fl">
			<p class="fl key key_max">统一社会信用代码</p>
			<p class="fl ml20 txt">{{datailsData.creditcode || '--'}}</p>
		</div>
		<div class="detail_item detail_line clearfix fl">
			<p class="fl key">经营范围</p>
			<p class="fl ml20 txt">{{datailsData.opscope || '--'}}</p>
		</div>
		<el-button class="fr" size="small" @click="getMoreFn">查看更多</el-button>
	</template>
	<!-- 旗下商标 -->
	<template v-if="!typeStatus">
		<div class="titlist clearfix">
			<p class="fl" :class="{'color_p' : centerState == 0}" @click="trademarkState(1)">全部{{numIndex.trademarkNumber}}</p><p class="ml20 fl" :class="{'color_p' : centerState == 1}" @click="trademarkState(2)">核心商标{{numIndex.coreNumber}}</p><p class="ml20 fl" :class="{'color_p' : centerState == 2}" @click="trademarkState(3)">已托管{{numIndex.depositeNumber}}</p><p class="ml20 fl" :class="{'color_p' : centerState == 3}" @click="trademarkState(4)">未托管{{numIndex.trademarkNumber-numIndex.depositeNumber}}</p>
		</div>
		<div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="its.companyName" placeholder="商标名称"></el-input></div>
	  	<div class="form_control"><el-input v-model="its.number" placeholder="注册号"></el-input></div>
	    <div class="form_control" style="width:200px">
		  	<el-select v-model="its.regStatus" placeholder="商标类别" size="small">
			    <el-option
			      v-for="item in cateIdData"
			      :key="item.id"
			      :label="(item.id<10 ? '0'+item.id : item.id) +'-'+item.goodsname"
			      :value="item.id">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control" style="width:200px">
		  	<el-select v-model="its.law" placeholder="法律状态" size="small">
			    <el-option
			      v-for="item in law"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control" v-if="centerState == 1 || centerState == 2">
		  	<el-select clearable v-model="its.used" placeholder="已使用年限">
			    <el-option
			      v-for="item in used"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_submit">
				<button class="submit" style="margin-top:3px;" @click="Byrelation(); pg_index=1;">搜索</button>
				<button class="reset" style="margin-top:3px;" @click="reset">重置</button>
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
	          <!-- <th class="alignc border_r" width="100">注册状态</th> -->
	          <th class="alignc border_r" width="100">托管状态</th>
	          <th class="alignc border_r" width="100">商标类别</th>
	          <!-- <th class="alignc border_r" width="100">申请人</th> -->
	          <th class="border_r  alignc">法律状态</th>
	          <th class="minWidth border_r alignc">申请时间</th>
	          <th class="minWidth border_r alignc">注册时间</th>
	          <th class="minWidth alignc border_r">已使用年限</th>
	          <th class="minWidth alignc border_r">近似商标</th>
	          <th class="minWidth alignc border_r">风险预警</th>
	          <th class="minWidth border_r alignc">备注</th>
	          <th class="minWidth alignc border_r">操作</th>
	        </tr>
	      </thead>
	      <tbody class="tr-color">
	        <tr v-for="(item,index) in byListData" v-if="byListData && byListData.length">
	        	<td class="border_r alignc">{{index+1}}</td>
	          <td class="border_r  alignc"><span class="regInfo">{{item.tmName || '图形商标'}}</span></td>
	          <td class="border_r alignc"><img :src="item.tmImg" width="60px" alt=""></td>
	          <td class="border_r">{{item.regNo || '--'}}</td>
	          <!-- <td class="alignc border_r">{{item.applicantCn || '--'}}</td> -->
	          <td class="alignc border_r">
	          	<span v-if="item.core">核心商标</span>
	          	<span v-if="item.state && !item.core">已托管</span>
	          	<span v-if="!item.state && !item.core">未托管</span>
	          </td>
	          <td class="alignc border_r">{{ item.intCls<10 ? '0'+item.intCls : item.intCls}} {{ cateIdData[item.intCls-1].goodsname }}</td>
	          <!-- <td class="alignc border_r">{{item.applicantCn || '--'}}</td> -->
	          <td class="border_r alignc">{{item.currentStatus || '--'}}</td>
	          <td class="border_r alignc">{{item.appDate || '--'}}</td>
	          <td class="border_r alignc">{{item.regDate || '--'}}</td>
	          <td class="alignc border_r">{{ item.yearNumber }}</td>
	          <td class="alignc border_r"><a :href="'#/sell/keyPoint/similarList?keyword='+item.tmName" class="view">查看</a></td>
	          <td class="alignc border_r" ><a class="view" v-if="item.state" @click="warnLook(item)">查看</a><span v-else>--</span></td>
	          <td class="border_r alignc" width="90px" :title="item.remarks"><p class="nowrap">{{item.remarks ? (item.remarks.length > 15 ? item.remarks.substring(0,14) + '...' : item.remarks) : '--'}}</p>
	          	<a class="view" v-if="item.state" @click="editorTrademark(item)">编辑</a></td>
	          <td class="alignc action" width="60">
	          	<a class="view" @click="toTrademarkDetail(item)">查看</a>
	          </td>
	        </tr>
	        <tr class="empty" v-if="!loading && !byListData.length">
	          <td colspan="15" class="norecord">
	            <div class="empty_ic"><span>暂无信息</span></div>
	          </td>
	        </tr>
	      </tbody>
	    </table>
	    <div class="my_loading" v-show="loading" v-loading="loading">
	    </div>
	    <div class="tb_pagination" v-if="!loading && byListData.length">
	    	<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="pg_index"
		      :page-size="pg_count"
		      layout="total, prev, pager, next"
		      :total="total" class="fr">
		    </el-pagination>
	    </div>
		</div>
	</template>

	<template v-if="!datailsData && typeStatus">
		<p class="data_null">暂无数据</p>
	</template>
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
	 	<button class="contact" @click="dialogWarning = false">联系客户</button>
	</el-dialog>
  <!-- 编辑备注 -->
  <el-dialog
  	title="编辑备注"
	  v-model="dialogNote"
	  custom-class="editor_dialog" size="tiny">
	  <el-form>
	  	<el-form-item>
		    <el-input type="textarea" v-model="desc" :autosize="{ minRows: 4}" placeholder="备注" maxlength="200"></el-input>
		  </el-form-item>
		  <button @click="submitRemarkFn">完成</button>
	  </el-form>
	</el-dialog>
</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import CONFIG_ from 'config/hostConfig.js';

	const sellUrl = CONFIG_.rootUrl;
	const CompanyUrl = './api/findCompanyDetails';
	const ByrelationUrl = './api/findStewardTrademarkByrelation';
	const TramarkUrl = './api/statisticsTramark';
	const NewsUrl = './api/findNews';
	const editSearchRecordRemark = './api/editSearchRecordRemark';
	const updateSubjectRelation = sellUrl + '/api/updateSubjectRelation';  //旗下商标编辑备注

	import intClsData from 'utils/intClsData.js'
	const companySize = [
		{
			id:1,
			name:'3000万以下（年销售额）'
		},
		{
			id:2,
			name:'3000万-5000万（年销售额）'
		},
		{
			id:3,
			name:'5000万-1亿（年销售额）'
		},
		{
			id:4,
			name:'1亿-2亿（年销售额）'
		},
		{
			id:5,
			name:'2亿到5亿（年销售额）'
		},
		{
			id:6,
			name:'5亿以上（年销售额）'
		}
	]
	const law = [
		{
			id:1,
			name:'待审中'
		},
		{
			id:4,
			name:'已初审'
		},
		{
			id:3,
			name:'已驳回'
		},
		{
			id:2,
			name:'已注册'
		},
		{
			id:0,
			name:'已销亡'
		}
	]
	const used = [
		{
			id:1,
			name:'3年以下'
		},
		{
			id:2,
			name:'3-5年'
		},
		{
			id:3,
			name:'5-10年'
		},
		{
			id:4,
			name:'10-20年'
		},
		{
			id:5,
			name:'20年以上'
		}
	]
	export default {
	 	props:['enterStatus'],
    data() {
      return {
      	dialogNote:false,
      	desc:'',
      	selectItemId:'',

      	dialogWarning:false,
      	loading:false,
      	dataList:[],

      	typeStatus:true,
      	its:{
      		law: '',
    			regStatus:''
      	},
      	cateIdData: intClsData.cateIdData,
      	law:law,
      	used:used,

      	status:0,
      	type:0,
      	companyName:'',
      	datailsData:'',
      	companySize:companySize,//企业规模

      	byListData:[],
      	pg_index:1,
      	pg_count:10,
      	total:0,
      	numIndex:{},
      	centerState:0,
      	// 风险预警部分
      	warnId:'',
      	warnList:[],
      	total_dialog:0,
      	pg_index_dialog:1
      }
    },
    methods: {
    	// 企业详情查看更多
    	getMoreFn () {
    		window.open('http://www.qichacha.com/');
    	},
    	editorTrademark(item){//编辑备注
    		this.selectItemId = item.id;
    		this.dialogNote = true;
    	},
    	// 提交备注
      submitRemarkFn () {
        let params = {
        	memberId: this.$route.query.id,
          trademarkId: this.selectItemId,
          remarks: this.desc
        }
        this.$http.post(updateSubjectRelation, params)
        .then( resp => {
        	this.$message({
        		type:'success',
        		message: '提交备注成功'
        	})
          this.desc = '';
          this.dialogNote = false;
          this.Byrelation();
        })
      },
    	warnLook(item){//查看风险，首次进入
    		this.warnId = item.id;
    		let data = {
    			pg_index:this.pg_index_dialog,
    			pg_count:this.pg_count,
    			trademarkId:item.id,
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
    	DialogCurrentChange(page){//弹框翻页
    		this.pg_index_dialog = page;
    		this.searchWarn();
    	},
    	searchWarn(){
    		let data = {
    			pg_index:this.pg_index_dialog,
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
    	trademarkState(index){
    		this.centerState = index - 1;
    		if(index == 1){
    			this.core = '';
    			this.untrusteeship = 0;
    		}else if(index == 2){
    			this.core = 1;
    			this.untrusteeship = 2;
    		}else if(index == 3){
    			this.core = '';
    			this.untrusteeship = 2;
    		}else if(index == 4){
    			this.core = '';
    			this.untrusteeship = 1;
    		}
    		this.Byrelation();
    	},
    	toTrademarkDetail(item){//商标详情
				var url =	this.$route.query;
    		if(this.enterStatus){//主体
    			let data = {
    				enterType:'3',
    				enterNo:item.applicantOther2,
    				enterCls:item.intCls,
    				enterId:item.trademarkId
    			}
    			url = Object.assign({},url,data)
    		}else{//竞品
    			let data = {
    				focusType:'3',
    				focusNo:item.applicantOther2,
    				focusCls:item.intCls,
    				focusId:item.trademarkId
    			}
    			url = Object.assign({},url,data)
    		}
    		console.log(url)
    		this.$router.push({query: url})
    	},
    	handleCurrentChange(page){
    		this.pg_index = page;
    		this.Byrelation();
    	},
    	reset(){
    		this.pg_index = 1;
    		this.its = {
    			law: '',
    			regStatus:''
    		};
    	},
    	sizeCompany(index){
    		let name = '';
    		if(index){
    			this.companySize.forEach(item => {
	    			if(item.id = index){
	    				name = item.name;
	    			}
	    		})
    		}else{
    			name = '--';
    		}
    		return name;
    	},
    	search(){
    		let route = this.$route;
    		let data = {}
    		if(this.enterStatus){
    			data = {
	    			companyName: this.companyName ? this.companyName : route.query.myName,
	    			stewardSubjectId: this.$route.query.enterId
	    		}
    		}else{
    			data = {
	    			companyName: this.companyName ? this.companyName : route.query.focusName,
	    			stewardSubjectId: this.$route.query.enterId
	    		}
    		}
    		this.$http.get(CompanyUrl,{params:data})
				.then((resp) => {
					this.datailsData = resp.data.data;
					console.log(resp.data,'详情')
				})
				.catch((err) => {
				});
    	},
    	Byrelation(){//旗下商标
    		let data = {
    			applicantName: this.companyName ? this.companyName : (this.enterStatus ? this.$route.query.myName : this.$route.query.focusName),
    			core:this.core,
    			untrusteeship:this.untrusteeship,
    			currentStatus:this.its.law,
    			yaer:this.its.used,
    			regNo:this.its.number,
    			intCls:this.its.regStatus,
    			trademarkName:this.its.companyName,
    			pg_index:this.pg_index,
    			pg_count:this.pg_count,
    			memberId: this.$route.query.id
    		}
    		console.log(data)
    		if(this.enterStatus){//判断是主体还是竞品
    			let info = {
    				stewardSubjectId:this.$route.query.enterId
    			}
    			data = Object.assign({},data,info)
    		}else{
					let info = {
    				stewardSubjectId:this.$route.query.focusId
    			}
    			data = Object.assign({},data,info)
    		}
    		this.$http.get(ByrelationUrl,{params:data})
				.then((resp) => {
					this.byListData = resp.data.elements;
					this.total = resp.data.total_elements;
					console.log(resp.data,'列表')
				})
				.catch((err) => {
				});
    	},
    	ToLists(){
    		var url =	this.$route.query;
    		if(this.enterStatus){
    			let data = {
    				enterType:'1'
    			}
    			url = Object.assign({},url,data)
    		}else{
    			let data = {
    				focusType:'1'
    			}
    			url = Object.assign({},url,data)
    		}
    		console.log(url)
    		this.$router.push({query: url})
    	}
    },
    mounted(){
    	let route = this.$route;
    	let type = route.query.type;
	    this.type = type;
    	this.status = route.query.status;
    	let data = {};
    	if(this.enterStatus){
    		data = {
    			stewardSubjectId:route.query.enterId
    		}
    		this.companyName = route.query.myName;
    	}else{
    		data = {
    			stewardSubjectId:route.query.focusId
    		}
    		this.companyName = route.query.focusName;
    	}
    	this.search();
				console.log(data,'数量')
    	this.$http.get(TramarkUrl,{params:data})
			.then((resp) => {
				this.numIndex = resp.data;
				console.log(resp.data,'数量')
			})
			.catch((err) => {
			});
    }
  }
</script>
<style lang="less">
// 企业详情
	.enter{border:1px dashed #DFE2E5;padding:10px;
		.result{padding: 10px 10px 30px 10px;}
		.data_null{width: 100%;font-size: 18px;color:#999;padding:50px 0;text-align: center;}
		.top,.enter_type{
			span{font-size: 14px;cursor: pointer;}
		}
		.enter_type{border-bottom: 1px solid #eee;padding-bottom:10px;}
		// 商标详情
		.header{padding-left:10px;
			img{width:90px;height:90px;}
			.header_r{
				p{line-height: 30px;font-size:14px;color:#333;}
			}
		}
		.main{width:100%;
			.info_list{
				>div{width:25%;}
				p{font-size:14px;color:#333;
					span{color:#666;}
				}
			}
			.process_list{
				>div{
					p{font-size:14px;}
					ul{
						li{font-size:14px;color:#666;width:400px;padding-right: 15px;
							a{color:#3db1fa;text-decoration:none;}
						}
					}
				}
			}
		}
		.detail_item {
			width:33%; font-size:14px; margin-bottom: 8px;
			p{font-size:14px;color:#333;}
			.key {width:70px; text-align: left;}
			.key_max {width:120px;}
			.txt{font-size:14px;color:#666;line-height:24px; max-width: 210px;}
		}
		.detail_line {
			width: 100%;
			.txt {max-width: 90%; }
		}
		.details_lists{width:100%;
			.list_l{width:25%;
				p{font-size:14px;color:#333;}
				.txt{font-size:14px;color:#666;line-height:24px;}
			}
		}
		.details_type{padding-top: 20px;
			p{font-size:16px;}
		}
		.details_txt{width:100%;
			.list_l{width:100%;
				p{font-size:16px;color:#333;}
				.tit{width:65px;}
				.txt{font-size:14px;color:#666;width:89%;}
			}
		}
		.contact{background-color:#3db1fa;color:#fff;font-size:14px;border-radius:2px;padding:5px 15px}
		.titlist{
			p{font-size:16px;cursor: pointer;}
			.color_p{color:#3db1fa;}
		}
		.titlist:first-child{color:#3db1fa;}
		.view{cursor: pointer;}
	}
</style>

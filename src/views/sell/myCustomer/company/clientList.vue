<template>
<div>
	<div class="condition clearfix">
		<div class="form_control"><el-input v-model="dataObj.regInfo" placeholder="手机号码"></el-input></div>
		<div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
		<div class="form_control"><el-input v-model="dataObj.wxName" placeholder="微信昵称"></el-input></div>
	  <div class="form_control">
	  	<el-select clearable v-model="dataObj.callStatus" placeholder="联系状态">
		    <el-option
		      v-for="item in contactState"
		      :key="item.id"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		</div>
		<div class="form_control">
	  	<el-select clearable v-model="dataObj.khStatus" placeholder="客户类型">
		    <el-option
		      v-for="item in khState"
		      :key="item.id"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		</div>
		<div class="form_control" v-if="distributeIsAllowed">
	  	<el-select clearable v-model="dataObj.optionStatus" placeholder="客户归属">
		    <el-option
		      v-for="item in options"
		      :key="item.admin_id"
		      :label="item.name"
		      :value="item.admin_id">
		    </el-option>
		  </el-select>
		</div>
		<div class="form_submit">
			<button class="submit" @click="search(); pg_index=1;">搜索</button>
			<button class="reset" @click="reset">重置</button>
		</div>
	</div>

  <div class="result check">
	 	<table class="result_type">
      <thead>
        <tr class="thead">
        	<th width="70" class="border_r alignc">序号</th>
        	<th class="border_r alignc" width="100">手机号码</th>
        	<th class="border_r" width="60">客户姓名</th>
          <th class="border_r alignc">微信昵称</th>
          <th class="alignc border_r" width="100">上次活跃时间</th>
          <th class="alignc border_r" width="140">主体企业</th>
          <th class="minWidth maxWidth border_r alignc">竞品企业</th>
          <th class="minWidth border_r alignc">客户消息总览</th>
          <th class="minWidth border_r alignc">求购商标</th>
          <th class="minWidth alignc border_r">联系状态</th>
          <th class="minWidth alignc border_r">客户类型</th>
          <th class="minWidth alignc border_r" v-if="distributeIsAllowed">客户归属</th>
          <th class="minWidth border_r alignc" width="80">备注</th>
          <th class="minWidth alignc border_r">操作</th>
        </tr>
      </thead>
      <tbody class="tr-color">
        <tr v-for="(item , index) in clientList" v-if="clientList && clientList.length">
        	<!-- 序号 -->
        	<td class="border_r alignc">
        		<el-checkbox v-model="item.isSelect" v-show="showCheckAll" class="checkbox_list" @change="addLists(item, index)"></el-checkbox>
        		{{index + 1}}
        	</td>
          <!-- 客户账号 -->
          <td class="border_r alignc"><span class="regInfo">{{item.memberPhone || '--'}}</span></td>
          <!-- 客户姓名 -->
          <td class="border_r alignc">{{item.truename || '--'}}</td>
          <!-- 微信昵称 -->
          <td class="alignc border_r">{{item.nickname || '--'}}</td>
          <!-- 上次活跃时间 -->
          <td class="maxWidth border_r alignc">{{item.lastLoginTime | dateFormat}}</td>
          <!-- 主体企业 -->
          <td class="border_r alignc">{{item.mySubject || '0'}}家，共{{item.myTrademarkNumber || '0'}}个商标，已托管{{item.myDepositeNumber || '0'}}个</td>
          <!-- 竞品企业 -->
          <td class="alignc border_r">{{item.otherSubject || '0'}}家，共{{item.otherTrademarkNumber || '0'}}个商标，已托管{{item.otherDepositeNumber || '0'}}个</td>
          <!-- 客户消息总览 -->
          <td class="alignc border_r">{{(item.news21+item.news22+item.news23+item.news24) || 0}}条风险，{{(item.news31+item.news32+item.news33) || 0}}条情报</td>
          <!-- 求购商标 -->
          <td class="alignc border_r">{{item.wantbuy || '--'}}</td>
          <!-- 联络状态 -->
          <td class="alignc border_r">{{item.liaisonState==1 ? '已联系' : '未联系'}}</td>
          <!-- 客户类型 -->
          <td class="alignc border_r">{{item.memberType | memberState}}</td>
          <!-- 客户归属 -->
          <td class="alignc border_r" v-if="distributeIsAllowed">{{item.saleName}}</td>
          <!-- 备注 -->
          <td class="border_r alignc" :title="item.remarks"><p class="nowrap">{{item.remarks ? (item.remarks.length > 15 ? item.remarks.substring(0,14) + '...' : item.remarks) : '--'}}</p></td>
          <!-- 操作 -->
          <td class="alignc action" width="60">
          	<a class="view" @click="toChangePage(item)">查看</a>
          	<a class="view" @click="editorClick(item)">编辑</a>
          	<a class="view" v-if="distributeIsAllowed" @click="SelectFn(item)">分配</a>
          	<a class="view" v-if="!distributeIsAllowed" @click="SeasClick(item)">移回公海</a>
          </td>
        </tr>
        <tr class="empty" v-if="!loading && !clientList.length">
          <td colspan="14" class="norecord">
            <div class="empty_ic"><span>暂无信息</span></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my_loading" v-show="loading" v-loading="loading">
    </div>
    <div class="tb_pagination" v-if="!loading && clientList.length">
    	<el-checkbox v-model="checkedAll" v-show="showCheckAll" @change="selectAllFn">全选</el-checkbox>
    	<button v-if="distributeIsAllowed" @click="CheckAll">{{showCheckAll ? '确认分配' : '批量分配'}}</button>
    	<el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="pg_index"
	      :page-size="pg_count"
	      layout="total, prev, pager, next"
	      :total="total" class="fr">
	    </el-pagination>
    </div>
  </div>
	<!-- 移回公海 -->
  <el-dialog
  	title="移回公海"
	  v-model="dialogMobile"
	  custom-class="mobile_dialog" size="tiny">
	  <el-form>
	  	<p class="mb20">确定将此客户移回公海？</p>
	  	<el-form-item label="移回原因" label-width="80px" required>
		    <el-input v-model="mobile.name" maxlength="200"></el-input>
		  </el-form-item>
		  <button @click="seasConfirm">确认</button>
	  </el-form>
	</el-dialog>
	<el-dialog title="编辑客户详情"
	  :visible.sync="dialogState" class="distributeDialog" :modal-append-to-body="true">
	  <el-form ref="editorInfo"  :rules="editor" :model="editorInfo" label-width="120px">
		  <el-form-item label="客户姓名" >
		    <el-input v-model="editorInfo.name" disabled placeholder="客户姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="客户类型" prop="region">
		    <el-select v-model="editorInfo.region" placeholder="客户类型">
		      <el-option label="无明确合作意向" value="1"></el-option>
		      <el-option label="有意向，未确定合作" value="2"></el-option>
		      <el-option label="确定合作，有异议未处理" value="3"></el-option>
		      <el-option label="合同已签，未到款" value="4"></el-option>
		      <el-option label="已到款" value="5"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="联系状态" prop="call">
		    <el-select v-model="editorInfo.call" placeholder="联系状态">
		      <el-option label="已联系" value="1"></el-option>
		      <el-option label="未联系" value="0"></el-option>
		    </el-select>
		  </el-form-item>

		  <el-form-item label="备注" prop="desc">
		    <el-input type="textarea" v-model="editorInfo.desc" :maxlength="200" placeholder="备注"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm()">完成</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
	<!-- 批量分配 -->
	<el-dialog
    title="分配客户"
    :visible.sync="selectVisible"
    size="tiny"
    custom-class="select_box"
    >
    <el-form>
      <el-form-item label="将客户分配给">
	      <el-select clearable v-model="selectOption" placeholder="销售人员">
			    <el-option
			      v-for="item in options"
			      :key="item.admin_id"
			      :label="item.name"
			      :value="item.admin_id">
			    </el-option>
			  </el-select>
			</el-form-item>
		</el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="selectVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitSelectFn">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import {store} from 'utils/';
	import Filters from 'utils/filters/'
	const CustomerUrl = './api/findCustomerList';
	const MemberUrl = './api/updateMemberTypeCustomerPool';
	const SeasUrl = './api/backhighSeas';
	const distributeMenuPermission = 'iprp_mpsteward_customer_mainmymember';
	const findSaleUrl = './api/findSaleName';
	const distriUrl = './api/distributionMember';
	const contactState = [
		{
			id:1,
			name:'已联系'
		},
		{
			id:0,
			name:'未联系'
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
    data() {
      return {
      	selectVisible:false,
      	options: [],
      	selectOption:'',
      	distributeIsAllowed: false, //判断是否是主管
      	checkedAll:false,
      	dialogState:false,
      	showCheckAll:false,
      	dialogMobile:false,
      	mobile:{},
      	note:{},
      	editorInfo:{},
	      editor:{
	      	region: [
            { required: true, message: '请选择客户类型', trigger: 'change' }
          ],
          call: [
            { required: true, message: '请选择联络状态', trigger: 'change' }
          ]
	      },
      	clientList:[],
      	loading:false,
      	ceshi:"我们的征途是星辰大海，向着宇宙前进我们的征途是星辰大海，向着宇宙前进",
      	dataObj:{},
      	khState:khState,//客户状态
      	contactState:contactState,//联系状态

      	pg_index:1,
      	pg_count:10,
      	total:0,
      	id:'',
      	selectList:[]
      }
    },
    methods: {
    	SelectFn(item){//单向分配
    		this.selectList = [item.memberId];
				this.showCheckAll = false;
				this.selectVisible = true;
    	},
    	submitSelectFn(){//批量分配
    		if (!this.selectOption) {
    			this.$message({
    				type:'error',
    				message: '请选择需要分配的销售人员!'
    			})
    			return
    		}
    		let data = {}
    		this.options.forEach(item => {
    			if(this.selectOption == item.admin_id){
    				data = {
		    			memberList:this.selectList,
		    			saleId:this.selectOption,
		    			saleName:item.name
		    		}
    			}
    			console.log(item)
    		})
    		this.$http.post(distriUrl,data)
				.then((resp) => {
					this.$message({
    				type:'success',
    				message: '分配成功!'
    			})
					this.selectList = [];
					this.selectOption = '';
					this.selectVisible = false;
					this.showCheckAll = false;
					this.search();
					console.log(resp)
				})
    	},
    	CheckAll(){//打开多选
    		if(!this.showCheckAll){
    			this.showCheckAll = true;
    		}else{
    			if (!this.selectList.length) {
    				this.$message({
    					type: 'error',
    					message: '请选择需要分配的客户!'
    				})
    			}
    			else{
    				this.selectVisible = true;
    			}
    		}
    	},
    	selectAllFn () {//全选
				this.clientList.forEach( (item) => {
					if(!item.state){
						item.isSelect = this.checkedAll;
					}
				})
				if (this.checkedAll) {
					this.clientList.forEach( (item) => {
						this.selectList.push(item.memberId);
					})
				}
				else{
					this.clientList.forEach( (item) => {
						let i = this.selectList.indexOf(item.memberId);
						this.selectList.splice(i, 1);
					})
				}
			},
			// 判断是否需要全选
			isSelectAllFn () {
				for (var i = 0; i < this.clientList.length; i++) {
					let info = this.clientList[i];
					if (!info.isSelect) {
						this.checkedAll = false;
						break
					}
					else{
						this.checkedAll = true;
					}
				}
			},
    	addLists(item, index){//点击多选
				console.log(this.selectList)
				Vue.set(this.clientList, index, item);  //刷新视图
				this.isSelectAllFn();   //判断是否需要全选
				if (item.isSelect) {
					this.selectList.push(item.memberId);
				}
				else{
					let index_ = this.selectList.indexOf(item.memberId);
					this.selectList.splice(index_, 1);
				}
			},
    	editorClick(data){//编辑
    		this.id = data.id;
    		this.editorInfo.name = data.truename;
    		this.dialogState = true;
    	},
    	SeasClick(item){//移回公海
    		this.id = item.memberId;
				this.dialogMobile = true;
    	},
    	search(){
	    	let data = {
	    		memberPhone:this.dataObj.regInfo ? this.dataObj.regInfo : '',
	    		truename:this.dataObj.memberName ? this.dataObj.memberName : '',
	    		nickname:this.dataObj.wxName ? this.dataObj.wxName : '',
	    		liaisonState:this.dataObj.callStatus,
	    		saleId:this.dataObj.optionStatus || '',
	    		memberType:this.dataObj.khStatus ? this.dataObj.khStatus : '',
	    		pg_index:this.pg_index,
	    		pg_count:this.pg_count,
	    	}
	    	this.loading = true;
	    	let self = this;
	    	let list = [];
	    	this.$http.get(CustomerUrl,{params:data})
				.then((resp) => {
					this.loading = false;
					console.log(resp.data.elements)
					list = resp.data.elements;
					this.total = resp.data.total_elements;
					self.clientList = list;
					self.clientList.forEach( (item) => {
						item.isSelect = false;
						if (this.selectList.length) {
							this.selectList.forEach( (info) => {
      					if (item.memberId == info.memberId) {
      						item.isSelect = true;
      					}
      				})
						}
					})
				})
				.catch((err) => {
					this.loading = false;
				});
    	},
    	reset(){//重置
    		this.pg_index=1;
    		this.dataObj = {
    			regInfo:'',
    			memberName:'',
    			wxName:'',
    			callStatus:'',
    			khStatus:'',
    			optionStatus:''
    		}
    	},
    	handleCurrentChange(page){//翻页
    		console.log(page)
    		this.pg_index = page;
    		this.search();
    	},
    	toChangePage(item){//查看详情
    		this.$router.push({query: {type:1,status:1,focusType:1,enterType:1,id:item.memberId}})
    	},
    	submitForm(){//编辑客户详情
    		this.$refs['editorInfo'].validate((valid) => {
          if (valid) {
          	let data = {
          		id:this.id,
          		memberType:this.editorInfo.region,
          		liaisonState:this.editorInfo.call,
          		remarks:this.editorInfo.desc,
          	}
            this.$http.post(MemberUrl,data)
						.then((resp) => {
							this.search();
							this.dialogState = false;
							this.editorInfo = {
								region:'',
								call:'',
								desc:''
							}
							console.log(resp.data.elements)
						})
						.catch((err) => {
							this.dialogState = false;
						});
          } else {
            return false;
          }
        });
    	},
    	seasConfirm(){//公海
    		if(!this.mobile.name){
    			this.$message({
	          message: '请填写移回公海理由',
	          type: 'warning'
	        });
	        return;
    		}
    		let data = {
      		memberId:this.id,
      		reason:this.mobile.name
      	}
        this.$http.post(SeasUrl,data)
				.then((resp) => {
					this.search();
					this.dialogMobile = false;
					this.mobile.name = ''; //清空移回原因
				})
				.catch((err) => {
					this.dialogMobile = false;
				});
    	}
    },
    mounted(){
      this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
      if(this.distributeIsAllowed){//查询销售专员
      	this.$http.get(findSaleUrl)
				.then((resp) => {
					this.options = resp.data.elements;
					console.log(resp.data.elements)
				})
				.catch((err) => {
					this.dialogMobile = false;
				});
      }
      if (this.$route.query.memberPhone) {
      	this.dataObj.regInfo = this.$route.query.memberPhone;
      }

    	this.search();
    },
    filters: {
    	dateFormat:Filters.formatDate.dateFormat,
    	memberState: function(data){
		    var ret = ''
		    switch (data+''){
		    	case 'null':
		        ret = "--";
		        break;
		      case '1':
		        ret = "无明确合作意向";
		        break;
		      case '2':
		        ret = "有意向，未确定合作";
		        break;
		      case '3':
		        ret = "确定合作，有异议未处理";
		        break;
		      case '4':
		        ret = "合同已签，未到款";
		        break;
		      case '5':
		        ret = "已到款";
		        break;
		    }
		    return ret;
		  },
    }
  }
</script>
<style lang="less">
	.condition{
		padding-left: 10px;padding-top: 5px;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
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
			.submit{line-height: 1;}
			.reset{background-color: #fff;color:#479CFF;line-height: 1;}
		}
	}
	.tb_pagination{
		>button{background-color:#3db1fa;padding: 5px 10px;color:#fff;font-size:14px;border-radius:3px;}
	}
	.tr-color{
		tr{
			td{position: relative;}
		}
	}
	.myList  div.check{padding-left:20px}
	.myList .result .result_type tbody tr td .checkbox_list{position: absolute;left:-20px;top:24px;}
</style>

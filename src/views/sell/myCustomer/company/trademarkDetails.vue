<template>
<div class="trademark">
	<div class="top mb20">
		<span @click="ToLists">返回</span>
		<span class="ml30">{{enterStatus ? '主体' : '竞品'}}企业>{{companyName}}>{{ trademarkDetails.tmName }}</span>
	</div>
	<div class="header clearfix" v-show="trademarkDetails">
		<img class="fl" :src="trademarkDetails.tmImg" alt="">
		<div class="header_r fl ml20">
			<p>商标名称：{{trademarkDetails.tmName}}</p>
			<p>注册号：{{trademarkDetails.regNo}}</p>
			<p>申请人：{{trademarkDetails.applicantCn}}</p>
		</div>
		<div class="state fr">
			<p v-if="trademarkDetails.core == 1">{{trademarkDetails.core == 1 ? '核心商标' : ''}}</p>
			<p>{{trademarkDetails.state == 1 ? '已托管' : '未托管'}}</p>
			<a style="color:#3db1fa;font-size:14px;" class="ml10" :href="'#/sell/keyPoint/similarList?keyword='+trademarkDetails.tmName">查看近似商标</a>
		</div>
		
	</div>

	<div class="main" v-show="trademarkDetails">
		<div class="info_list clearfix mt15">
			<div class="fl">
				<p>申请时间：<span class="ml15">{{trademarkDetails.appDate || '--'}}</span></p>
			</div>
			<div class="fl">
				<p>注册时间：<span class="ml15">{{trademarkDetails.regDate || '--'}}</span></p>
			</div>
			<div class="fl">
				<p>有效年限：<span class="ml15">{{trademarkDetails.privateDate || '--'}}</span></p>
			</div>
			<div class="fl">
				<p>已使用年限：<span class="ml15">{{trademarkDetails.yearNumber || '--'}}</span></p>
			</div>
		</div>
		<div class="info_list clearfix mt15">
			<div class="fl">
				<p>商标类别：<span class="ml15">{{ trademarkDetails.intCls<10 ? '0'+trademarkDetails.intCls : trademarkDetails.intCls }}--{{ cateIdData[trademarkDetails.intCls - 1].goodsname}}</span></p>
			</div>
			<div class="fl">
				<p>法律状态：<span class="ml15">{{trademarkDetails.currentStatus}}</span></p>
			</div>
		</div>
		<div class="process_list mt15">
			<div class="clearfix">
				<p class="fl">相关官文：</p>
				<ul class="clearfix fl ml15" style="width:800px;">
					<li class="fl" style="width:100%;" v-if="noticeByRegn.length" v-for="info in noticeByRegn">{{ info.ann_date }}  第{{ info.ann_num }}期 &nbsp;&nbsp;&nbsp;<a href="" @click.prevent="showRegnoFn(info)">{{ info.ann_type }}</a></li>
				</ul>
			</div>
		</div>
		<div class="process_list clearfix mt15">
			<div class="fl clearfix">
				<p class="fl">商品服务列表：</p>
				<ul class="fl">
					<li v-for="item in trademarkDetails.goodsList">• {{ item.goodsName }}</li>
				</ul>
			</div>
			<div class="fr clearfix">
				<p class="fl">注册流程：</p>
				<ul class="fl">
					<li v-for="item in trademarkDetails.flowList">• {{ item.flowDate }} {{ item.flowName }}</li>
				</ul>
			</div>
		</div>
	</div>

	<div v-show="!trademarkDetails">暂无数据</div>

	<!-- <div class="details_txt clearfix mt15">
		<div class="list_l clearfix fl">
			<p class="fl tit">备注</p>
			<p class="fl ml30 txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum</p>
		</div>
	</div> -->
</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js';
	const TrademarkUrl = './api/findTrademarkDetails';
  const RegnoUrl = './api/findNoticeByRegno';
	export default {
		props:['enterStatus'],
    data() {
      return {
      	companyName:'',
      	regNo:'',
      	cateIdData: intClsData.cateIdData,
      	trademarkDetails:'',
      	bookList:[],
      	noticeByRegn: [],  //官文
      }
    },
    methods: {
    	// 查询商标官文
      findNoticeByRegnoFn (regno) {
        let params = {
          regno: regno,
          page: 1,
          size: 1000
        }
        this.$http.get(RegnoUrl, {params: params})
        .then( resp => {
        	console.log(resp)
          this.noticeByRegn = resp.data.data;
          console.log(this.noticeByRegn)
        })
      },
      // 展示官文
    	showRegnoFn (info) {
    		if (info.image === '0') {  //接着请求
    			let params ={
    				annNum: info.ann_num,
    				annTypecode: info.ann_type_code
    			}
    			/* 待提供地址 */ 
    			this.$http.get('./sbgg/tmann/annInfoView/selectInfoidBycode.html', {params: params})
    			.then( resp => {
            let data = resp;
    				this.$http.post('./sbgg/tmann/annInfoView/imageView.html', qs.stringify({id: data.data, pageNum: info.page_no, flag:1}))
    				.then( resp => {
              let imgUrl = '';
              if (info.page_no > 3) {
                imgUrl = resp.data.imaglist[3];
              }
              else if (info.page_no>0 && info.page_no<4) {
                imgUrl = resp.data.imaglist[info.page_no-1];
              }
              else{
                this.$message({
                  type: 'error',
                  message: '暂无官文信息'
                })
              }
              window.open(imgUrl)
    				})
    			})
    		}
    		else{
    			window.open(info.image);
    		}
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
			ToLists(){
				this.$router.go(-1)
			},
			detailsTrademark(){
				let route = this.$route;
				let data = {
					trademarkId:this.trademarkId,
					regNo:this.regNo < 10 ? '0'+this.regNo : this.regNo,
					intCls:this.intCls
				}
				console.log(data)
				this.$http.get(TrademarkUrl,{params:data})
				.then((resp) => {
					this.trademarkDetails = resp.data.data;
					this.findNoticeByRegnoFn(this.trademarkDetails.regNo);  //查询官文
					console.log(resp.data,'商标详情')
					
	        // let info = {
	        //   regno:this.trademarkDetails.regNo
	        // }
	        // this.$http.get(RegnoUrl,{params:info})
	        // .then((resp) => {
	        //   this.bookList = resp.data.data;
	        //   console.log(resp)
	        // })
	        // .catch((err) => {
	        //   this.dialogDetail = true;
	        // });
				})
				.catch((err) => {
				});
			}

    },
    mounted(){
    	let route = this.$route;
    	if(this.enterStatus){
    		this.companyName = route.query.myName;
    		this.trademarkId = route.query.enterId;
    		this.regNo = route.query.enterNo;
    		this.intCls = route.query.enterCls;
    	}else{
    		this.companyName = route.query.focusName;
    		this.trademarkId = route.query.focusId;
    		this.regNo = route.query.focusNo;
    		this.intCls = route.query.focusCls;
    	}
    	this.detailsTrademark();
    }
  }  
</script>
<style lang="less">
// 商标详情
.trademark{border:1px dashed #DFE2E5;padding:10px;}
.top,.enter_type{
	span{font-size: 14px;cursor: pointer;}
}
.header{padding-left:10px;
	img{width:90px;height:90px;}
	.header_r{
		p{line-height: 30px;font-size:14px;color:#333;}
	}
	.state{border:0;
		p{padding:5px 10px;border-radius:3px;color:#fff;background-color:#3db1fa;text-align:center;}
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
.details_lists{width:100%;
	.list_l{width:25%;
		p{font-size:16px;color:#333;}
		.txt{font-size:14px;color:#666;line-height:24px;}
	}
}
.details_txt{width:100%;
	.list_l{width:100%;
		p{font-size:16px;color:#333;}
		.tit{width:65px;}
		.txt{font-size:14px;color:#666;width:89%;}
	}
}
</style>
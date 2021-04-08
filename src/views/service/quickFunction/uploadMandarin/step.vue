<template>
	<div class="uploadMandarin">
		<div class="stepOne" v-if="step==1">
			<div class="block">
				<h3>上传前准备工作</h3>
				<div class="wrap" style="width: 1120px;">
					<div class="title title2">
						<i>1</i>
						<p>下载并安装FTP工具：<a style="color:#479CFF" target="_blank" href="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/FileZilla_3.24.0.0_win64-setup.exe">FileZilla_3.24.0.0_win64-setup</a></p>
					</div>
				</div>
				<div class="wrap">
					<div class="title title2">
						<i>2</i>
						<p>连接远程主机，主机用户名等请向运维人员索取</p>
					</div>
					<img src="~assets/img/quickFunction/ftp_01.png">
				</div>
				<div class="wrap">
					<div class="title title2">
						<i>3</i>
						<p>将所需上传的官文（或文件夹）粘贴或拖拽进该FTP，完成后点击开始上传</p>
					</div>
					<img src="~assets/img/quickFunction/ftp_02.png">
				</div>
			</div>
			<button class="mt20 btn btn-primary" @click="showStepTwo">开始上传</button>
		</div>
		<div class="stepTwo" v-if="step==2">
			<div class="block">
					<h3>可上传官文</h3>
					<div class="wrap" v-for="sItem in dataFiled.suc" :key="sItem.filed">
						<h4>{{sItem.name}}</h4>
						<div class="checkGroup" :class="{maxH: sItem.toggle}">
							<label :class="{checked: item.uploadResult == 1}" :title="item.fileName" v-for="(item, idx) in form[sItem.filed]" @click="item.uploadResult = item.uploadResult == 1 ? 2 : 1" :key="idx">
								<i></i><span>{{item.fileName}}</span>
							</label>
						</div>
						<div class="more" v-if="form[sItem.filed]&&form[sItem.filed].length>12" :class="{up: sItem.toggle}" @click="sItem.toggle=!sItem.toggle">
							{{sItem.toggle ? '收起' : '展开'}}({{form[sItem.filed].length}})<i></i>
						</div>
						<div class="no" v-if="!form[sItem.filed] || !form[sItem.filed].length">无</div>
					</div>
			</div>

			<div class="block">
				<h3>不可上传官文<span>（状态不对应或查无申请号官文）</span></h3>
				<div class="wrap" v-for="fItem in dataFiled.fail" :key="fItem.filed">
					<h4>{{fItem.name}}</h4>
					<div class="checkGroup" :class="{maxH: fItem.toggle}">
				  	<label class="checked disabled" :title="item.fileName" v-for="(item, idx) in form[fItem.filed]" :key="idx">
				  		<i></i><span>{{item.fileName}}</span>
				  	</label>
				  </div>
				  <div class="more" v-if="form[fItem.filed]&&form[fItem.filed].length>12" :class="{up: fItem.toggle}" @click="fItem.toggle=!fItem.toggle">
				  	{{fItem.toggle ? '收起' : '展开'}}({{form[fItem.filed].length}})<i></i>
				  </div>
				  <div class="no" v-if="!form[fItem.filed]||!form[fItem.filed].length">无</div>
				</div>
			</div>

			<div class="block">
				<h3>无法识别文件<span>（无法识别该文件）</span></h3>
				<div class="wrap">
					<div class="checkGroup" :class="{maxH: isUnidentifiedToggle}">
				  	<label class="checked disabled" :title="item.fileName" v-for="(item, idx) in form.unidentifiedList" :key="idx">
				  		<i></i><span>{{item.fileName}}</span>
				  	</label>
				  </div>
				  <div class="more" v-if="form.unidentifiedList.length>12" :class="{up: isUnidentifiedToggle}" @click="isUnidentifiedToggle=!isUnidentifiedToggle">
				  	{{isUnidentifiedToggle ? '收起' : '展开'}}({{form.unidentifiedList.length}})<i></i>
				  </div>
				  <div class="no" v-if="!form.unidentifiedList.length">无</div>
				</div>
			</div>
			<div class="block" style="margin-bottom: 15px;">
				<h3>统一收文时间</h3>
				<el-date-picker
		      v-model="form.receiptTime"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
			</div>
			<div class="block">
				<h3>统一备注</h3>
				<div class="wrap2">
					<el-input class="service_note" type="textarea" :rows="5" v-model="form.remark" :maxlength="200"></el-input>
					<p class="service_limit" style="text-align:right;position: absolute;bottom: 2px;right: 5px;height: 20px;line-height: 20px;font-size: 13px;color: #999">{{form.remark && form.remark.length || 0}}-200字</p>
				</div>
			</div>
			<button class="mt20 btn btn-primary" @click="confirm">确认上传</button>
		</div>
		<!-- 上传成功 -->
		<el-dialog  title="上传记录"
			:visible.sync="dialogVisible"
			size="tiny" class="uploadover" :modal-append-to-body="true" :close-on-click-modal="false" @close="ok">
			<div class="uploadover_in">
				<div class="txt_list">
					<label>上传官文：</label>
					<span>{{resData.successDoc}}份</span>
				</div>
				<div class="txt_list">
					<label>未上传官文：</label>
					<span>{{resData.hasNotDoc}}份</span>
				</div>
				<div class="txt_list">
					<label>不可上传官文：</label>
					<span>{{resData.canNotDoc}}份</span>
				</div>
				<div class="txt_list">
					<label>无法识别文件：</label>
					<span>{{resData.unidentifiedDoc}}份</span>
				</div>
				<div class="txt_list">
					<label>统一收文时间：</label>
					<span>{{resData.receiptTime|dateFormat('date')}}</span>
				</div>
				<div class="txt_list">
					<label>统一备注：</label>
					<span style="word-break: break-all;width:165px;vertical-align: middle;">{{resData.remark}}</span>
				</div>
				<button class="mt20 btn btn-primary" @click="ok">确定</button>
				<!-- <a :href="resData.excelUrl" target="_blank">导出本次上传结果</a> -->
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const ftpUrl = CONFIG.ftpUrl;
	const getOfficialDocumentUrl = './api/findOfficialDocument';
	const confirmUrl = './api/autoUploadOfficialDocument';

	const formData = {
 		acceptanceCanNotList:[], //不可上传的申请受理通知书
		acceptanceList:[], //申请受理通知书
		preliminaryNoticeCanNotList:[],//不可上传的初审公告通知书
		preliminaryNoticeList:[],//初审公告通知书
		applyNumReceiptList: [], // 申请回执单
		tmRejectNoticeList:[], //商标驳回通知书
		tmPartRejectNoticeList:[], //商标部分驳回通知书
		tmRegistCertificateList:[], //商标注册证

		applyNumReceiptCanNotList:[], //申请号回执单
		tmRejectNoticeCanNotList:[], //商标驳回通知书
		tmPartRejectNoticeCanNotList:[], //商标部分驳回通知书
		tmRegistCertificateCanNotList:[], //商标注册证
		unidentifiedList:[],//无法识别文件
		receiptTime:'',
		remark:''
 	}

	export default {
		name: 'uploadMandarin',
		data() {
			return {
				dataFiled: {
					suc: [
						{ filed: 'acceptanceList', name: '申请受理通知书', toggle: false },
						{ filed: 'preliminaryNoticeList', name: '初审公告通知书', toggle: false },
						{ filed: 'applyNumReceiptList', name: '申请号回执单', toggle: false },
						{ filed: 'tmRejectNoticeList', name: '商标驳回通知书', toggle: false },
						{ filed: 'tmPartRejectNoticeList', name: '商标部分驳回通知书', toggle: false },
						{ filed: 'tmRegistCertificateList', name: '商标注册证', toggle: false }
					],
					fail: [
						{ filed: 'acceptanceCanNotList', name: '申请受理通知书', toggle: false },
						{ filed: 'preliminaryNoticeCanNotList', name: '初审公告通知书', toggle: false },
						{ filed: 'applyNumReceiptCanNotList', name: '申请号回执单', toggle: false },
						{ filed: 'tmRejectNoticeCanNotList', name: '商标驳回通知书', toggle: false },
						{ filed: 'tmPartRejectNoticeCanNotList', name: '商标部分驳回通知书', toggle: false },
						{ filed: 'tmRegistCertificateCanNotList', name: '商标注册证', toggle: false }
					]
				},
				ftpUrl: ftpUrl,
				step: 1,
				dialogVisible: false,
				isAcceptanceToggle: false,
				isAcceptanceCanNotToggle: false,
				isPreliminaryNoticeToggle: false,
				isPreliminaryNoticeCanNotToggle: false,
				isUnidentifiedToggle: false,

			 	form: Object.assign({}, formData),
			 	resData:{}

			}
		},
		mounted() {
			//this.getOfficialDocument();
			/*this.userInfo = store.get('userinfo');
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			this.recoverQueryData()
			this.getAllSpData();
			this.getProductType();
			this.search();
			this.formatTabName();*/
		},
		methods: {
			showStepTwo(){
				this.getOfficialDocument(() => {
					this.step = 2;
				});
			},
			ok(){
				this.dialogVisible = false;
				this.step = 1;
				this.form = Object.assign({}, formData);
			},
			getOfficialDocument(cb){
				this.$http.get(getOfficialDocumentUrl)
				.then((resp) => {
					let data = resp.data;
					this.form = data;
					if (!data.acceptanceList.length && !data.preliminaryNoticeList.length && !data.applyNumReceiptList.length && !data.tmRejectNoticeList.length && !data.tmPartRejectNoticeList.length && !data.tmRegistCertificateList.length) {
						this.$message.error('请按提示先上传官文或官文不正确');
						return;
					}
					cb && cb();
				})
				.catch((error) => {

				})
			},
			checkSelected(arr){
				return arr.some((item) => item.uploadResult == 1);
			},
			confirm(){
				if (!this.checkSelected(this.form.acceptanceList) && !this.checkSelected(this.form.preliminaryNoticeList) && !this.checkSelected(this.form.applyNumReceiptList) && !this.checkSelected(this.form.tmRejectNoticeList) && !this.checkSelected(this.form.tmPartRejectNoticeList) && !this.checkSelected(this.form.tmRegistCertificateList)) {
					this.$message.error('请勾选可上传官文');
					return;
				}
				if (!this.form.receiptTime) {
					this.$message.error('请选择统一收文时间');
					return;
				}
				if (!this.form.receiptTime) {
					this.$message.error('请选择统一收文时间');
					return;
				}
				if (!this.form.remark) {
					this.$message.error('请填写统一备注');
					return;
				}
				let ret = Object.assign({}, this.form);
				ret.receiptTime = new Date(this.form.receiptTime).getTime();
				this.$http.post(confirmUrl, ret)
				.then((resp) => {
					let data = resp.data;
					this.resData = data;
					this.dialogVisible = true;
				})
				.catch((error) => {
					let data = error.response.data;
					if (data && data.msg) {
						this.$message.error(data.msg);
					}
				})
			},
			gotoNext(){
				this.$router.push('/service/quickFunction/uploadMandarinTwo');
			},
			inArrayOf(arr, sortItem, sortName){
				var ret = -1;
				arr.forEach((item, i) => {
					if (item[sortName] == sortItem[sortName]) {
						ret = i;
						return false;
					}
				});
				return ret;
			},
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
		},
		watch:{
		}
	}
</script>
<style lang='less'>
.uploadMandarin{
	.stepOne{
		padding: 0 10px;font-size: 14px;
		.block{
			padding:25px;background-color: #F8F8F8;
			h3{
				height:25px; font-size:18px;line-height: 25px;
			}
			.wrap{
				display: inline-block;margin-right: 50px;min-width: 607px;
				.title{
					position: relative;margin-top: 25px;
					i{display: inline-block;width:40px;height:40px;font-size:20px;line-height: 40px;background-color: #479CFF;border-radius: 40px;font-style: normal;text-align: center;color:#fff;}
					p{position: absolute;left: 50px; top:0;width: 580px;word-break: break-all;}
				}
				.title2{
					p{line-height: 40px;}
				}
				img{margin-top: 30px;}
			}
			.wrap:last-child{margin-right: 0;}
		}
	}

	.stepTwo{
		padding: 0 10px;
		.block{
			h3{
				line-height: 36px;font-size: 14px;
				span{color:#999;font-weight: normal;}
			}
			.wrap{
				border: 1px solid #eee;padding:10px;border-radius: 4px;margin-bottom: 15px;width: 1120px;
				h4{
					line-height: 20px;font-size: 14px;font-weight: normal;padding-bottom: 5px;
				}
				.checkGroup{
					max-height: 84px;overflow: hidden;transition: max-height 0.5s ease;
					label{
						margin-right: 20px;margin-left: 0;line-height: 26px;vertical-align: middle;cursor: pointer;
						i{position: relative;display: inline-block;background-color: #fff;border:1px solid #0190fe;width: 16px;height: 16px;border-radius: 3px;vertical-align: middle;margin-right: 5px;}
						i::after {
					    box-sizing: content-box;
					    content: "";
					    border: 2px solid #fff;
					    border-left: 0;
					    border-top: 0;
					    height: 8px;
					    left: 5px;
					    position: absolute;
					    top: 1px;
					    -ms-transform: rotate(45deg) scaleY(0);
					    transform: rotate(45deg) scaleY(0);
					    width: 4px;
					    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
					    -ms-transform-origin: center;
					    transform-origin: center;
						}
						i::after {
					    top: 1px!important;
					    left: 4px!important;
					    width: 3px!important;
					    height: 7px!important;
						}
						span{font-size: 12px;width: 230px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display: inline-block;vertical-align: middle;}
					}
					label.checked{
						i{background-color: #20a0ff;}
						i::after {transform: rotate(45deg) scaleY(1);}
					}
					label.disabled{
						cursor: not-allowed;
						i{background-color: #d1dbe5;border-color: #d1dbe5;}
					}
				}
				.maxH{
					max-height: 2000px;
				}
				.more{
					padding-top: 5px;width: 120px;margin:0 auto;position: relative;color: #20a0ff;background-color: #fff;cursor: pointer;
					i{display: inline-block;margin-left: 5px;border-top:7px solid #20a0ff;border-left:5px solid #fff;border-right:5px solid #fff;border-bottom: 0;height: 0;width: 0;transition: transform .15s ease;transform-origin: center;transform: rotate(0deg) scaleY(1);}

				}
				.up{
					i{transform: rotate(180deg) scaleY(1);}
				}
			}
			.wrap2{position: relative; width: 480px;}
		}
	}

	.uploadover{
		.el-dialog{
			width: 426px;
			.uploadover_in{
				padding-left: 100px;
				.txt_list{
					vertical-align: middle;line-height: 34px;
					label{width: 110px;display: inline-block;vertical-align: middle;}
					span{display: inline-block;color:#999;vertical-align: middle;line-height: 24px;}
				}
				button{margin-left:40px;}
				a{display: inline-block;text-align: center;width:200px; margin-top: 10px;color:#20a0ff;}
			}
		}
	}
}
</style>

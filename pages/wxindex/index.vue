<template>
	<view class="flex-col page">
	  <view class="flex-col group_2 space-y-32">
	    <view class="flex-col group_3">
	      <view class="flex-col items-center space-y-12">
	        <image class="image_4" src="../../static/img/login/5cad04cd4106ce9c722560cfe1504da3.png" />
	        <text class="font_1 text_2">这是一段介绍标语</text>
	      </view>
	      <text class="text_3">登录</text>
	      <view class="flex-col group_4 space-y-24">
	        <view class="flex-col space-y-6">
	          <text class="font_1 text_4">邮箱</text>
	          <view class="flex-row section space-x-2">
	            <view class="flex-col justify-start items-end group_5">
	              <view class="section_2"></view>
	              <text class="text_5">1234567</text>
	            </view>
	            <text class="font_2 text_6">@qq.com</text>
	          </view>
	        </view>
	        <view class="flex-col space-y-6">
	          <text class="font_1 text_7">密码</text>
	          <view class="flex-row justify-between section_3">
	            <image class="image_6" src="../../static/img/login/2af1ddb46b92147bb7cf88e8234c678f.png" />
	            <image class="image_5" src="../../static/img/login/a6b43da845560d78f6595c15af5fd919.png" />
	          </view>
	        </view>
	      </view>
	      <view class="flex-col group_6">
	        <text class="font_2 text_8">忘记密码了?</text>
	        <view class="flex-col justify-start items-center button"><text class="font_1 text_9">登录</text></view>
	        <view class="flex-col group_7 space-y-14">
	          <text class="text_10">或</text>
	          <view class="flex-row justify-center button_2">
	            <image class="image_7" src="../../static/img/login/88a664bf3dc4c8cee8ee7f8d26c30417.png" />
	            <text class="font_2 text_11">微信账号登录</text>
	          </view>
	        </view>
	      </view>
	      <text class="font_2 text_12">注册</text>
	    </view>
	    <view class="section_4"></view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'../../wx/login/index'
				})
			},
			goRegister(){
				uni.navigateTo({
					url:'../../wx/register/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
	  background-color: #ffffff;
	  overflow: hidden;
	  width: 100%;
	  overflow-y: auto;
	  overflow-x: hidden;
	  height: 100%;
	  .group_2 {
	    padding-top: 58px;
	    flex: 1 1 auto;
	    overflow-y: auto;
	    .group_3 {
	      padding: 0 20px;
	      .space-y-12 {
	        & > view:not(:first-child),
	        & > text:not(:first-child),
	        & > image:not(:first-child) {
	          margin-top: 12px;
	        }
	        .image_4 {
	          width: 76px;
	          height: 76px;
	        }
	        .text_2 {
	          color: #000000;
	          line-height: 15px;
	        }
	      }
	      .text_3 {
	        margin-top: 81px;
	        align-self: center;
	        color: #000000;
	        font-size: 30px;
	        font-family: HarmonyOSSansSC;
	        line-height: 27px;
	      }
	      .group_4 {
	        margin-top: 54px;
	        .space-y-6 {
	          & > view:not(:first-child),
	          & > text:not(:first-child),
	          & > image:not(:first-child) {
	            margin-top: 6px;
	          }
	          .text_4 {
	            margin-left: 2px;
	            align-self: flex-start;
	            line-height: 15px;
	          }
	          .section {
	            padding: 5px 16px 12px;
	            background-image: url('../../static/img/login/fe5f0987a2d388f77a80933413635b40.png');
	            background-size: 100% 100%;
	            background-repeat: no-repeat;
	            .group_5 {
	              margin-bottom: 3px;
	              padding-bottom: 4px;
	              width: 57px;
	              position: relative;
	              .section_2 {
	                margin-right: 10px;
	                background-color: #000000;
	                width: 1px;
	                height: 16px;
	              }
	              .text_5 {
	                color: #000000;
	                font-size: 14px;
	                font-family: HarmonyOSSansSC;
	                line-height: 10.5px;
	                position: absolute;
	                left: 0;
	                right: 0;
	                bottom: 0;
	              }
	            }
	            .text_6 {
	              margin-top: 9px;
	              color: #c1c1c1;
	              line-height: 14px;
	            }
	          }
	          .space-x-2 {
	            & > view:not(:first-child),
	            & > text:not(:first-child),
	            & > image:not(:first-child) {
	              margin-left: 2px;
	            }
	          }
	          .text_7 {
	            align-self: flex-start;
	          }
	          .section_3 {
	            padding: 14px 15px 13px;
	            background-image: url('../../static/img/login/fe5f0987a2d388f77a80933413635b40.png');
	            background-size: 100% 100%;
	            background-repeat: no-repeat;
	            .image_6 {
	              margin: 3px 0;
	              width: 97px;
	              height: 7px;
	            }
	            .image_5 {
	              margin-right: 2px;
	              width: 18px;
	              height: 13px;
	            }
	          }
	        }
	      }
	      .space-y-24 {
	        & > view:not(:first-child),
	        & > text:not(:first-child),
	        & > image:not(:first-child) {
	          margin-top: 24px;
	        }
	      }
	      .font_1 {
	        font-size: 16px;
	        font-family: HarmonyOSSansSC;
	        line-height: 14.5px;
	        color: #666666;
	      }
	      .group_6 {
	        margin-top: 31px;
	        .text_8 {
	          align-self: center;
	          font-size: 13px;
	        }
	        .button {
	          margin-top: 17px;
	          padding: 12px 0 14px;
	          filter: drop-shadow(0px 5px 5.5px #3f85fb4d);
	          background-image: url('../../static/img/login/894d1ed4263fbb3a4d1b4486a90ef708.png');
	          background-size: 100% 100%;
	          background-repeat: no-repeat;
	          .text_9 {
	            color: #ffffff;
	          }
	        }
	        .group_7 {
	          padding-top: 17px;
	          .text_10 {
	            align-self: center;
	            color: #c2c2c2;
	            font-size: 12px;
	            font-family: HarmonyOSSansSC;
	            line-height: 11px;
	          }
	          .button_2 {
	            padding: 10px 0;
	            filter: drop-shadow(1px 5px 7.5px #0000000d);
	            background-image: url('../../static/img/login/332d69eed6721e0b4f5b819047623b2f.png');
	            background-size: 100% 100%;
	            background-repeat: no-repeat;
	            .image_7 {
	              width: 20px;
	              height: 20px;
	            }
	            .text_11 {
	              margin: 2px 0 5px 10px;
	              color: #000000;
	              line-height: 13px;
	            }
	          }
	        }
	        .space-y-14 {
	          & > view:not(:first-child),
	          & > text:not(:first-child),
	          & > image:not(:first-child) {
	            margin-top: 14px;
	          }
	        }
	      }
	      .font_2 {
	        font-size: 14px;
	        font-family: HarmonyOSSansSC;
	        line-height: 12px;
	        color: #3f85fb;
	      }
	      .text_12 {
	        margin-top: 31px;
	        align-self: center;
	        font-size: 13px;
	      }
	    }
	    .section_4 {
	      background-color: #00000000;
	      height: 34px;
	    }
	  }
	  .space-y-32 {
	    & > view:not(:first-child),
	    & > text:not(:first-child),
	    & > image:not(:first-child) {
	      margin-top: 32px;
	    }
	  }
	}
</style>

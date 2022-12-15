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
            <text class="font_1 text_4">手机号码</text>
            <input v-model="formData.phone" maxlength="11" type="number" class=" font_2 section group_5 space-x-2"
              placeholder="请填写11位手机号码" />
            <button @click="getMsgCode" v-if="smsLogin && time == 60" class="mini-btn send-btn"
              size="mini">发送验证码</button>
            <text v-if="smsLogin && time < 60" class="mini-btn send-text" type="text" size="mini">{{ time }}秒后重试</text>
          </view>
          <view class="flex-col space-y-6">
            <text class="font_1 text_7">{{ !smsLogin ? '密码' : '验证码' }}</text>
            <input :maxlength="!smsLogin ? 30 : 6" v-model="formData.password" :type="!smsLogin ? 'password' : 'number'"
              class=" font_2 section group_5 space-x-2" :placeholder="`请输入${!smsLogin ? '密码' : '验证码'}`" />
          </view>
        </view>
        <view class="flex-col group_6">
          <view class="flex-row justify-between mb10">
            <text @click="toggleLogin" class="font_2 text_12">{{ !smsLogin ? '验证码登录/注册' : '手机号密码登录' }}</text>
            <text @click="goForgetPass" class="font_2 text_8">忘记密码了?</text>
          </view>
          <view @click="sublogin" class="flex-col justify-start items-center button"><text
              class="font_1 text_9">登录</text></view>
          <view class="flex-col group_7 space-y-14">
            <text class="text_10">或</text>
            <view class="flex-row justify-center button_2">
              <image class="image_7" src="../../static/img/login/88a664bf3dc4c8cee8ee7f8d26c30417.png" />
              <text class="font_2 text_11">微信账号登录</text>
            </view>
          </view>
        </view>

      </view>
      <view class="login-agree">
        <view class="login-agree-checkd" @click="agree = !agree">
          <label for="agree">
            <checkbox id="agree" style="transform:scale(0.6)" :checked="agree" />
            <text class="login-agree-btn">我同意</text>
          </label>
        </view>
        <view class="login-agree-text" @click="goagreement()">《隐私及服务协议》</view>
      </view>
    </view>
  </view>
</template>

<script>
import { sendCode, getAgreement, login, loginByCode, trtcGetSign } from "@/api";
export default {
  data () {
    return {
      formData: {},
      agree: true,
      smsLogin: false,
      timer: null,
      time: 60
    }
  },
  onLoad () { },
  methods: {
    async sublogin (e) {
      var rules = {
        phone: {
          rules: [{
            checkType: "required",
            errorMsg: "请填写手机号码"
          }, {
            checkType: "phone",
            errorMsg: "请填写正确的手机号码"
          }]
        }
      };
      if (!this.smsLogin) {
        rules.password = {
          rules: [{
            checkType: "required",
            errorMsg: "请输入密码"
          }, {
            checkType: "string",
            checkRule: "8,20",
            errorMsg: "密码至少输入8-20位"
          }]
        }
      } else {
        rules.password = {
          rules: [{
            checkType: "required",
            errorMsg: "请输入验证码"
          }, {
            checkType: "string",
            checkRule: "4",
            errorMsg: "验证码至少输入4位"
          }]
        }
      }

      var checkRes = this.$zmmFormCheck.check(this.formData, rules);

      // #ifdef APP-PLUS
      var cid = plus.push.getClientInfo().clientid
      this.formData['cid'] = cid
      // #endif

      // #ifdef H5
      // todo
      var cid = ''
      this.formData['cid'] = cid
      // #endif

      uni.setStorageSync('cid', cid);

      if (checkRes) {
        if (!this.agree) {
          uni.showToast({
            title: '请先同意《隐私及服务协议》',
            icon: 'none'
          });
          return;
        }
        uni.showLoading()
        try {
          if (!this.smsLogin) {
            var { data } = await login(this.formData)
          } else {
            var { data } = await loginByCode({
              ...this.formData,
              code: this.formData.password
            })
          }
          this.loginDone(data.token)
        } catch (error) {
          console.log(error)
        }
      } else {
        uni.showToast({
          title: this.$zmmFormCheck.error,
          icon: "none",
          position: 'bottom'
        });
      }
    },
    async loginDone (token) {

      uni.setStorageSync('Authorization', token);

      // #ifdef H5
      this.$socketTask.connectSocket()
      // #endif

      try {
        const userRes = await this.$store.dispatch('get_UserInfo')

        // #ifdef APP-PLUS
        var nickName = userRes.nickName
        var portrait = userRes.portrait
        const { data } = await trtcGetSign()

        var sdkAppID = data.appId
        var userID = data.userId
        var userSig = data.sign

        TUICalling.login({//登录音视频
          sdkAppID: sdkAppID,
          userID: userID,
          userSig: userSig
        }, (res) => {
          console.log('音视频登录成功')
          TUICalling.setUserNickname({
            nickName: nickName
          })
          TUICalling.setUserAvatar({
            avatar: portrait
          })
          plus.io.requestFileSystem(plus.io.PRIVATE_WWW, function (fs) {
            fs.root.getFile('/static/longcall.mp3', {
              create: false
            }, function (fileEntry) {
              fileEntry.file(function (file) {
                TUICalling.setCallingBell({
                  ringtone: file.fullPath
                }, (res) => {
                  console.log(JSON.stringify(res))
                })
              });
            });
          });
        })
        // #endif

      } catch (error) {
        uni.reLaunch({
          url: '../tabbar1/index'
        })
      }

    },
    goForgetPass () {
      uni.navigateTo({
        url: '../forgetPass/index'
      })
    },
    async getMsgCode () {
      var reg = /^1[0-9]{10,10}$/;
      if (!this.formData.phone || !reg.test(this.formData.phone)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }

      try {
        const params = {
          phone: this.formData.phone,
          type: '2'//登录
        }
        const { data } = await sendCode(params)

        this.time = 59
        this.timer = setInterval(() => {
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            this.time = 60
          }
        }, 1000)

        uni.showToast({
          title: '验证码已发送至你的手机',
          icon: 'none'
        })

        this.formData.password = data.code
      } catch (error) {
        console.log(error)
      }
    },
    toggleLogin () {
      this.formData.password = ''
      this.smsLogin = !this.smsLogin
    },
    async goagreement () {
      try {
        const { data } = await getAgreement()
        // #ifdef H5
        window.open(data)
        // #endif
        // #ifdef APP-PLUS
        this.$fc.openWebView(data)
        // #endif
      } catch (error) {
        console.log(error)
      }
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

        &>view:not(:first-child),
        &>text:not(:first-child),
        &>image:not(:first-child) {
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
          position: relative;

          &>view:not(:first-child),
          &>text:not(:first-child),
          &>image:not(:first-child) {
            margin-top: 6px;
          }

          .text_4 {
            margin-left: 2px;
            align-self: flex-start;
            line-height: 15px;
          }

          .section {
            padding: 10px 10px 10px;
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
            margin-top: 10px;

            &>view:not(:first-child),
            &>text:not(:first-child),
            &>image:not(:first-child) {
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

        &>view:not(:first-child),
        &>text:not(:first-child),
        &>image:not(:first-child) {
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
          color: $uni-error;
        }

        .button {
          margin-top: 17px;
          padding: 12px 0 14px;
          filter: drop-shadow(0px 5px 5.5px #3f85fb4d);
          background-color: $uni-primary;
          border-radius: 50px;
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

          &>view:not(:first-child),
          &>text:not(:first-child),
          &>image:not(:first-child) {
            margin-top: 14px;
          }
        }
      }

      .font_2 {
        font-size: 14px;
        line-height: 20px;
        min-height: 20px;
      }

      .text_12 {
        align-self: center;
        font-size: 13px;
        color: $uni-primary;
      }
    }

    .section_4 {
      background-color: #00000000;
      height: 34px;
    }
  }

  .space-y-32 {

    &>view:not(:first-child),
    &>text:not(:first-child),
    &>image:not(:first-child) {
      margin-top: 32px;
    }
  }
}


.login-agree {
  margin: 24rpx;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.login-agree-text,
.login-agree-btn {
  vertical-align: middle;
  font-size: 24rpx;
  color: #222;
}

.login-agree-text {
  color: $uni-primary;
}

.send-btn,
.send-text {
  position: absolute;
  right:10px;
  bottom: 5px;
  background-color: $uni-success;
  color: white;
}

.send-text {
  background: transparent;
  right: 10px;
  bottom: 10px;
  color: $uni-base-color;
}

</style>

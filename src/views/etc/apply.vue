<template>
<div class='etc-apply'>
    <div class="banner">
        <img src="../../assets/img/etc-banner.png" alt="">
    </div>
    <div class="form-wp">
        <van-cell-group>
            <van-field
                v-model="username"
                placeholder="姓名"
                left-icon="contact"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="car_number"
                placeholder="您的车牌号码"
                left-icon="logistics"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="mobile"
                type="tel"
                placeholder="手机号"
                left-icon="graphic"
            />
        </van-cell-group>
        <van-cell-group class="flex-box">
            <van-field
                v-model="mobile_code"
                type="tel"
                placeholder="验证码"
                left-icon="envelop-o"
            />
            <smscode-btn :btn-style="codeBtnStyle" :mobile="mobile" @getCode="getCode"></smscode-btn>
        </van-cell-group>
    </div>
    <div class="deco">
        <van-icon name="warning-o" />
        <span>办理后会有1-7天的审核期，请您耐心等待，关注“ 飞迅服务 ”公众号随时查看办理进度</span>
    </div>
    <van-button class="submit" type="primary" @click="submit">下一步</van-button>
    <van-dialog
        v-model="mpCodeDialog"
        :show-confirm-button="false"
    >
        <div class="dialog-text">
            <p>长按识别二维码</p>
            <p>补充资料完成办理</p>
            <img :src="mpCodeImg">
        </div>
    </van-dialog>
</div>
</template>

<script>
import SmscodeBtn from '../../components/smscode-button.vue';
import common from '@/components/common';
export default {
    name: 'EtcApply',
    metaInfo: {
        title: 'ETC办理',
    },
    components: { SmscodeBtn },
    data() {
        return {
            mpCodeDialog: false,
            mpCodeImg: '',
            codeBtnStyle: {
                backgroundColor: 'rgb(255, 168, 37)',
                borderColor: 'rgb(255, 168, 37)',
                width: '150px',
                borderRadius: '10px',
                marginLeft: '10px',
                height: '50px',
            },
            username: '',
            car_number: '',
            mobile: '',
            mobile_code: '',
        };
    },
    methods: {
        getCode(mobile) {
            this.$fly.post('/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=account.mobile_code', common.obj2formdata({mobile: mobile}))
            .then((res) => {
                let { status, result } = res;
                if (status == 0) {
                    this.$toast(result.message);
                } else {
                    this.$notify(result.message);
                }
            })
        },
        submit() {
            if (!this.username) {
                this.$notify('请输入姓名')
                return false
            }
            if (!this.car_number) {
                this.$notify('请输入车牌号')
                return false
            }
            if (!this.mobile) {
                this.$notify('请输入手机号')
                return false
            }
            if (!common.isVerificationNumber(this.mobile)) {
                this.$notify('手机号码格式不正确')
                return false
            }
            if (!this.mobile_code) {
                this.$notify('请输入验证码')
                return false
            }
            let data = {
                username: this.username,
                car_number: this.car_number,
                mobile: this.mobile,
                mobile_code: this.mobile_code,
            }
            this.$fly.post('/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=home.etc', common.obj2formdata(data))
            .then((res) => {
                let { status, result } = res;
                // 0: 上报成功； 400: 已经上报过；
                if (status == 0 || status == 400) {
                    this.mpCodeDialog = true;
                    this.mpCodeImg = result.little_app;
                    this.$toast(result.message);
                } else {
                    this.$notify(result.message);
                }
            })
        }
    },
    mounted() {
        
    },
}
</script>

<style lang='less'>
.etc-apply {
    padding: 15/11rem;
    min-height: 100vh;
    background-color: #f5f5f5;
    .banner {
        border-radius: 10px;
        margin-bottom: 15/11rem;
    }
    .form-wp {
        .van-cell-group {
            .van-field__left-icon {
                margin-right: 10px;
                .van-icon {
                    font-size: 20px;
                }
            }
            &:first-child {
                .van-field__left-icon {
                    color: #66CCFF;
                }
            }
            &:nth-child(2), &:nth-child(4) {
                .van-field__left-icon {
                    color: rgb(255, 168, 37);
                }
            }
            &:nth-child(3) {
                .van-field__left-icon {
                    color: #31d777;
                }
            }
        }
    }
    .van-cell-group {
        margin-bottom: 15/11rem;
        background-color: #f5f5f5;
        border-color: #f5f5f5;
        &.flex-box {
            display: flex;
            align-items: center;
        }
        .van-cell {
            border-radius: 10px;
            padding: 13px 15px;
            font-size: 15/11rem;
        }
    }
    .deco {
        color: #999;
        font-size: 12/11rem;
        line-height: 2;
        display: flex;
        .van-icon {
            margin-right: 5px;
            margin-top: 5px;
            vertical-align: sub;
        }
    }
    .submit {
        width: 100%;
        margin-top: 40/11rem;
        border-color: rgb(255, 160, 17);
        background-color: rgb(255, 160, 17);
        font-size: 16/11rem;
        border-radius: 10px;
    }
    .dialog-text {
        text-align: center;
        font-size: 24/11rem;
        padding: 20px 0 10px 0;
        line-height: 1.8;
    }
}
</style>
<template>
<van-button
    slot="button"
    :style="btnStyle"
    :size="size"
    :type="type"
    :hairline="hairline"
    :round="round"
    :disabled="smsDisable"
    @click="getSmsCode">{{text}}
</van-button>
</template>

<script>
import common from '@/components/common';
export default {
    name: 'SmscodeBtn',
    props: {
        mobile: {
            type: String,
            default: () => '',
        },
        btnStyle: {
            type: Object,
            default: () => {},
        },
        size: {
            type: String,
            default: () => 'normal',
        },
        type: {
            type: String,
            default: () => 'info',
        },
        hairline: {
            type: Boolean,
            default: () => false,
        },
        round: {
            type: Boolean,
            default: () => false,
        }
    },
    data() {
        return {
            timer: -1,
            smsDisable: false,
            text: '获取验证码',
        };
    },
    methods: {
        getSmsCode() {
            if (!this.mobile) {
                this.$notify('请输入手机号')
                return false
            }
            if (!common.isVerificationNumber(this.mobile)) {
                this.$notify('手机号码格式不正确')
                return false
            }
            this.smsInterval();
            this.$emit('getCode', this.mobile);
        },
        smsInterval() {
            const timeConf = 30;
            let count = timeConf;
            this.text = count + 's后重发';
            this.smsDisable = true;
            this.timer = setInterval(() => {
                count--;
                this.text = count + 's后重发';
                if (count <= 0) {
                    clearInterval(this.timer);
                    this.text = '获取验证码';
                    count = timeConf;
                    this.smsDisable = false;
                }
            }, 1000)
        },
    },
    mounted() {
        
    },
}
</script>

<style lang='less'>
.smscode-btn {

}
</style>
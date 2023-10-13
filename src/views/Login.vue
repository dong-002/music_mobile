<template>
  <div class="bg">
    <img src="@/assets/bg.jpg" />
  </div>
  <div class="back" @click="back">
    <svg class="icon liebiao" aria-hidden="true">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
  </div>
  <!-- 邮箱登录 -->
  <div class="email-login" v-if="loginType == 0">
    <van-form @submit="login" ref="formRef">
      <van-cell-group inset>
        <van-field
          v-model="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱', trigger: 'blur' }]"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码', trigger: 'blur' }]"
        />
      </van-cell-group>
      <div style="margin: 16px; text-align: center">
        <van-button
          round
          type="primary"
          @click="login"
          :style="{ width: '40%' }"
        >
          登录
        </van-button>
        <span class="type-btn" @click="changeType(1)">手机登录</span>
      </div>
    </van-form>
  </div>

  <!-- 手机登录 -->
  <div class="phone-login" v-if="loginType == 1">
    <van-form @submit="login" ref="formRef">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          label="手机"
          name="phone"
          :rules="[
            { required: true, message: '请填写手机号', trigger: 'blur' },
          ]"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码', trigger: 'blur' }]"
        />
      </van-cell-group>
      <div style="margin: 16px; text-align: center">
        <van-button
          round
          type="primary"
          @click="login"
          :style="{ width: '40%' }"
        >
          登录
        </van-button>
        <span class="type-btn" @click="changeType(0)">邮箱登录</span>
      </div>
    </van-form>
  </div>
</template>

<script>
import { showToast } from "vant";
import "vant/es/toast/style";
import { Login, phoneLogin, getUserInfo, } from "@/api/login";
export default {
  data() {
    return {
      // 登录方式 0：邮箱 1：手机
      loginType: 0,
      email: "",
      password: "",
      phone: "",
    };
  },
  methods: {
    async login() {
      let res = null;
      // 邮箱登录
      if (this.loginType == 0) {
        let params = {
          email: this.email,
          password: this.password,
        };
        res = await Login(params);
      } else if (this.loginType == 1) {
        // 手机登录
        let params = {
          phone: this.phone,
          password: this.password,
        };
        res = await phoneLogin(params);
      }
      console.log(res);
      if (res.code == 200) {
        // 登录成功，存放token 请求用户信息
        sessionStorage.setItem("isLogin", true);
        this.$router.push("/ucenter");
        sessionStorage.setItem("token", res.token);
        // 一定要在手机网易云登录过才可以
        let userinfo = await getUserInfo(res.account.id);
        this.$store.commit("updateUserInfo", userinfo);
        console.log(userinfo);
      } else {
        showToast("账号或密码错误");
      }
    },
    back() {
      this.$router.push("/");
    },
    changeType(type) {
      this.loginType = type;
      this.$refs.formRef.resetValidation();
      if (type == 0) {
        this.email = "";
        this.password = "";
      } else {
        this.phone = "";
        this.password = "";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  img {
    width: 100%;
    opacity: 0.3;
  }
}
.back {
  position: relative;
  z-index: 9;
  width: 20%;
  padding: 0.2rem;
}
.email-login,
.phone-login {
  padding-top: 5rem;
  max-width: 7.5rem;
}
.type-btn {
  padding-left: 0.5rem;
  color: rgb(75, 166, 241);
  z-index: 9;
  position: relative;
}
</style>
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const formRef = ref()

const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()

const form = ref({
  id,
  username,
  nickname,
  email
})

const rules = ref({
  nickname: [
    { required: true, message: '請輸入使用者暱稱', trigger: 'blur' },
    {
      pattern: /^\S{2,10}/,
      message: '暱稱長度為2-10位非空字串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '請輸入E-mail', trigger: 'blur' },
    {
      type: 'email',
      message: '請輸入正確的e-mail格式',
      trigger: ['blur', 'change']
    }
  ]
})

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(form.value)
  getUser()
  ElMessage.success('修改成功')
}
</script>
<template>
  <page-container title="基本資料">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="登入名稱">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="使用者暱稱" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="使用者電子信箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

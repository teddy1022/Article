<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkDifferent = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密碼不能與舊密碼一樣'))
  } else {
    callback()
  }
}
const checkSameAsNewPwd = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('確認密碼必須與新密碼一樣'))
  } else {
    callback()
  }
}
const rules = ref({
  old_pwd: [
    { required: true, message: '請輸入原始密碼', trigger: 'blur' },
    { min: 6, max: 15, message: '原密碼長度在6-15位之間', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '請輸入新密碼', trigger: 'blur' },
    { min: 6, max: 15, message: '新密碼長度在6-15位之間', trigger: 'blur' },
    { validator: checkDifferent, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '請再次輸入新密碼', trigger: 'blur' },
    { min: 6, max: 15, message: '確認密碼長度在6-15位之間', trigger: 'blur' },
    { validator: checkSameAsNewPwd, trigger: 'blur' }
  ]
})

const userStore = useUserStore()
const router = useRouter()

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(pwdForm.value)
  ElMessage.success('密碼修改成功')

  userStore.setToken('')
  userStore.setUser({})

  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="修改密碼">
    <el-row>
      <el-col :span="12">
        <el-form
          ref="formRef"
          :model="pwdForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="原密碼" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密碼" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密碼</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form></el-col
      >
    </el-row>
  </page-container>
</template>

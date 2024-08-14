<script setup>
import { artEditChannelService, artAddChannelService } from '@/api/article'
import { ref } from 'vue'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分類名必須是1-10位非空字串',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    {
      pattern: /^\S[a-zA-Z0-9]{1,15}$/,
      message: '分類名必須是1-15位數字或英文字母',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('編輯成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
  console.log(formModel.value)
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '編輯分類' : '添加分類'"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="請輸入分類名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="請輸入分類別名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit"> 確認 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

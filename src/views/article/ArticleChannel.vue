<script setup>
import { artDelChannelService, artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const channelList = ref([])

const dialog = ref()
const loading = ref(false)

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onEditDelete = async (row) => {
  await ElMessageBox.confirm('確定刪除該分類嗎？', '溫馨提示', {
    type: 'warning',
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('刪除成功')
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分類">
    <template #extra>
      <el-button @click="onAddChannel">添加分類</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序號" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分類名稱"></el-table-column>
      <el-table-column prop="cate_alias" label="分類別名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onEditDelete(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empyt>
        <el-empty description="沒有資料"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>

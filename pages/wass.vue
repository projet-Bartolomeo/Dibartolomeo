<template>
  <div class="flex-column " style="margin-top:6vh;margin-left:6vw">
    <WassTop2 datas="new"/>
    <DataTableStudent id="DataTable"  datas="fromLesson" lesson isNew/>
  </div>
</template>
<style scoped>
#DataTable {
  width:66.5vw;
  margin-top:6vh !important
}
</style>
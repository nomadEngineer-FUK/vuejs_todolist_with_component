<!-- To do list のタスクを表示するテーブル部分のヘッダー -->

<template>
    <tr>
        <th class="sticky_cross" style="width: 10%;">ステータス</th>
        <th class="sticky_col" style="width: 15%;">期限</th>
        <th class="sticky_col" style="width: 25%;">タスク名</th>
        <th class="sticky_col" style="width: 34%;">タスク詳細</th>
        <th class="sticky_col" style="width: 8%;">編集</th>
        <th class="sticky_col" style="width: 8%;">削除</th>
    </tr>
</template>

<style scoped>
/* テーブルのヘッダー（ヘッダー固定） */
.sticky_col {
  position: sticky;
  top: 0;
  left: 0;
  background: none;
  border-top: none;
  border-bottom: none;
}

.sticky_col::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: -1;
}
</style>

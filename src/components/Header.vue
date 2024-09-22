<script setup lang="ts">
import { inject } from 'vue';
import type { Todo } from "../interface"; // タスクデータの型

// INJECT =========================================
// 【ソート】
const SORT_ITEMS = inject('SORT_ITEMS') as { value: string[] };   // 選択項目一覧
const selectedSort = inject('selectedSort') as { value: string }; // 現在選択されている項目
const sortedTodos = inject("sortedTodos") as { value: Todo[] };   // 並び替えしたタスク一覧（昇順 or 降順）

// 【フィルター】
const FILTER_ITEMS = inject("FILTER_ITEMS") as { value: string[] };   // 選択項目一覧
const selectedFilter = inject("selectedFilter") as { value: string }; // 現在選択されている項目

// 【モーダルウィンドウ】
const toggleModal = inject("toggleModal") as Function; // 表示・非表示を切り替える関数
// INJECT =========================================

// 【新規作成】モーダルウィンドウを表示する関数を呼び出す（App.vue）
const makeCreatingModalDisplay = () => {
  toggleModal('create',true);
}
</script>

<template>
  <div class= "header">
    <h2 class="toDoListHeader">To Do List</h2>

    <div class="subHeader">
      <button class="btnForDisplayModal" @click="makeCreatingModalDisplay">タスクの作成</button>

      <!-- タスク数（todos）が1以上の場合に表示する -->
      <div style="text-align: end;" v-show="sortedTodos.length > 0">
        <div>
            <label for="sort">ソート: </label>
            <select name="sort" id="sort" v-model="selectedSort">
              <option :value="sortItem" v-for="sortItem in SORT_ITEMS" :key="sortItem">
                {{ sortItem }}
              </option>
            </select>
          </div>

          <div>
            <label for="filter">フィルター: </label>
            <select name="filter" id="filter" v-model="selectedFilter">
              <option :value="filterItem" v-for="filterItem in FILTER_ITEMS" :key="filterItem">{{ filterItem }}</option>
            </select>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* To Do Listのヘッダー */
.toDoListHeader {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(50, 50, 50);
  text-align: center;
  font-weight: bold;
}

.subHeader {
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
}

/* トップ画面の「タスクの作成」 */
.btnForDisplayModal {
  padding: 0.5rem 2rem;
  font-size: 1rem;
  color: rgb(128, 128, 128);
  border: 2px solid rgba(135, 206, 235, 0.5);
}

.btnForDisplayModal:hover {
  color: black;
  background-color: rgb(135, 206, 235);
}
</style>

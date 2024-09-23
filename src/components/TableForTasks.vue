<!-- To do list の各タスクを表示 -->

<script setup lang="ts">
import { inject } from 'vue';
import type { Todo } from "../interface"; // タスクデータの型

// INJECT =========================================
const todos = inject("todos") as { value: Todo[] };                   // アプリ内で登録されているタスク一覧
const editedTodo = inject("editedTodo") as { value: Todo };           // 編集されたタスクデータを上書きして格納するための変数
const selectedFilter = inject("selectedFilter") as { value: string }; // フィルターで選択されたステータス
const filteredTodos = inject("filteredTodos") as { value: Todo[] };   // 該当のステータスでフィルターしたタスク一覧
const toggleModal = inject("toggleModal") as Function;                // 表示・非表示を切り替える関数
// INJECT =========================================

// 編集対象タスクのモーダルウィンドウを表示させる
const editTodo = (editedTodoId: number) => {
  
  // 該当するタスクIDの登録内容を複製
  Object.assign(editedTodo, todos.value.find((todo) => todo.id === editedTodoId));

  // 【編集】モーダルウィンドウを開く関数（App.vue）を呼び出す
  toggleModal('edit', true);
}

const deleteTodo = (deletedTodo: Todo) => {

  // 該当タスクを削除するか、ダイアログで確認
  const confirmationToDelete = window.confirm('タスク名: ' + deletedTodo.title + '\nを削除してよろしいですか？');

  // ダイアログでOKが押下されたら
  if (confirmationToDelete) {

    // 削除対象のタスクのIDを取得
    const index = todos.value.findIndex((todo) => todo.id === deletedTodo.id);

    // 対象タスクを削除
    todos.value.splice(index,1);
  }
}

</script>

<template>

  <tr v-if="filteredTodos.length === 0">
    <td colspan="6" class="zeroTasksAfterFilter">ステータスが「{{ selectedFilter }}」のタスクは登録されていません。</td>
    <!-- <p>表示したい</p> -->
  </tr>

  <tr v-else v-for="todo in filteredTodos" :key="todo.id" :id="todo.id">
    <td>{{ todo.status }}</td>
    <td>{{ todo.deadline }}</td>
    <td>{{ todo.title }}</td>
    <td>{{ todo.detail }}</td>
    <td><button class="btnInTable editBtn" @click="editTodo(todo.id)">編集</button></td>
    <td><button class="btnInTable deleteBtn" @click="deleteTodo(todo)">削除</button></td>
  </tr>
</template>

<style scoped>

/* テーブル内各タスクのボタン（「編集」と「削除」） */
.btnInTable {
  border-radius: 0.3rem;
  padding: 0.3rem 0.5rem;
  margin: 0.2rem 0;
}
.btnInTable:hover {
  opacity: 0.7;
  transition: 0.3s;
}

/* テーブル内各タスクの「編集」ボタン */
table .editBtn {
  background-color: rgba(255, 250, 205, 0.7);
}
/* テーブル内各タスクの「削除」ボタン */
table .deleteBtn {
  background-color: gray;
}
</style>

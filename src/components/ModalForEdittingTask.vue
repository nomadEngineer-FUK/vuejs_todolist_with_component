<!-- タスクの編集画面（モーダルウィンドウ） -->

<script setup lang="ts">
import { inject } from "vue";
import type { Todo } from "../interface"; // タスクデータの型


// INJECT =========================================
// 【タスクデータ】
const todos = inject("todos") as { value: Todo[] };         // アプリ内で登録されているタスク一覧
const editedTodo = inject("editedTodo") as { value: Todo }; // タスク編集用の初期値

// 【モーダルウィンドウ】
const toggleModal = inject("toggleModal") as Function;                         // 表示・非表示を切り替える関数
const isShowModalForEdit = inject("isShowModalForEdit") as { value: boolean }; // 表示制御を実施する変数
const STATUS_ITEMS = inject("STATUS_ITEMS") as { value: string[] };            // モーダルウィンドウ内で表示するステータス
// INJECT =========================================

// 【編集】モーダルウィンドウを閉じる関数（App.vue）を呼び出す
const makeEditModalHide = () => toggleModal('edit', false);

// タスクを上書き更新
const updateTodo = () => {

    // 編集対象のタスクの配列のindexを取得
    const index = todos.value.findIndex((todo) => todo.id === editedTodo.id);

    // 編集対象のタスクidがある場合、該当するtodosの値に、editedTodoの値を代入（上書き）
    if (index !== -1) {todos.value[index] = {...editedTodo}};

    // 【編集】モーダルウィンドウを閉じる
    toggleModal('edit', false);
}

</script>

<template>
    <!-- 編集のモーダルウィンドウ -->
    
    <div class="modal modalForCreate" v-show="isShowModalForEdit">

        <h3 class="modalHeader forEdit">タスクの新規作成</h3>
        <div class="modalContainer">
            <label for="status">ステータス :</label>
            <select name="status" id="status" class="modalSelect shortLength" v-model="editedTodo.status">
                <option :value="statusItem" v-for="statusItem in STATUS_ITEMS" :key="statusItem">{{ statusItem }}</option>
            </select>

            <label for="title" class="modalTitle">タスク名 :</label>
            <input id="title" type="text" class="modalInput" placeholder="タスク名を記載してください" v-model="editedTodo.title">

            <label for="detail" class="modalDetail">タスク詳細 :</label>
            <textarea name="detail" id="detail" class="modalTextarea" placeholder="タスクの詳細を記載してください" v-model="editedTodo.detail"></textarea>

            <label for="deadline" class="modalDeadline">期限 :</label>
            <input type="date" name="deadline" id="deadline" class="modalInput shortLength" v-model="editedTodo.deadline">

            <div class="btnInModal">
                <button class="btnForEdit" @click="updateTodo">保存</button>
                <button class="btnForCancel" @click="makeEditModalHide">キャンセル</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 編集時のモーダルウィンドウ */
.modal>.forEdit {
  background-color: rgb(255, 250, 205);
}
/* 編集時の「更新」 */
.btnForEdit {
  background-color: rgb(255, 250, 205);
  border: 1px solid rgb(255, 250, 205);
}
</style>

<!-- タスクの新規作成画面（モーダルウィンドウ） -->

<script setup lang="ts">
import { inject } from "vue";
import type { Todo } from "../interface"; // タスクデータの型

// INJECT =========================================
// 【タスクデータ】
const newTodo = inject("newTodo") as { value: Todo };               // 新規タスク作成用モーダルウィンドウ内での入力値
const createNewTask = inject("createNewTask") as Function;          // 新規タスク作成の関数
const STATUS_ITEMS = inject("STATUS_ITEMS") as string[]; // ステータス

// 【モーダルウィンドウ】
const toggleModal = inject("toggleModal") as Function;                                 // 表示・非表示を切り替える関数
const isShowModalForCreating = inject("isShowModalForCreating") as { value: boolean }; // 表示制御を実施する変数
// INJECT =========================================

// 【新規作成】モーダルウィンドウを閉じる関数（App.vue）を呼び出す
const makeCreatingModalHide = () => {
    toggleModal('create', false);
}

// 新規タスクを作成する関数（App.vue）を呼び出す
const makeNewTask = () => {
    createNewTask();
}
</script>

<template>
<!-- 新規作成のモーダルウィンドウ -->

    <div class="modal modalForCreate" v-show="isShowModalForCreating">

        <h3 class="modalHeader forCreating">タスクの新規作成</h3>
        <div class="modalContainer">
            <label for="status">ステータス :</label>
            <select name="status" id="status" class="modalSelect shortLength" v-model="newTodo.status">
                <option :value="statusItem" v-for="statusItem in STATUS_ITEMS" :key="statusItem">{{ statusItem }}</option>
            </select>

            <label for="title" class="modalTitle">タスク名 :</label>
            <input id="title" type="text" class="modalInput" placeholder="タスク名を記載してください" v-model="newTodo.title">

            <label for="detail" class="modalDetail">タスク詳細 :</label>
            <textarea name="detail" id="detail" class="modalTextarea" placeholder="タスクの詳細を記載してください" v-model="newTodo.detail"></textarea>

            <label for="deadline" class="modalDeadline">期限 :</label>
            <input type="date" name="deadline" id="deadline" class="modalInput shortLength" v-model="newTodo.deadline">

            <div class="btnInModal">
                <button class="btnForCreating" @click="makeNewTask">作成</button>
                <button class="btnForCancel" @click="makeCreatingModalHide">キャンセル</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 新規作成時のモーダルウィンドウ */
.modal>.forCreating {
  background-color: rgb(135, 206, 235);
}
/* モーダルウィンドウ（新規作成）の中の「作成」ボタン */
.btnForCreating {
  background-color: rgb(0, 50, 100);
  color: #fff;
}
</style>

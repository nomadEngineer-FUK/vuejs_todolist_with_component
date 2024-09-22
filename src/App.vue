<script setup lang="ts">
import { reactive, ref, provide, computed } from 'vue';
import type { Todo } from "./interface"; // タスクデータの型

// ファイルの読み込み
import Header from './components/Header.vue';
import TableForTasks from './components/TableForTasks.vue';
import TableHeader from './components/TableHeader.vue';
import ModalForCreatingNewTask from './components/ModalForCreatingNewTask.vue';
import ModalForEdittingTask from './components/ModalForEdittingTask.vue';

// タスクのDB
const todos = ref<Array<Todo>>([]);

// ソートとフィルターの選択肢
const SORT_ITEMS: string[] = ['昇順', '降順'];                          // ソートの選択項目
const FILTER_ITEMS: string[] = ['全て表示', '未着手', '進行中', '完了']; // Selectタグで表示する項目
const STATUS_ITEMS: string[] = ['未着手', '進行中', '完了'];            // 新規作成・編集のモーダルウィンドウで表示する項目

// 現在の選択項目
const selectedSort = ref<string>(SORT_ITEMS[0]);     // ソート
const selectedFilter = ref<string>(FILTER_ITEMS[0]); // フィルター

// 新規タスクの初期値（新規タスク作成のモーダル内における入力値を受け取る）
const newTodo = reactive<Todo>({
  title: '',
  detail: '',
  deadline: '',
  status: '未着手',
  isDone: false,
  id: 0
});

// newTodoの値をリセット
const resetNewTodo = () => {
  Object.assign(newTodo, {
      title: '',
      detail: '',
      deadline: '',
      status: '未着手',
      isDone: false,
      id: 0
    });
};

// 編集時の初期値（新規タスク作成のモーダル内における入力値を受け取る）
const editedTodo = reactive<Todo>({
  title: '',
  detail: '',
  deadline: '',
  status: '未着手',
  isDone: false,
  id: 0
});

// タスクの新規作成
const createNewTask = () => {

  // タイトルが入力されていない場合はアラート
  if (!newTodo.title) {

    alert('タスク名を入力してください。');
    return;
  };

    // モーダルの入力値を、todosの配列に代入
    todos.value.push({
      ...newTodo,
      id: todos.value.length === 0 
        ? 1
        : todos.value[todos.value.length - 1].id + 1,
    });

    resetNewTodo();               // newTodoの値をリセット
    toggleModal('create', false); // 【新規作成】モーダルウィンドウを閉じる
};

// ソートされたタスク一覧
const sortedTodos = computed(() => {

  const todoArray = [...todos.value];

  return selectedSort.value === "昇順"
    ? todoArray.sort((a: Todo, b: Todo) => a.id - b.id) // 昇順
    : todoArray.sort((a: Todo, b: Todo) => b.id - a.id) // 降順
});

// タスクのステータスが変更された時に関数実行
const filteredTodos = computed(() => {

// 選択されたフィルターが「全て表示」の場合
if (selectedFilter.value === '全て表示') {

  // 全てのタスク　を　ソート　の選択（昇順 or 降順）に合わせて表示
  return sortedTodos.value;

  // 選択されたフィルターが「未着手 / 進行中 / 完了」の場合
} else {

  // 該当のステータスであるタスクのみ　を　ソート　の選択（昇順 or 降順）に合わせて表示
  return sortedTodos.value.filter((todo) => todo.status === selectedFilter.value);
};
});

// モーダルウィンドウの表示制御
const isShowModalForCreating = ref<boolean>(false); // 作成
const isShowModalForEdit = ref<boolean>(false);     // 編集

// モーダルの表示・非表示を切り替える関数
const toggleModal = (type: 'create' | 'edit', show: boolean) => {
  if (type === 'create') isShowModalForCreating.value = show; // 新規作成
  if (type === 'edit') isShowModalForEdit.value = show;       // 編集
}


// PROVIDE =========================================
// 【ソート】
provide("SORT_ITEMS", ref(SORT_ITEMS)); // ソートする項目（'期日', 'ステータス', '登録順'）
provide("selectedSort", selectedSort);  // 昇順 or 降順
provide("sortedTodos", sortedTodos);    // 昇順 or 降順で並び替え後の全タスク

// 【フィルター（ステータス）】
provide("FILTER_ITEMS", ref(FILTER_ITEMS)); // フィルターの項目（ステータス）
provide("selectedFilter", selectedFilter);  // フィルターにて選択されたステータス
provide("STATUS_ITEMS", ref(STATUS_ITEMS)); // モーダルウィンドウ内で表示するステータス

// 【モーダルウィンドウ】
provide("toggleModal", toggleModal);                            // 表示・非表示を切り替える関数
provide("isShowModalForCreating", ref(isShowModalForCreating)); // 【新規作成】モーダルウィンドウの表示/非表示の切り替え（boolean型）
provide("isShowModalForEdit", ref(isShowModalForEdit));         // 【編集】モーダルウィンドウの表示/非表示の切り替え（boolean型）

// 【タスクのデータ】
provide("todos", todos);                     // アプリ内で登録されているタスク一覧
provide("newTodo", reactive(newTodo));       // 新規タスク作成用モーダルウィンドウ内での入力値
provide("editedTodo", reactive(editedTodo)); // タスク編集用の初期値
provide("createNewTask", createNewTask);     // 新規タスク作成の関数
provide("filteredTodos", filteredTodos);     // ステータスでフィルターしたタスクデータ

</script>

<template>
  <div class="toDoList">
    <!-- ヘッダー -->
    <Header></Header>

    <!-- 登録されているタスクが無い場合 -->
    <div v-if="todos.length === 0" style="text-align: center;">
      <p style="padding: 1.5rem; font-size: 1.2rem; text-align: center">
        タスクがまだ登録されていません。<br>
        「タスクの作成」から最初のタスクを登録してみましょう！
      </p>
    </div>

    <!-- タスクが1つ以上登録されている場合 -->
    <div class="table_box" v-else>
      <table>
        <!-- タスクテーブルのヘッダー -->
        <TableHeader></TableHeader>

        <!-- タスクテーブル内のデータ -->
        <TableForTasks></TableForTasks>
      </table>
    </div>

    <!-- モーダルウィンドウ：新規作成 -->
    <ModalForCreatingNewTask></ModalForCreatingNewTask>

    <!-- モーダルウィンドウ：編集 -->
    <ModalForEdittingTask></ModalForEdittingTask>
  </div>
</template>

<style>
/*Buttonタグの初期化 */
button {
  padding: 0;
  border: none;
  appearance: none;
  background: none;
  cursor: pointer;
  border-radius: 1rem;
}
/* 「キャンセル」ボタン */
.btnForCancel {
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}
.btnForCancel:hover {
  background-color: rgba(150, 150, 150);
  border: 1px solid rgba(150, 150, 150);
  transition: 0.3s;
  color: #fff;
}
/* 各種ボタンのhover時 */
.btnForDisplayModal:hover,
.btnForCreating:hover,
.btnForEdit:hover,
.btnForCancel:hover {
  opacity: 0.7;
  transition: 0.3s;
}

/* To do List全体 */
.toDoList {
  color: rgb(128, 128, 128);
  width: 100vh;
}

/* -- ここから -- タスクを表示するテーブル */
.zeroTasksAfterFilter {
  font-size: 1.2rem;
  border: none;
  padding-top: 1rem;
}
.container {
  margin-top: 2rem;
}
/* テーブルを要素に持つdiv */
.table_box {
  width: 100%;
  height: 75vh;
  overflow-x: auto;
  overflow-y: auto;
}
/* タスクを表示するテーブル */
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid rgb(220, 220, 220, 0.5);
  text-align: center;
}
th {
  font-size: 0.9rem;
  background-color: rgb(220, 220, 220, 0.1);
  padding: 0.2rem;
}

td {
  padding: 0 0.5rem;
}

.sticky_cross {
  position: sticky;
  top: 0;
  left: 0;
  background: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  z-index: 1;
}

.sticky_cross::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: -1;
}


/* -- ここから -- モーダルウィンドウ*/
.modal {
  z-index: 100;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 80%;
  transform: translate(-50%, -50%);
  background-color: rgba(222, 222, 222);
  border-radius: 1.5rem;
}
/* モーダルのコンテンツ　と　内部の各種要素 */
.modalContainer {
  padding: 0 4rem;
  height: 70%;
  max-height: 70%;
  margin: auto;
}
/* モーダルウィンドウ（新規タスクの作成 & 編集） */
.modal>.modalHeader {
  border-bottom: 1px solid rgba(50, 50, 50, 0.5);
  text-align: center;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  color: black;
  opacity: 0.8;
}
/* モーダル内の各ラベル */
.modalContainer>label {
  display: block;
}

/* ステータス　と　タスク名　と　タスク詳細 */
.modal>.modalContainer>.modalSelect,
.modal>.modalContainer>.modalInput,
.modal>.modalContainer>.modalTextarea {
  margin: 0 0 1rem 1rem;
  width: 90%;
  border-radius: 0.3rem;
}
/* ステータス　と　タスク名 */
.modal>.modalContainer>.modalSelect,
.modal>.modalContainer>.modalInput {
  min-height: 2rem;
}
/* モーダルの「期限」 */
.modal>.modalContainer>.modalSelect,
.modal>.modalContainer>.modalInput:last-child {
  width: 30%;
}
.modal>.modalContainer>.shortLength {
  width: 30%;
}
/* タスク詳細 */
.modal>.modalContainer>.modalTextarea {
  min-height: 40%;
  max-height: 60%;
  overflow: scroll;
  box-sizing: border-box;
  resize: vertical;
}
/* 期限 */
.modalDeadline {
  width: 30%;
  border-radius: 0.3rem;
}

/* モーダル内の各ボタンを要素として持つdiv */
.btnInModal {
  text-align: center;
}

/* モーダル内の各ボタン */
.btnInModal>button {
  margin-right: 2rem;
  padding: 0.5rem 2rem;
  font-size: 1rem;
}
</style>

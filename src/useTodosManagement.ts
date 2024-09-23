// プロジェクト全体で使用する　変数と関数　を分離して作成したファイル
    // 定義          ：本ファイル
    // 受取 & Provide：App.vue
    // Inject & 利用 ：各vueファイル

import { ref, reactive, computed } from "vue";
import type { Todo } from "./interface";

export const todosData = () => {

// =============== [状態] ===============

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

    // 編集時の初期値（新規タスク作成のモーダル内における入力値を受け取る）
    const editedTodo = reactive<Todo>({
        title: '',
        detail: '',
        deadline: '',
        status: '未着手',
        isDone: false,
        id: 0
    });

    // モーダルウィンドウの表示制御
    const isShowModalForCreating = ref<boolean>(false); // 作成
    const isShowModalForEdit = ref<boolean>(false);     // 編集

    // =============================================

    // =============== [ロジック] ===============

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

    // モーダルの表示・非表示を切り替える関数
    const toggleModal = (type: 'create' | 'edit', show: boolean) => {
        if (type === 'create') isShowModalForCreating.value = show; // 新規作成
        if (type === 'edit') isShowModalForEdit.value = show;       // 編集
    }

    // =============================================

    // 変数・関数をreturn（App.vueでprovideしてvueファイル全体で利用）
    return {
        todos,
        SORT_ITEMS,
        FILTER_ITEMS,
        STATUS_ITEMS,
        selectedSort,
        selectedFilter,
        newTodo,
        editedTodo,
        isShowModalForCreating,
        isShowModalForEdit,
        createNewTask,
        sortedTodos,
        filteredTodos,
        toggleModal
    };
};

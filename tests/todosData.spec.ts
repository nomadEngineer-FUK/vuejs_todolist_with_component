// ファイル：useTodosManagement.ts 内の todosData()　のユニットテスト
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { todosData } from '../src/useTodosManagement';

describe('todosData', () => {
    let todoLogic: ReturnType<typeof todosData>;

    beforeEach(() => {

        // 各テストの前にtodosDataを再生成
        todoLogic = todosData();

        // alert関数をモックする
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    // タスクデータを保有する変数の初期値は空欄である
    it('should initialize with empty todos list', () => {
        expect(todoLogic.todos.value).toEqual([]);
    });

    // 新規タスクを作成する場合
    it('should add new todo currently', () => {

        // タスクタイトルに値がある場合は、新規タスクが作成される
        todoLogic.newTodo.title = 'Test Todo';
        todoLogic.createNewTask();

        // 新しいタスクが作成されていることを確認する
        expect(todoLogic.todos.value.length).toBe(1);
        expect(todoLogic.todos.value[0].title).toBe('Test Todo');
    });

    // タスクタイトルが空欄の場合は、新規タスクが作成されない
    it('should not add new todo if title is empty', () => {
        todoLogic.createNewTask();

        // タイトルが空の場合、追加されないことを確認
        expect(todoLogic.todos.value.length).toBe(0);
        expect(window.alert).toHaveBeenCalledWith('タスク名を入力してください。');
    });

    // 新規タスクが作成された後、変数：newTodo の値がリセットされているか
    it('should reset newTodo after creating a new task', () => {
        todoLogic.newTodo.title = 'Another Test Todo';
        todoLogic.createNewTask();

        // newTodoがリセットされることを確認
        expect(todoLogic.newTodo.title).toBe('');
        expect(todoLogic.newTodo.status).toBe('未着手');
    });

    // タスクの並びが昇順になっているか
    it('should sort todos in ascending order when selectedSort is "昇順"', () => {
        todoLogic.newTodo.title = 'Todo 1';
        todoLogic.createNewTask();

        todoLogic.newTodo.title = 'Todo 2';
        todoLogic.createNewTask();

        // デフォルトでは昇順でソートされる
        expect(todoLogic.sortedTodos.value[0].title).toBe('Todo 1');
        expect(todoLogic.sortedTodos.value[1].title).toBe('Todo 2');
    });

    // タスクの並びが昇順になっているか
    it('should sort todos in descending oder when selectedSort is "降順"', () => {
        todoLogic.newTodo.title = 'Todo 1';
        todoLogic.createNewTask();

        todoLogic.newTodo.title = 'Todo 2';
        todoLogic.createNewTask();

        // ソート順を降順に設定
        todoLogic.selectedSort.value = '降順';

        expect(todoLogic.sortedTodos.value[0].title).toBe('Todo 2');
        expect(todoLogic.sortedTodos.value[1].title).toBe('Todo 1');
    });

    // 設定したフィルターの通りに表示されるか
    it('should filter todos based on selectedFilter', () => {
        todoLogic.newTodo.title = 'Todo 1';
        todoLogic.newTodo.status = '未着手';
        todoLogic.createNewTask();

        todoLogic.newTodo.title = 'Todo 2';
        todoLogic.newTodo.status = '未着手';
        todoLogic.createNewTask();

        todoLogic.newTodo.title = 'Todo 3';
        todoLogic.newTodo.status = '完了';
        todoLogic.createNewTask();

        // 未着手のタスクをフィルター
        todoLogic.selectedFilter.value = '未着手';
        expect(todoLogic.filteredTodos.value.length).toBe(2);
        expect(todoLogic.filteredTodos.value[0].status).toBe('未着手');

        expect(todoLogic.filteredTodos.value.length).toBe(2);
        expect(todoLogic.filteredTodos.value[1].status).toBe('未着手');

        todoLogic.selectedFilter.value = '完了';
        expect(todoLogic.filteredTodos.value.length).toBe(1);
        expect(todoLogic.filteredTodos.value[0].status).toBe('完了');
    });

    // モーダルウィンドウの表示切替
    it('should toggle modal visibility', () => {

        // モーダルの表示・非表示を切り替える
        todoLogic.toggleModal('create', true);
        expect(todoLogic.isShowModalForCreating.value).toBe(true);

        todoLogic.toggleModal('create', false);
        expect(todoLogic.isShowModalForCreating.value).toBe(false);
    });
});

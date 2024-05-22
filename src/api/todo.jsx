import axios from "axios";

const ENDPOINT_URL = "http://localhost:3003/todo";

const todoApi = {
  // 取得
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },

  // 追加
  async post(todo) {
    // 第二引数に追加したい値
    const result = await axios.post(ENDPOINT_URL, todo);
    return result.data;
  },

  // 削除
  async delete(todo) {
    // ENDPOINT_URL の後にtodoのidをつける必要あり
    const result = await axios.delete(ENDPOINT_URL + '/' + todo.id);
    return result.data; // 空のデータが返る
  },

  // 変更
  async patch(todo) {
    // ENDPOINT_URL の後にtodoのidをつける必要あり、第二引数に更新用の値
    const result = await axios.put(ENDPOINT_URL + '/' + todo.id, todo);
    return result.data;
  }
}

export default todoApi;
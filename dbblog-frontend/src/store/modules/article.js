export default {
  state: {
    articleList: []
  },
  getters: {
    articles(state) {
      return state.articleList
    }
  },
  mutations: {
		SEARCH_ARTICLE(state, data) {
			state.articleList = data
		}
  }
}

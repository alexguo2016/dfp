### vuex
- vuex的核心是store, 用来包含应用中大部分的state
- vuex的状态存储的reactable的, 类似于双向绑定
- 不能直接改变store里面的状态, 改变状态的唯一途径是commit mutation, 手动提交, 类似于react的setState


#### state
单一状态树  
每个应用仅仅包含一个store实例  

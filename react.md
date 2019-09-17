react中, 组件必须以大写字母开头.
jsx中, 使用的是onClick增加一个事件处理函数的方法.
例如 onClick={this.onClickButton}
jsx中, 组件使用es6的写法, 例如
```
class Compo extents Component {
	constructor(props){}
	func() {}
	render() {
		return (
			<div>
				...
			</div>
		)
	}
}
export default Compo
```
分而治之, 应该是js, css, html这样分开, 还是应该使用组件来作为一个最小的功能单位? 现在的结论是后者开发效率更高, 也更符合直觉.
react的思想是 UI = render(data).
页面的结果完全取决于函数data的输入, 每次都是确定的, 单独的变化.

## 划分组件边界的原则
以组件为最低的功能单位
高内聚, 低耦合

## react组件的数据种类
prop对外, 属于外部输入的数据接口
state对内, 是组件的内部状态

## react组件的生命周期


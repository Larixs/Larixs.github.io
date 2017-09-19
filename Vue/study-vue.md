#vue
### 基础语法篇

- el表示监听范围

		new Vue({
			el: '#app',
    		data: {
        		message: 'Hello Vue.js!'
         		}	
		});// app内的元素被监听， app本身不被监听。只能对app内的元素使用v语法

- track-by没看懂

###表单篇

- 多选框 

	v-model是数据来源，vue是中间管道，可以进行数据处理，{{checkedNames | json}}是数据终点。

		<div id="app">
		<input type="checkbox" id="jack" value="Jack" 	v-model="checkedNames">
		<label for="jack">Jack</label>
		<input type="checkbox" id="john" value="John" 	v-model="checkedNames">
		<label for="john">John</label>
		<input type="checkbox" id="mike" value="Mike" 	v-model="checkedNames">
		<label for="mike">Mike</label>
		<br>
		<span>Checked names: {{ checkedNames | 	json }}</span>
		</div>
	

   js:
 
   	```
   	new Vue({
  		el: '#app',
 	 	data: {
  	  		checkedNames: []
 	 	}
		});
	```
	
- 动态设置checkbox的值

	```
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b">//toggle不需要在data里设置
  
	```

- 将option的value设置为对象
	
	```
	<select v-model="selected">
  <!-- 对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
	```
	
	```
	// 当选中时
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
	```
	
- 表单项参数特性
	
	- lazy：在默认情况下，v-model 在input 事件中同步输入框值与数据，可以添加一个特性 lazy，从而改到在 change 事件中同步。
	
	- number ：如果想自动将用户的输入转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个特性 number。
	
	- debounce ：debounce 设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。
	
### API篇

#### Vue.extend(object)

混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。

Vue.extend()的参数是object。其中，object的mixins属性是可以包含多个自定义混合对象的数组，object中也可以包含任意组件选项。object里的属性之间会相互混合。混合之后的object再与该组件本身的选项混合。

不管是object内的混合，还是object与组件之间的混合，在默认情况下都遵守下面的混合策略:

- 函数之间的混合：（例如钩子函数）同名函数混合成一个数组，都会被调用。

- 对象之间的混合：（例如methods） 同名对象将会混合成一个对象。当对象的键名有冲突时，如果是在object内部，则取靠后的键值对；如果是在object与组件之间，则取组件的键值对。

以上的策略成为默认混合策略。除了默认混合策略，还有配合全局变量optionMergeStrategies使用的[自定义混合策略](https://cn.vuejs.org/v2/guide/mixins.html#自定义选项混合策略)。


#### Vue.nextTick(callback)

Vue异步执行DOM更新。和浏览器开队列攒任务来渲染页面类似，Vue观察到数据有变化的时候，会开启一个队列进行缓冲。缓冲减少了不必要的计算和多余的DOM操作。一个队列循环称为一个tick。Vue.nextTick()即是在本次tick完成之后、下一个tick之前（？）就调用。

在组件内使用时，不需要用全局Vue，使用this.$nextTick()就可调用，并且回调函数中的this将自动指向当前Vue实例。


#### 具名slot + 作用域插槽

具名slot通过名称来控制外部组件的插入。同一个名称的slot可以在该组件里多处放置，最后渲染时，同名的slot渲染相同的东西。当引入作用域插槽时，同名的slot都引入同一个template，不过会根据传入props的情况来根据同一个template渲染不同的内容出来。

例如：


parents.vue

      <div>
        <child :items="items">
          <template slot="item" scope="itemInfo">
            <item config="content" :info="itemInfo.info"/>
          </template>
        </child>
      </div>

把所有child.vue传入slot的参数都集合到itemInfo这个对象里，然后把itemInfo.info作为<item>的info传入。

child.vue

    <ul>
      <div v-for="item in items" class="item-div">
        <slot name="item" :info="item"> <!-- itemInfo.info = item -->
        </slot>
      </div>
    </ul>

child为slot传入参数info。结合parents

item.vue

      <div>
        {{info[config]}}
      </div>
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
	
### 过渡篇

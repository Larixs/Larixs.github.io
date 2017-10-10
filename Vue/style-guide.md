# vue的官方风格指南

个人从官方文档整理，并无原创。

## A:Essential

1. Multi-word component names 

    组件命应该为多个单词，除了根组件app components

    reason: This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word.
    
2. Component data must be a function (anywhere except on new Vue).

3. Prop definitions should be as detailed as possible.

    prop定义越详细越好，至少要注明类型

        // Even better!
        props: {
          status: {
            type: String,
            required: true,
            validator: function (value) {
              return [
                'syncing',
                'synced',
                'version-conflict',
                'error'
              ].indexOf(value) !== -1
            }
          }
        }

4. Always use key with v-for

    reason: [detailed explanation](https://vuejs.org/v2/style-guide/index.html#Keyed-v-for-essential)
    
    让vue能够精准操作，使v-for下的dom元素的行为可预测。
    
5. Component style scoping(any components except App component)



## B: Strongly Recommended

## C: Recommended

## D: Use With Caution

## 参考资料

1. [vue](https://vuejs.org/v2/style-guide/index.html)
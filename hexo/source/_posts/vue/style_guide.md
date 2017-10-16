---
title: vue的官方风格指南
tags: [style guide]
categories: vue
---

个人从官方文档整理和翻译。

## A:Essential

1. Multi-word component names 

    组件名应该为多个单词，除了根组件app components

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

   solution: 
   1. use the 'scoped' attribute
   
            <style scoped>
                
            </style>            
   2. use CSS modules
   
            <style module>
                
            </style>
   3. use BEM convention

6. Private property names
    
    请一直使用'$_'前缀为plugin、mixin等扩展的自定义私有属性命名。并且为了避免与其他人的代码产生冲突，还需要使用命名空间。（比如：$_yourPluginName_property）

    [详细解释](https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential)

        var myGreatMixin = {
          // ...
          methods: {
            $_myGreatMixin_update: function () {
              // ...
            }
          }
        }

## B: Strongly Recommended(Improving Readability)

多为组件的命名：命名方式，前缀，命名顺序

1. Component files

    each component should be in its own file.
 
    reason: This helps you to more quickly find a component when you need to edit it or review how to use it.
 
2. Single-file component filename casing

    .vue文件的命名问题。并没有明白为什么因为存在大小写不敏感的系统就推荐大驼峰命名法。

    另外，用短横线命名的方法称为kebab(烤肉串)命名法，还挺形象（笑）。
 
3. Base components names

    为了应用定制的基础组件，都需要一个特定的前缀，例如`Base,App或者V`

    [detailed explanation](https://vuejs.org/v2/style-guide/index.html#Base-component-names-strongly-recommended):

    These components lay the foundation for consistent styling and behavior in your application. 这些组件为你的应用中的样式和行为一致性奠定了基础。

    They may **only** contain:

    - html elements
    - ohter Base-prefixed components, and
    - 3rd-party UI components

    But they'll **never** contain global state(e.g. from a Vuex store)

    这些组件的名称通常包含他们所包装的元素，例如BaseButton, BaseTable，除非没有其特定目的的元素，如BaseIcon

    advantages:
 
    - 编辑器按照字母表对你的component进行排序时，你的base components总是会放在一起，让它们更容易被识别。
    - 由于components应该一直以多个单词命名，这样就可以帮你少想一个前缀单词，不用再随便找一个单词给简单的components取名了。
    - 因为这些组件会被经常用，你可能希望让他们能够全局引用而非从四散的角落里引用。前缀结合webpack让这个可以实现。（SPA感觉挺实用的，zelda不行。zelda是多个小型spa的集合，不一定每次都需要所有的base components，所以不能全局注册所有的base components，目前还是用bable-import-plugin按需引入比较好。）
    
            components/
            |- BaseButton.vue
            |- BaseTable.vue
            |- BaseIcon.vue
 
4. single-instance component names

    那些只允许存在一个active实例的组件，应该以 `The` 作为命名前缀，表示这里只能存在一个。例如 TheHeader, TheSideBar, TheFooter
    
    在每个页面都只使用一次的component才被成为single-instance component。 这种component从来不接受任何props,因为他们虽为app特制，但是不受app上下文的影响。
    
    如果你发现它们需要添加props，那他们就成为了每个页面只用一次的可复用的组件。
    
5. Tightly coupled component names
    
    [detailed explanation](https://vuejs.org/v2/style-guide/index.html#Tightly-coupled-component-names-strongly-recommended)
    
    子组件如果与父组件紧密耦合，那么子组件的名称应该以父组件的名称作为前缀。这样既可以证明子组件与父组件之间存在耦合关系，也可以让编辑器在按照字母表排序时，让这些组件放在一起。例如

        components/
        |- TodoList.vue
        |- TodoListItem.vue
        |- TodoListItemButton.vue

6. Order of words in components names

    components names should start with highest-level(often most general) words and end with descriptive modifying words.
    
    [detailed explanation:](https://vuejs.org/v2/style-guide/index.html#Order-of-words-in-component-names-strongly-recommended)
    
    you may be wondering:
    
    `why would we force component names to use less natural language?`
    
    在自然英语里，形容词和其他修饰词通常会出现在名词之前，特殊情况下需要连接词，例如：
    - coffee `with` milk
    - soup `with` the day
    - Visitor `to` the museum
    
    如果你愿意，你肯定可以把这些连接词加到组件名称里，但是顺序依然很重要。
    
    命名示例：
    
    最高级别的前缀应该是与app的上下文相关的。你的app需要一个搜索表单，那么这一系列组件的命名最高前缀应该是search。
    
        //bad
        components/
        |- ClearSearchButton.vue
        |- ExcludeFromSearchInput.vue
        |- LaunchOnStartupCheckbox.vue
        |- RunSearchButton.vue
        |- SearchInput.vue
        |- TermsCheckbox.vue
        
        //good
        components/
        |- SearchButtonClear.vue
        |- SearchButtonRun.vue
        |- SearchInputQuery.vue
        |- SearchInputExcludeGlob.vue
        |- SettingsCheckboxTerms.vue
        |- SettingsCheckboxLaunchOnStartup.vue
    
    你可能会考虑将search的component放在一个文件夹里，将setting的component放在另一个文件夹里，但是我们建议在一个庞大的app（组件数超过100）里才这么做。原因如下：
 
     - 在通常情况下，浏览嵌套的文件夹比浏览单个的components文件夹花费更多时间。
     - 命名冲突会导致在代码编辑器难以快速定位某一个特定的component。
     - 重构会更加困难。因为find-and-replace通常不足以更新一个移动后组件的引用。(Refactoring becomes more difficult, because find-and-replace often isn’t sufficient to update relative references to a moved component.)
 
7. Self-closing components

    在single-file components(.vue文件),string templates 和jsx中，没有内容的组件应该自闭合，除了 DOM templates（即html文件）.
    
    Components that self-close communicate that they not only have no content, but are **meant** to have no content.即在减少代码量的同时，告诉其他人这个组件里面没有内容（插槽？）。
    
    不在DOM templates里使用自闭合是因为html不支持官方空元素以外的自闭合。所以只有在dom处理之前，先让vue处理一波，才可以使用这个建议。
    
8. Components name casing in templates
    
    在大多数项目中，组件应该在single-file components和string templates中使用大驼峰命名法，在DOM templates中用kebab-case（烤肉串命名法？）。或者一直使用烤肉串命名法。
    
    大驼峰在以下几点优于烤肉串：
    
    - 编辑器可以自动补全，因为js也常用大驼峰。
    - 大驼峰在视觉上与普通的html元素的差异大于烤肉串的。大驼峰有两个大写字母，烤肉串就一个短横线。（差异性更大吗？emmmmmm...可能吧）
    - 如果在你的模板里用了非Vue自制组件，比如一个web component,大驼峰能保证你的Vue组件清晰可见。
    
    unfortunately, 因为html对大小写不敏感，所以在DOM templates里必须使用烤肉串。
    
    需要注意的是： 如果你已经使用了很多kebab，保持html的一致性以及整个项目的风格统一比以上几个优点重要多了。因此在所有地方都用烤肉串命名法也是可以接受的。
    
9. Component name casing in js/jsx
    
    js和jsx中应该一直用Pascal，vue.component注册的全局组件应该用kebab。
    
    [detailed explanation：](https://vuejs.org/v2/style-guide/index.html#Component-name-casing-in-JS-JSX-strongly-recommended)
    js中，pascal常用于类名或原型命名，或者说，任何能有不同实例的对象。Vue组件也可以有实例，因此它也可以用pascal。有个附加的优点，在jsx里用pascal可以让阅读代码的人更容易区分组件和html元素。
    
    为全局注册的组件使用kebab-case的原因如下：
    
    - 在js中很少使用全局组件，因此遵守js的约定没多大意义。
    - 这些应用程序总是包含许多DOM模板，其中必须使用kebab-case。（哪些应用？）
    
10. Full-word components names
    
    Components names should prefer full words over abbreviations.
    
    The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.
    
    编辑器中的自动完成让写更长的名称的成本非常低，而它们提供的清晰度是无价的。尤其应该避免不寻常的缩写。
    
        //bad
        components/
        |- SdSettings.vue
        |- UProfOpts.vue
        
        //good
        components/
        |- StudentDashboardSettings.vue
        |- UserProfileOptions.vue
    
11. Prop name casing

    Prop names should always use camelCase during declaration, but kebab-case in templates and jsx.
    
    We are simply following the convention of each language. Within js, camelCase is more natural. Within html, kebab-case is.
    
        //good
        props: {
          greetingText: String
        }
        <WelcomeMessage greeting-text="hi"/>
    
12. Multi-attribute elements
 
    elements with multiple attributes should span multiple lines, with one attribute per line.
    
    reason: It's easy to read.
    
        // good
        <MyComponent
          foo="a"
          bar="b"
          baz="c"
        />
    
    拿一个页面测试了一下，用这种标准能够让属性看的更清楚，但是让元素之间的层级关系变得不好辨认了。
    
13. Simple expressions in templates

    Component templates should only include simple expressions, with more complex expression refactored into computed properties or methods.
    
14. Simple computed properties
    
    Complex computed properties should be split into as many simpler properties as possible.
    
    [detailed explanation:](https://vuejs.org/v2/style-guide/index.html#Simple-computed-properties-strongly-recommended)
    - easier to test
    - easier to read
    - more adaptable to changing requirements
  
  
        //bad
        computed: {
          price: function () {
            var basePrice = this.manufactureCost / (1 - this.profitMargin)
            return (
              basePrice -
              basePrice * (this.discountPercent || 0)
            )
          }
        }
        
        //good
        computed: {
          basePrice: function () {
            return this.manufactureCost / (1 - this.profitMargin)
          },
          discount: function () {
            return this.basePrice * (this.discountPercent || 0)
          },
          finalPrice: function () {
            return this.basePrice - this.discount
          }
        }

15. Quoted attribute values

    Non-empty HTML attributes values should always be inside quotes(single or double, whichever is not used in js). 为什么要用js不用的那个引号呢？
    
16. Directive shorthands

    Directive shorthands should be used always or never.
    
    Directive shorthands include `:` for` v-bind:` and `@` for `v-on:`.
    
    
    

## C: Recommended(Minimizing Arbitrary Choices and Cognitive Overhead)

1. Component/instance options order

    components/instance options should be ordered consistently.
 
    This is the default order from Vue for components options.
 
    1. Side effects (trigger effects outside the component)
        
        - el
        
    2. Global Awareness(require knowledge beyond the component)
        
        - name
        - parent 
     
    3. Component Type(changes the type of component)
    
        - functional
    
    4. Template Modifiers(changes the way templates are compiled)
    
        - delimiters
        - comments
    
    5. Template Dependencies(assets used in the template)
    
        - components
        - directives
        - filters
        
    6. Composition(merge properties into the options)
    
        - extends
        - mixins
        
    7. Interface(the interface to the component)
    
        - inheritAttrs
        - model
        - props/propsData
    
    8. Local State(local reactive properties)
    
        - data
        - computed
        
    9. Events(callback triggered by reactive events)
        
        - watch
        - Lifecycle Events(in the order they are called)
        
    10. Non-Reactive Properties(instance properties independent of the reactivity system)
    
        - methods
        
    11. Rendering(the declarative description of the component output)
    
        - template/ render
        - renderError
        
2. Element attribute order       
 
    The attributes of elements(including components) should be ordered consistently.
    
    1. Definition(provides the component options)
        
        - is
        
    2. List Rendering(creates multiple variations of the same element)
    
        - v-for
        
    3. Conditionals(whether the element is rendered/shown)
    
        - v-if
        - v-else-if
        - v-else
        - v-show
        - v-cloak
        
    4. Render Modifiers(changes the way the element renders)
    
        - v-pre
        - v-once
    
    5. Global Awareness(requires knowledge beyond the component)
    
        - id
        
    6. Unique Attributes(attributes that require unique values)
    
        - ref
        - key
        - slot
    
    7. Two-Way Binding(combining binding and events)
        
        - v-model
        
    8. Other Attributes(all unspecified bound & unbound attributes)
    
    9. Events(component event listeners)
    
        - v-on
        
    10. Content(overrides the content of the element)
    
        - v-html
        - v-text
        
3. Empty lines in component/instance options

    Make code easy to read.
    
4. Single-file component top-level element order
    
    Single-file components should always order `template`, `script`, and `style` tags consistently, **with \<style> last**, because at least one of the other two is always necessary.
    
## D: Use With Caution(Potentially Dangerous Pattens)

1. v-if/v-if-else/v-else without key

    It’s usually best to use key with v-if + v-else, if they are the same element type (e.g. both \<div> elements).

2. Element selectors with scoped

    Element selectors should be avoided with scoped.
    
    reason: Large numbers of element selectors are slow.

    [detailed explanation](https://vuejs.org/v2/style-guide/index.html#Element-selectors-with-scoped-use-with-caution)
    
        //bad
        <template>
          <button>X</button>
        </template>
        <style scoped>
        button {
          background-color: red;
        }
        </style>
        
        //good
        <template>
          <button class="btn btn-close">X</button>
        </template>
        <style scoped>
        .btn-close {
          background-color: red;
        }
        </style>

3. Implicit parent-child communication

    ` An ideal Vue application is props down, events up. `
    
    Beware: `do not be seduced into trading simplicity` (being able to understand the flow of your state)` for short-term convenience` (writing less code).
    
4. Non-flux state management
    
   Vuex should be preferred for global state management, instead of this.$root or a global event bus. 
    
    
    
## 小结
    
Vue的官方风格指导A-C主要是为提高Vue的可读性而设计，D是稍微提升程序的性能和稳健性。

可读性的提升大致有以下几个方面：

- 命名。
    
    这篇style-guild通读下来，发现有不少条目都在讲命名，组件的命名形式、命名规则等等。一个好的命名可以解释该组件的作用、与其他组件之间的耦合关系、方便编辑器查找等等。
- 顺序。

    包括属性的书写顺序，options的书写顺序，命名的单词顺序等。
- 代码风格。

    比如使用自闭合，属性换行等。
    
## 参考资料

1. [vue官方风格指南](https://vuejs.org/v2/style-guide/index.html)

## navigator

**Priority A Rules: Essential**

Multi-word component names

Component data

Prop definitions

Keyed v-for

Component style scoping

Private property names

**Priority B Rules: Strongly Recommended**

Component files

Single-file component filename casing

Base component names

Single-instance component names

Tightly coupled component names

Order of words in component names

Self-closing components

Component name casing in templates

Component name casing in JS/JSX

Full-word component names

Prop name casing

Multi-attribute elements

Simple expressions in templates

Simple computed properties

Quoted attribute values

Directive shorthands

**Priority C Rules: Recommended**

Component/instance options order

Element attribute order

Empty lines in component/instance options

Single-file component top-level element order

**Priority D Rules: Use with Caution**

v-if/v-if-else/v-else without key

Element selectors with scoped

Implicit parent-child communication

Non-flux state management
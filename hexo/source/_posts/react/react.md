---
title: react学习
tags: [react, study notes]
categories: react
---
While this.props is set up by React itself and this.state has a special meaning, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output.

# getting started 入门

## reactive updates

- 应该认为props在组件内部是不可变的，即，永远不要给this.props赋值。

- React的组件非常简单，他们都是一些简单的函数，以props和state作为参数，来渲染出HTML。（限制：React组件只能渲染出一个节点。如果你想渲染出多个节点，那么他们必须包含在一个单节点内被渲染）。

## JSX in depth 深入学习JSX

- JSX中的class和for属性被替换为className,htmlFor

- [Namespaced Components](http://reactjs.cn/react/docs/jsx-in-depth.html):将子组件作为父组件的属性进行保存

本来繁琐的代码

    // Awkward block of variable declarations
    var Form = MyFormComponent;
    var FormRow = Form.Row;
    var FormLabel = Form.Label;
    var FormInput = Form.Input;

    var App = (
      <Form>
        <FormRow>
          <FormLabel />
          <FormInput />
        </FormRow>
      </Form>
    );

目的代码：

    var Form = MyFormComponent;

    var App = (
      <Form>
        <Form.Row>
          <Form.Label />
          <Form.Input />
        </Form.Row>
      </Form>
    );

使用Namespaced Components：

    var MyFormComponent = React.createClass({ ... });

    MyFormComponent.Row = React.createClass({ ... });
    MyFormComponent.Label = React.createClass({ ... });
    MyFormComponent.Input = React.createClass({ ... });

#state

## Using State Correctly  正确使用state（其实是讲setState的使用场景）
There are three things you should know about setState().
###1.Do Not Modify State Directly 不要直接修改state

        // Wrong
        this.state.comment = 'Hello';

        // Correct
        this.setState({comment: 'Hello'});

###2.State Updates May Be Asynchronous       state可能是异步更新

React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

        // Wrong
        this.setState({
          counter: this.state.counter + this.props.increment,
        });

        // Correct
        this.setState((prevState, props) => ({
          counter: prevState.counter + props.increment
        }));


###3.State Updates are Merged   state通过合并来更新

When you call setState(), React merges the object you provide into the current state.


#lifeCircle

init: componentsWillMount ->render ->componentsDidMount

re-render: componentsWillReceiveProps -> ShouldComponentsUpdate -> ComponentsWillUpdate -> render ->ComponentsDidUpdate


#Handling Events

## difference from document elements

 you cannot return false to prevent default behavior in React. You must call preventDefault explicitly.
 You must call preventDefault explicitly.


#KEY
Keys only make sense in the context of the surrounding array.



### 不应该在根元素上设置key，要在使用时设置key。

https://facebook.github.io/react/docs/lists-and-keys.html

### Keys Must Only Be Unique Among Siblings

Keys used within arrays should be unique among their siblings. However they don't need to be globally unique.


#propTypes 属性校验器


es5写法：

	var NewDom = React.createClass({

	getDefaultProps: function() {//设置默认属性
       return {title:'133'};
    },

    propTypes: {
       title:React.PropTypes.string,
    },//属性校验器，表示必须是string

    render: function() {

       return <div>{this.props.title}</div>;

    }
	});

es6写法：

	class NewDom extends React.Component{

	  render() {
	      return <div >1{this.props.title}</div>;
	  }

	}

	NewDom.propTypes={//属性校验器，表示该属性必须是bool，否则报错
	  title: React.PropTypes.bool,
	}
	NewDom.defaultProps={title:'133'};//设置默认属性



es7写法（babel支持）：

//放在class内使用static定义静态属性，静态属性是其本身的属性，即class.propname，实例是否会继承有待测试。

    class NewDom extends React.Components {
        static propTypes = {
            title:React.PropTypes.bool
        }
    }

    (感谢贤哥指正）







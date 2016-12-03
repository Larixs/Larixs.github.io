While this.props is set up by React itself and this.state has a special meaning, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output.

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
	//es6 这两个属性不能写在class内。
	NewDom.propTypes={//属性校验器，表示改属性必须是bool，否则报错
	  title: React.PropTypes.bool,
	}
	NewDom.defaultProps={title:'133'};//设置默认属性







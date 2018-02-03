/*
  React is a frontend framework for js

*/

/*
  To render a component into the DOM
*/
ReactDOM.render(
  <h2>Mreow</h2>,
  document.getElementById('container')
);

/*
  To create a component w/prop and props backup
  can be created like  <Hello name="will"/> in any
  React render
*/
class Hello extends React.Component {
	constructor(){
  	super();
    this.state = {name: "Will"};
  }

  render() {
  	if(this.props.name){
      		this.state.name=this.props.name;
    }
    return <div>Hello {this.state.name}</div>;
  }
}

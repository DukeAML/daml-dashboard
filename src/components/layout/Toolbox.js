import React from "react";

// What is this component
class ToolboxItem extends React.Component {
	render() {
		return (
			<div
				className="toolbox__items__item"
				onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
			>
				{this.props.item.i}
			</div>
		);
	}
}

class Toolbox extends React.Component {
	render() {
		return (
			<div className="toolbox">
				<span className="toolbox__title">Toolbox</span>
				<div className="toolbox__items">
					{this.props.items.map(item => (
						<ToolboxItem
							key={item.i}
							item={item}
							onTakeItem={this.props.onTakeItem}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Toolbox;

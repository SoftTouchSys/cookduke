import React from "react";

import { FiChevronDown,FiChevronUp } from "react-icons/fi";
class SelectBox extends React.Component {

  state = {
    items: this.props.items,
    showItems: false,
    selectedItem: this.props.items && this.props.items[0]
  };

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }));
  };

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showItems: false
    });
  };

  render() {
    return (
        <div className="form_input">
          <div className="">
            {this.state.selectedItem.value}
            {/* select.. */}
          </div>
          <div className="" onClick={this.dropDown}>
            { this.state.showItems?
             <span
              className="select-box-arrow"
            ><FiChevronDown/></span>
            :<span
              className="select-box-arrow"
            ><FiChevronUp/></span>}
          </div>

          <div
            style={{ display: this.state.showItems ? "block" : "none" }}
            className={"select-box--items"}
          >
            {this.state.items.map(item => (
              <div
                key={item.id}
                onClick={() => this.selectItem(item)}
                className={this.state.selectedItem === item ? "selected" : ""}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
    );
  }
}

export default SelectBox;
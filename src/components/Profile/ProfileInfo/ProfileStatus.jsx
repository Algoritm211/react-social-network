import React from 'react'


class ProfileStatus extends React.Component {

  state = {
    editMode: false
  }

  enableEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  disableEditMode = () => {
    this.setState({
      editMode: false
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.enableEditMode} title="Double click to edit">{this.props.status}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input autoFocus={true} onBlur={this.disableEditMode} value={this.props.status}/>
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus
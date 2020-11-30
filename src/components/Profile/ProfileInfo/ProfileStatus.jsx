import React from 'react'


class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
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
    this.props.updateStatus(this.state.status)
  }

  onChangeStatus = (event) => {
    this.setState({
      status: event.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.enableEditMode} title="Double click to edit">{this.props.status || '------'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input 
              onChange={this.onChangeStatus}
              autoFocus={true} 
              onBlur={this.disableEditMode} 
              value={this.state.status}/>
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus
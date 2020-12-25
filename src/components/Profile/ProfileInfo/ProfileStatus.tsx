import React, { useEffect, useState } from "react";
import classes from './ProfileStatus.module.css'
import {StatusType} from "../../../types/types";


type OwnState = {
  editMode: boolean,
  status: string | null | undefined
}

type OwnProps = {
  status: StatusType['status'],
  updateStatus: (status: string) => void,
  statusUpdateError: string | null
}


class ProfileStatus extends React.Component<OwnProps, OwnState> {

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
    this.props.updateStatus(this.state.status as string)
  }

  onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: event.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: OwnProps, prevState: OwnState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        Статус:
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
              value={this.state.status as string}/>
          </div>
        }
        {this.props.statusUpdateError &&
          <span className={classes.statusUpdateError}>
            <i className="fa fa-exclamation-circle"></i>
            &nbsp;
            {this.props.statusUpdateError}
          </span>
        }
      </div>
    )
  }
}

export default ProfileStatus;


// const ProfileStatus = (props) => {
//   const [editMode, setEditMode] = useState(false);
//   const [status, setStatus] = useState(props.status)

//   useEffect(() => {
//     setStatus(props.status)
//   }, [props.status])

//   const enableEditMode = () => {
//     setEditMode(true)
//   }  

//   const disableEditMode = () => {
//     setEditMode(false)
//     props.updateStatus(status)
//   }

//   const onChangeStatus = (event) => {
//     setStatus(event.currentTarget.value)
//   }
//   return (
//     <div>
//       {!editMode && (
//         <div>
//           <span
//             onDoubleClick={enableEditMode}
//             title="Double click to edit"
//           >
//             {status || "------"}
//           </span>
//         </div>
//       )}
//       {editMode && (
//         <div>
//           <input
//             onChange={onChangeStatus}
//             autoFocus={true}
//             onBlur={disableEditMode}
//             value={status}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

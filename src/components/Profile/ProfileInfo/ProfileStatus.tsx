import React, {ChangeEvent} from 'react'

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode:boolean
    status:string

}

class ProfileStatus extends React.Component<PropsType,StateType> {
 state = {
   editMode: false,
   status: this.props.status
 }

 actMode = () => {
   this.setState({ editMode: true})
 }

 deactivateMode = () => {
   this.setState({ editMode: false})
   this.props.updateStatus(this.state.status)
 }

 onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
   if(e.target.value.length <= 300)
   this.setState({
     status: e.target.value
   })
 }

 componentDidUpdate(prevProps:PropsType, prevState:StateType) {
   if (prevProps.status !== this.props.status) {
     this.setState({status: this.props.status})
   }
 }

  render() {
  const props = this.props;
  return (
    <div>
        {!this.state.editMode &&
        <div>
          <span onClick={this.actMode}>{props.status || 'Нет статуса'}</span>
        </div>
      }
        {this.state.editMode &&
        <div>
          <input onChange={this.onStatusChange}
                 onBlur={this.deactivateMode}
                 autoFocus={true} value={this.state.status}/>
        <div   style={{color: 'white'}}>{this.state.status.length}/300</div>
        </div>
      }
    </div>
  )
}
}

export default ProfileStatus
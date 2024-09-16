import React from "react";
import style from "./ProfileInfo.module.css";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {


    state = {
        editMode: false,
        status: this.props.status

    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        }, () => {
            this.props.updateStatus(this.state.status);
        });
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.props.status} />
                    </div>
                }
            </div>
        );
    };
}

export default ProfileStatus

import Dialogs from "./Dialogs";
import { sendMessageActionCreator } from "../../reducers/dialogsReducer";
import { connect } from "react-redux";
import withAuthRedirect from "../../HOC/withAuthRedirect"
import { compose } from "redux";




const mapStateToProps = (state) => {
    return{
        messagesPage: state.messagesPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}
//прочитать про compose, нихуя не понял
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

//сверху тоже самое снизу

// let AuthRiderectComponent = withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRiderectComponent)

// export default DialogsContainer;

import Dialogs from "./Dialogs.tsx";
import { actions } from "../../reducers/dialogsReducer.ts";
import { connect } from "react-redux";
import withAuthRedirect from "../../HOC/withAuthRedirect.tsx"
import { compose } from "redux";
import { AppStateType } from "../../reducers/reduxStore.ts";
import React from "react";




const mapStateToProps = (state: AppStateType) => {
    return{
        messagesPage: state.messagesPage,
    }
}


//больше не нужен полс того, как мы заменили в композе диспатчпропс на {...actions}
// const mapDispatchToProps = (dispatch ) => {
//     return{
//         sendMessage: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody))
//         }
//     }
// }
//прочитать про compose, нихуя не понял
export default compose(
    connect(mapStateToProps, {
        ...actions
    }),
    withAuthRedirect
)(Dialogs) as React.ComponentType

//сверху тоже самое снизу

// let AuthRiderectComponent = withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRiderectComponent)

// export default DialogsContainer;
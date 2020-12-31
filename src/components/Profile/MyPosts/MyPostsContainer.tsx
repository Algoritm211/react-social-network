import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from 'react-redux'
import {PostType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

// const MyPostsContainer = (props) => {


//   return (

//     <StoreContext.Consumer>
//       {
//         (store) => {
//           let state = store.getState().profilePage

//           const onAddPost = () => {
//             store.dispatch(addPostActionCreator())
//           }
        
//           let onPostChange = (text) => {
//             store.dispatch(updateNewPostTextActionCreator(text))
//           }
        
//           return (
//             <MyPosts 
//               onAddPost={onAddPost} 
//               onPostChange={(text) => onPostChange(text)}
//               posts={state.postsData}
//               newPostText={state.newPostText}
//             />
//           )
//         }
//       }
//     </StoreContext.Consumer>
//   );
// };

type MapStateToPropsType = {
  posts: Array<PostType>
}

type MapDispatchToPropsType = {
  onAddPost: (post: string) => void
}

function mapStateToProps(state: AppStateType) {
  return {
    posts: state.profilePage.postsData,
  }
}

const mapDispatchToProps = {
  onAddPost: actions.addPostActionCreator
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
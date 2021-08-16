export default function user(state = {}, action) {
  let login;
  switch (action.type) {
    case 'USER_LOGIN':
      login = {
        user_id: action.payload.user.user_id,
        user_name: action.payload.user.user_name,
        user_email: action.payload.user.user_email,
        user_avatar: action.payload.user.user_avatar,
      };
      return login;
    case 'ADMIN_LOGIN':
      login = {
        admin_id: action.payload.admin.admin_id,
        admin_name: action.payload.admin.admin_name,
        admin_email: action.payload.admin.admin_email,
      };
      return login;
    case 'USER_UPDATE':
      login = {
        user_id: state.user_id,
        user_name: action.payload.user.user_name,
        user_email: state.user_email,
        user_avatar: state.user_avatar,
      };
      return login;
    case 'AVATAR_UPDATE':
      login = {
        user_id: state.user_id,
        user_name: state.user_name,
        user_email: state.user_email,
        user_avatar: action.payload.user.user_avatar,
      };
      return login;
    case 'USER_LOGOUT':
      login = {
        user_id: null,
        user_name: null,
        user_email: null,
        user_avatar: null,
      };
      return login;
    default:
      return state;
  }
}

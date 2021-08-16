export default function auth(state = {}, action) {
  let login;
  switch (action.type) {
    case 'USER_LOGIN':
      login = {
        token: action.payload.token,
        session: true,
      };
      return login;
    case 'ADMIN_LOGIN':
      login = {
        token: action.payload.token,
        adminSession: true,
      };
      return login;
    case 'USER_LOGOUT':
      login = {
        token: null,
        adminSession: false,
      };
      return login;
    default:
      return state;
  }
}

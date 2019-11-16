const error_codes = {
  existing_account: {
    title: "error",
    message: "username or email exists",
    code: 1
  },
  db_insert_update : {
    title: "error",
    message: "error connecting to the database.\nplease try again",
    code: 1
  },
  created_account: {
    title: "success",
    message: "successfully created account.\nyou can now login"
  },
  invalid_login: {
    title: "error",
    message: "username or password incorrect",
    code: 1
  },
  not_logged_in: {
    title: "error",
    message: "login required",
    code: 1
  }
};

module.exports = error_codes

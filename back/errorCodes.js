const error_codes = {
  none: 0,
  existing_user_student: 1,
  db_insert_update: 2,
  no_access: 3,
  not_logged_in: 4,
  missing_data: 5,
  invalid_username_password: 6,
  labels: {
    invalid_username_password: "Invalid username or password.",
    missing_data: "Missing data.",
    no_access: "Unauthorized access.",
    not_logged_in: "Unauthorized access.",
    existing_user_student: "A user with that information already exists.",
    db_insert_update: "There was a problem performing the request."
  }
};

module.exports = error_codes

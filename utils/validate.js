class Validate {
  constructor(username, email, password, phoneNumber) {
    this.username = username;
    (this.email = email),
      (this.password = password),
      (this.phoneNumber = phoneNumber),
      (this.messages = []);
  }
  isEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.email)) {
      this.messages.push(true);
      return;
    }
    this.messages.push("Invalid email address");
  }
  isPassword() {
    // Contains letters, symbols, and special characters, 6 characters long - should match
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (passwordRegex.test(this.password)) {
      this.messages.push(true);
      return;
    }
    this.messages.push(
      " Password must contain at least 1 letter, 1 special character, and at least 6 characters long"
    );
  }

  isUsername() {
    const nameRegex = /^[A-Za-z]{4,}$/;
    if (nameRegex.test(this.username)) {
      this.messages.push(true);
      return;
    }

    this.messages.push(
      "Username must contain only letters and at least 4 characters"
    );
  }

  isPhoneNumber() {
    const nigeriaPhoneRegex = /^(?:(\+234)|0)[789]\d{9}$/;
    if (nigeriaPhoneRegex.test(this.phoneNumber)) {
      this.messages.push(true);
      return;
    }
    this.messages.push("Invalid phone number");
  }
}

module.exports = Validate;


// /^(08|07|09)\d{9}$/
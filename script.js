const form = document.querySelector("form");
const emailDiv = form.querySelector("div.email");
const emailField = emailDiv.querySelector("input");
const emailErrorMessage = emailDiv.querySelector("p");
const passwordDiv = form.querySelector("div.password");
const passwordField = passwordDiv.querySelector("input");
const passwordErrorMessage = passwordDiv.querySelector("p");
const confirmPasswordDiv = form.querySelector("div.confirm-password");
const confirmPasswordField = confirmPasswordDiv.querySelector("input");
const confirmPasswordErrorMessage = confirmPasswordDiv.querySelector("p");
const countrySelectDiv = form.querySelector("div.country");
const countrySelectBox = countrySelectDiv.querySelector("select");
const countrySelectErrorMessage = countrySelectDiv.querySelector("p");
const postalCodeDiv = form.querySelector("div.postal-code");
const postalCodeField = postalCodeDiv.querySelector("input");
const postalCodeErrorMessage = postalCodeDiv.querySelector("p");
const submitButton = form.querySelector("input[type='submit']");
const passwordRules = document.querySelector(".password-rules");

function validatePostalCode(country) {
  if (country == "") {
    setUserFeedback({
      element: postalCodeErrorMessage,
      message: "Please select a country",
    });
    setUserFeedback({
      element: countrySelectErrorMessage,
      message: "Please select a country",
    });
    return;
  }
  // For each country, defines the pattern that the postal code has to follow
  const constraints = {
    ng: [
      "^\\d{6}$",
      "Nigerian postal codes must have exactly 6 digits: e.g. 100001",
    ],
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  // Check it!
  if (constraint.test(postalCodeField.value)) {
    // The postal code follows the constraint, we use the ConstraintAPI to tell it
    setUserFeedback({ element: postalCodeErrorMessage });
  } else {
    // The postal code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    setUserFeedback({
      element: postalCodeErrorMessage,
      message: constraints[country][1],
    });
  }
}

const validateEmail = (input) => {
  // Regular expression for email validation as per HTML specification
  const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

  if (input == "") {
    setUserFeedback({
      element: emailErrorMessage,
      message: "Please enter a valid email",
    });
  } else {
    if (!/^.*@.*$/.test(input)) {
      setUserFeedback({
        element: emailErrorMessage,
        message: "Email must contain the @ symbol",
      });
    } else if (!/@[^@]+\.[a-z]{2,}$/.test(input)) {
      setUserFeedback({
        element: emailErrorMessage,
        message: "Email must end with a valid domain e.g .com,.org",
      });
    } else if (!/^\S+$/.test(input)) {
      setUserFeedback({
        element: emailErrorMessage,
        message: "Email must not contain spaces",
      });
    } else if (emailRegExp.test(input)) {
      setUserFeedback({ element: emailErrorMessage });
    }
  }
};

const validatePassword = (input) => {
  const constraint = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
  );
  const lengthConstraint = /^.{8,}$/;
  const upperCaseConstraint = /[A-Z]/;
  const specialCharacterConstraint = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=~`'`;]/;
  const numberConstraint = /\d/;
  if (
    !(
      lengthConstraint.test(input) &&
      upperCaseConstraint.test(input) &&
      specialCharacterConstraint.test(input) &&
      numberConstraint.test(input)
    )
  ) {
    setUserFeedback({
      element: passwordErrorMessage,
      message: "Please enter a valid password",
    });
    passwordRules.style.display = "block";
  } else {
    setUserFeedback({
      element: passwordErrorMessage,
      message: "",
    });
    passwordRules.style.display = "none";
  }

  if (lengthConstraint.test(input)) {
    passwordRules.querySelectorAll("ul li")[0].style.color = "green";
  } else {
    passwordRules.querySelectorAll("ul li")[0].style.color = "red";
  }
  if (upperCaseConstraint.test(input)) {
    passwordRules.querySelectorAll("ul li")[1].style.color = "green";
  } else {
    passwordRules.querySelectorAll("ul li")[1].style.color = "red";
  }
  if (specialCharacterConstraint.test(input)) {
    passwordRules.querySelectorAll("ul li")[2].style.color = "green";
  } else {
    passwordRules.querySelectorAll("ul li")[2].style.color = "red";
  }
  if (numberConstraint.test(input)) {
    passwordRules.querySelectorAll("ul li")[3].style.color = "green";
  } else {
    passwordRules.querySelectorAll("ul li")[3].style.color = "red";
  }
};

const setUserFeedback = ({ element, message = "" }) => {
  element.textContent = message;
};

emailField.addEventListener("input", function () {
  validateEmail(this.value);
});
passwordField.addEventListener("input", function () {
  validatePassword(this.value);
});

postalCodeField.addEventListener("input", function () {
  validatePostalCode(countrySelectBox.value);
});

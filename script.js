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

function validatePostalCode(country) {
  if (country == "") {
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
  if (emailRegExp.test(input)) {
    emailErrorMessage.textContent = "";
  } else {
    setUserFeedback({
      element: emailErrorMessage,
      message: "Please enter a valid email address.",
    });
  }
};

const validatePassword = (input) => {
  const constraint = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
  );
  if (input.length < 8) {
    setUserFeedback({
      element: passwordErrorMessage,
      message: "Password must be at least 8 characters long",
    });
    if (!constraint.test(input)) {
      setUserFeedback({
        element: passwordErrorMessage,
        message: "Please enter a valid password",
      });
    }
  }
};

const setUserFeedback = ({ element, message = "" }) => {
  element.textContent = message;
};

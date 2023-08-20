/* eslint-disable */
const isValidPassword = (value) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const re = /^.{8,}$/;
    return (re.test(value));
};
const isValidPasswordCharacter = (value) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const re = /^.{8,}$/;
    return (re.test(value));
};
  
const isValidEmailAddress = (value) => {
    return null !== value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
}

const isValidName = (value) => {
    const re = /^[a-zA-Z ]+(?:-[a-zA-Z ]+)*$/;
    return re.test(value);
}

const isValidUserName = (value) => {
    // const re = /^[a-zA-Z0-9]+$/;
    const re = /^(?!.*\.(?:com|net))[A-Za-z0-9.]{5,}$/;
    return re.test(value);
}

const isValidStudentPasscode = (value) => {
    const re = /^[a-zA-Z0-9]{4,8}$/;
    return re.test(value);
}

export {isValidPassword, isValidEmailAddress, isValidName, isValidUserName, isValidStudentPasscode, isValidPasswordCharacter};

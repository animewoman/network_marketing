exports.isNull = (obj) => obj === null;
exports.getToken = (token) => token.split(' ')[1];
exports.isAdmin = (user) => user.isAdmin == true;
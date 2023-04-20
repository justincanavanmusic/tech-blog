module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },

  comparison: (a, b) => {
    if(a==b) {
      return true;
    } else {
      return false;
    }
  }

};

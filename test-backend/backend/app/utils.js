const checkDuplicate = (table, query) => {
  const prom = new Promise((resolve, reject) => {
    table
      .findOne({ where: query })
      .then((res) => {
        if (!res) resolve(false);
        else resolve(true);
      })
      .catch((e) => reject(e));
  });

  return prom;
};

module.exports = { checkDuplicate };

module.exports = (sequelize, Sequelize) => {
    const Testing = sequelize.define("testing", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Testing;
};
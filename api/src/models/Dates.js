const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('dates', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          day: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          time:{
            type: DataTypes.STRING,
            allowNull:true,
           
          },
          email: {
            type: DataTypes.STRING,
            allowNull:true
          },
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          }
      
    })
}
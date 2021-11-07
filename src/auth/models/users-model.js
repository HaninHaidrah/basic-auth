'use strict';


const users =(sequelize,DataTypes)=>{
    sequelize.define('User', {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      });
} 

  module.exports=users;

  
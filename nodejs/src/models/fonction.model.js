module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Fonction', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom:{
            type: DataTypes.STRING,
            allowNull: false
        },
        commentaires:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Conge', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date_start:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        date_end:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        nb_day:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        personneId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    })
}
module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpires: DataTypes.DATE
    });
    return Users;
};
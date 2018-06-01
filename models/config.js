module.exports = function(sequelize, DataTypes) {
    const Config = sequelize.define("config", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        collection_time_modifier: {
            type: DataTypes.INTEGER,
            defaultValue: 5000
        },
        experience_growth_modifier: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        dirt_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        rock_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 10000
        },
        steel_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 20000
        },
        worm_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        fish_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 1000
        },
        shark_trade_cost: {
            type: DataTypes.INTEGER,
            defaultValue: 2000
        },
        dirt_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 2
        },
        rock_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 6
        },
        steel_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 12
        },
        worm_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        fish_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        shark_resource_difficulty_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 6
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            references: {
                model: "users",
                key: "id"
            }
        }
    });
    return Config;
};
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: 'contact'
})
export class Contacts extends Model{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!:String

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: String

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phone!: String

}
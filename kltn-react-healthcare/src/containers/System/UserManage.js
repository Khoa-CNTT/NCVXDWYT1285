import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import './UserManage.scss'
import ModalUser from './ModalUser'
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';


class UserManage extends Component {

    constructor(props) {
        super([props])
        this.state = {
            arrUsers: [],
            isOpenModalusers: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        console.log('data', response)
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalusers: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalusers: !this.state.isOpenModalusers,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalusers: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            console.log('hehe', user)
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log(user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try{
            let res = await editUserService(user)
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }else {
                alert(res.errCode)
            }
        }catch (e) {
            console.log(e)
        }
    }

    // Life cycle
    // Run component
    // 1. run construction -> init state
    // 2. did mount (set state)
    // 3. render

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <div className='title text-center'>Manage Users</div>
                <div className='mx-1'>
                    <button onClick={() => this.handleAddNewUser()} className='btn btn-primary px-3'><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className='users-table mt-4 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {
                            arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                                onClick={() => this.handleEditUser(item)}
                                            className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }




                    </table>
                </div>
                <ModalUser
                    isOpen={this.state.isOpenModalusers}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenModalEditUser &&
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleUserEditModal}
                    editUser={this.doEditUser}
                    currentUser={this.state.userEdit}
                />
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps, createNewUserService)(UserManage);

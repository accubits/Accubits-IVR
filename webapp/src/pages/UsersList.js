import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { connect } from 'react-redux'
import { userLogin, listUsers } from './../actions/user'

const columns = [
   
    {
        title: 'Name',
        dataIndex: 'firstName',
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '20%',
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNo',
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'emailId',
        sorter: true,
        // render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
      {
        title: 'Is Active',
        dataIndex: 'isActive',
        render: isActive => isActive? 'Active':'Inactive',
    },
    // {
    //     title: 'Username',
    //     dataIndex: 'username',
    // },
    // {
    //     title: 'Is Active',
    //     dataIndex: 'id',
    //     render: name => 'Available',
    // },
];


class UsersList extends Component {
    state = {
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.props.listUsers();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.props.listUsers({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={this.props.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}


const mapStateToProps = (state) => ({
    data:state.users
})

const mapDispatchToProps = {
listUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)

import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: true,
        // render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '20%',
    },
    {
        title: 'Username',
        dataIndex: 'username',
    },
    {
        title: 'Is Active',
        dataIndex: 'id',
        render: name => 'Available',
    },
];


export default class UsersList extends Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        axios.get('https://jsonplaceholder.typicode.com/users',
            {
                results: 10,
                ...params,
            }).then(response => {
                const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = 200;
                this.setState({
                    loading: false,
                    data: response.data,
                    pagination,
                });
            });
    };

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

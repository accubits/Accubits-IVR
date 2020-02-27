import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';

import { connect } from 'react-redux'
import { listNumbers } from './../actions/numbers'


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '10%',
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNo',
    },
    {
        title: 'IVR',
        dataIndex: 'ivr',
        render: ivr => ivr? 'Enabled':'Disabled',
    },
    {
        title: 'IVR Message',
        dataIndex: 'ivrMessage',
    },
    {
        title: 'Is Active',
        dataIndex: 'isActive',
        width: '10%',
        render: isActive => isActive? 'Active':'Inactive',
    },
];


 class NumbersList extends Component {
    state = {
        pagination: {},
        loading: false,
    };

    componentDidMount() {
       this.props.listNumbers();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.props.listNumbers({
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
    data:state.numbers
})

const mapDispatchToProps = {
    listNumbers
}

export default connect(mapStateToProps, mapDispatchToProps)(NumbersList)

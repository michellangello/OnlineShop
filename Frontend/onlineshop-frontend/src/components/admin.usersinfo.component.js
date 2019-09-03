import React, { Component, useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { getUsers, getRoles } from '../services/user.service'

export default function MaterialTableDemo() {

    return (
        <MaterialTable
            title="Remote Data Preview"
            columns={[
                { title: 'Firstname', field: 'firstname' },
                { title: 'Secondname', field: 'secondname' },
                { title: 'Email', field: 'email', type: 'email' },
                {
                    title: 'Role',
                    field: 'role._id',
                    lookup: getRoles()
                },

            ]}

            data={async query => await getUsers(query)}
        />
    );
}


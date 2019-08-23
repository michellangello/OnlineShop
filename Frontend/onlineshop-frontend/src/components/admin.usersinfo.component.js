import React, { Component, useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { getUsers, getRoles } from '../services/user.service'

export default function MaterialTableDemo() {

    const [responseData, setResponseData] = useState({
        data: [],
        page: 0,
        totalCount: 0
    });

    const [dataQuery, setDataQuery] = useState("");

    useEffect(() => {
        getUsers(dataQuery).then(on => {
            setResponseData(on);
        });

        return responseData;
    }, [dataQuery])


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

            // other props
            data={query => getUsers(query).then(response => {
                setResponseData(response);
                return response;
            })}

            editable={{
                onRowAdd: newData => {
                    console.log(newData);
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            //   const data = [...state.data];
                            // data.push(newData);
                            //setState({ ...state, data });
                        }, 600);
                    })
                },
                onRowUpdate: (newData, oldData) => {
                     const data = responseData;
                     const index = data.indexOf(oldData);
                     data[index] = newData;
                     console.log(newData);
                     //this.setState({ data }, () => resolve());
                    // console.log(oldData);
                    // console.log(newData);
                },
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            //const data = [...state.data];
                            //data.splice(data.indexOf(oldData), 1);
                            //setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}


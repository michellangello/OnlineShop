// import React, { Component, useState, useEffect } from "react";
// import MaterialTable from 'material-table';
// import { getUsers, getRoles } from '../services/user.service'

// export default function MaterialTableDemo() {
//     const emptyResponse = {
//         isLoaded: false,
//         users:
//         {
//             data: [],
//             page: 0,
//             totalCount: 0
//         }
        
//     };

//     const [response, setResponse] = useState(emptyResponse);
//     const [query, setQuery] = useState(null);

//     useEffect(() => {
//         console.log('dataQuery');

//         console.log(dataQuery);
//     }, [isLoaded, setDataQuery])

//     async function getUserData(query) {
//         setDataQuery(query);
//         setResponseData(await getUsers(query));
//         setIsLoaded(true);
//         return;
//     }


//     return (
//         <MaterialTable
//             title="Remote Data Preview"
//             columns={[
//                 { title: 'Firstname', field: 'firstname' },
//                 { title: 'Secondname', field: 'secondname' },
//                 { title: 'Email', field: 'email', type: 'email' },
//                 {
//                     title: 'Role',
//                     field: 'role._id',
//                     lookup: getRoles()
//                 },

//             ]}

//             data={async query => await getUsers(query)}

//             editable={{
//                 onRowAdd: newData => {
//                    // console.log(newData);
//                     new Promise(resolve => {
//                         setTimeout(() => {
//                             resolve();
//                             //   const data = [...state.data];
//                             // data.push(newData);
//                             //setState({ ...state, data });
//                         }, 600);
//                     })
//                 },
//                 onRowUpdate: (newData, oldData) => {
//                     const data = responseData;
//                     const index = data.indexOf(oldData);
//                     data[index] = newData;
//                     console.log(newData);
//                     //this.setState({ data }, () => resolve());
//                     // console.log(oldData);
//                     // console.log(newData);
//                 },
//                 onRowDelete: oldData =>
//                     new Promise(resolve => {
//                         setTimeout(() => {
//                             resolve();
//                             //const data = [...state.data];
//                             //data.splice(data.indexOf(oldData), 1);
//                             //setState({ ...state, data });
//                         }, 600);
//                     }),
//             }}
//         />
//     );
// }


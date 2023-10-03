import Avatar from "@mui/material/Avatar";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const approvalColumns = [
  {
    field: "srNo",
    headerName: "Sr.No",
    align: "center",
    width: 50,
    // valueGetter: (params) => params["srNo"],
  },
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return params.row.visitor?.image ? (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`data:image/jpeg;base64,${params.row.visitor?.image}`}
            alt="avatar"
          />
          {params.row.visitor.name}
        </div>
      ) : null;
    },
  },
  {
    field: "appointDate",
    headerName: "Date",
    width: 120,
  },

  {
    field: "hostName",
    headerName: "Host Name",
    width: 160,
  },
  {
    field: "purpose",
    headerName: "Purpose",
    width: 160,
  },
  {
    field: "aprooval",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`approvalCell ${params.row.aprooval}`}>
          {params.row.aprooval.toUpperCase()}
        </div>
      );
    },
  },
];

export const visitorColumns = [
  {
    field: "srNo",
    headerName: "Sr.No",
    // valueGetter: (params) => params["srNo"],
  },
  {
    field: "id",
    headerName: "ID",
    // valueGetter: (params) => params["srNo"],
  },
  {
    field: "image",
    headerName: "Profile",
    // width: 120,
    // flex: 1,
    align: "center",
    renderCell: (params) => {
      return params.row.image ? (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`data:image/jpeg;base64,${params.row.image}`}
            alt="avatar"
          />
          {params.row.username}
        </div>
      ) : null;
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "number",
    headerName: "Number",
    type: "number",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
];

export const staffColumns = [
  {
    field: "srNo",
    headerName: "Sr.No",
    align: "center",
    // valueGetter: (params) => params["srNo"],
  },
  { field: "id", headerName: "ID" },
  {
    field: "firstName",
    headerName: " Name",
    width: 180,
    cellClassName: "name-column--cell",

    valueGetter: (params) => {
      let firstName =
        params.row.firstName.charAt(0).toUpperCase() +
        params.row.firstName.substring(1, params.row.firstName.length);

      let LastName =
        params.row.lastName.charAt(0).toUpperCase() +
        params.row.lastName.substring(1, params.row.lastName.length);

      return `${firstName} ${LastName}`;
    },
  },

  {
    field: "mobileno",
    headerName: "Phone Number",

    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,

    width: 200,
  },
  {
    field: "ole",
    headerName: "Role",
    align: "center",
    // flex: 1,
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

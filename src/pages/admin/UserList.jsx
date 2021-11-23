import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../api/apiCall";
import { IconButton } from "@material-ui/core";
import useAxios from "../../hooks/useAxios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  DeleteOutline,
  CheckCircleRounded,
  CancelRounded,
} from "@material-ui/icons";

const UserItem = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserItemEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const UserItemDeleteButton = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const UserList = () => {
  const { users, totalPages, isFetching } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [api] = useAxios();

  useEffect(() => {
    getUsers(api, page + 1, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch]);

  const handleDelete = (id) => {
    deleteUser(api, id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "User",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserItem>
            <UserImage src={params.row.image} alt="" />
            {params.row.username}
          </UserItem>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 140,
      renderCell: (params) => {
        return params.row.isAdmin ? (
          <CheckCircleRounded style={{ color: "green" }} />
        ) : (
          <CancelRounded style={{ color: "red" }} />
        );
      },
    },
    {
      field: "confirmed",
      headerName: "Email Confirmed",
      width: 140,
      renderCell: (params) => {
        return params.row.confirmed ? (
          <CheckCircleRounded style={{ color: "green" }} />
        ) : (
          <CancelRounded style={{ color: "red" }} />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/users/" + params.row.id}>
              <UserItemEditButton>Edit</UserItemEditButton>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <UserItemDeleteButton />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ height: 640, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowCount={totalPages * 10}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          loading={isFetching}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserList;

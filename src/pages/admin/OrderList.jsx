import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import DashboardLayout from "../../layout/DashboardLayout";

const Orders = () => {
  const [values, setValues] = useState({
    orders: [],
    totalPages: 1,
  });
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [api] = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      setIsFetching(true);
      const response = await api.get(`/orders?page${page + 1}`);
      setIsFetching(false);
      setValues(response.data);
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "user",
      headerName: "User ID",
      width: 200,
    },
    {
      field: "country",
      headerName: "Country",
      width: 140,
      renderCell: (params) => {
        return params.row.address.country;
      },
    },
    {
      field: "city",
      headerName: "City",
      width: 140,
      renderCell: (params) => {
        return params.row.address.city;
      },
    },
    {
      field: "line1",
      headerName: "Line 1",
      width: 250,
      renderCell: (params) => {
        return params.row.address.line1;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/orders/" + params.row._id}>Edit</Link>
          </>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ height: 640, width: "100%" }}>
        <DataGrid
          rows={values.orders}
          columns={columns}
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowCount={values.totalPages * 10}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          loading={isFetching}
          getRowId={(row) => row._id}
          onRowClick={(row) => navigate("/dashboard/orders/" + row.id)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Orders;

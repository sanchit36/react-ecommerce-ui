import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styled from "styled-components";
import DataListItem from "../../components/DataListItem";
import { useGetProductsQuery } from "../../services/product";
import { deleteProduct } from "../../api/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { getProductSuccess } from "../../redux/productReducer";

const ListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductList = () => {
  const products = useSelector((state) => state.product.products) || [];
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useGetProductsQuery(page + 1);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
    dispatch(getProductSuccess(data));
  }, [data, dispatch]);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Some error occurred</h1>;

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <DataListItem title={params.row.title} image={params.row.image} />
        );
      },
    },
    {
      field: "description",
      headerName: "description",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.row.id}`}>
              <ListEdit>Edit</ListEdit>
            </Link>
            <DeleteOutline
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <DataGrid
        rowCount={100}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        rows={products}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        pagination
        loading={isLoading}
        checkboxSelection
        disableSelectionOnClick
      />
    </DashboardLayout>
  );
};

export default ProductList;

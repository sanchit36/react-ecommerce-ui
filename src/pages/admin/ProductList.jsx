import { useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { deleteProduct, getProducts } from "../../api/apiCall";
import { useDispatch, useSelector } from "react-redux";

import useQuery from "../../hooks/useQuery";
import DataList from "../../components/DataList";

const ProductList = () => {
  const { products, hasNext, hasPrev, isFetching, error } = useSelector(
    (state) => state.product
  );

  const query = useQuery();
  const page = Number(query.get("page") || 1);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(page, dispatch);
  }, [page, dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  return (
    <DashboardLayout>
      {isFetching && <h4>loading...</h4>}
      {error && <h4>Some error occurred</h4>}
      {!isFetching && !error && (
        <DataList
          item="products"
          data={products}
          handleDelete={handleDelete}
          handleClick={(navigate, item) =>
            navigate(`/dashboard/products/${item.id}`, {
              state: { data: item },
            })
          }
          page={page}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </DashboardLayout>
  );
};

export default ProductList;

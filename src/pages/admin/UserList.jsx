import { useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { deleteUser, getUsers } from "../../api/apiCall";
import DataList from "../../components/DataList";
import { Typography } from "@material-ui/core";

const UserList = () => {
  const { users, hasNext, hasPrev, isFetching, error } = useSelector(
    (state) => state.user
  );
  const query = useQuery();
  const page = Number(query.get("page") || 1);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers(page, dispatch);
  }, [page, dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  return (
    <DashboardLayout>
      {isFetching && <Typography variant="h5">loading...</Typography>}
      {error && <Typography variant="h5">Some error occurred</Typography>}
      {!isFetching && !error && (
        <DataList
          item="users"
          data={users}
          handleDelete={handleDelete}
          handleClick={(navigate, item) =>
            navigate(`/dashboard/users/${item.id}`, {
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

export default UserList;

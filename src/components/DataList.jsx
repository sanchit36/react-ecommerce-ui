import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const DataList = ({
  item,
  data,
  handleDelete,
  handleClick,
  page,
  hasPrev,
  hasNext,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <List>
            {data?.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleClick(navigate, item)}
                style={{ cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title || item.username}
                  secondary={item.id}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleClick(navigate, item)}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Pagination
            page={page}
            hasNext={hasNext}
            hasPrev={hasPrev}
            url={`/dashboard/${item}`}
          />
        </>
      ) : (
        <Typography variant="h5">No Data To Show</Typography>
      )}
    </>
  );
};

export default DataList;

import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router";

const Pagination = ({ page, url, hasNext, hasPrev }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {hasPrev && (
        <IconButton
          aria-label="previous-page"
          onClick={() => navigate(`${url}?page=${page - 1}`)}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      {hasNext && (
        <IconButton
          aria-label="next-page"
          onClick={() => navigate(`${url}?page=${page + 1}`)}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </div>
  );
};

export default Pagination;

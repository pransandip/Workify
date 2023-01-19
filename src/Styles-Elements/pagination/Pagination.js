import React from "react";
import { styled } from "@mui/material/styles";
import usePagination from "@mui/material/usePagination";

import "./Pagination.scss";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

function Pagination(props) {
  const { items } = usePagination({
    count: 1,
  });
  return (
    <nav className={"pagination"}>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            {
              /* commenting prev next for now */
            }
            children = (
              <button type="button" {...item}>
                {/* {type} */}
              </button>
            );
          }
          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}

export default Pagination;

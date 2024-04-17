// Pagination.js
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ totalPages, currentPage, paginate, setCurrentPage }) => (
  <ButtonGroup isAttached variant="outline">
    <Button
      onClick={() => setCurrentPage(currentPage - 1)}
      className="btn"
      disabled={currentPage === 1 ? "disabled" : null}
    >
      Previous
    </Button>
    {[...Array(totalPages).keys()].map((number) => (
      <Button
        key={number}
        variant={currentPage === number + 1 ? "solid" : "outline"}
        onClick={() => paginate(number + 1)}
      >
        {number + 1}
      </Button>
    ))}
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className="btn"
      disabled={currentPage === totalPages ? "disabled" : null}
    >
      Next
    </button>
  </ButtonGroup>
);

export default Pagination;

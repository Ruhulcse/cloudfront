import React from "react";
import { Link } from "react-router-dom";

export default function Paginate({ pager }) {
  return (
    <>
      <div className="card-footer pb-0 pt-3">
        {pager.pages && pager.pages.length && (
          <ul className="pagination justify-content-end">
            <li
              className={`page-item first-item ${
                pager.currentPage === 1 ? "disabled" : ""
              }`}
            >
              <Link to={{ search: `?page=1` }} className="page-link">
                First
              </Link>
            </li>
            <li
              className={`page-item previous-item ${
                pager.currentPage === 1 ? "disabled" : ""
              }`}
            >
              <Link
                to={{ search: `?page=${pager.currentPage - 1}` }}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            {pager.pages.map((page) => (
              <li
                key={page}
                className={`page-item number-item ${
                  pager.currentPage === page ? "active" : ""
                }`}
              >
                <Link to={{ search: `?page=${page}` }} className="page-link">
                  {page}
                </Link>
              </li>
            ))}
            <li
              className={`page-item next-item ${
                pager.currentPage === pager.totalPages ? "disabled" : ""
              }`}
            >
              <Link
                to={{ search: `?page=${pager.currentPage + 1}` }}
                className="page-link"
              >
                Next
              </Link>
            </li>
            <li
              className={`page-item last-item ${
                pager.currentPage === pager.totalPages ? "disabled" : ""
              }`}
            >
              <Link
                to={{ search: `?page=${pager.totalPages}` }}
                className="page-link"
              >
                Last
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
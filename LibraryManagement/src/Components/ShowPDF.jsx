import React, { useState } from 'react'
import { Document, Page } from 'react-pdf';
// import pdf from '../assets/pride-and-prejudice-jane-austen.pdf'
import { useParams } from 'react-router-dom';
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

export const ShowPDF = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  let urlpdf="http://localhost:8181/uploads/books/pdfs/Book_ISBN_3321.pdf";

  let {id} = useParams();
  console.log("ID : "+id);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => setPageNumber(prev => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () => setPageNumber(prev => (prev < numPages ? prev + 1 : prev));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="rounded shadow-sm w-75 mx-auto bg-light my-5">
      

      <div className="w-100  mx-auto d-flex flex-column justify-content-center align-items-center">
        <Document 
          file={urlpdf} 
          onLoadSuccess={onDocumentLoadSuccess} 
          className="d-inline-block "
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            className="bg-light border mx-auto rounded shadow-sm show-pdf-page "
          />
        </Document>
      </div>


      <div className='d-flex justify-content-between align-items-center mx-auto container py-3'>
        {/* <div> */}
          <button 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1} 
            className="btn btn-primary btn-sm me-2"
            title="Previous Page"
          >
            &laquo; Prev
          </button>
        {/* </div> */}

        <div className="fw-semibold">
          Page {pageNumber} of {numPages || '--'}
        </div>
          <button 
            onClick={goToNextPage} 
            disabled={pageNumber >= numPages} 
            className="btn btn-primary btn-sm"
            title="Next Page"
          >
            Next &raquo;
          </button>

        {/* <div> */}
            {/* <button 
                onClick={zoomOut} 
                className="btn btn-outline-secondary btn-sm me-2"
                title="Zoom Out"
            >
                &#8722;
            </button>
            <button 
                onClick={zoomIn} 
                className="btn btn-outline-secondary btn-sm"
                title="Zoom In"
            >
                &#43;
            </button> */}
        {/* </div> */}
      </div>

      
    </div>
  )
}

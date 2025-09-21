export default function PaginationControls(props) {
    const {page, setPage, contactsCount, setContactsCount} = props;
    
    return (
        <div className="d-flex justify-content-center align-items-center row mb-3">
            <div className="col-md-6">
                <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={page===1}>{"<"}</button>
                <span> Page: {page} </span>
                <button className="btn btn-primary" onClick={() => setPage(page + 1)}>{">"}</button>
            </div>
            <div className="col-md-6">
                <strong><label htmlFor="count"> Contacts per page: </label></strong>
                <select id="count" value={contactsCount} style={{ width: '80px', marginLeft: '10px' }} onChange={(e) => setContactsCount(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
}
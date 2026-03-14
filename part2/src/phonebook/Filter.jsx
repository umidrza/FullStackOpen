
const Filter = ({filterValue, handlefilterChange}) => {

    return (
        <div>
            <p>filter shown with</p>
            <input value={filterValue} onChange={handlefilterChange} />
        </div>
    )
}

export default Filter
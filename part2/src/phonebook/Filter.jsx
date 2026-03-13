
const Filter = ({handlefilterChange}) => {

    return (
        <div>
            <p>filter shown with</p>
            <input onChange={handlefilterChange} />
        </div>
    )
}

export default Filter
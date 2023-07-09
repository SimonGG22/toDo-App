import './index.scss'

function TodosLoading () {
    return (
        <div className='loading-skeleton-container'>
            <span className='loading-icon' />
            <span className='loading-text'></span>
            <div className='icons-container'>
                <span className='loading-icon' />
                <span className='loading-icon' />
            </div>
        </div>
    )
}

export { TodosLoading }
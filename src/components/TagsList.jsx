const TagsList = ({ tags, screen }) => {
    return (
        <div class="tags-container">
            <div class="tags-container__tags">
                <span>All</span>

                {tags.length && tags.map(({ tag, active }) => (<span key={tag + '_1'} className={active && ('active')}>{tag}</span>))}

            </div>
            <div class="icon" onClick={screen}>
                <svg>
                    <use xlinkHref="#setup-icon-48x48"></use>
                </svg>
            </div>
        </div>
    )
};

export default TagsList;
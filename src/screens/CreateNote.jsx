import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCreateClickedTag, createNoteBodyValue, createNoteTagsValue, saveCreateNote, setCreateNoteValues, warningMessage } from "../redux/actions";

const EditNote = ({ createScreen }) => {

    const { tagsInputValue, bodyInputValue, availableTags } = useSelector(state => state.app.createNote);
    const warning = useSelector(state => state.app.warning);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCreateNoteValues())
    }, [])

    // Обработка выбора тэга по клику
    const tagClickHandler = (tag) => {
        dispatch(addCreateClickedTag(tag))
    }

    // Обработка ввода тэгов в инпут
    const tagsInputHandler = (event) => {
        const value = event.target.value;
        dispatch(createNoteTagsValue(value));
    }

    // Обработка ввода тела заметки в инпут
    const bodyInputHandler = (event) => {
        const value = event.target.value;
        dispatch(createNoteBodyValue(value));
    }

    // Хендлер кнопки сохранения отредактированной заметки с проверкой на пустой ввод
    const clickSaveHandler = () => {
        if(bodyInputValue) {
            dispatch(saveCreateNote(tagsInputValue, bodyInputValue));
            createScreen();
        } else {
            dispatch(warningMessage())
        }        
    }

    return (
        <>
            <div className="tags-h2">
                <h2>Create Note</h2>
                {/* Вернуться на главную */}
                <div className="icon" onClick={ () => createScreen() } data-testid='exit-svg'>
                    <svg>
                        <use xlinkHref="#exit-icon-48x48"></use>
                    </svg>
                </div> 
            </div>      
            <div className="notes__note add">
                <div className="notes__note-info">
                    <div className="tags-container">
                        <div className="tags-container__tags">
                            {/* Список доступных тэгов */}
                            { availableTags.map(( tag ) => (<span 
                                key={ tag + '_1' } 
                                data-testid="span"
                                onClick={ () => tagClickHandler(tag) }
                            >{ tag }</span>)) }

                        </div>
                    </div>
                    {/* Инпут тэгов */}
                    <input 
                        type="text" 
                        className="tag-input"
                        placeholder="type tags here or click above" 
                        data-testid="tags-input" 
                        value={ tagsInputValue }
                        onChange={ (event) => tagsInputHandler(event) }
                    ></input>
                    {/* Инпут тела заметки */}
                    <textarea 
                        type="text" 
                        placeholder="type note here" 
                        data-testid="body-input" 
                        value={ bodyInputValue }
                        onChange={ (event) => bodyInputHandler(event) }
                        style={ warning === true ? { border: '2px solid #f36244' } : { border: '2px solid #f404040' } }
                    ></textarea>
                    <div className="add-note">
                        {/* Кнопка сохранения заметки заметки */}
                        <div className="icon" onClick={ () => clickSaveHandler() }>
                            <svg data-testid="svg-save">
                                <use xlinkHref="#save-icon-48x48"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default EditNote;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEditClickedTag, editNoteBodyValue, editNoteTagsValue, saveEditNote, setEditNoteValues, warningMessage } from "../redux/actions";

const EditNote = ({ editScreen }) => {

    const { tagsInputValue, bodyInputValue, availableTags } = useSelector(state => state.app.editNote);
    const warning = useSelector(state => state.app.warning);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setEditNoteValues())
    }, [])

    // Обработка выбора тэга по клику
    const tagClickHandler = (tag) => {
        dispatch(addEditClickedTag(tag))
    }

    // Обработка ввода тэгов в инпут
    const tagsInputHandler = (event) => {
        const value = event.target.value;
        dispatch(editNoteTagsValue(value));
    }

    // Обработка ввода тела заметки в инпут
    const bodyInputHandler = (event) => {
        const value = event.target.value;
        dispatch(editNoteBodyValue(value));
    }

    // Хендлер кнопки сохранения отредактированной заметки с проверкой на пустой ввод
    const clickSaveHandler = () => {
        if(bodyInputValue) {
            dispatch(saveEditNote(tagsInputValue, bodyInputValue));
            editScreen();
        } else {
            dispatch(warningMessage())
        }        
    }

    return (
        <>
            <div className="tags-h2">
                <h2>Edit Note</h2>
                {/* Вернуться на главную */}
                <div className="icon" onClick={ () => clickSaveHandler() } data-testid='exit-svg'>
                    <svg>
                        <use xlinkHref="#exit-icon-48x48"></use>
                    </svg>
                </div> 
            </div>        
            <div className="notes__note add ">
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
                        placeholder="tags" 
                        data-testid="tags-input" 
                        value={ tagsInputValue }
                        onChange={ (event) => tagsInputHandler(event) }
                    ></input>
                    {/* Инпут тела заметки */}
                    <textarea 
                        type="text" 
                        placeholder="body" 
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
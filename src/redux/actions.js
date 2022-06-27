import { DELETE_TAG, 
        SAVE_EDIT_NOTE, 
        EDIT_NOTE_BODY_VALUE, 
        EDIT_NOTE_TAGS_VALUE, 
        HIDE_WARNING, 
        SAVE_TAG, 
        SET_EDIT_NOTE, 
        SET_EDIT_NOTE_VALUES, 
        SHOW_WARNING, 
        TAG_SETUP_INPUT_VALUE, 
        DELETE_NOTE, 
        ADD_EDIT_CLICKED_TAG, 
        SET_CREATE_NOTE_VALUES,
        CREATE_NOTE_TAGS_VALUE,
        CREATE_NOTE_BODY_VALUE,
        ADD_CREATE_CLICKED_TAG,
        SAVE_CREATE_NOTE,
        SET_TAG_ACTIVE,
        SET_NOTES_ACTIVE,
        CLEAR_ACTIVE_TAGS} from "./constants"

// Обработка инпута страницы настройки тэгов
export const tagSetupInputValue = (value) => {
    return {
        type: TAG_SETUP_INPUT_VALUE,
        payload: value
    }
}

// Сохранение нового тега из инпута страницы настройки тегов
export const saveTag = () => {
    return {
        type: SAVE_TAG
    }
}

// Показ красной рамки вокруг инпута
export const showWarning = () => {
    return {
        type: SHOW_WARNING
    }
}

// Сокрытие красной рамки вокруг инпута
export const hideWarning = () => {
    return {
        type: HIDE_WARNING
    }
}

// Активация показа красной рамки вокруг инпута
export const warningMessage = () => {
    return dispatch => {
        dispatch(showWarning());
        setTimeout(() => {
            dispatch(hideWarning());
        }, 1500)
    }
}

// Удаление тэга на странице редактирования тэгов
export const deleteTag = (index) => {
    return {
        type: DELETE_TAG,
        payload: index
    }
}

// Настройка в сторе заметки для редактирования
export const setEditNote = (id) => {
    return {
        type: SET_EDIT_NOTE,
        payload: id
    }
}

// Парсинг содержимого инпутов страницы редактирования заметки
export const setEditNoteValues = (id) => {
    return {
        type: SET_EDIT_NOTE_VALUES,
    }
}

// Обработка инпута ввода тегов заметки при редактировании заметки
export const editNoteTagsValue = (value) => {
    return {
        type: EDIT_NOTE_TAGS_VALUE,
        payload: value
    }
}

// Обработка инпута ввода тела заметки при редактировании заметки
export const editNoteBodyValue = (value) => {
    return {
        type: EDIT_NOTE_BODY_VALUE,
        payload: value
    }
}

// Обработка тэга, выбранного по клику на странице редактирования заметки
export const addEditClickedTag = (tag) => {
    return {
        type: ADD_EDIT_CLICKED_TAG,
        payload: tag
    }
}

// Сохранение отредактированной заметки
export const saveEditNote = (tags,body) => {
    return {
        type: SAVE_EDIT_NOTE,
        payload: getTags(tags,body),
    }
}

// Удаление заметки
export const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}

// Настройка новой заметки перед её редактированием
export const setCreateNoteValues = () => {
    return {
        type: SET_CREATE_NOTE_VALUES,
    }
}

// Обработка инпута ввода тэгов страницы создания заметки
export const createNoteTagsValue = (value) => {
    return {
        type: CREATE_NOTE_TAGS_VALUE,
        payload: value
    }
}

// Обработка инпута ввода тела заметки страницы создания заметки
export const createNoteBodyValue = (value) => {
    return {
        type: CREATE_NOTE_BODY_VALUE,
        payload: value
    }
}

// Обработка тэга, выбранного по клику на странице создания заметки
export const addCreateClickedTag = (tag) => {
    return {
        type: ADD_CREATE_CLICKED_TAG,
        payload: tag
    }
}

// Сохранение новой заметки
export const saveCreateNote = (tags,body) => {
    return dispatch => {
        dispatch({
            type: SAVE_CREATE_NOTE,
            payload: getTags(tags,body)
        });
        dispatch({ type: SET_NOTES_ACTIVE })
    }
}

// Сортировка по тэгам по нажатию на кнопки тэгов 
export const setTagActive = (tag) => {
    return dispatch => {
        dispatch({
            type: SET_TAG_ACTIVE,
            payload: tag
        });
        dispatch({ type: SET_NOTES_ACTIVE })
    }
}

// Показ всех заметок по нажатию на кнопку "All"
export const clearActiveTags = () => {
    return {
        type: CLEAR_ACTIVE_TAGS
    }
}

// в данной функции получаем массив из тэгов заметки (если ни одного тэга не оказалось, возвращаем пустой массив)
const getTags = (tags, body) => {
    // Получаем список тэгов из инпута тэгов, очищая их от хэштегов
    const tagsArr = tags ? tags.split(',').map(item => item.replace(/[^a-zа-яё]/gi, '')).filter(item => item !== '') : null;
    // Получаем список тэгов из инпута тела заметки, очищая их от хэштегов
    const bodyTagsArr = body.match(/\B(#[a-zа-яё0-9]+)(\s|\!|\?|\.|\,|\]|$)/ig)
        ? body.match(/\B(#[a-zа-яё0-9]+)(\s|\!|\?|\.|\,|\]|$)/ig).map(item => item.replace(/[^a-zа-яё]/gi, '')).filter(item => item !== '') 
        : null;

    if(!tagsArr && bodyTagsArr) {
        return [...new Set(bodyTagsArr)]
    }
    if(tagsArr && !bodyTagsArr) {
        return [...new Set(tagsArr)]
    }
    if(!tagsArr && !bodyTagsArr) {
        return []
    }
    return [...new Set(tagsArr.concat(bodyTagsArr))]
}
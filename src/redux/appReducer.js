import { 
    ADD_CREATE_CLICKED_TAG,
    ADD_EDIT_CLICKED_TAG,
    CLEAR_ACTIVE_TAGS,
    CREATE_NOTE_BODY_VALUE,
    CREATE_NOTE_TAGS_VALUE,
    DELETE_NOTE, 
    DELETE_TAG, 
    EDIT_NOTE_BODY_VALUE, 
    EDIT_NOTE_TAGS_VALUE, 
    HIDE_WARNING, 
    SAVE_CREATE_NOTE,
    SAVE_EDIT_NOTE, 
    SAVE_TAG, 
    SET_CREATE_NOTE_VALUES, 
    SET_EDIT_NOTE, 
    SET_EDIT_NOTE_VALUES, 
    SET_NOTES_ACTIVE, 
    SET_TAG_ACTIVE, 
    SHOW_WARNING, 
    TAG_SETUP_INPUT_VALUE } from "./constants";

export const initialState = {
    notes: [ // Массив с заметками
        {
            id: 1,
            tags: ['tags'],
            body: 'Let consider why #tags are effective',
            active: true
        },
        {
            id: 2,
            tags: ['shopping'],
            body: 'Shopping at weekend market',
            active: true
        },
        {
            id: 3,
            tags: ['car', 'job'],
            body: 'Service the car',
            active: true
        },
    ],
    tags: [ // Массив с тэгами
        'tags',
        'shopping',
        'car',
        'job',
    ],
    activeTags: [], // Массив с тегами, выбранными при сортировке на экране Notes List
    activeNotes: [], // Массив с отсортированными заметками на экране Notes List
    tagInputValue: '', // Значение в инпуте на экране редактирования тэгов
    warning: false, // Нужно для показа красной рамки при пустом инпуте при пустом вводе
    editNote: { // для экрана Edit Note
        index: null, // индекс редактируемой заметки в массиве state.notes
        tagsInputValue: '', // Значение в инпуте тэгов
        tags: [], // Сюда запишутся тэги из заметки state.notes[index].tags при открытии экрана Edit Note
        availableTags: [], // Сюда запишутся оставшиеся тэги, которых нет в state.notes[index].tags
        bodyInputValue: '', // Значение в инпуте тела заметки
        body: '', // Сюда запишется содержимое из заметки state.notes[index].body при открытии экрана Edit Note
        active: true // активна ли для показа (зависит от сортировки на экране Notes List)
    },
    createNote: { // для экрана Create Note
        tagsInputValue: '', // Значение в инпуте тэгов
        tags: [], // Пустой при открытии экрана Create Note
        availableTags: [], // Сюда запишутся доступные тэги (для нового экрана все)
        bodyInputValue: '', // Значение в инпуте тела заметки
        body: '', // Пустой при открытии экрана Create Note
        active: true // активна ли для показа (зависит от сортировки на экране Notes List)
    }
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAG_SETUP_INPUT_VALUE:
            return {
                ...state,
                tagInputValue: action.payload
            }
        case SAVE_TAG:
            return {
                ...state,
                tags: [...state.tags, state.tagInputValue],
                tagInputValue: ''
            }
        case SHOW_WARNING:
            return {
                ...state,
                warning: true
            }
        case HIDE_WARNING:
            return {
                ...state,
                warning: false
            }
        case DELETE_TAG:
            return {
                ...state,
                tags: [...state.tags.filter(tag => tag !== action.payload)],
                notes: [...state.notes.map(item => ({
                    ...item, 
                    tags: item.tags.filter(tag => tag !== action.payload),
                    body: item.body.replace('#' + action.payload, action.payload)
                }))]
            }
        case SET_EDIT_NOTE:
            return {
                ...state,
                editNote: {
                    ...state.editNote, 
                    index: action.payload,
                    tags: state.notes[action.payload].tags, 
                    body: state.notes[action.payload].body,
                    active: state.notes[action.payload].active
                }
            }
        case SET_EDIT_NOTE_VALUES:
            return {
                ...state,
                editNote: {
                    ...state.editNote, 
                    tagsInputValue: state.editNote.tags && state.editNote.tags.map((tag, i) => i === (state.editNote.tags.length - 1) ? ('#' + tag) : ('#' + tag + ', ')).join(''),
                    bodyInputValue: state.editNote.body,
                    availableTags: [...new Set(state.tags)].filter(tag => state.editNote.tags.indexOf(tag) == -1)
                },
                notes: state.notes.filter((item, index) => index !== state.editNote.index)
            }
        case EDIT_NOTE_TAGS_VALUE:
            return {
                ...state,
                editNote: {
                    ...state.editNote, 
                    tagsInputValue: action.payload, 
                }
            }
        case EDIT_NOTE_BODY_VALUE:
            return {
                ...state,
                editNote: {
                    ...state.editNote, 
                    bodyInputValue: action.payload, 
                }
            }
        case ADD_EDIT_CLICKED_TAG:
            return {
                ...state,
                editNote: {
                    ...state.editNote,
                    tags: [...new Set([...state.editNote.tags, action.payload])],
                    
                    availableTags: state.editNote.availableTags.filter(tag => tag != action.payload),
                    tagsInputValue: state.editNote.tags && [...new Set([...state.editNote.tags, action.payload])].map((tag, i) => i === (state.editNote.tags.length) ? ('#' + tag) : ('#' + tag + ', ')).join(''),
                }
            }
        case SAVE_EDIT_NOTE:
            return {
                ...state,
                editNote: {
                    ...state.editNote,
                },
                notes: [...state.notes, {
                    tags: action.payload,
                    body: state.editNote.bodyInputValue,
                    id: state.editNote.index,
                    active: state.editNote.active
                }].sort((a,b) => a.id - b.id),
                tags: [...new Set(state.tags.concat(action.payload))]
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case SET_CREATE_NOTE_VALUES:
            return {
                ...state,
                createNote: {
                    ...state.createNote,
                    availableTags: [...state.tags],
                    active: state.editNote.active
                }
            }
        case CREATE_NOTE_TAGS_VALUE:
            return {
                ...state,
                createNote: {
                    ...state.createNote, 
                    tagsInputValue: action.payload, 
                }
            }
        case CREATE_NOTE_BODY_VALUE:
            return {
                ...state,
                createNote: {
                    ...state.createNote, 
                    bodyInputValue: action.payload, 
                }
            }
        case ADD_CREATE_CLICKED_TAG:
            return {
                ...state,
                createNote: {
                    ...state.createNote,
                    tags: [...new Set([...state.createNote.tags, action.payload])],
                    
                    availableTags: state.createNote.availableTags.filter(tag => tag != action.payload),
                    tagsInputValue: state.createNote.tags && [...new Set([...state.createNote.tags, action.payload])].map((tag, i) => i === (state.createNote.tags.length) ? ('#' + tag) : ('#' + tag + ', ')).join(''),
                }
            }
        case SAVE_CREATE_NOTE:
            return {
                ...state,
                createNote: {
                    ...state.createNote,
                    tagsInputValue: '',
                    tags: [],
                    availableTags: [],
                    bodyInputValue: '',
                    body: '',
                },
                notes: [...state.notes, {
                    tags: action.payload,
                    body: state.createNote.bodyInputValue,
                    id: Date.now(),
                }].sort((a,b) => a.id - b.id),
                tags: [...new Set(state.tags.concat(action.payload))]
            }
        case SET_TAG_ACTIVE:
            return {
                ...state,
                activeTags: state.activeTags.indexOf(action.payload) !== -1 
                    ? [...state.activeTags.filter(tag => tag != action.payload)] 
                    : [...state.activeTags, action.payload],
            }
        case SET_NOTES_ACTIVE:
            return {
                ...state,
                notes: state.activeTags.length 
                    ? state.notes.map(note => ({ ...note, active: note.tags.some(elem => state.activeTags.includes(elem)) }))
                    : state.notes.map(note => ({ ...note, active: true }))
            }
        case CLEAR_ACTIVE_TAGS:
            return {
                ...state,
                activeTags: [],
                notes: state.notes.map(note => ({ ...note, active: true }))
            }
        default: return state;
    }
}

export default appReducer;
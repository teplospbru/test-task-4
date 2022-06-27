import React from 'react';
import { render as rtlRender, screen, fireEvent, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import Store from './redux/store';
import App from './App'
import EditTags from './screens/EditTags';
import Notes from './screens/Notes';
import EditNote from './screens/EditNote';
import CreateNote from './screens/CreateNote'

const render = component => rtlRender(
    <Provider store={ Store }>
        { component }
    </Provider>
)

describe("App", () => {
    it('renders h1 coomponent', () => {
        render(<App />);
        
        expect(screen.getByText('Note App with Tags')).toBeInTheDocument();
    });
    it('renders Notes on load', () => {
        render(<App />)

        expect(screen.getByText('Notes List')).toBeInTheDocument();
        expect(screen.getByText('New Note')).toBeInTheDocument();
    });
})

describe('Notes', () => {
    it('renders h2 coomponent', () => {
        render(<Notes />);

        expect(screen.getByText('Notes List')).toBeInTheDocument();
        expect(screen.getByText('New Note')).toBeInTheDocument();
    });
    it("renders tags items (4 items)", () => {
        render(<Notes />);
        expect(screen.getAllByTestId('span').length).toBe(4);
    });
    it("changes tag color on hover", () => {
        render(<Notes />);
        fireEvent.mouseEnter(screen.getByText('car'))
        expect(screen.getByText('car')).toHaveStyle('backgroundColor: "#ffa61a"');
    });
    it("renders note items (3 items)", () => {
        render(<Notes />);

        const notes = screen.getByTestId("notes");
        expect(notes.getElementsByClassName('notes__note').length).toBe(3)
    });
    it("does'not render 'No Notes'", () => {
        render(<Notes />);
        expect(screen.queryByText('No Notes')).not.toBeInTheDocument();
    });
    it('filters notes by click on tag', () => {
        render(<Notes />)
        const tag = screen.getAllByTestId('span')[0] // #tags
        const notes = screen.getByTestId("notes");

        expect(notes.getElementsByClassName('notes__note').length).toBe(3)
        userEvent.click(tag)
        expect(notes.getElementsByClassName('notes__note').length).toBe(1)
    })
    it('show all notes by click on same tag again', () => {
        render(<Notes />)
        const tag = screen.getAllByTestId('span')[0] // #all
        const notes = screen.getByTestId("notes");

        expect(notes.getElementsByClassName('notes__note').length).toBe(1)
        userEvent.click(tag)
        expect(notes.getElementsByClassName('notes__note').length).toBe(3)
    })
    it('show all notes by click on all - tag', () => {
        render(<Notes />)
        const tag = screen.getAllByTestId('span')[2] // #all
        const all = screen.getByTestId('all-tags')
        const notes = screen.getByTestId("notes");

        userEvent.click(tag)
        expect(notes.getElementsByClassName('notes__note').length).toBe(1)
        userEvent.click(all)
        expect(notes.getElementsByClassName('notes__note').length).toBe(3)
    })
    it('renders input', () => {
        render(<Notes />);

        const inputBody = screen.getByTestId("body-input");
        expect(inputBody).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type note here')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type note here')).toHaveValue('');
    });
    it('renders alert on empty body input', () => {
        render(<Notes />);

        fireEvent.change(screen.getByTestId("body-input"), {target: {value: ''}})
        userEvent.click(screen.getByTestId('svg-save-simple'))
        expect(screen.getByTestId("body-input")).toHaveStyle('border: 2px solid #f36244');
    });
    it('creates new note from Notes List screen', async () => {
        render(<Notes />);

        fireEvent.change(screen.getByTestId("body-input"), {target: {value: 'Как сделать #svg спрайт'}})
        userEvent.click(screen.getByTestId('svg-save-simple'))
        expect(await screen.getByTestId("3-note")).toBeInTheDocument();
    });
})

describe('Tags', () => {
    it('renders h2 coomponent', () => {
        render(<EditTags />);
        
        expect(screen.getByText('Tags List')).toBeInTheDocument();
    });
    it('renders tags list', () => {
        render(<EditTags />);;
        expect(screen.getAllByTestId('tag-item')).toHaveLength(5);
    });
    it('renders input', () => {
        render(<EditTags />);

        const inputTag = screen.getByTestId("tags-input");
        expect(inputTag).toBeInTheDocument();
        expect(screen.getByPlaceholderText('tag')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('tag')).toHaveValue('');
    });
    it('renders input with right value', () => {
        render(<EditTags />);

        userEvent.type(screen.getByTestId("tags-input"), 'Aurora');
        expect(screen.getByDisplayValue('Aurora'));
    });
    it('renders alert on empty input', () => {
        render(<EditTags />);

        fireEvent.change(screen.getByTestId("tags-input"), {target: {value: ''}})
        userEvent.click(screen.getByTestId('svg-save'))
        expect(screen.getByTestId("tags-input")).toHaveStyle('border: 2px solid #f36244');
    });
    it('saves input and renders list with saved tag', () => {
        render(<EditTags />);

        userEvent.type(screen.getByTestId("tags-input"), 'Aurora');
        userEvent.click(screen.getByTestId('svg-save'))
        expect(screen.getByText('Aurora'));
    });
    it('delete tag from list on click delete icon', () => {
        render(<EditTags />);

        userEvent.click(screen.getByTestId("job-delete"));
        expect(screen.queryByText('job')).toBeNull();
    });
})

describe('EditNote', () => {
    it('renders h2 coomponent', () => {
        render(<EditNote />);
        //screen.debug();
        expect(screen.queryByText('Edit Note')).toBeInTheDocument();
    });
    it('renders tags input', () => {
        render(<EditNote />);

        const inputTags = screen.getByTestId("tags-input");
        expect(inputTags).toBeInTheDocument();
        expect(screen.getByPlaceholderText('tags')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('tags')).toHaveValue('');;
    });
    it('renders body input', () => {
        render(<EditNote />);

        const inputBody = screen.getByTestId("body-input");
        expect(inputBody).toBeInTheDocument();
        expect(screen.getByPlaceholderText('body')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('body')).toHaveValue('');
    });
    it('renders tags input with right value', () => {
        render(<EditNote />);

        userEvent.type(screen.getByTestId("tags-input"), 'Aurora');
        expect(screen.getByDisplayValue('Aurora'));
    });
    it('renders body input with right value', () => {
        render(<EditNote />);

        userEvent.type(screen.getByTestId("body-input"), 'Aurora');
        expect(screen.getByDisplayValue('Aurora'));
    });
    it('renders alert on empty body input', async () => {
        render(<EditNote />);

        userEvent.click(screen.getByTestId('svg-save'))
        expect(await screen.getByTestId("body-input")).toHaveStyle('border: 2px solid #f36244');
    });
})

describe('CreateNote', () => {
    it('renders h2 coomponent', () => {
        render(<CreateNote />);
        //screen.debug();
        expect(screen.queryByText('Create Note')).toBeInTheDocument();
    });
    it('renders tags input', () => {
        render(<CreateNote />);

        const inputTags = screen.getByTestId("tags-input");
        expect(inputTags).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type tags here or click above')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type tags here or click above')).toHaveValue('');;
    });
    it('renders body input', () => {
        render(<CreateNote />);

        const inputBody = screen.getByTestId("body-input");
        expect(inputBody).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type note here')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('type note here')).toHaveValue('');
    });
    it('renders tags input with right value', () => {
        render(<CreateNote />);

        userEvent.type(screen.getByTestId("tags-input"), 'Aurora');
        expect(screen.getByDisplayValue('Aurora'));
    });
    it('renders body input with right value', () => {
        render(<CreateNote />);

        userEvent.type(screen.getByTestId("body-input"), 'author');
        expect(screen.getByDisplayValue('author')).toBeInTheDocument();
    });
    it('renders alert on empty body input', async () => {
        render(<CreateNote />);

        fireEvent.change(screen.getByTestId("body-input"), {target: {value: ''}})
        userEvent.click(screen.getByTestId('svg-save'))
        expect(await screen.getByTestId("body-input")).toHaveStyle('border: 2px solid #f36244');
    });
    it('add tag in input on click tag span', () => {
        render(<EditNote />)
        const tag = screen.getAllByTestId('span')[0] // #tags 

        userEvent.click(tag);
        expect(screen.getByDisplayValue('#tags')).toBeInTheDocument();
    })
})

describe("Common Screens Logic", () => {
    it('renders Edit Tags screen on click on setup icon and renders Notes List screen again by click on exit icon', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('svg-setup'))
        expect(screen.getByText('Tags List'));
        userEvent.click(screen.getByTestId('exit-svg'));
        expect(screen.queryByText('Notes List')).toBeInTheDocument();
    });
    it('renders Edit Note screen by click on edit icon and renders Notes List screen again by click on exit icon', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('2-edit'))
        expect(screen.queryByText('Edit Note')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('exit-svg'));
        expect(screen.queryByText('Notes List')).toBeInTheDocument();
    });
    it('delete note by click on delete icon', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('2-delete'))
        expect(screen.queryByTestId('2-note')).not.toBeInTheDocument();
    });
    it('renders Create Note screen by click on tags icon and renders Notes List screen again by click on exit icon', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('svg-save-extended'))
        expect(screen.queryByText('Create Note')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('exit-svg'));
        expect(screen.queryByText('Notes List')).toBeInTheDocument();
    });
    it('makes new note by clicking on tags icon and fulfilling inputs on Create Note screen', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('svg-save-extended'))
        expect(screen.queryByText('Create Note')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId("tags-input"), {target: {value: 'man'}})
        fireEvent.change(screen.getByTestId("body-input"), {target: {value: 'Any man is a human!'}})
        userEvent.click(screen.getByTestId('svg-save'));
        expect(screen.queryByText('#man')).toBeInTheDocument();
        expect(screen.queryByText('Any man is a human!')).toBeInTheDocument();
    });
    it('editing note by clicking on tags icon and fulfilling inputs on Create Note screen', () => {
        render(<App />);

        userEvent.click(screen.getByTestId('2-edit'))
        expect(screen.queryByText('Edit Note')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId("tags-input"), {target: {value: ''}})
        fireEvent.change(screen.getByTestId("body-input"), {target: {value: 'The Cat API - #Cats as a Service'}})
        userEvent.click(screen.getByTestId('svg-save'));
        expect(screen.queryByText('#Cats')).toBeInTheDocument();
        expect(screen.queryByText('The Cat API - #Cats as a Service')).toBeInTheDocument();
    });
})
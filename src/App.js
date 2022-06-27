import './App.css';
import Notes from './screens/Notes';
import EditTags from './screens/EditTags';
import EditNote from './screens/EditNote';
import CreateNote from './screens/CreateNote';
import { useState } from 'react';

function App() {

    {/* Переменные отображения экранов */}
  const [ tagScreen, setTagScreen ] = useState(false);
  const [ editScreen, setEditScreen ] = useState(false);
  const [ createScreen, setCreateScreen ] = useState(false);

  return (
    <main>
      <h1>Note App with Tags</h1>
      {/* Отображение главной страницы */}
      { !tagScreen && !editScreen && !createScreen && <Notes 
        tagScreen={ () => setTagScreen(true) } 
        editScreen={ () => setEditScreen(true) } 
        createScreen={ () => setCreateScreen(true) }
        data-testid='Note' 
      /> }
      { tagScreen && <EditTags tagScreen={ () => setTagScreen(false) } /> } {/* Экран редактирования тэгов */}
      { editScreen && <EditNote editScreen={ () => setEditScreen(false) } /> } {/* Экран редактирования заметок */}
      { createScreen && <CreateNote createScreen={ () => setCreateScreen(false) } /> } {/* Экран создания заметок */}
    </main>
  );
}

export default App;
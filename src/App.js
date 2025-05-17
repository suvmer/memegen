/* eslint-disable */
import React, { useState } from 'react';

import { Button, Select, Card, ThemeProvider } from '@gravity-ui/uikit';

const texts = [
  "Когда интернет снова не работает",
  "Когда забыл сохранить перед выходом",
  "Когда код запустился с первого раза",
  "Когда что-то нажал и всё сломалось",
  "Когда учитель спрашивает, а ты гуглишь ответ",
  "Когда забыл пароль от Wi-Fi в школе",
  "Когда комп завис прямо на уроке",
  "Когда написал hello world и чувствуешь себя хакером",
  "Когда выучил, но не спросили",
];

const images = [
  'Чта?',
  'Доге в лесу(отец Чимса)',
  'Тоби грустный',
  'Филантроп печальный',
  'Миллиардер весёлый',
  'Плейбой задумчивый',
  'Волк с Уолл-стрит',
  'Лёня Ди Каприо',
  'Трём стори',
];

function getMeme(image, text = null, options = {}, index) {
  const imageIndex = image % images.length;
  return (
    <Card
      size='l'
      key={index}
      overflow='hidden'
      type='action'
      {...options}
    >
      <img src={`http://localhost:3000/images/${imageIndex}.jpg`}/>
      <p className='memeText'>{text === null ? '' : texts[text % texts.length]}</p>
    </Card>
  )
}

function App() {
  const [memes, setMemes] = useState([]);
  const [form, setForm] = useState({ text: 0, image: 0 });
  const [theme, setTheme] = useState('dark');

  function handleChange(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function addMeme() {
    setMemes([...memes, form]);
  }

  function getMemeTextChoice(index) {
    return getMeme(index, null, { type: 'selection', selected: form.image === index, onClick: () => handleChange('image', index) })
  }

  function getMemeResultChoice(index) {
    return getMeme(form.image, index, { type: 'selection', selected: form.text === index, onClick: () => handleChange('text', index) })
  }

  return (
    <ThemeProvider theme={ theme }>
      <main className='main'>
        <div className="cardsList">
          { images.concat(images).map((image, index) => getMemeTextChoice(index)) }
        </div>
        <div className="cardsList">
          { texts.concat(texts).map((text, index) => getMemeResultChoice(index)) }
        </div>
        <div className='cardsList'>
          <h1>Готовый мемасик</h1>
          {
            getMeme(form.image, form.text)
          }
          <h2>Текст:</h2>
          <Select
            size='l'
            options={texts.map((text, index) => ({ value: index, content: text }))}
            value={[form.text]}
            onUpdate={val => handleChange('text', Number(val))}
          />
          <h2>Картинка:</h2>
          <Select
            size='l'
            options={images.map((text, index) => ({ value: index, content: text }))}
            value={[form.image % images.length]}
            onUpdate={val => handleChange('image', Number(val))}
          />
          <Button width='max' size='xl' view="action" onClick={addMeme}>
            Сохранить
          </Button>
        </div>
        {memes.length !== 0 && (
          <div className='cardsList'>
            <h1>Коллекция</h1>
            { memes.map((meme, index) => (
              getMeme(meme.image, meme.text)
          ))}
          </div>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;

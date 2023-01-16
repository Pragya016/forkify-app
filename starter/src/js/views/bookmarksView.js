import icons from '../../img/icons.svg'
import {Fraction} from 'fractional'
import view from './view.js'
import previewView from './previewView';

class BookmarksView extends view{
    _parentEl = document.querySelector('.bookmarks__list');
    _errMessage = "No bookmarks yet! find a nice recipe and bookamrk it ;)";
    _message = '';

    addHandlerRender(handler){
      window.addEventListener('load' , handler)
    }

    _generateMarkup(){
      return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
  }

export default new BookmarksView()
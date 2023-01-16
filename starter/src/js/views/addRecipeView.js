import icons from '../../img/icons.svg'
import {Fraction} from 'fractional'
import view from './view.js'
import previewView from './previewView';

class AddRecipeView extends view{
    _parentEl = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded ;)'
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    constructor(){
        super();
        this._addHandlerShowForm();
        this._addHandlerCloseForm();
    }

    toggleWindow(){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerShowForm(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerCloseForm(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }
  }

export default new AddRecipeView()
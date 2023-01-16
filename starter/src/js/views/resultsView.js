import View from './view.js'
import previewView from './previewView';
import icons from "../../img/icons.svg"

class ResultsView extends View{
    _parentEl = document.querySelector('.results');
    _errMessage = 'No recipes found for your query.Try again!'

    _generateMarkup(){
      return this._data.map(results => previewView.render(results, false)).join('')
    }
  }

export default new ResultsView();
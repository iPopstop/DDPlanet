import _replace from 'lodash/replace'

export default (x) => _replace(x.toString(), /(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

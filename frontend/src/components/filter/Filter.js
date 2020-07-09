import React from 'react';
import './Filter.scss'
import { constants } from '../../consts';
import classes from 'classnames';

const filters = {
  includes: (data, search) => data.includes(search),
  equals: (data, search) => typeof data === 'number'
    ? data === parseInt(search)
    : data === search,
  bigger: (data, search) => data > search,
  less: (data, search) => data < search
};

const initialState = {
  filter: [],
  filtersParams: {},
  formValid: false,
  columnValid: false,
  conditionValid: false,
  valueValid: false,
  column: '',
  condition: '',
  value: ''
}

export const Filter = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = initialState;
    }

    validateForm() {
      this.setState((prevState) => {
        return {
          formValid: prevState.columnValid
                    && prevState.conditionValid
                    && prevState.valueValid
        }
      });
    }

    validateField(type, value) {
      let columnValid = this.state.columnValid;
      let conditionValid = this.state.conditionValid;
      let valueValid = this.state.valueValid;

      switch (type) {
        case 'column':
          columnValid = value.length > 0;
          break;
        case 'condition':
          conditionValid = value.length > 0;
          break;
        case 'value':
          valueValid = value.length > 0;
          break;
        default:
          return null;
      }

      this.setState({
          columnValid,
          conditionValid,
          valueValid
        },
          this.validateForm
      )
    }

    onChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState(({filtersParams}) => ({
        filtersParams: {
          ...filtersParams,
          [name]: value
        },
        [name]: value
      }),
        () => { this.validateField(name, value) })
    }

    onSubmit(event) {
      event.preventDefault();
      const filtersParams = this.state.filtersParams;

      const filter = {
        filterColumn: filtersParams.column,
        filterValue: filtersParams.value,
        filterMethod: () => {}
      };

      if (filtersParams.condition === 'equals')
        filter.filterMethod = filters.equals;

      if (filtersParams.condition === 'includes')
        filter.filterMethod = filters.includes;

      if (filtersParams.condition === 'bigger')
        filter.filterMethod = filters.bigger;

      if (filtersParams.condition === 'less')
        filter.filterMethod = filters.less;

      if(Object.keys(filter).length > 0)
        this.setState(() => ({
          filter
        }))
    }

    resetFilter() {
      this.setState((prevState) => ({
        ...prevState,
        ...initialState
      }))
    }

    errorClass(valid) {
      return(valid ? '' : 'error');
    }

    render() {
      return (
        <React.Fragment>
          <div className={'filter'} >
            <form className={'filter__form'} onSubmit={(event => this.onSubmit(event))}>
              <div className={'filter__param'}>
                <label className={'filter__label'}>Column:</label>
                <select className={ classes('filter__list', this.errorClass(this.state.columnValid))}
                        name={'column'}
                        value={this.state.column}
                        onChange={(event => this.onChange(event))}
                >
                  <option value={''}></option>
                  {Object.keys(constants.header).map((colName) => {
                    return <option key={'option-'+colName} value={colName}>{constants.header[colName]}</option>
                  })}
                </select>
              </div>
              <div className={'filter__param'}>
                <label className={'filter__label'}>Condition:</label>
                <select className={ classes('filter__list', this.errorClass(this.state.conditionValid)) }
                        name={'condition'}
                        value={this.state.condition}
                        onChange={(event => this.onChange(event))}
                >
                  <option value={''}></option>
                  <option value={'equals'}>=</option>
                  <option value={'includes'}>Include</option>
                  <option value={'bigger'}>Bigger</option>
                  <option value={'less'}>Less</option>

                </select>
              </div>
              <div className={'filter__param'}>
                <label htmlFor={'value'} className={'filter__label'}>Value:</label>
                <input id={'value'}
                       className={ classes('filter__input', this.errorClass(this.state.valueValid)) }
                       type="text"
                       name={'value'}
                       value={this.state.value}
                       onChange={(event => this.onChange(event))}
                />
              </div>
              <div className={'filter__param'}>
                <button type={'submit'}
                        className={'filter__button'}
                        disabled={!this.state.formValid}
                >Filter</button>
              </div>
            </form>
            <div className={'filter__param'}>
              <button className={'filter__button'}
                      onClick={() => this.resetFilter()}
              >Reset</button>
            </div>
          </div>
          <WrappedComponent
            {...this.props}
            filterable={true}
            filter={this.state.filter}
          />

        </React.Fragment>
      );
    }
  }
}
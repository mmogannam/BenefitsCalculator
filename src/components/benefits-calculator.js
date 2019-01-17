import React, {Component} from 'react';
import BenefitsSummary from './benefits-summary';


class BenefitsCalculator extends Component  {

  constructor() {
    super();
    //set default state values
    this.state = {dependents: [], name: '', inputError: false};
    //bind this context
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormReset = this.onFormReset.bind(this);
    this.onAddDependent = this.onAddDependent.bind(this);
  }


  onFormSubmit(event) {
    event.preventDefault();

    //set default state
    this.setState({inputError: true, showResults: false});
    //validate form or show summary
    if(this.state.name != '' && this.state.dependents.every(obj => obj.name != ''))
    {
      this.setState({inputError: false, showResults: true});
    }
  }


  onFormReset(event) {
    event.preventDefault();
    //clear form values / state
    this.setState({showResults: false, name: '', dependents: [], inputError: false});
  }

  onInputChange(event){
    //update state when input is changed
    this.setState({[event.target.name]: event.target.value});
  }

  onAddDependent(event){
    event.preventDefault();
    //hide results when a new dep. is added
    this.setState({showResults: false});
    this.setState({
      dependents: this.state.dependents.concat([{ name: '' }])
    });

  }

  onInputChangeDependent = (idx) => (evt) => {
    const newDependents = this.state.dependents.map((dependent, sidx) => {
      if (idx !== sidx) {
        return dependent;
      }
      return { ...dependent, name: evt.target.value };
    });

    this.setState({ dependents: newDependents });
  }

  render(){
    return(
    <form onSubmit={this.onFormSubmit} >
      <div style={{marginTop: '20px', marginBottom: '20px'}}><h3>Employee Benefits Cost Preview</h3></div>
      <div>
          <div className="form-group">
          <label htmlFor="name" >Employee Name</label>
          <input
          name="name"
          className="form-control"
          value={this.state.name}
          onChange={this.onInputChange}/>
          </div>
        <div>

          {
            this.state.dependents.map((dependent, index) => {
              return (
                <div style={{marginBottom: '30px'}} key={index}>
                  <label>Dependent {index + 1} Name</label>

                  <input className="form-control"
                          value={dependent.name}
                          onChange={this.onInputChangeDependent(index)}/>
                </div>
              )
            })
          }
          </div>
          <div>
            <BenefitsSummary
              showResults={this.state.showResults}
              name={this.state.name}
              dependents={this.state.dependents}
              inputError={this.state.inputError}/>
          </div>
          <div>
            <button style={{float: 'right'}} className="btn btn-primary" onClick={this.onAddDependent}>Add Dependent</button>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <button type="submit" className="calculate-button btn btn-primary">Calculate</button>
            <button style={{marginLeft: '10px'}} className="btn btn-warning" onClick={this.onFormReset}>Reset</button>
          </div>
        </div>
      </form>

    );
  }
}

export default BenefitsCalculator;

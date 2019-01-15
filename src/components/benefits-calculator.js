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

    //validate form or show summary
    if(this.state.name != '' && this.state.dependents.every(obj => obj.name != ''))
    {
      this.setState({inputError: false, showResults: true});
    }
    else
    {
      this.setState({inputError: true, showResults: false})
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
      <div style={{marginTop: '20px'}}><h4>Employee Benefits Calculator</h4></div>
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
          <br/>
          {
            this.state.dependents.map((dependent, index) => {
              return (
                <div className="container" style={{marginBottom: '30px'}} key={index}>
                  <h6>Dependent {index + 1}</h6>
                  <label>Name</label>
                  <input className="form-control"
                          value={dependent.name}
                          onChange={this.onInputChangeDependent(index)}/>
                </div>
              )
            })
          }
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Calculate Benefits Cost</button>
            <button style={{marginLeft: '10px'}} className="btn btn-warning" onClick={this.onFormReset}>Reset</button>
            <button style={{float: 'right'}} className="btn btn-primary" onClick={this.onAddDependent}>Add Dependent</button>
          </div>
        </div>
        <div>
          <BenefitsSummary
          showResults={this.state.showResults}
          name={this.state.name}
          dependents={this.state.dependents}
          inputError={this.state.inputError}/>
        </div>
      </form>

    );
  }
}

export default BenefitsCalculator;

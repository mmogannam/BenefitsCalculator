import React, {Component} from 'react';
import * as Constants from '../constants';
import NumberFormat from 'react-number-format';


 class BenefitsSummary extends Component  {

   renderError(){
     return (
       <div className="alert alert-warning">Please enter employee and dependent(s) name.</div>
     )
   }

   renderSummary(dependents){

     var netSalary = 0;
     var dependentsCost = 0;
     var benefitsCost = 0;
     var grossSalary = Constants.employeeSalary.WEEKS_PAID * Constants.employeeSalary.PAYCHECK;
     var employeeCost = Constants.employeeBenefitCost.YEARLY_BENEFIT_COST;
     var employeeDiscount, dependentDiscount = false;

     //determine discount based on name for employee
     if(this.props.name && this.props.name[0].toLowerCase() == Constants.employeeBenefitCost.DISCOUNT_LETTER){
        employeeCost = (employeeCost * (1 - Constants.employeeBenefitCost.DISCOUNT));
        employeeDiscount = true;
     }

     //for each dependent, determine discount based on name
     this.props.dependents.map((dependent,index)=>{
       if(dependent.name != '' && dependent.name.charAt(0).toLowerCase() == Constants.employeeBenefitCost.DISCOUNT_LETTER){
         dependentsCost += (Constants.employeeBenefitCost.YEARLY_DEPENDENT_COST * (1 - Constants.employeeBenefitCost.DISCOUNT));
         dependentDiscount = true;
       }else{
         dependentsCost += Constants.employeeBenefitCost.YEARLY_DEPENDENT_COST;
       }
     });

     benefitsCost = employeeCost + dependentsCost;
     netSalary = grossSalary - benefitsCost;

     return(
        <div className="container">
          <div>
            <h5>Yearly Benefits Cost For {this.props.name}</h5>
            <div>Number of Dependents: {this.props.dependents.length}</div>
            <div>10% Employee Discount: {(employeeDiscount ? 'Yes': 'No')}</div>
            <div>10% Dependent Discount: {(dependentDiscount ? 'Yes': 'No')}</div>
            <div>
              <NumberFormat value={grossSalary}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            renderText={value => <div>Gross Salary: {value}</div>} />
            </div>
            <div>
            <NumberFormat value={netSalary}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                          renderText={value => <div>Net Salary: {value}</div>} />
            </div>
            <div style={{fontWeight: 'bold'}}>
            <NumberFormat value={benefitsCost}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                          renderText={value => <div>Benefits Cost: {value}</div>} />
            </div>
          </div>
        </div>
      );
   }

  render(){
      return (
        <div style={{paddingTop: '30px'}}>
            <div>{this.props.inputError ? this.renderError() : null}</div>
            {<div>{this.props.showResults ? this.renderSummary() : null}</div>}
        </div>
    );
  }
}

export default BenefitsSummary;

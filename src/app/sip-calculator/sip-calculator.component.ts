import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.scss']
})
export class SipCalculatorComponent {
  sipForm: FormGroup;
  estimatedFutureValue: number | null = null;
  totalInvestment: number | null = null;
  totalProfit: number | null = null;
  selectedTab: string = 'lumpsum';

  constructor(private fb: FormBuilder) {
    this.sipForm = this.fb.group({
      initialInvestment: [0, [Validators.required, Validators.min(0)]],
      monthlyInvestment: [0, [Validators.required, Validators.min(0)]],
      stepUpPercentage: [0, [Validators.required, Validators.min(0)]],
      investmentPeriod: [0, [Validators.required, Validators.min(1)]],
      expectedReturnRate: [0, [Validators.required, Validators.min(0)]]
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  calculateSIP() {
    const stepUpPercentage = this.sipForm.value.stepUpPercentage / 100;
    const investmentPeriod = this.sipForm.value.investmentPeriod;
    const expectedReturnRate = this.sipForm.value.expectedReturnRate / 100;

    if (this.selectedTab === 'lumpsum') {
      const initialInvestment = this.sipForm.value.initialInvestment;
      this.totalInvestment = initialInvestment;
      this.estimatedFutureValue = initialInvestment * Math.pow(1 + expectedReturnRate, investmentPeriod);
    } else {
      const monthlyInvestment = this.sipForm.value.monthlyInvestment;
      let totalInvestment = 0;
      let monthlyInvestmentWithStepUp = monthlyInvestment;
      let futureValue = 0;

      for (let year = 1; year <= investmentPeriod; year++) {
        for (let month = 1; month <= 12; month++) {
          futureValue += monthlyInvestmentWithStepUp;
          futureValue *= (1 + expectedReturnRate / 12);
          totalInvestment += monthlyInvestmentWithStepUp;
        }
        monthlyInvestmentWithStepUp += monthlyInvestmentWithStepUp * stepUpPercentage;
      }

      this.totalInvestment = totalInvestment;
      this.estimatedFutureValue = futureValue;
    }

    if (this.estimatedFutureValue !== null && this.totalInvestment !== null) {
      this.totalProfit = this.estimatedFutureValue - this.totalInvestment;
    }
  }
}

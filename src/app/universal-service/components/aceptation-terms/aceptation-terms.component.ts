import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

export interface Model {
  agency: string;
}

export interface PeopleData {
  number: number;
  money: string;
}


@Component({
  selector: 'app-aceptation-terms',
  templateUrl: './aceptation-terms.component.html',
  styleUrls: ['./aceptation-terms.component.scss']
})
export class AceptationTermsComponent implements OnInit {

  public agencies = [
    'Programa de Asistencia para Nutrición Suplementaria (SNAP) (Estampillas para Alimentos)',
    'Ingreso Suplementario de Seguridad (SSI)',
    'Medicaid',
    'Asistencia Federal para la Vivienda Pública (FPHA)',
    'Beneficio de Pensión para Veteranos y Sobrevivientes'];

  public form: FormGroup;

  model = new class {
    agency = '';
    ldiRestriction: boolean;
    peopleDataSelectedNumber: number;
    peopleDataSelected: PeopleData;
    earningsValidation: boolean;
    lifelineProgramInscription: boolean;
    aceptationTerm: boolean;
  };

  homePeopleData: PeopleData [] = [
    { number: 1, money: '$16,389' },
    { number: 2, money: '$22,221' },
    { number: 3, money: '$28,053' },
    { number: 4, money: '$33,885' },
    { number: 5, money: '$39,717' },
    { number: 6, money: '$45,549' },
    { number: 7, money: '$51,381' },
    { number: 8, money: '$57,213' }
  ];

  constructor(private authenticationService: AuthenticationService, private router: Router , private fb: FormBuilder) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.form = this.fb.group({
      agency: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      ldiRestriction: [
        null,
        Validators.compose([
          Validators.required
        ])
      ]
    });

    this.model.peopleDataSelectedNumber = this.homePeopleData[0].number;
    this.model.peopleDataSelected = this.homePeopleData[0];
  }

  goToPreviewViewAndFirm() {
    this.router.navigate(['/universal-service/preview-view-and-firm'], { replaceUrl: true });
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToAccountCreation() {
    this.router.navigate(['/universal-service/account-creation'], { replaceUrl: true });
  }

  onChangeSelect($event: any) {
    this.model.peopleDataSelected = this.homePeopleData.find(x => x.number.toString() === $event);
  }

  validateForm() {
    if (this.form.valid && this.model.aceptationTerm) {
      if (this.model.agency === 'Ingreso Suplementario de Seguridad (SSI)' &&
        this.model.peopleDataSelected &&
        this.model.earningsValidation !== undefined) {
        return true;
      }

      if (this.model.agency ===
        'Programa de Asistencia para Nutrición Suplementaria (SNAP) (Estampillas para Alimentos)' &&
        this.model.lifelineProgramInscription !== undefined) {
        return true;
      }

      if (this.model.agency !== 'Ingreso Suplementario de Seguridad (SSI)' &&
        this.model.agency !==
        'Programa de Asistencia para Nutrición Suplementaria (SNAP) (Estampillas para Alimentos)') {
        return true;
      }

      return false;
    }

    return false;
  }

  setAceptationTerms(value: boolean) {
    this.model.aceptationTerm = value;
  }
}

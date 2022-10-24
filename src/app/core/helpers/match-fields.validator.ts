import { UntypedFormGroup } from '@angular/forms';

// Validate if two fields are the same, for instance, password and new password are the same
export function MatchFields(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
        const CONTROL = formGroup.controls[controlName];
        const MATCHING_CONTROL = formGroup.controls[matchingControlName];
        if (MATCHING_CONTROL.errors && !MATCHING_CONTROL.errors.matchFields) {
            return;
        }
        // If the fields aren't the same
        if (CONTROL.value !== MATCHING_CONTROL.value) {
            MATCHING_CONTROL.setErrors({ matchFields: true });
        }
        MATCHING_CONTROL.setErrors(null);
    }
}

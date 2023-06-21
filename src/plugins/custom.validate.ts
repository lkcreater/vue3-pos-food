export type ValidateName = 'required';
export type ValidationResult  = string | boolean;
export type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

export interface ValidatesInterface {
    rule: ValidateName,
    message?: string,
    custom?: <T>(value: T) => ValidationResult
}

export const Required = <T>(value: T): ValidationResult => {
    if(value) return true;

    return 'This field cannot be left blank';
}

export class RuleManage {
    private field: string;
    private messege: string | null = null;
    private replaceFeild: string = '{field}';

    constructor(field: string, replaceFeild?: string){
        this.field = field;
        this.replaceFeild = (replaceFeild) ? replaceFeild : this.replaceFeild;
    }

    public setMessege = (message: string): void => {
        this.messege = message;
    }

    public required = <T>(value: T): ValidationResult => {
        if(value) return true;

        return this._createMessege(`This field {${this.field}} cannot be left blank`);
    }

    private _createMessege = (defaultMessege: string) => {
        return (this.messege == null) ? defaultMessege : this.messege.replace(this.replaceFeild, this.field);
    }
}

export const Rules = (field: string, validates: ValidatesInterface[]) : ValidationRule[] => {
    const ruleManage = new RuleManage(field);

    let rules: ValidationRule[] = [];
    for(let validate of validates) {
        if(validate.rule == <ValidateName>'required'){
            if(validate.message){
                ruleManage.setMessege(validate.message);
            }
            rules.push(ruleManage.required);
        }
    }

    return rules
}

//Rule('sss', ['required', {rule: 'ssssss', message: 'sssss'}])
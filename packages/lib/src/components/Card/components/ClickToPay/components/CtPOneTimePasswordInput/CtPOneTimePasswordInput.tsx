import { h } from 'preact';
import { useCallback, useEffect, useImperativeHandle } from 'preact/hooks';
import { otpValidationRules } from './validate';
import useCoreContext from '../../../../../../core/Context/useCoreContext';
import useForm from '../../../../../../utils/useForm';
import Field from '../../../../../internal/FormFields/Field';
import renderFormField from '../../../../../internal/FormFields';
import './CtPOneTimePasswordInput.scss';
import { forwardRef } from 'preact/compat';

interface Props {
    disabled: boolean;
    errorCode?: string;
    data?: {}; //  TODO REMOVE
    onChange({ data: CtPOneTimePasswordInputDataState, valid, errors, isValid: boolean }): void;
}

interface CtPOneTimePasswordInputDataState {
    otp?: string;
}

export type CtPOneTimePasswordInputHandlers = {
    validateInput(): void;
};

const CtPOneTimePasswordInput = forwardRef<CtPOneTimePasswordInputHandlers, Props>((props, ref) => {
    const { i18n } = useCoreContext();
    const formSchema = ['otp'];
    const { handleChangeFor, data, triggerValidation, valid, errors, isValid } = useForm<CtPOneTimePasswordInputDataState>({
        schema: formSchema,
        defaultData: props.data,
        rules: otpValidationRules
    });

    const validateInput = useCallback(() => {
        triggerValidation();
    }, [triggerValidation]);

    useImperativeHandle(ref, () => ({ validateInput }));

    useEffect(() => {
        props.onChange({ data, valid, errors, isValid });
    }, [data, valid, errors]);

    return (
        <Field label={i18n.get('One time code')} errorMessage={props.errorCode || !!errors.otp} classNameModifiers={['otp']}>
            {renderFormField('text', {
                name: 'otp',
                autocorrect: 'off',
                spellcheck: false,
                value: data.otp,
                disabled: props.disabled,
                onInput: handleChangeFor('otp', 'input'),
                onBlur: handleChangeFor('otp', 'blur')
            })}
        </Field>
    );
});

export default CtPOneTimePasswordInput;
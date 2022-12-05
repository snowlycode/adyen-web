import { Fragment, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import Button from '../../../../../internal/Button';
import useClickToPayContext from '../../context/useClickToPayContext';
import CtPOneTimePasswordInput from './CtPOneTimePasswordInput';
import { CtPOneTimePasswordInputHandlers } from './CtPOneTimePasswordInput/CtPOneTimePasswordInput';
import useCoreContext from '../../../../../../core/Context/useCoreContext';
import './CtPOneTimePassword.scss';

type CtPOneTimePasswordProps = {
    onDisplayCardComponent?(): void;
};
const CtPOneTimePassword = ({ onDisplayCardComponent }: CtPOneTimePasswordProps): h.JSX.Element => {
    const { i18n } = useCoreContext();
    const { finishIdentityValidation, otpMaskedContact, otpNetwork, isCtpPrimaryPaymentMethod } = useClickToPayContext();
    const [otp, setOtp] = useState<string>(null);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isValidatingOtp, setIsValidatingOtp] = useState<boolean>(false);
    const [errorCode, setErrorCode] = useState<string>(null);
    const [otpInputHandlers, setOtpInputHandlers] = useState<CtPOneTimePasswordInputHandlers>(null);
    const [isAccountLocked, setIsAccountLocked] = useState<boolean>(false);

    const onSetOtpInputHandlers = useCallback((handlers: CtPOneTimePasswordInputHandlers) => {
        setOtpInputHandlers(handlers);
    }, []);

    const onChangeOtpInput = useCallback(({ data, isValid }) => {
        setOtp(data.otp);
        setIsValid(isValid);
    }, []);

    const onResendCode = useCallback(() => {
        setErrorCode(null);
    }, []);

    const onSubmitPassword = useCallback(async () => {
        setErrorCode(null);

        if (!isValid) {
            otpInputHandlers.validateInput();
            return;
        }

        setIsValidatingOtp(true);

        try {
            await finishIdentityValidation(otp);
        } catch (error) {
            setErrorCode(error?.reason);
            setIsValidatingOtp(false);

            if (error?.reason === 'ACCT_INACCESSIBLE') {
                setIsAccountLocked(true);
                onDisplayCardComponent?.();
            }
        }
    }, [otp, isValid, otpInputHandlers, onDisplayCardComponent]);

    const subtitleParts = i18n.get('ctp.otp.subtitle').split('%@');

    return (
        <Fragment>
            <div className="adyen-checkout-ctp__section-title">{i18n.get('ctp.otp.title')}</div>
            <div className="adyen-checkout-ctp__section-subtitle">
                {subtitleParts[0]} {otpNetwork} {subtitleParts[1]}
                <span className="adyen-checkout-ctp__otp-subtitle--highlighted">{otpMaskedContact}</span>
                {subtitleParts[2]}
            </div>
            <CtPOneTimePasswordInput
                hideResendOtpButton={isAccountLocked}
                onChange={onChangeOtpInput}
                onSetInputHandlers={onSetOtpInputHandlers}
                disabled={isValidatingOtp}
                errorMessage={errorCode && i18n.get(`ctp.errors.${errorCode}`)}
                onPressEnter={onSubmitPassword}
                onResendCode={onResendCode}
                isValidatingOtp={isValidatingOtp}
            />
            <Button
                disabled={isAccountLocked}
                label={i18n.get('continue')}
                variant={isCtpPrimaryPaymentMethod ? 'primary' : 'secondary'}
                onClick={onSubmitPassword}
                status={isValidatingOtp && 'loading'}
            />
        </Fragment>
    );
};

export default CtPOneTimePassword;

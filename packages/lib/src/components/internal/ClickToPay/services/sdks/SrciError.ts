import { ClickToPayScheme } from '../../types';

export type MastercardError = {
    message: string;
    reason: string;
};

export type VisaError = {
    error: {
        message: string;
        reason: string;
    };
};

class SrciError extends Error {
    public reason: string;
    public message: string;
    public source: string;
    public scheme: ClickToPayScheme;
    public errorFromCardSchemeSdk: unknown;

    constructor(schemeError: VisaError | MastercardError, source: string, scheme: ClickToPayScheme) {
        super();

        const message = 'error' in schemeError ? schemeError?.error?.message : schemeError?.message;
        const reason = 'error' in schemeError ? schemeError?.error?.reason : schemeError?.reason;

        this.message = message;
        this.reason = reason;
        this.source = source;
        this.scheme = scheme;
        this.errorFromCardSchemeSdk = schemeError;
    }

    toString() {
        return `Reason: ${this.reason} / Source: ${this.source} / Scheme: ${this.scheme} / Message: ${this.message}`;
    }
}

export default SrciError;
